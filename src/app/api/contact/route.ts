import { NextResponse } from "next/server";
export const runtime = "nodejs";
const allowedTopics = new Set(["Structural Steel","Pre-Engineered Buildings","Project Management","Steel Services","Vendor Registration","General Enquiry"]);
function clean(value: FormDataEntryValue | null, limit: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0,limit);
}
export async function POST(request: Request){
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
    return NextResponse.json({error:"Enquiry submission is not enabled yet. Please try again after launch."},{status:503});
  }
  const data = await request.formData();
  if (clean(data.get("website"),200)) return NextResponse.json({ok:true});
  const fullName=clean(data.get("fullName"),120);
  const email=clean(data.get("email"),250);
  const organization=clean(data.get("organization"),160);
  const topic=clean(data.get("topic"),100);
  const message=clean(data.get("message"),5000);
  if (!fullName || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !allowedTopics.has(topic) || message.length<10) {
    return NextResponse.json({error:"Please check the required fields."},{status:400});
  }
  // Before production launch, add distributed rate limits, verification challenge, privacy consent and audited handling.
  const response=await fetch("https://api.resend.com/emails",{
    method:"POST",
    headers:{"Authorization":"Bearer "+process.env.RESEND_API_KEY,"Content-Type":"application/json"},
    body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:[process.env.CONTACT_TO_EMAIL],reply_to:email,subject:"Hexa Steel enquiry: "+topic,
      text:["Name: "+fullName,"Email: "+email,"Company: "+organization,"Enquiry: "+topic,"Message:",message].join("\n")}),
    cache:"no-store"
  });
  if(!response.ok) return NextResponse.json({error:"Unable to deliver your message at present."},{status:502});
  return NextResponse.redirect(new URL("/contact?submitted=1",request.url),303);
}
