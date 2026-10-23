import {NextResponse} from "next/server";
import {contactMailConfigured, sendContactEnquiry} from "@/lib/contactMail";

export const runtime = "nodejs";
const topics = new Set(["Structural Steel","Pre-Engineered Buildings","Project Management","Steel Services","Vendor Registration","General Enquiry"]);
const MAX_BODY = 24_000;
const requestWindow = new Map<string,{expires:number,count:number}>();

function error(message:string,status:number){
 return NextResponse.json({error:message},{status,headers:{"Cache-Control":"no-store"}});
}
function clean(value:FormDataEntryValue|null,limit:number){
 return typeof value==="string"?value.trim().slice(0,limit).replace(/[\u0000-\u001f\u007f]/g," ").trim():"";
}
function messageText(value:FormDataEntryValue|null){
 return typeof value==="string"?value.trim().slice(0,5001).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,""):"";
}
async function boundedFormData(request:Request):Promise<FormData|null>{
 const type=request.headers.get("content-type")||"";
 if(!type.toLowerCase().startsWith("multipart/form-data;"))return null;
 const indicated=Number(request.headers.get("content-length")||"0");
 if(!Number.isFinite(indicated)||indicated<0||indicated>MAX_BODY||!request.body)return null;
 const reader=request.body.getReader();
 const pieces:Uint8Array[]=[];
 let total=0;
 try{
  while(true){
   const {done,value}=await reader.read();
   if(done)break;
   total+=value.byteLength;
   if(total>MAX_BODY){await reader.cancel();return null;}
   pieces.push(value);
  }
  const body=new Uint8Array(total);
  let offset=0;
  for(const piece of pieces){body.set(piece,offset);offset+=piece.byteLength;}
  return await new Response(body,{headers:{"content-type":type}}).formData();
 }catch{return null;}
}
function rateLimited(req:Request):boolean{
 // Per-process backstop only. The verified Turnstile token is the primary abuse control.
 const ip=req.headers.get("cf-connecting-ip")||req.headers.get("x-real-ip");
 if(!ip)return false; // Avoid a site-wide shared throttle when a trusted client address is unavailable.
 const now=Date.now();
 if(requestWindow.size>2000)requestWindow.clear();
 const previous=requestWindow.get(ip);
 const next=previous&&previous.expires>now
  ?{expires:previous.expires,count:previous.count+1}
  :{expires:now+900_000,count:1};
 requestWindow.set(ip,next);
 return next.count>5;
}

export async function POST(request:Request){
 const siteOrigin=new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://hexasteel.sa").origin;
 const permittedOrigins=new Set([siteOrigin]);
 if(siteOrigin==="https://hexasteel.sa")permittedOrigins.add("https://www.hexasteel.sa");
 if(!permittedOrigins.has(request.headers.get("origin")||""))return error("Submission origin not accepted.",403);
 if(!contactMailConfigured()||!process.env.CONTACT_TURNSTILE_SECRET_KEY||!process.env.CONTACT_TURNSTILE_SITE_KEY)
  return error("Online enquiries are temporarily unavailable. Please email inquiries@hexasteel.sa.",503);
 if(rateLimited(request))return error("Too many submissions. Please try again later.",429);
 const form=await boundedFormData(request);
 if(!form)return error("Invalid form or request too large.",413);
 if(clean(form.get("website"),200))return error("Invalid submission.",400);
 const fullName=clean(form.get("fullName"),120);
 const email=clean(form.get("email"),250);
 const organization=clean(form.get("organization"),160);
 const topic=clean(form.get("topic"),100);
 const message=messageText(form.get("message"));
 const token=clean(form.get("cf-turnstile-response"),3000);
 if(fullName.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!topics.has(topic)||
  message.length<10||message.length>5000||form.get("consent")!=="yes"||!token)
  return error("Please check the required fields, consent and verification.",400);

 try{
  const verification=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
   method:"POST",
   body:new URLSearchParams({secret:process.env.CONTACT_TURNSTILE_SECRET_KEY!,response:token}),
   cache:"no-store",
   signal:AbortSignal.timeout(8000),
  });
  if(!verification.ok)return error("Unable to verify the submission. Please retry.",502);
  const data=await verification.json() as {success?:boolean;hostname?:string};
  if(!data.success||!["hexasteel.sa","www.hexasteel.sa"].includes(data.hostname||""))
   return error("Verification failed. Refresh and try again.",403);
  await sendContactEnquiry({fullName,email,organization,topic,message});
  return NextResponse.redirect(
   new URL("/contact/received",process.env.NEXT_PUBLIC_SITE_URL||"https://hexasteel.sa"),303
  );
 }catch{
  return error("We could not confirm email acceptance. Please contact inquiries@hexasteel.sa.",502);
 }
}
