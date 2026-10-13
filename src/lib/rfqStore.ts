import {createHash} from "node:crypto";
import {Pool} from "pg";
import {S3Client,PutObjectCommand,DeleteObjectCommand} from "@aws-sdk/client-s3";
import type {RfqLeadEvent} from "@/lib/rfqSecurity";

export type RfqDocument={filename:string;bytes:Buffer;sha256:string};
export type RfqReceipt={reference:string;replayed:boolean};
const storageKeys=["RFQ_DATABASE_URL","RFQ_FILES_BUCKET","RFQ_S3_ENDPOINT","RFQ_S3_REGION","RFQ_S3_ACCESS_KEY_ID","RFQ_S3_SECRET_ACCESS_KEY"] as const;
let pool:Pool|undefined;
let storage:S3Client|undefined;

/** Configured is not the same as tested or operationally accepted. */
export function rfqStoreConfigured():boolean{
 if(!storageKeys.every(k=>Boolean(process.env[k])))return false;
 try{
  const endpoint=new URL(process.env.RFQ_S3_ENDPOINT!);
  const database=new URL(process.env.RFQ_DATABASE_URL!);
  return endpoint.protocol==="https:"&&!endpoint.username&&!endpoint.password&&
   (database.protocol==="postgres:"||database.protocol==="postgresql:");
 }catch{return false;}
}
function connection():Pool{
 if(!pool)pool=new Pool({
  connectionString:process.env.RFQ_DATABASE_URL!,
  ssl:{rejectUnauthorized:true,...(process.env.RFQ_DATABASE_CA_PEM?{ca:process.env.RFQ_DATABASE_CA_PEM.replaceAll("\\n","\n")}: {})},
  max:5,connectionTimeoutMillis:6000,idleTimeoutMillis:10000,
 });
 return pool;
}
function objectStorage():S3Client{
 if(!storage)storage=new S3Client({
  endpoint:process.env.RFQ_S3_ENDPOINT!,
  region:process.env.RFQ_S3_REGION!,
  forcePathStyle:true,
  credentials:{accessKeyId:process.env.RFQ_S3_ACCESS_KEY_ID!,secretAccessKey:process.env.RFQ_S3_SECRET_ACCESS_KEY!},
 });
 return storage;
}
function fileKey(reference:string,index:number,doc:RfqDocument):string{
 const extension=doc.filename.toLowerCase().split(".").pop()?.replace(/[^a-z0-9]/g,"")||"bin";
 return "rfq/"+reference+"/"+index+"-"+doc.sha256+"."+extension;
}
export function rfqFingerprint(lead:RfqLeadEvent):string {
 // Exclude the randomly generated reference and timestamp, so browser retries are stable.
 const {reference:unused,receivedAt:ignored,...stable}=lead;
 void unused;void ignored;
 return createHash("sha256").update(JSON.stringify(stable)).digest("hex");
}
/**
 * Stores documents privately, then atomically commits the RFQ and BOTH notification
 * outbox rows. Failure never returns a receipt. A UUID retry returns the original
 * reference; the same UUID with changed content is a conflict.
 * The bucket MUST be private, HTTPS-only and protected by orphan cleanup policy.
 */
export async function persistRfq(input:{
 idempotencyKey:string;
 lead:RfqLeadEvent;
 documents:RfqDocument[];
 salesAddress:string;
}):Promise<RfqReceipt>{
 if(!rfqStoreConfigured())throw new Error("RFQ_STORAGE_NOT_CONFIGURED");
 const client=await connection().connect();
 const uploaded:string[]=[];
 let committed=false;
 let commitAttempted=false;
 try{
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(hashtext($1))",[input.idempotencyKey]);
  const fingerprint=rfqFingerprint(input.lead);
  const existing=await client.query<{reference:string;fingerprint:string}>(
   "SELECT reference,fingerprint FROM rfq_submissions WHERE idempotency_key=$1",[input.idempotencyKey]);
  if(existing.rowCount){
   if(existing.rows[0].fingerprint!==fingerprint)throw new Error("RFQ_IDEMPOTENCY_CONFLICT");
   await client.query("COMMIT");committed=true;
   return {reference:existing.rows[0].reference,replayed:true};
  }
  const s3=objectStorage();
  const bucket=process.env.RFQ_FILES_BUCKET!;
  const manifest:{key:string;filename:string;bytes:number;sha256:string}[]=[];
  for(const [index,doc] of input.documents.entries()){
   const key=fileKey(input.lead.reference,index,doc);
   await s3.send(new PutObjectCommand({
    Bucket:bucket,Key:key,Body:new Uint8Array(doc.bytes),ContentType:"application/octet-stream",
    ServerSideEncryption:"AES256",Metadata:{sha256:doc.sha256},
   }),{abortSignal:AbortSignal.timeout(15000)});
   uploaded.push(key);
   manifest.push({key,filename:doc.filename,bytes:doc.bytes.byteLength,sha256:doc.sha256});
  }
  await client.query(
   `INSERT INTO rfq_submissions
   (reference,idempotency_key,fingerprint,status,lead_data,documents,consent_at)
   VALUES ($1,$2,$3,'Received',$4::jsonb,$5::jsonb,now())`,
   [input.lead.reference,input.idempotencyKey,fingerprint,JSON.stringify(input.lead),JSON.stringify(manifest)]);
  const note=[
   "HEXA Steel® — New Sales RFQ","Reference: "+input.lead.reference,
   "Service: "+input.lead.serviceName,"Company: "+input.lead.customer.company,
   "Contact: "+input.lead.customer.name,"Email: "+input.lead.customer.email,
   "Telephone: "+input.lead.customer.phone,"",
   "Scope:",input.lead.project.description,
   "Quantity: "+(input.lead.project.quantity||"Not provided")+" "+input.lead.project.unit,
   "Location: "+(input.lead.project.location||"Not provided"),
   "Delivery date: "+(input.lead.project.requiredDate||"Not provided"),
   "Technical specifications: "+(input.lead.project.technicalSpec||"Not provided"),
   "Technical details: "+(input.lead.project.technicalDetail||"Not provided"),
   "Documents stored privately: "+manifest.length,
   ...manifest.map(file=>"- "+file.filename+" ("+file.bytes+" bytes)"),
   "Files require authorised access to the private object store; this email includes no public file links.",
  ].join("\n");
  const customer=[
   "HEXA Steel® — RFQ acknowledgement","",
   "Your request has been recorded.","Reference: "+input.lead.reference,
   "Service: "+input.lead.serviceName,
   "Our commercial team will review your requirements and contact you.",
   "This is a submission reference, not an estimation number or binding quotation.",
  ].join("\n");
  for(const entry of [
   {kind:"sales",address:input.salesAddress,reply:input.lead.customer.email,subject:"HEXA Steel® | New RFQ | "+input.lead.reference,body:note},
   {kind:"customer",address:input.lead.customer.email,reply:input.salesAddress,subject:"HEXA Steel® | RFQ received | "+input.lead.reference,body:customer},
  ]){
   await client.query(
    `INSERT INTO rfq_outbox (reference,kind,recipient,reply_to,subject,body)
      VALUES ($1,$2,$3,$4,$5,$6)`,
    [input.lead.reference,entry.kind,entry.address,entry.reply,entry.subject,entry.body]);
  }
  commitAttempted=true;
  await client.query("COMMIT");committed=true;
  return {reference:input.lead.reference,replayed:false};
 }catch(e){
  // A connection failure during COMMIT is ambiguous; do not delete documents
  // that may already be referenced by a committed RFQ. Handle orphans offline.
  let rolledBack=false;
  if(!committed&&!commitAttempted){try{await client.query("ROLLBACK");rolledBack=true;}catch{}}
  if(rolledBack&&uploaded.length){
   await Promise.allSettled(uploaded.map(Key=>objectStorage().send(
    new DeleteObjectCommand({Bucket:process.env.RFQ_FILES_BUCKET!,Key}))));
  }
  throw e;
 }finally{
  // An interrupted COMMIT can leave session state indeterminate.
  // Destroy the connection instead of returning it to the reusable pool.
  client.release(commitAttempted&&!committed);
 }
}
