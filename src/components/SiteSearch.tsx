"use client";
import Link from "next/link";
import {useCallback,useEffect,useRef,useState} from "react";
import type {SearchResult} from "@/lib/searchIndex";

const suggested=[{label:"Structural Steel",term:"structural steel"},{label:"PEB",term:"PEB"},{label:"Quality & ITP",term:"ITP"},{label:"Projects",term:"projects"}] as const;

export function SiteSearch(){
 const [open,setOpen]=useState(false);
 const [query,setQuery]=useState("");
 const [results,setResults]=useState<SearchResult[]>([]);
 const [busy,setBusy]=useState(false);
 const field=useRef<HTMLInputElement>(null);
 const close=useCallback(()=>{setOpen(false);setQuery("");setResults([])},[]);
 useEffect(()=>{
  const listener=(event:KeyboardEvent)=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();setOpen(true)}else if(event.key==="Escape")close()};
  document.addEventListener("keydown",listener);return()=>document.removeEventListener("keydown",listener);
 },[close]);
 useEffect(()=>{if(!open)return;const id=setTimeout(()=>field.current?.focus(),30);return()=>clearTimeout(id)},[open]);
 useEffect(()=>{
   if(!open||query.trim().length<2){setResults([]);setBusy(false);return}
   const controller=new AbortController();let live=true;setBusy(true);
   const id=setTimeout(()=>fetch("/api/search?q="+encodeURIComponent(query.trim()),{signal:controller.signal})
     .then(res=>res.ok?res.json():Promise.reject(new Error("Search unavailable")))
     .then((data:{results:SearchResult[]})=>{if(live)setResults(data.results||[])})
     .catch(()=>{if(live)setResults([])})
     .finally(()=>{if(live)setBusy(false)}),180);
   return()=>{live=false;controller.abort();clearTimeout(id)}
 },[open,query]);
 useEffect(()=>{
   if(!open)return;const original=document.body.style.overflow;document.body.style.overflow="hidden";
   return()=>{document.body.style.overflow=original};
 },[open]);
 return <>
   <button type="button" className="header-search" aria-label="Search entire HEXA website" title="Search website (Ctrl/⌘ + K)" onClick={()=>setOpen(true)}>
     <svg width="21" height="21" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>
   </button>
   {open&&<div className="search-shroud" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}>
     <div role="dialog" aria-modal="true" aria-label="Search HEXA Steel website" className="site-search-dialog">
       <div className="search-head"><span>HEXA / WEBSITE SEARCH</span><button type="button" onClick={close} aria-label="Close search">✕</button></div>
       <div className="search-input-line"><svg width="23" height="23" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>
         <input ref={field} aria-label="Search keywords" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects, quality, services, news…"/>
         <span className="search-shortcut">ESC</span>
       </div>
       <div className="site-search-results" aria-live="polite">
         {query.trim().length<2?<><p className="search-results-label">POPULAR SEARCHES</p><div className="search-suggestions">{suggested.map(x=><button key={x.term} type="button" onClick={()=>setQuery(x.term)}>{x.label}</button>)}</div><p className="search-help">Searches all published site sections, knowledge articles, insights and projects.</p></>:
         <><p className="search-results-label">{busy?"SEARCHING…":results.length+" MATCHING RESULTS"}</p>
         {results.map(r=><Link className="site-search-result" href={r.href} key={r.href} onClick={close}><span className="search-result-category">{r.category}</span><strong>{r.title}</strong><small>{r.description}</small><span className="search-result-arrow"></span></Link>)}
         {!busy&&results.length===0&&<p className="search-help">No matching content found. Try “steel”, “PEB”, “MIR”, “MODON” or “project delivery”.</p>}</>}
       </div>
       <div className="search-footer"><span>Search HEXA Steel®</span><span>Press ESC to close</span></div>
     </div>
   </div>}
 </>;
}
