import nodemailer from "nodemailer";

const destination = "inquiries@hexasteel.sa";

function resendReady():boolean{
 return Boolean(process.env.CONTACT_RESEND_API_KEY&&process.env.CONTACT_RESEND_FROM_EMAIL);
}
function smtpReady():boolean{
 const port = Number(process.env.SITEGROUND_SMTP_PORT || "465");
 return Boolean(
  process.env.CONTACT_SMTP_EGRESS_VERIFIED === "true" &&
  process.env.SITEGROUND_SMTP_HOST &&
  process.env.SITEGROUND_SMTP_USER &&
  process.env.SITEGROUND_SMTP_PASSWORD &&
  [465,587].includes(port)
 );
}

/** A working SiteGround inbox is the destination, not necessarily the outbound provider.
 * DigitalOcean blocks outbound SMTP ports by default, so prefer the HTTPS email API.
 */
export function contactMailConfigured():boolean{
 return resendReady() || smtpReady();
}

type Enquiry={
 fullName:string;
 email:string;
 organization:string;
 topic:string;
 message:string;
};

function mailBody(input:Enquiry):string{
 return [
  "New website enquiry — HEXA Steel®",
  "",
  "Name: "+input.fullName,
  "Email: "+input.email,
  "Company: "+(input.organization||"Not provided"),
  "Topic: "+input.topic,
  "",
  "Message:",
  input.message,
 ].join("\n");
}

async function sendThroughResend(input:Enquiry):Promise<void>{
 const response=await fetch("https://api.resend.com/emails",{
  method:"POST",
  headers:{
   Authorization:"Bearer "+process.env.CONTACT_RESEND_API_KEY!,
   "Content-Type":"application/json",
  },
  cache:"no-store",
  signal:AbortSignal.timeout(15_000),
  body:JSON.stringify({
   from:process.env.CONTACT_RESEND_FROM_EMAIL!,
   to:[destination],
   reply_to:input.email,
   subject:"HEXA Steel® website enquiry — "+input.topic,
   text:mailBody(input),
  }),
 });
 if(!response.ok)throw new Error("Email API did not accept contact enquiry.");
}

async function sendThroughSiteGroundSmtp(input:Enquiry):Promise<void>{
 const host=process.env.SITEGROUND_SMTP_HOST!;
 const port=Number(process.env.SITEGROUND_SMTP_PORT||"465");
 const user=process.env.SITEGROUND_SMTP_USER!;
 const password=process.env.SITEGROUND_SMTP_PASSWORD!;
 const transporter=nodemailer.createTransport({
  host,
  port,
  secure:port===465,
  requireTLS:port===587,
  auth:{user,pass:password},
  tls:{minVersion:"TLSv1.2",rejectUnauthorized:true},
  connectionTimeout:12_000,
  greetingTimeout:12_000,
  socketTimeout:20_000,
  disableFileAccess:true,
  disableUrlAccess:true,
 });
 const receipt=await transporter.sendMail({
  from:{name:"HEXA Steel® Website",address:user},
  to:destination,
  replyTo:{name:input.fullName,address:input.email},
  subject:"HEXA Steel® website enquiry — "+input.topic,
  text:mailBody(input),
 });
 if(!receipt.accepted.some(value=>(typeof value==="string"?value:value.address).toLowerCase()===destination)){
  throw new Error("SMTP relay did not accept the enquiry recipient.");
 }
}

export async function sendContactEnquiry(input:Enquiry):Promise<void>{
 if(resendReady())return sendThroughResend(input);
 if(smtpReady())return sendThroughSiteGroundSmtp(input);
 throw new Error("Contact email provider is not configured.");
}
