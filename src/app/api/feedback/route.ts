import {NextResponse} from "next/server";
export const runtime="nodejs";
const categories=new Set(["Project Delivery","Product Quality","Communication","Service Experience","Other"]);
const destination="customer.feedback@hexasteel.sa";
function text(value:FormDataEntryValue|null,max:number){return typeof value==="string"?value.trim().slice(0,max):"";}
function jsonError(msg:string,status:number){return NextResponse.json({error:msg},{status});}
export async function POST(req:Request){
 if(!process.env.TURNSTILE_SECRET_KEY||!process.env.RESEND_API_KEY||!process.env.CONTACT_FROM_EMAIL)return jsonError("Online feedback is temporarily unavailable.",503);
 const origin=req.headers.get("origin");
 if(origin && new URL(origin).hostname!=="hexasteel.sa")return jsonError("Request origin not allowed.",403);
 const size=Number(req.headers.get("content-length")||0);
 if(size>24000)return jsonError("Submission exceeds the allowed size.",413);
 let form:FormData;try{form=await req.formData();}catch{return jsonError("Invalid submission.",400);}
 if(text(form.get("website"),200))return NextResponse.redirect(new URL("/feedback/received",req.url),303);
 const name=text(form.get("fullName"),120),email=text(form.get("email"),250);
 const organization=text(form.get("organization"),160);
 const category=text(form.get("category"),100),message=text(form.get("message"),3000);
 const rating=Number(text(form.get("rating"),2));
 const responseToken=text(form.get("cf-turnstile-response"),3000);
 if(!name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||!categories.has(category)||message.length<20||!Number.isInteger(rating)||rating<1||rating>5||form.get("privacyConsent")!=="yes"||!responseToken)return jsonError("Please check all required fields and verification.",400);
 try{
  const verification=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:responseToken}),cache:"no-store"});
  if(!verification.ok)return jsonError("Could not verify your submission.",502);
  const result=await verification.json() as {success?:boolean,hostname?:string};
  if(!result.success||result.hostname!=="hexasteel.sa")return jsonError("Verification failed. Refresh and try again.",403);
  const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+process.env.RESEND_API_KEY,"Content-Type":"application/json"},cache:"no-store",body:JSON.stringify({
   from:process.env.CONTACT_FROM_EMAIL,to:[destination],reply_to:email,
   subject:"HEXA Steel customer feedback — "+category+" — "+rating+"/5",
   text:["CUSTOMER FEEDBACK — private","Name: "+name,"Email: "+email,"Company: "+organization,"Category: "+category,"Rating: "+rating+"/5","Message:",message].join("\n")
  })});
  if(!sent.ok)return jsonError("Unable to deliver feedback at this time.",502);
  return NextResponse.redirect(new URL("/feedback/received",req.url),303);
 }catch{return jsonError("Feedback service is temporarily unavailable.",502);}
}
