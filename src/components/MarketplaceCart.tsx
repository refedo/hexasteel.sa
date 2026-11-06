"use client";

import {useEffect, useState} from "react";
import {formatMarketplacePrice, type MarketplaceItem} from "@/content/marketplace";

import {MarketplaceBankCheckout} from "@/components/MarketplaceBankCheckout";
import type {BankCheckoutDetails} from "@/lib/marketplaceBank";
import {checkoutTotals} from "@/lib/marketplaceTotals";

const storageKey = "hexa-marketplace-cart";
const maxQuantity = 10000;

function validQuantity(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 && value <= maxQuantity;
}

export function MarketplaceCart({items,whatsappBase,bankCheckout}:{items:MarketplaceItem[];whatsappBase?:string;bankCheckout?:BankCheckoutDetails}) {
  const [quantities,setQuantities] = useState<Record<string,number>>({});
  const [submitted,setSubmitted] = useState("");
  const [ready,setReady] = useState(false);
  useEffect(()=>{
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        setQuantities(Object.fromEntries(Object.entries(saved).filter(([,quantity])=>validQuantity(quantity))));
      }
    } catch {
      // An unavailable or corrupted browser store does not prevent using the cart.
    }
    setReady(true);
  },[]);
  useEffect(()=>{
    if (!ready) return;
    try { localStorage.setItem(storageKey,JSON.stringify(quantities)); }
    catch { /* Continue with the cart in memory. */ }
  },[quantities,ready]);

  const lines = items.filter(item=>validQuantity(quantities[item.slug]));
  const orderLines = lines.map(item=>({slug:item.slug,quantity:quantities[item.slug]}));
  const totals = bankCheckout ? checkoutTotals(orderLines,items) : null;
  const subtotal = lines.reduce((total,item)=>total+Math.round((item.priceHalalas || 0)*quantities[item.slug]),0);
  const message = ["Hello HEXA Steel®, I would like to request the following:",
    ...lines.map(item=>`- ${item.title}: ${quantities[item.slug]} × ${item.unit}`),
    "Please confirm specifications, availability, VAT and delivery."].join("\n");

  function setQuantity(slug:string,quantity:number) {
    setSubmitted("");
    setQuantities(current=>{
      const next = {...current};
      if (validQuantity(quantity)) next[slug] = quantity;
      else delete next[slug];
      return next;
    });
  }

  return <section className="section"><div className="shell marketplace-layout">
    <div className="marketplace-grid">
      {items.map(item=><article className="marketplace-card" key={item.slug}>
        {item.image && <img src={item.image} alt={item.imageAlt || item.title} loading="lazy"/>}
        <p className="eyebrow">{item.category}</p>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p><strong>{item.priceHalalas ? `${formatMarketplacePrice(item.priceHalalas)} / ${item.unit}` : "Price on request"}</strong>
          {item.priceHalalas ? <small> Excluding VAT</small> : null}</p>
        <button className="button dark" type="button" disabled={!ready || validQuantity(quantities[item.slug])}
          onClick={()=>setQuantity(item.slug,1)}>{validQuantity(quantities[item.slug]) ? "Added to cart" : "Add to cart"}</button>
      </article>)}
    </div>
    <aside className="marketplace-card marketplace-cart" aria-labelledby="cart-title">
      <h2 id="cart-title">Your cart</h2>
      {submitted && <p role="status"><strong>Transfer slip submitted.</strong> Reference {submitted}. Payment verification is pending.</p>}
      {lines.length===0 ? <p>Your cart is empty.</p> : <>
        <ul>{lines.map(item=><li key={item.slug}>
          <strong>{item.title}</strong>
          <label> Quantity ({item.unit}) <input type="number" min="0.001" max={maxQuantity} step="0.001"
            defaultValue={quantities[item.slug]} onChange={event=>{
              if (event.currentTarget.validity.valid && validQuantity(event.currentTarget.valueAsNumber)) {
                setQuantity(item.slug,event.currentTarget.valueAsNumber);
              }
            }} onBlur={event=>{event.currentTarget.value=String(quantities[item.slug]);}}/></label>
          <button type="button" className="text-link" aria-label={`Remove ${item.title}`} onClick={()=>setQuantity(item.slug,0)}>Remove</button>
        </li>)}</ul>
        <p aria-live="polite">Priced items subtotal <strong>{formatMarketplacePrice(subtotal)}</strong> excluding VAT and delivery.</p>
        {bankCheckout && totals && <MarketplaceBankCheckout key={JSON.stringify(orderLines)} details={bankCheckout}
          lines={orderLines} totals={totals} onSubmitted={reference=>{
            setSubmitted(reference);
            setQuantities({});
          }}/>}
        {whatsappBase
          ? <a className="button dark" href={whatsappBase+"?text="+encodeURIComponent(message)}>Send cart enquiry on WhatsApp</a>
          : <a className="button dark" href="/contact">Contact sales about your cart</a>}
      </>}
    </aside>
  </div></section>;
}
