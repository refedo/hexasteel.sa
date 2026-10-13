import {NextResponse} from "next/server";
import {randomBytes} from "node:crypto";
import {maxFileSize,maxFiles,maxUploadTotal,rfqServices,validRfqService} from "@/lib/rfq";
export const runtime="nodejs";
export const maxDuration=25;
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
 const secret=process.env.RESEND_API_KEY;
 const from=process.env.CONTACT_FROM_EMAIL;
 const sales=process.env.RFQ_TO_EMAIL||process.env.CONTACT_TO_EMAIL;
 if(!secret||!from||!sales)return error("Online submission is temporarily unavailable. Please use WhatsApp to contact our commercial team.",503);
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
 if(!validRfqService(service)||name.length<2||company.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||
 !/^[+0-9 ()-]{7,25}$/.test(phone)||description.length<10||form.get("consent")!=="yes")
  return error("Please complete the required RFQ fields.",400);
 if(quantity&&!/^\d{1,9}(\.\d{1,3})?$/.test(quantity))return error("Please enter a valid numeric quantity.",400);
 if(!["t","pcs","m2","m"].includes(unit))return error("Invalid measurement unit.",400);
 if(requiredDate&&!/^\d{4}-\d{2}-\d{2}$/.test(requiredDate))return error("Invalid delivery date.",400);
 const files=form.getAll("attachments").filter((x):x is File=>x instanceof File&&x.size>0);
 if(files.length>maxFiles||files.some(x=>x.size>maxFileSize)||
 files.reduce((sum,x)=>sum+x.size,0)>maxUploadTotal)return error("File limit exceeded: 2 files, max 5 MB each and 8 MB combined.",413);
 const attachments:{filename:string;content:string}[]=[];
 for(const [i,file] of files.entries()){
  const data=Buffer.from(await file.arrayBuffer());
  if(!validFile(file,data))return error("Unsupported file or invalid file format. Use PDF, DWG, DXF, XLSX or DOCX.",400);
  const safeName=file.name.replace(/[^a-zA-Z0-9._ -]/g,"_").slice(0,90);
  attachments.push({filename:String(i+1)+"-"+safeName,content:data.toString("base64")});
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
  "Scope and instructions:",
  description,
  "",
  "Technical files: "+files.length+" attached",
  "",
  "Your RFQ is now submitted for commercial review. A formal quotation or estimation number, where applicable, will be issued separately.",
  "For a follow-up, please quote the reference above.",
 ].join("\n");
 // One transactional email request: customer is the visible recipient, the private sales inbox is BCC.
 // The same reference and attachments reach both parties; no documents enter the public Sanity CMS.
 let sent:Response;
 try{
  sent=await fetch("https://api.resend.com/emails",{
   method:"POST",cache:"no-store",
   headers:{Authorization:"Bearer "+secret,"Content-Type":"application/json"},
   body:JSON.stringify({from,to:[email],bcc:[sales],reply_to:sales,subject:"HEXA Steel® | RFQ received | "+reference,text:note,...(attachments.length?{attachments}:{})})
  });
 }catch{return error("Email delivery could not be confirmed. Please use WhatsApp or retry.",502);}
 if(!sent.ok)return error("We could not accept the request at this time. Please contact our sales team via WhatsApp.",502);
 return NextResponse.json({ok:true,reference},{headers:{"Cache-Control":"no-store"}});
}
