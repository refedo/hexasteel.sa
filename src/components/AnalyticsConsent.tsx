"use client";

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

export function AnalyticsConsentSettings(){
 const {choice,ready,change}=useConsent();
 return <section className={styles.settings} aria-label="Manage optional analytics">
  <h2>Optional website analytics</h2>
  <p>Optional analytics are disabled by default. If you choose to enable them, you can turn them off again here at any time. Essential website operation does not require analytics storage.</p>
  <label className={styles.preference}><input type="checkbox" disabled={!ready} checked={choice==="granted"} onChange={e=>change(e.target.checked?"granted":"denied")}/>Enable optional website analytics</label>
  <p role="status">{!ready?"Loading privacy preference…":choice==="granted"?"Analytics enabled in this browser.":"Analytics storage is disabled in this browser."}</p>
 </section>;
}
