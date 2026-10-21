"use client";
import {useState, type FormEvent} from "react";
import Script from "next/script";

export function ContactEnquiryForm({siteKey}:{siteKey:string}){
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(busy)return;
  const form=event.currentTarget;
  setBusy(true);setError("");
  try{
   const response=await fetch("/api/contact",{method:"POST",body:new FormData(form),credentials:"same-origin",redirect:"follow"});
   if(response.ok&&response.redirected&&new URL(response.url).pathname==="/contact/received"){
    window.location.assign(response.url);return;
   }
   const body=await response.json().catch(()=>({error:"We could not confirm your submission."})) as {error?:string};
   setError(body.error||"We could not confirm your submission. Please contact us by phone or WhatsApp.");
  }catch{
   setError("Connection failed. Please contact our team by phone or WhatsApp.");
  }finally{
   setBusy(false);
  }
 }
 return <>
  <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
  <form action="/api/contact" method="post" className="form-grid" onSubmit={submit}>
   <div className="field"><label htmlFor="fullName">Full name *</label><input id="fullName" name="fullName" required minLength={2} maxLength={120} autoComplete="name"/></div>
   <div className="field"><label htmlFor="email">Work email *</label><input id="email" name="email" type="email" required maxLength={250} autoComplete="email"/></div>
   <div className="field"><label htmlFor="organization">Company</label><input id="organization" name="organization" maxLength={160} autoComplete="organization"/></div>
   <div className="field"><label htmlFor="topic">Enquiry type *</label><select id="topic" name="topic" required defaultValue=""><option value="" disabled>Select a category</option><option>Structural Steel</option><option>Pre-Engineered Buildings</option><option>Project Management</option><option>Steel Services</option><option>Vendor Registration</option><option>General Enquiry</option></select></div>
   <div className="field full"><label htmlFor="message">Message *</label><textarea id="message" name="message" required minLength={10} maxLength={5000}/></div>
   <div hidden aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>
   <div className="field full"><label className="hexa-feedback-consent"><input type="checkbox" name="consent" value="yes" required/> I agree that HEXA Steel® may use my details to respond to this enquiry.</label></div>
   <div className="field full"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" aria-label="Bot verification"/></div>
   <div className="field full"><button className="button dark" type="submit" disabled={busy}>{busy?"Sending…":"Submit enquiry"}</button><p className="form-note">Your enquiry will be sent privately to our commercial team. Do not include confidential drawings or credentials.</p></div>
   {error&&<div className="field full" role="alert"><p className="hexa-form-error">{error}</p></div>}
  </form>
 </>;
}
