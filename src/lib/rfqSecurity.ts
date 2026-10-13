import {createHash, createHmac} from "node:crypto";

export type RfqAttachmentVerdict = "clean" | "blocked" | "unavailable";
export type RfqAttachmentMetadata = {filename:string; sizeBytes:number; sha256:string};
export type RfqLeadEvent = {
 schemaVersion:1; event:"rfq.received"; reference:string; receivedAt:string;
 status:"Received"; source:"website"; serviceCode:string; serviceName:string;
 customer:{name:string;company:string;email:string;phone:string};
 project:{description:string;quantity:string;unit:string;location:string;requiredDate:string;technicalSpec:string;technicalDetail:string};
 attachments:RfqAttachmentMetadata[];
};

/** The scanner must be an authorised private HTTPS service. No unscanned files are emailed. */
export function rfqFileScanningAvailable():boolean {
 if(!process.env.RFQ_FILE_SCAN_URL||!process.env.RFQ_FILE_SCAN_TOKEN)return false;
 try{
  const endpoint=new URL(process.env.RFQ_FILE_SCAN_URL);
  return endpoint.protocol==="https:"&&!endpoint.username&&!endpoint.password&&!!endpoint.hostname;
 }catch{return false;}
}
export function rfqFileHash(bytes:Buffer):string {
 return createHash("sha256").update(bytes).digest("hex");
}
export async function scanRfqAttachment(file:File,bytes:Buffer):Promise<RfqAttachmentVerdict> {
 if(!rfqFileScanningAvailable())return "unavailable";
 try{
  const endpoint=new URL(process.env.RFQ_FILE_SCAN_URL!);
  if(endpoint.protocol!=="https:")return "unavailable";
  const response=await fetch(endpoint,{
   method:"POST",cache:"no-store",signal:AbortSignal.timeout(12000),
   headers:{
    Authorization:"Bearer "+process.env.RFQ_FILE_SCAN_TOKEN,
    "Content-Type":"application/octet-stream",
    "X-RFQ-Filename":encodeURIComponent(file.name.replace(/[\\/]/g,"_").slice(0,100)),
    "X-RFQ-SHA256":rfqFileHash(bytes),
   },
   body:new Uint8Array(bytes),
  });
  if(!response.ok)return "unavailable";
  const body:unknown=await response.json();
  if(!body||typeof body!=="object"||!("clean" in body)||typeof body.clean!=="boolean")return "unavailable";
  return body.clean?"clean":"blocked";
 }catch{return "unavailable";}
}

/** Optional authenticated server-to-server handoff; email acceptance remains independent. */
export async function handoffRfqLead(lead:RfqLeadEvent):Promise<"accepted"|"skipped"|"failed"> {
 const destination=process.env.RFQ_LEAD_WEBHOOK_URL,secret=process.env.RFQ_LEAD_WEBHOOK_SECRET;
 if(!destination&&!secret)return "skipped";
 if(!destination||!secret)return "failed";
 try{
  const url=new URL(destination);
  if(url.protocol!=="https:")return "failed";
  const payload=JSON.stringify(lead);
  const signature=createHmac("sha256",secret).update(payload).digest("hex");
  const response=await fetch(url,{
   method:"POST",cache:"no-store",signal:AbortSignal.timeout(5000),
   headers:{"Content-Type":"application/json","X-HEXA-Event":"rfq.received","X-HEXA-RFQ-Reference":lead.reference,
     "X-HEXA-Signature":"sha256="+signature,"Idempotency-Key":lead.reference},
   body:payload,
  });
  return response.ok?"accepted":"failed";
 }catch{return "failed";}
}
