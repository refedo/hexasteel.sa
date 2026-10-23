"use client";
import {supplierProductCategories as categories} from "@/lib/supplierCategories";
import {useState,type FormEvent} from "react";
import Script from "next/script";
type Editable={scope:string;category:string|null;products:{name:string;origin:string;category?:string}[];services:string|null;capabilities:string|null};
type Tracking={reference:string;status:string;publicMessage:string|null;updatedAt:string;editable?:Editable};
export function SupplierTracker({siteKey}:{siteKey:string}){
 const [reference,setReference]=useState("");const[email,setEmail]=useState("");const[code,setCode]=useState("");
 const [sent,setSent]=useState(false);const[tracking,setTracking]=useState<Tracking|null>(null);
 const[response,setResponse]=useState("");
 const [scope,setScope]=useState("PRODUCTS");
 const [category,setCategory]=useState("");
 const [products,setProducts]=useState<{name:string;origin:string;category?:string}[]>([{name:"",origin:"",category:categories[0]}]);
 const [services,setServices]=useState("");
 const [capabilities,setCapabilities]=useState("");
 const[message,setMessage]=useState("");const[busy,setBusy]=useState(false);const[error,setError]=useState("");
 async function submit(action:"request"|"verify"|"resubmit",e:FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");setMessage("");setBusy(true);
  const data=new FormData(e.currentTarget);
  data.set("reference",reference.trim().toUpperCase());data.set("email",email.trim());data.set("action",action);
  data.set("code",code.trim());
  if(action==="resubmit"){
   data.set("response",response);data.set("scope",scope);data.set("category",category);
   data.set("products",JSON.stringify(scope==="SERVICES"?[]:products.map(p=>({...p,category:p.category||category||categories[0]}))));
   data.set("services",services);data.set("capabilities",capabilities);
  }
  try {
   const res=await fetch("/api/supplier-applications/track",{method:"POST",body:data,cache:"no-store"});
   const json=await res.json();if(!res.ok)throw new Error(json.error||"Unable to check application.");
   if(action==="request"){setSent(true);setMessage("If your details match an application, a verification code has been sent.");}
   if(action==="verify"){
    const a=json.application as Tracking;setTracking(a);
    if(a.editable){
     setScope(a.editable.scope);setCategory(a.editable.category||"");
     setProducts(a.editable.products?.length?a.editable.products:[{name:"",origin:"",category:categories[0]}]);
     setServices(a.editable.services||"");setCapabilities(a.editable.capabilities||"");
    }
   }
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
  <div className="field full"><label htmlFor="correctedScope">Supplier scope *</label><select id="correctedScope" value={scope} onChange={e=>setScope(e.target.value)}><option value="PRODUCTS">Products</option><option value="SERVICES">Services</option><option value="BOTH">Products and services</option></select></div>
  {scope!=="SERVICES"&&<>
   <div className="field full"><label htmlFor="correctedCategory">Product category *</label><input id="correctedCategory" value={category} onChange={e=>setCategory(e.target.value)} maxLength={120} required/></div>
   <div className="field full"><label>Specific products and country of origin</label>
    {products.map((p,i)=><div key={i} className="supplier-product">
     <label>Category<select aria-label={"Corrected category of product "+(i+1)} value={p.category||category||categories[0]} onChange={e=>setProducts(v=>v.map((x,j)=>j===i?{...x,category:e.target.value}:x))}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
     <label>Product {i+1}<input aria-label={"Corrected product "+(i+1)} value={p.name} onChange={e=>setProducts(v=>v.map((x,j)=>j===i?{...x,name:e.target.value}:x))} maxLength={160} required/></label>
     <label>Country of origin<input aria-label={"Corrected country of origin "+(i+1)} value={p.origin} onChange={e=>setProducts(v=>v.map((x,j)=>j===i?{...x,origin:e.target.value}:x))} maxLength={100} required/></label>
     {i>0&&<button type="button" onClick={()=>setProducts(v=>v.filter((_,j)=>i!==j))}>Remove</button>}
    </div>)}
    {products.length<12&&<button type="button" className="supplier-add" onClick={()=>setProducts(v=>[...v,{name:"",origin:"",category:categories[0]}])}>Add product</button>}
   </div>
  </>}
  {scope!=="PRODUCTS"&&<div className="field full"><label htmlFor="correctedServices">Professional services offered *</label><textarea id="correctedServices" value={services} onChange={e=>setServices(e.target.value)} maxLength={1800} required/></div>}
  <div className="field full"><label htmlFor="correctedCapabilities">Capabilities / specifications</label><textarea id="correctedCapabilities" value={capabilities} onChange={e=>setCapabilities(e.target.value)} maxLength={1800}/></div>
  <div className="field full"><label htmlFor="supplierResponse">Your clarification *</label><textarea id="supplierResponse" required value={response} onChange={e=>setResponse(e.target.value)} maxLength={1800}/></div>
  <div className="field full"><label htmlFor="resubmitDocs">Updated supporting documents (PDF, up to 3, 2 MB each)</label><input id="resubmitDocs" type="file" name="documents" accept=".pdf,application/pdf" multiple/></div>
  <div className="field full"><button className="button dark" disabled={busy}>Resubmit information</button></div>
 </form>}
 {message&&<p role="status" className="form-note">{message}</p>}
 {error&&<p role="alert" className="hexa-form-error">{error}</p>}
 </div>;
}
