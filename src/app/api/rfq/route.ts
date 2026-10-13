import {NextResponse} from "next/server";
import {randomBytes} from "node:crypto";
import {maxFileSize,maxFiles,maxUploadTotal,rfqServices,validRfqService} from "@/lib/rfq";
import {handoffRfqLead,rfqFileHash,scanRfqAttachment,type RfqAttachmentMetadata} from "@/lib/rfqSecurity";
import {persistRfq,rfqStoreConfigured,type RfqDocument} from "@/lib/rfqStore";
export const runtime="nodejs";
// File scanning, restricted object storage and transactional notification outbox.
export const maxDuration=60;
const MAX_REQUEST_BODY=9*1024*1024;
const counters=new Map<string,{reset:number;count:number}>();
function clean(value:FormDataEntryValue|null,limit:number){
 return typeof value==="string"?value.trim().slice(0,limit):"";
}
function error(message:string,status:number){
 return NextResponse.json({error:message},{status,headers:{"Cache-Control":"no-store"}});
}
function validFile(file:File,data:Buffer):boolean{
 const extension=file.name.toLowerCase().split(".").pop()||"";
 if(extension==="pdf")return data.subarray(0,5).toString("ascii")==="%PDF-";
 if(extension==="dwg")return data.subarray(0,4).toString("ascii")==="AC10";
 if(extension==="dxf"){
  const header=data.subarray(0,400).toString("latin1").toUpperCase();
  return header.includes("SECTION")||header.startsWith("AUTOCAD BINARY DXF");
 }
 if(extension==="xlsx"||extension==="docx"){
  if(data.subarray(0,4).toString("hex")!=="504b0304")return false;
  const fileNames=data.subarray(0,Math.min(data.length,200000)).toString("latin1");
  return extension==="xlsx"?fileNames.includes("xl/"):fileNames.includes("word/");
 }
 return false;
}
async function boundedFormData(request:Request):Promise<FormData|null>{
 const type=request.headers.get("content-type")||"";
 if(!type.startsWith("multipart/form-data;"))return null;
 const sizeHeader=Number(request.headers.get("content-length")||"0");
 if(sizeHeader>MAX_REQUEST_BODY)return null;
 if(!request.body)return null;
 const reader=request.body.getReader();
 let byteCount=0;
 const parts:Uint8Array[]=[];
 try{
  while(true){
   const {done,value}=await reader.read();
   if(done)break;
   byteCount+=value.byteLength;
   if(byteCount>MAX_REQUEST_BODY){await reader.cancel();return null;}
   parts.push(value);
  }
  const body=new Uint8Array(byteCount);
  let offset=0;
  for(const part of parts){body.set(part,offset);offset+=part.byteLength;}
  return await new Response(body,{headers:{"content-type":type}}).formData();
 }catch{return null;}
}
export async function POST(request:Request){
 const allowedOrigins=[new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://hexasteel.sa").origin];
 if(allowedOrigins[0]==="https://hexasteel.sa")allowedOrigins.push("https://www.hexasteel.sa");
 if(!allowedOrigins.includes(request.headers.get("origin")||""))return error("Submission origin not accepted.",403);
 if(process.env.RFQ_SUBMISSIONS_ENABLED!=="true")return error("Online RFQ submission is being activated. Please request your quotation through WhatsApp.",503);
 const sales=process.env.RFQ_TO_EMAIL||process.env.CONTACT_TO_EMAIL;
 if(!rfqStoreConfigured()||!process.env.RESEND_API_KEY||!process.env.CONTACT_FROM_EMAIL||!sales)
  return error("Secure RFQ recording is temporarily unavailable. Please use WhatsApp to contact our commercial team.",503);
 const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"anonymous";
 const now=Date.now();const prev=counters.get(ip);
 if(prev&&prev.reset>now&&prev.count>=5)return error("Too many requests. Please try again later or contact our team by WhatsApp.",429);
 if(counters.size>3000)counters.clear();
 counters.set(ip,prev&&prev.reset>now?{reset:prev.reset,count:prev.count+1}:{reset:now+1800000,count:1});
 const form=await boundedFormData(request);
 if(!form)return error("Upload too large or invalid form. Maximum two documents, 8 MB combined.",413);
 if(clean(form.get("website"),200))return error("Invalid request.",400);
 const service=clean(form.get("service"),50);
 const name=clean(form.get("fullName"),120);
 const company=clean(form.get("company"),150);
 const email=clean(form.get("email"),180);
 const phone=clean(form.get("phone"),25);
 const quantity=clean(form.get("quantity"),20);
 const unit=clean(form.get("unit"),10);
 const location=clean(form.get("location"),120);
 const requiredDate=clean(form.get("requiredDate"),10);
 const description=clean(form.get("description"),3000);
 const technicalSpec=clean(form.get("technicalSpec"),180);
 const technicalDetail=clean(form.get("technicalDetail"),180);
 const submissionId=clean(form.get("submissionId"),40);
 if(!validRfqService(service)||name.length<2||company.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||
 !/^[+0-9 ()-]{7,25}$/.test(phone)||description.length<10||form.get("consent")!=="yes"||
 !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId))
  return error("Please complete the required RFQ fields.",400);
 if(quantity&&!/^\d{1,9}(\.\d{1,3})?$/.test(quantity))return error("Please enter a valid numeric quantity.",400);
 if(!["t","pcs","m2","m"].includes(unit))return error("Invalid measurement unit.",400);
 if(requiredDate&&!/^\d{4}-\d{2}-\d{2}$/.test(requiredDate))return error("Invalid delivery date.",400);
 const files=form.getAll("attachments").filter((x):x is File=>x instanceof File&&x.size>0);
 if(files.length>maxFiles||files.some(x=>x.size>maxFileSize)||
 files.reduce((sum,x)=>sum+x.size,0)>maxUploadTotal)return error("File limit exceeded: 2 files, max 5 MB each and 8 MB combined.",413);
 const documents:RfqDocument[]=[];
 const attachmentMetadata:RfqAttachmentMetadata[]=[];
 for(const [i,file] of files.entries()){
  const data=Buffer.from(await file.arrayBuffer());
  if(!validFile(file,data))return error("Unsupported file or invalid file format. Use PDF, DWG, DXF, XLSX or DOCX.",400);
  const verdict=await scanRfqAttachment(file,data);
  if(verdict==="unavailable")return error("Secure document scanning is temporarily unavailable. Please send your enquiry without files and contact Sales for a secure document channel.",503);
  if(verdict==="blocked")return error("A document did not pass the security scan. Please contact Sales for an approved submission method.",422);
  const safeName=file.name.replace(/[^a-zA-Z0-9._ -]/g,"_").slice(0,90);
  documents.push({filename:String(i+1)+"-"+safeName,bytes:data,sha256:rfqFileHash(data)});
  attachmentMetadata.push({filename:safeName,sizeBytes:file.size,sha256:rfqFileHash(data)});
 }
 const reference="HX-RFQ-"+new Date().toISOString().slice(0,10).replaceAll("-","")+"-"+randomBytes(6).toString("hex").toUpperCase();
 const serviceName=rfqServices.find(x=>x.value===service)?.label||"Steel Service";
 const note=[
  "HEXA STEEL® — RFQ RECEIVED",
  "",
  "Reference: "+reference,
  "Service: "+serviceName,
  "Company: "+company,
  "Contact: "+name,
  "Email: "+email,
  "Mobile: "+phone,
  "Estimated quantity: "+(quantity?quantity+" "+unit:"Not supplied"),
  "Location: "+(location||"Not supplied"),
  "Required delivery: "+(requiredDate||"Not specified"),
  "",
  "Service-specific detail 1: "+(technicalSpec||"Not supplied"),
  "Service-specific detail 2: "+(technicalDetail||"Not supplied"),
  "Scope and instructions:",
  description,
  "",
  "Technical files: "+files.length+" stored privately",
  "",
  "Your RFQ is now submitted for commercial review. A formal quotation or estimation number, where applicable, will be issued separately.",
  "For a follow-up, please quote the reference above.",
 ].join("\n");
 // Persist contact, scanned private documents and both notification jobs first.
 // No success is returned on a provider or database failure; Resend is handled
 // asynchronously by the private outbox worker, not this public request.
 const lead={
  schemaVersion:1 as const,event:"rfq.received" as const,
  reference,receivedAt:new Date().toISOString(),status:"Received" as const,source:"website" as const,
  serviceCode:service,serviceName,customer:{name,company,email,phone},
  project:{description,quantity,unit,location,requiredDate,technicalSpec,technicalDetail},
  attachments:attachmentMetadata,
 };
 let saved:{reference:string;replayed:boolean};
 try{
  saved=await persistRfq({idempotencyKey:submissionId,lead,documents,salesAddress:sales});
 }catch(e){
  if(e instanceof Error && e.message==="RFQ_IDEMPOTENCY_CONFLICT")
   return error("Your enquiry changed after a previous submission attempt. Please contact Sales before sending a new request.",409);
  console.error("RFQ durable intake failed; transaction not confirmed.");
  return error("Your request could not be securely recorded. Please retry with the same form or contact Sales using WhatsApp.",503);
 }
 // The optional R2 CRM webhook is best effort and cannot invalidate a stored RFQ.
 if(!saved.replayed){
  const handoff=await handoffRfqLead({...lead,reference:saved.reference});
  if(handoff==="failed")console.error("RFQ secondary CRM handoff unavailable. Reference: "+saved.reference);
 }
 return NextResponse.json({ok:true,reference:saved.reference,acknowledgementQueued:true},{headers:{"Cache-Control":"no-store"}});
}
