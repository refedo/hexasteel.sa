"use client";
import {useState, type FormEvent} from "react";
import type {ContactFormSettings} from "@/lib/contactFormSettings";
import Script from "next/script";

export function ContactEnquiryForm({siteKey,settings}:{siteKey:string;settings:ContactFormSettings}){
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
   (window as Window&{turnstile?:{reset:()=>void}}).turnstile?.reset();
   setBusy(false);
  }
 }
 return <>
  <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
  <form action="/api/contact" method="post" className="form-grid" onSubmit={submit}>
   <div className="field"><label htmlFor="fullName">{settings.nameLabel} *</label><input id="fullName" placeholder={settings.namePlaceholder} name="fullName" required minLength={2} maxLength={120} autoComplete="name"/></div>
   <div className="field"><label htmlFor="email">{settings.emailLabel} *</label><input id="email" placeholder={settings.emailPlaceholder} name="email" type="email" required maxLength={250} autoComplete="email"/></div>
   <div className="field"><label htmlFor="organization">{settings.companyLabel}</label><input id="organization" placeholder={settings.companyPlaceholder} name="organization" maxLength={160} autoComplete="organization"/></div>
   <div className="field"><label htmlFor="topic">{settings.topicLabel} *</label><select id="topic" name="topic" required defaultValue=""><option value="" disabled>{settings.topicPlaceholder}</option>{settings.topics.map(topic=><option key={topic}>{topic}</option>)}</select></div>
   <div className="field full"><label htmlFor="message">{settings.messageLabel} *</label><textarea id="message" placeholder={settings.messagePlaceholder} name="message" required minLength={10} maxLength={5000}/></div>
   <div hidden aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>
   <div className="field full"><label className="hexa-feedback-consent"><input type="checkbox" name="consent" value="yes" required/> {settings.consentLabel}</label></div>
   <div className="field full"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" aria-label="Bot verification"/></div>
   <div className="field full"><button className="button dark" type="submit" disabled={busy}>{busy?settings.sendingLabel:settings.submitLabel}</button><p className="form-note">{settings.privacyNote}</p></div>
   {error&&<div className="field full" role="alert"><p className="hexa-form-error">{error}</p></div>}
  </form>
 </>;
}
