"use client";

import Script from "next/script";
import {useEffect,useRef,useState,type FormEvent} from "react";
import {formatMarketplacePrice} from "@/content/marketplace";
import type {BankCheckoutDetails} from "@/lib/marketplaceBank";
import {marketplaceVatRate,maxSlipBytes,type CheckoutLine,type checkoutTotals} from "@/lib/marketplaceTotals";

type Props = {
  details:BankCheckoutDetails;
  lines:CheckoutLine[];
  totals:NonNullable<ReturnType<typeof checkoutTotals>>;
  onSubmitted:(reference:string)=>void;
};

type Turnstile = {
  render:(container:HTMLElement,options:{sitekey:string;action:string})=>string;
  reset:(id:string)=>void;
  remove:(id:string)=>void;
};
function turnstile() {
  return (window as Window & {turnstile?:Turnstile}).turnstile;
}

export function MarketplaceBankCheckout({details,lines,totals,onSubmitted}:Props) {
  const [reference,setReference] = useState("");
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const locked = useRef(false);
  const widget = useRef<string|null>(null);
  const container = useRef<HTMLDivElement>(null);
  const [scriptReady,setScriptReady] = useState(false);
  const storageKey = "hexa-marketplace-transfer-"+JSON.stringify(lines)+"-"+totals.total;

  useEffect(()=>{
    const api = turnstile();
    if (!reference || !scriptReady || !api || !container.current) return;
    const id = api.render(container.current,{sitekey:details.siteKey,action:"marketplace_transfer"});
    widget.current = id;
    return ()=>{api.remove(id);widget.current=null;};
  },[reference,scriptReady,details.siteKey]);

  function startCheckout() {
    let id = "HX-"+crypto.randomUUID().replaceAll("-","");
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved && /^HX-[a-f0-9]{32}$/.test(saved)) id = saved;
      sessionStorage.setItem(storageKey,id);
    } catch { /* Keep the reference in memory when browser storage is unavailable. */ }
    setReference(id);
  }

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    const data = new FormData(event.currentTarget);
    const slip = data.get("slip");
    if (!(slip instanceof File) || !slip.size || slip.size>maxSlipBytes) {
      setError("Attach a transfer slip up to 5 MB.");
      return;
    }
    locked.current = true;
    setBusy(true);
    setError("");
    data.set("reference",reference);
    data.set("lines",JSON.stringify(lines));
    data.set("total",String(totals.total));
    try {
      const response = await fetch("/api/marketplace/bank-transfer",{method:"POST",body:data});
      const result = await response.json() as {reference?:string;status?:string;error?:string};
      if (!response.ok || result.reference!==reference || result.status!=="pending_payment_verification") {
        throw new Error(result.error || "We could not confirm your submission.");
      }
      try { sessionStorage.removeItem(storageKey); } catch { /* Submission already succeeded. */ }
      onSubmitted(reference);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Unable to submit. Please retry.");
      if (widget.current) turnstile()?.reset(widget.current);
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  if (!reference) return <button className="button dark" type="button"
    onClick={startCheckout}>Checkout by bank transfer</button>;

  return <div className="marketplace-bank">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setScriptReady(true)}/>
    <h3>Bank transfer</h3>
    <p>Confirm your specifications, availability and fulfillment with our sales team before transferring funds.</p>
    <dl>
      <dt>Bank</dt><dd>{details.bank}</dd>
      <dt>Beneficiary</dt><dd>{details.beneficiary}</dd>
      <dt>IBAN</dt><dd className="marketplace-bank-iban" dir="ltr">{details.iban}</dd>
      <dt>Transfer reference</dt><dd className="marketplace-bank-iban">{reference}</dd>
      <dt>VAT ({marketplaceVatRate}%)</dt><dd>{formatMarketplacePrice(totals.vat)}</dd>
      <dt>Amount to transfer</dt><dd><strong>{formatMarketplacePrice(totals.total)}</strong></dd>
    </dl>
    <p>{details.fulfillment}</p>
    <p>Include the reference in the transfer if your bank allows it. Upload the slip after making the transfer.</p>
    <form className="marketplace-bank-form" onSubmit={submit}>
      <label>Name<input name="name" autoComplete="name" required maxLength={120}/></label>
      <label>Company<input name="company" autoComplete="organization" required maxLength={160}/></label>
      <label>Business email<input name="email" type="email" autoComplete="email" required maxLength={180}/></label>
      <label>Confirmed specifications<textarea name="specifications" required maxLength={1500}
        placeholder="Include the agreed profile dimensions, thickness, length and quotation reference if available."/></label>
      <label>Transfer slip (PDF, JPG or PNG, up to 5 MB)
        <input name="slip" type="file" accept=".pdf,.jpg,.jpeg,.png" required/>
      </label>
      <label className="marketplace-bank-consent"><input name="consent" type="checkbox" value="yes" required/>
        <span>I agree to the <a href="/privacy" className="text-link">Privacy Policy</a> and to HEXA Steel® reviewing the slip to reconcile this payment.</span>
      </label>
      <div className="cf-turnstile" ref={container}/>
      {error && <p role="alert">{error}</p>}
      <button className="button dark" disabled={busy}>{busy ? "Submitting…" : "Submit transfer slip"}</button>
    </form>
  </div>;
}
