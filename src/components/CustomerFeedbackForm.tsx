"use client";
import {useState,type FormEvent} from "react";
import Link from "next/link";
import Script from "next/script";
export function CustomerFeedbackForm({siteKey}:{siteKey:string}){
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy)return;
  const form=event.currentTarget;
  setBusy(true);setError("");
  try{
   const response=await fetch("/api/feedback",{method:"POST",body:new FormData(form),credentials:"same-origin",redirect:"follow"});
   if(response.ok&&response.redirected&&new URL(response.url).pathname==="/feedback/received"){
    window.location.assign(response.url);return;
   }
   const result=await response.json().catch(()=>({error:"Your feedback could not be sent. Please try again."})) as {error?:string};
   setError(result.error||"Delivery could not be confirmed. Please try again.");
  }catch{setError("Connection failed. Please try again or email our customer feedback team.");}
  finally{setBusy(false);}
 }
 return <>
  <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
  <form action="/api/feedback" method="post" className="form-grid" onSubmit={submit}>
   <div className="field"><label htmlFor="feedback-name">Name *</label><input id="feedback-name" name="fullName" maxLength={120} required autoComplete="name"/></div>
   <div className="field"><label htmlFor="feedback-email">Email *</label><input id="feedback-email" name="email" type="email" required maxLength={250} autoComplete="email"/></div>
   <div className="field"><label htmlFor="feedback-company">Company (optional)</label><input id="feedback-company" name="organization" maxLength={160}/></div>
   <div className="field"><label htmlFor="feedback-category">Feedback category *</label><select id="feedback-category" name="category" required defaultValue=""><option value="" disabled>Choose a category</option><option>Project Delivery</option><option>Product Quality</option><option>Communication</option><option>Service Experience</option><option>Other</option></select></div>
   <div className="field full"><label htmlFor="feedback-rating">Overall experience *</label><select id="feedback-rating" name="rating" required defaultValue=""><option value="" disabled>Select a rating</option>{[5,4,3,2,1].map(x=><option key={x} value={x}>{x} — {x===5?"Excellent":x===4?"Good":x===3?"Acceptable":x===2?"Needs improvement":"Unsatisfactory"}</option>)}</select></div>
   <div className="field full"><label htmlFor="feedback-message">Your feedback *</label><textarea id="feedback-message" name="message" required minLength={20} maxLength={3000} placeholder="What went well, and what could HEXA Steel® improve?"/></div>
   <div hidden aria-hidden="true"><label htmlFor="feedback-website">Website</label><input id="feedback-website" name="website" tabIndex={-1} autoComplete="off"/></div>
   <div className="field full"><label className="hexa-feedback-consent"><input name="privacyConsent" type="checkbox" value="yes" required/> I agree that HEXA Steel® may process the information I provide to review and respond to my feedback. Read the <Link href="/privacy">Privacy Policy</Link>.</label></div>
   <div className="field full"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" aria-label="Bot verification"/></div>
   <div className="field full"><button type="submit" className="button dark" disabled={busy}>{busy?"Submitting…":"Submit Feedback"}</button><p className="form-note">Feedback is sent privately to customer.feedback@hexasteel.sa and is not published publicly.</p></div>
   {error&&<div className="field full" role="alert"><p className="hexa-form-error">{error}</p></div>}
  </form>
 </>;
}
