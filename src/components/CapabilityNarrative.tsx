"use client";
import Link from "next/link";
import {useState} from "react";
type Scene={label:string;eyebrow:string;headline:string;description:string;outcomes:string[];href:string;cta:string;symbol:string};
export function CapabilityNarrative({scenes,kicker}:{scenes:Scene[];kicker:string}){
 const [active,setActive]=useState(0);const scene=scenes[active];
 return <div className="capability-narrative">
   <div className="capability-narrative-tabs" role="tablist" aria-label={kicker}>{scenes.map((s,i)=><button key={s.label} type="button" className={i===active?"active":""} role="tab" aria-selected={i===active} aria-controls="capability-narrative-panel" onClick={()=>setActive(i)}><span>0{i+1}</span>{s.label}</button>)}</div>
   <div className="capability-narrative-stage" id="capability-narrative-panel" role="tabpanel">
     <div className="capability-narrative-copy"><p className="eyebrow">{scene.eyebrow}</p><h3>{scene.headline}</h3><p>{scene.description}</p><ul>{scene.outcomes.map(x=><li key={x}>{x}</li>)}</ul><Link href={scene.href} className="text-link">{scene.cta}</Link></div>
     <div className="capability-narrative-art" aria-hidden="true"><span className="art-notation">{kicker} / 0{active+1}</span><div className="capability-artwork"><span>{scene.symbol}</span><i/><i/><i/></div><span className="art-footer">ENGINEERING <b>→</b> EXECUTION</span></div>
   </div>
 </div>;
}
