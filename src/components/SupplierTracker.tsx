
"use client";
import {useState,type FormEvent} from "react";
import Script from "next/script";
type Tracking={reference:string;status:string;publicMessage:string|null;updatedAt:string};
export function SupplierTracker({siteKey}:{siteKey:string}){
 const [reference,setReference]=useState("");const[email,setEmail]=useState("");const[code,setCode]=useState("");
 const [sent,setSent]=useState(false);const[tracking,setTracking]=useState<Tracking|null>(null);
 const[response,setResponse]=useState("");const[message,setMessage]=useState("");const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function submit(action:"request"|"verify"|"resubmit",e:FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");setMessage("");setBusy(true);
  const data=new FormData(e.currentTarget);
  data.set("reference",reference.trim().toUpperCase());data.set("email",email.trim());data.set("action",action);
  data.set("code",code.trim());
  if(action==="resubmit") data.set("response",response);
  try {
   const res=await fetch("/api/supplier-applications/track",{method:"POST",body:data,cache:"no-store"});
   const json=await res.json();if(!res.ok)throw new Error(json.error||"Unable to check application.");
   if(action==="request"){setSent(true);setMessage("If your details match an application, a verification code has been sent.");}
   if(action==="verify"){setTracking(json.application);}
   if(action==="resubmit"){setTracking(json.application);setMessage("Your response was submitted for review.");}
  } catch(err){setError(err instanceof Error?err.message:"Request failed.");} finally{setBusy(false);}
 }
 return <div className="form-shell"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><h2>Application status</h2>
 <form className="form-grid" onSubmit={e=>submit("request",e)}>
  <div className="field full"><label htmlFor="trackingRef">Reference number *</label><input id="trackingRef" value={reference} onChange={e=>setReference(e.target.value)} required maxLength={40} placeholder="HEX-SUP-2026-…"/></div>
  <div className="field full"><label htmlFor="trackingEmail">Registered email *</label><input id="trackingEmail" type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={250}/></div>
  <div className="field full"><div className="cf-turnstile" data-sitekey={siteKey}/></div>
  <div className="field full"><button className="button dark" type="submit" disabled={busy}>Send verification code</button></div>
 </form>
 {sent&&<form className="form-grid supplier-track-extra" onSubmit={e=>submit("verify",e)}><div className="field full"><label htmlFor="trackingCode">Verification code *</label><input id="trackingCode" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" required maxLength={6} value={code} onChange={e=>setCode(e.target.value)}/></div><div className="field full"><button className="button dark" disabled={busy}>View my application</button></div></form>}
 {tracking&&<div className="supplier-status" role="status"><p className="eyebrow">CURRENT STATUS</p><h3>{tracking.status.replaceAll("_"," ")}</h3><p>{tracking.publicMessage||"Your application is progressing through our Supply Chain review."}</p><small>Last updated: {new Date(tracking.updatedAt).toLocaleDateString("en-GB")}</small></div>}
 {tracking?.status==="UPDATE_REQUESTED"&&<form className="form-grid supplier-track-extra" onSubmit={e=>submit("resubmit",e)}>
  <div className="field full"><label htmlFor="supplierResponse">Your clarification *</label><textarea id="supplierResponse" required value={response} onChange={e=>setResponse(e.target.value)} maxLength={1800}/></div>
  <div className="field full"><label htmlFor="resubmitDocs">Updated supporting documents (PDF, up to 3, 2 MB each)</label><input id="resubmitDocs" type="file" name="documents" accept=".pdf,application/pdf" multiple/></div>
  <div className="field full"><button className="button dark" disabled={busy}>Resubmit information</button></div>
 </form>}
 {message&&<p role="status" className="form-note">{message}</p>}
 {error&&<p role="alert" className="hexa-form-error">{error}</p>}
 </div>;
}
