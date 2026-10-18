"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";
import styles from "./AnalyticsConsent.module.css";

const STORAGE_KEY="hexa_analytics_consent_v1";
const CHANGE_EVENT="hexa-analytics-consent-changed";
type Choice="granted"|"denied";

function savedChoice():Choice|null{
 try{
  const stored=window.localStorage.getItem(STORAGE_KEY);
  return stored==="granted"||stored==="denied"?stored:null;
 }catch{return null;}
}

function useConsent(){
 const [choice,setChoice]=useState<Choice|null>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const sync=(event?:Event)=>{const incoming=event instanceof CustomEvent?event.detail:null;setChoice(incoming==="granted"||incoming==="denied"?incoming:savedChoice());setReady(true);};
  sync();
  window.addEventListener(CHANGE_EVENT,sync);
  window.addEventListener("storage",sync);
  return()=>{window.removeEventListener(CHANGE_EVENT,sync);window.removeEventListener("storage",sync);};
 },[]);
 function change(next:Choice){
  try{window.localStorage.setItem(STORAGE_KEY,next);}catch{
   // Browsers with blocked storage still permit an in-memory consent update.
  }
  const google=window as Window & {gtag?:(...args:unknown[])=>void};
  google.gtag?.("consent","update",{
   analytics_storage:next,
   ad_storage:"denied",
   ad_user_data:"denied",
   ad_personalization:"denied"
  });
  setChoice(next);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT,{detail:next}));
 }
 return {choice,ready,change};
}

export function AnalyticsConsentBanner(){
 const pathname=usePathname();
 const {choice,ready,change}=useConsent();
 if(!ready||choice!==null||(pathname.startsWith("/studio")||pathname==="/privacy"))return null;
 return <section className={styles.banner} aria-label="Analytics privacy choices">
  <div className={styles.copy}>
   <strong>Your privacy matters.</strong>
   <p>We use optional analytics to understand website performance. Choose whether to enable analytics storage. You can change your choice at any time in our <Link href="/privacy">privacy information</Link>.</p>
  </div>
  <div className={styles.actions}>
   <button type="button" onClick={()=>change("denied")} className={styles.secondary}>Reject analytics</button>
   <button type="button" onClick={()=>change("granted")} className={styles.primary}>Accept analytics</button>
  </div>
 </section>;
}

export function AnalyticsConsentSettings(){
 const {choice,ready,change}=useConsent();
 return <section className={styles.settings} aria-label="Manage analytics consent">
  <h2>Analytics preferences</h2>
  <p>{!ready?"Checking your browser preference…":choice==="granted"?"Optional analytics storage is enabled in this browser.":choice==="denied"?"Optional analytics storage is disabled in this browser.":"You have not selected an analytics preference yet."}</p>
  <div className={styles.actions}>
   <button type="button" onClick={()=>change("denied")} className={styles.secondary}>Reject analytics</button>
   <button type="button" onClick={()=>change("granted")} className={styles.primary}>Accept analytics</button>
  </div>
 </section>;
}
