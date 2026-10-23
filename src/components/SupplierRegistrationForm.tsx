
"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import Script from "next/script";
type Product = {name:string;origin:string;category:string};
import {supplierProductCategories as categories} from '@/lib/supplierCategories';
export function SupplierRegistrationForm({siteKey}:{siteKey:string}){
 const [products,setProducts]=useState<Product[]>([{name:"",origin:"",category:categories[0]}]);
 const [scope,setScope]=useState("PRODUCTS");
 const [pending,setPending]=useState(false);
 const [error,setError]=useState("");
 const [reference,setReference]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");
  if(scope!=="SERVICES" && products.some(p=>!p.name.trim()||!p.origin.trim())){setError("Give each product a name and country of origin.");return;}
  const data=new FormData(e.currentTarget);
  data.set("products",JSON.stringify(scope==="SERVICES"?[]:products.map(p=>({name:p.name.trim(),origin:p.origin.trim(),category:p.category}))));
  data.set("scope",scope);
  setPending(true);
  try{
   const response=await fetch("/api/supplier-applications",{method:"POST",body:data,cache:"no-store"});
   const result=await response.json();
   if(!response.ok) throw new Error(result.error||"Unable to submit your application.");
   setReference(result.reference);
  }catch(err){setError(err instanceof Error?err.message:"Submission failed.");}
  finally{setPending(false);}
 }
 if(reference) return <div className="form-shell" role="status"><p className="eyebrow">APPLICATION RECEIVED</p><h2>Thank you for applying.</h2><p>Your application reference is:</p><p className="supplier-reference">{reference}</p><p>Keep this reference. We will use your registered email address for status verification.</p><Link className="button dark" href="/suppliers/track">Track application</Link></div>;
 return <div className="form-shell"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><p className="eyebrow">COMPANY APPLICATION</p><h2>Supplier registration form</h2>
 <form onSubmit={submit} className="form-grid" encType="multipart/form-data">
  <div className="field full"><label htmlFor="supplierCompany">Legal company name *</label><input name="legalName" id="supplierCompany" maxLength={200} required autoComplete="organization"/></div>
  <div className="field"><label htmlFor="supplierReg">Commercial registration / license *</label><input name="registrationNumber" id="supplierReg" maxLength={100} required/></div>
  <div className="field"><label htmlFor="supplierCountry">Country of registration *</label><input name="registrationCountry" id="supplierCountry" maxLength={100} required/></div>
  <div className="field"><label htmlFor="supplierContact">Contact person *</label><input name="contactName" id="supplierContact" maxLength={120} required autoComplete="name"/></div>
  <div className="field"><label htmlFor="supplierEmail">Business email *</label><input name="email" id="supplierEmail" type="email" maxLength={250} required autoComplete="email"/></div>
  <div className="field"><label htmlFor="supplierPhone">Telephone *</label><input name="phone" id="supplierPhone" maxLength={35} required autoComplete="tel"/></div>
  <div className="field"><label htmlFor="supplierWebsite">Website (optional)</label><input name="companyWebsite" id="supplierWebsite" type="url" maxLength={250} placeholder="https://"/></div>
  <div className="field"><label htmlFor="supplierType">Relationship type *</label><select name="supplierType" id="supplierType" required><option>Manufacturer</option><option>Distributor</option><option>Authorized Agent</option><option>Service Provider</option><option>Subcontractor</option></select></div>
  <div className="field"><label htmlFor="supplierScope">Supply interest *</label><select id="supplierScope" value={scope} onChange={e=>setScope(e.target.value)}><option value="PRODUCTS">Products</option><option value="SERVICES">Services</option><option value="BOTH">Products and services</option></select></div>
  {scope!=="SERVICES" && <div className="field full">
   <label htmlFor="supplierCategory">Primary product category *</label><select name="category" id="supplierCategory" required>{categories.map(c=><option key={c}>{c}</option>)}</select>
   <p className="form-note">List each specific product and its own country of origin.</p>
   {products.map((p,i)=><div className="supplier-product" key={i}>
    <label>Category<select aria-label={"Category of product "+(i+1)} value={p.category} onChange={e=>setProducts(v=>v.map((item,j)=>j===i?{...item,category:e.target.value}:item))}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
    <label>Product {i+1}<input aria-label={"Product "+(i+1)} maxLength={160} required value={p.name} onChange={e=>setProducts(v=>v.map((item,j)=>j===i?{...item,name:e.target.value}:item))} placeholder="e.g. S355 steel plates"/></label>
    <label>Country of origin<input aria-label={"Origin of product "+(i+1)} maxLength={100} required value={p.origin} onChange={e=>setProducts(v=>v.map((item,j)=>j===i?{...item,origin:e.target.value}:item))} placeholder="Manufacturing origin"/></label>
    {i>0&&<button type="button" onClick={()=>setProducts(v=>v.filter((_,j)=>j!==i))}>Remove</button>}
   </div>)}
   {products.length<12&&<button type="button" className="supplier-add" onClick={()=>setProducts(v=>[...v,{name:"",origin:"",category:categories[0]}])}>Add another product</button>}
  </div>}
  {scope!=="PRODUCTS"&&<div className="field full"><label htmlFor="supplierServices">Specific services offered *</label><textarea name="services" id="supplierServices" required maxLength={1800} placeholder="e.g. structural engineering, Tekla detailing, NDT, galvanizing, erection"/></div>}
  <div className="field full"><label htmlFor="supplierCapacity">Specifications / capabilities (optional)</label><textarea name="capabilities" id="supplierCapacity" maxLength={1800} placeholder="Grades, standards, processing range, capacity, certifications and service regions"/></div>
  <div className="field full"><label htmlFor="supplierDocs">Supporting documentation (PDF, maximum 3 files, 2 MB each) *</label><input id="supplierDocs" name="documents" type="file" accept=".pdf,application/pdf" multiple required/><p className="form-note">Upload company registration, catalogue or company profile, and relevant certificates. Do not upload bank statements or personal identification.</p></div>
  <div className="field full"><label className="supplier-consent"><input type="checkbox" name="consent" value="yes" required/> I confirm that I am authorized to submit this information for supplier qualification and agree to its use for review and related communication.</label></div>
  <div hidden aria-hidden="true"><label htmlFor="supplierTrap">Do not fill</label><input id="supplierTrap" name="websiteCheck" tabIndex={-1} autoComplete="off"/></div>
  <div className="field full"><div className="cf-turnstile" data-sitekey={siteKey}/></div>
  {error&&<p className="hexa-form-error field full" role="alert">{error}</p>}
  <div className="field full"><button type="submit" disabled={pending} className="button dark">{pending?"Submitting…":"Submit supplier application"}</button><p className="form-note">Approval is subject to review by HEXA Steel® Supply Chain. Applications and attachments are not public.</p></div>
 </form></div>;
}
