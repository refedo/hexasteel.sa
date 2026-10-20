"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
type Scene={label:string;eyebrow:string;headline:string;description:string;outcomes:string[];href:string;cta:string;symbol:string};
export function CapabilityNarrative({scenes,kicker}:{scenes:Scene[];kicker:string}){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const [visible,setVisible]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(true);
 const root=useRef<HTMLDivElement>(null);
 const scene=scenes[active];

 useEffect(()=>{
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  const check=()=>setReducedMotion(media.matches);
  check();media.addEventListener("change",check);
  return()=>media.removeEventListener("change",check);
 },[]);
 useEffect(()=>{
  const node=root.current;if(!node)return;
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(reducedMotion||paused||!visible||scenes.length<2)return;
  const timer=window.setInterval(()=>{
   if(!document.hidden)setActive(previous=>(previous+1)%scenes.length);
  },6500);
  return()=>window.clearInterval(timer);
 },[reducedMotion,paused,visible,scenes.length,active]);
 return <div className="capability-narrative" ref={root} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setPaused(false);}}>
   <div className="capability-narrative-tabs" role="tablist" aria-label={kicker}>{scenes.map((s,i)=><button key={s.label} type="button" className={i===active?"active":""} role="tab" id={"hexa-scene-"+kicker.replace(/[^a-z0-9]/gi,"-")+"-"+i} tabIndex={i===active?0:-1} aria-selected={i===active} aria-controls={"hexa-scene-panel-"+kicker.replace(/[^a-z0-9]/gi,"-")} onKeyDown={event=>{if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();const next=(i+(event.key==="ArrowRight"?1:-1)+scenes.length)%scenes.length;setActive(next);const parent=event.currentTarget.parentElement;parent?.querySelectorAll("button")[next]?.focus();}}} onClick={()=>setActive(i)}><span>0{i+1}</span>{s.label}</button>)}</div>
   <div className="capability-narrative-stage" key={active} id={"hexa-scene-panel-"+kicker.replace(/[^a-z0-9]/gi,"-")} role="tabpanel" aria-labelledby={"hexa-scene-"+kicker.replace(/[^a-z0-9]/gi,"-")+"-"+active}>
     <div className="capability-narrative-copy"><p className="eyebrow">{scene.eyebrow}</p><h3>{scene.headline}</h3><p>{scene.description}</p><ul>{scene.outcomes.map(x=><li key={x}>{x}</li>)}</ul><Link href={scene.href} className="text-link">{scene.cta}</Link></div>
     <div className="capability-narrative-art" aria-hidden="true"><span className="art-notation">{kicker} / 0{active+1}</span><div className="capability-artwork"><span>{scene.symbol}</span><i/><i/><i/></div><span className="art-footer">ENGINEERING <b>→</b> EXECUTION</span></div>
   </div>
   <div className="capability-slide-footer"><span>0{active+1} / 0{scenes.length} — {paused?"Paused":reducedMotion?"Manual navigation":visible?"Auto-advancing":"Scroll to explore"}</span><button type="button" className="capability-play-pause" onClick={()=>setPaused(value=>!value)} aria-label={paused?"Resume automatic slides":"Pause automatic slides"}>{paused?"Play":"Pause"}</button></div>
 </div>;
}
