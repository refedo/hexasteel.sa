"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Script from "next/script";
import { supplierProductCategories as categories } from "@/lib/supplierCategories";

type Product = { name: string; origin: string; category: string };
const MAX_FILES = 3;
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_RELATIONSHIPS = ["Manufacturer","Distributor","Authorized Agent","Service Provider","Subcontractor"];

function validateDocuments(files: File[]): string {
  if (files.length < 1 || files.length > MAX_FILES) {
    return "Please select between one and three PDF documents.";
  }
  for (const file of files) {
    if (!file.name.toLowerCase().endsWith(".pdf") ||
      file.type !== "application/pdf") {
      return "Only PDF documents are accepted.";
    }
    if (file.size < 20 || file.size > MAX_FILE_BYTES) {
      return "Each PDF must be 2 MB or less and contain a valid document.";
    }
  }
  return "";
}

function resetTurnstile() {
  const win = window as Window & { turnstile?: { reset?: () => void } };
  win.turnstile?.reset?.();
}

export function SupplierRegistrationForm({ siteKey }: { siteKey: string }) {
  const [products, setProducts] = useState<Product[]>([{ name: "", origin: "", category: categories[0] }]);
  const [scope, setScope] = useState("PRODUCTS");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<{name:string;size:number}[]>([]);

  function filesChanged(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    setSelectedDocuments(files.map(f => ({name:f.name,size:f.size})));
    setError(validateDocuments(files));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError("");

    if (scope !== "SERVICES" && products.some(p => p.name.trim().length < 2 || p.origin.trim().length < 2 || !p.category.trim())) {
      setError("Each product requires a category, name and manufacturing country of origin.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const documents = data.getAll("documents").filter((value): value is File => value instanceof File && value.size > 0);
    const fileError = validateDocuments(documents);
    if (fileError) { setError(fileError); return; }

    data.set("products", JSON.stringify(scope === "SERVICES" ? [] :
      products.map(p => ({ name: p.name.trim(), origin: p.origin.trim(), category: p.category }))));
    data.set("scope", scope);
    setPending(true);
    try {
      const response = await fetch("/api/supplier-applications", { method:"POST",body:data,cache:"no-store" });
      const result = await response.json().catch(() => null) as {reference?:string;error?:string}|null;
      if (!response.ok) throw new Error(result?.error || "Unable to submit your application. Please try again.");
      if (!result?.reference || typeof result.reference !== "string") throw new Error("The submission response is incomplete. Please contact our team before resubmitting.");
      setReference(result.reference);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Submission failed. Please retry.");
      resetTurnstile();
    } finally {
      setPending(false);
    }
  }

  if (reference) return <div className="form-shell supplier-success" role="status" aria-live="polite">
    <p className="eyebrow">APPLICATION RECEIVED</p>
    <h2>Thank you for applying.</h2>
    <p>Your supplier application has been recorded. Keep this reference number for private tracking and follow-up.</p>
    <p className="supplier-reference">{reference}</p>
    <p>Application status is available using your registered email address and a one-time verification code.</p>
    <Link className="button dark" href="/suppliers/track">Track your application</Link>
  </div>;

  return <div className="form-shell supplier-form-shell">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
    <p className="eyebrow">SECURE COMPANY APPLICATION</p>
    <h2>Supplier registration</h2>
    <p className="supplier-form-intro">Complete all required fields. Information is sent securely for Supply Chain evaluation and is not published on the website.</p>
    <form onSubmit={submit} className="form-grid supplier-form" encType="multipart/form-data" aria-busy={pending}>
      <fieldset className="supplier-form-section field full">
        <legend><span>01</span> Company and contact information</legend>
        <div className="form-grid">
          <div className="field full"><label htmlFor="supplierCompany">Legal company name *</label><input name="legalName" id="supplierCompany" maxLength={200} required autoComplete="organization" /></div>
          <div className="field"><label htmlFor="supplierReg">Commercial registration / business license *</label><input name="registrationNumber" id="supplierReg" maxLength={100} required /></div>
          <div className="field"><label htmlFor="supplierCountry">Country of registration *</label><input name="registrationCountry" id="supplierCountry" maxLength={100} required /></div>
          <div className="field"><label htmlFor="supplierContact">Contact person *</label><input name="contactName" id="supplierContact" maxLength={120} required autoComplete="name" /></div>
          <div className="field"><label htmlFor="supplierEmail">Business email *</label><input name="email" id="supplierEmail" type="email" maxLength={250} required autoComplete="email" /></div>
          <div className="field"><label htmlFor="supplierPhone">Telephone *</label><input name="phone" id="supplierPhone" maxLength={35} required autoComplete="tel" /></div>
          <div className="field"><label htmlFor="supplierWebsite">Company website (optional)</label><input name="companyWebsite" id="supplierWebsite" type="url" maxLength={250} placeholder="https://" /></div>
        </div>
      </fieldset>

      <fieldset className="supplier-form-section field full">
        <legend><span>02</span> Products and services</legend>
        <div className="form-grid">
          <div className="field"><label htmlFor="supplierType">Relationship type *</label><select name="supplierType" id="supplierType" required>{ACCEPTED_RELATIONSHIPS.map(v => <option key={v}>{v}</option>)}</select></div>
          <div className="field"><label htmlFor="supplierScope">Supply interest *</label><select id="supplierScope" value={scope} onChange={event => setScope(event.target.value)}><option value="PRODUCTS">Products</option><option value="SERVICES">Services</option><option value="BOTH">Products and services</option></select></div>
          {scope !== "SERVICES" && <div className="field full">
            <label htmlFor="supplierCategory">Primary product category *</label>
            <select name="category" id="supplierCategory" required>{categories.map(c => <option key={c}>{c}</option>)}</select>
            <p className="form-note">List each product separately, including its manufacturing origin. You can select different categories for individual products.</p>
            {products.map((p,i) => <div className="supplier-product" key={i}>
              <label>Product category<select aria-label={"Category of product "+(i+1)} value={p.category} onChange={event => setProducts(items => items.map((item,j) => j === i ? {...item,category:event.target.value} : item))}>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
              <label>Product {i+1}<input aria-label={"Product "+(i+1)} minLength={2} maxLength={160} required value={p.name} onChange={event => setProducts(items => items.map((item,j) => j === i ? {...item,name:event.target.value} : item))} placeholder="e.g. S355 steel plates" /></label>
              <label>Country of origin<input aria-label={"Origin of product "+(i+1)} minLength={2} maxLength={100} required value={p.origin} onChange={event => setProducts(items => items.map((item,j) => j === i ? {...item,origin:event.target.value} : item))} placeholder="Manufacturing country" /></label>
              {i>0 && <button type="button" aria-label={"Remove product "+(i+1)} onClick={() => setProducts(items => items.filter((_,j) => j !== i))}>Remove</button>}
            </div>)}
            {products.length < 12 && <button type="button" className="supplier-add" onClick={() => setProducts(items => [...items,{name:"",origin:"",category:categories[0]}])}>Add another product</button>}
          </div>}
          {scope !== "PRODUCTS" && <div className="field full"><label htmlFor="supplierServices">Specific services offered *</label><textarea name="services" id="supplierServices" minLength={3} required maxLength={1800} placeholder="e.g. structural engineering, Tekla detailing, NDT, galvanizing, erection" /></div>}
          <div className="field full"><label htmlFor="supplierCapacity">Specifications and capabilities (optional)</label><textarea name="capabilities" id="supplierCapacity" maxLength={1800} placeholder="Material grades, standards, processing range, capacity, certifications and service regions" /></div>
        </div>
      </fieldset>

      <fieldset className="supplier-form-section field full">
        <legend><span>03</span> Qualifications and declaration</legend>
        <div className="form-grid">
          <div className="field full">
            <label htmlFor="supplierDocs">Supporting documents *</label>
            <input id="supplierDocs" name="documents" type="file" accept=".pdf,application/pdf" multiple required onChange={filesChanged} aria-describedby="supplier-file-help" />
            <p className="form-note" id="supplier-file-help">Select 1–3 PDF files, maximum 2 MB per file. Include business registration, company profile or catalogue and relevant certificates. Do not upload bank details or personal identification.</p>
            {selectedDocuments.length>0 && <ul className="supplier-selected-files" aria-label="Selected documents">
              {selectedDocuments.map((doc,i) => <li key={i}><span>{doc.name}</span><small>{(doc.size/1024/1024).toFixed(2)} MB</small></li>)}
            </ul>}
          </div>
          <div className="field full"><label className="supplier-consent"><input type="checkbox" name="consent" value="yes" required /><span>I confirm I am authorized to submit this information for supplier qualification and agree to its use for review and related communication.</span></label></div>
          <div hidden aria-hidden="true"><label htmlFor="supplierTrap">Do not fill</label><input id="supplierTrap" name="websiteCheck" tabIndex={-1} autoComplete="off" /></div>
          <div className="field full"><div className="cf-turnstile" data-sitekey={siteKey} /></div>
          {error && <p className="hexa-form-error field full" role="alert" aria-live="assertive">{error}</p>}
          <div className="field full supplier-submit-area">
            <button type="submit" disabled={pending} className="button dark">{pending ? "Submitting securely…" : "Submit supplier application"}</button>
            <p className="form-note">Submission is not an approval or commitment to purchase. Records and attachments remain private to authorized reviewers.</p>
          </div>
        </div>
      </fieldset>
    </form>
  </div>;
}
