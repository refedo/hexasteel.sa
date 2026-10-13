"use client";
import {useState} from "react";
import Link from "next/link";
import {insights} from "@/content/site";
type Insight=typeof insights[number];
export function InsightsExplorer({entries=insights}:{entries?:Insight[]}){
 const [category,setCategory]=useState("All");const [selected,setSelected]=useState(0);
 const categories=["All",...new Set(entries.map(x=>x.category))];
 const visible=entries.filter(x=>category==="All"||x.category===category);
 const featured=visible[Math.min(selected,Math.max(0,visible.length-1))];
 const choose=(item:string)=>{setCategory(item);setSelected(0)};
 return <div className="insights-experience">
   <div className="insight-categories" role="group" aria-label="Filter insights by category">{categories.map(item=><button type="button" key={item} className={item===category?"active":""} aria-pressed={item===category} onClick={()=>choose(item)}>{item}</button>)}</div>
   <div className="insights-editorial-layout">
     <div className="insights-selection"><div className="insights-selection-title"><span>SELECTED STORIES</span><span>{String(visible.length).padStart(2,"0")} ARTICLES</span></div>
       <div className="insights-story-list">{visible.map((item,i)=><button type="button" className={i===selected?"active":""} key={item.slug} aria-pressed={i===selected} onClick={()=>setSelected(i)}><span className="insight-story-date">{item.date}</span><strong>{item.title}</strong><span className="insight-story-category">{item.category}<span aria-hidden="true">↗</span></span></button>)}</div>
     </div>
     {featured&&<article className="insights-main-feature"><div className="insights-feature-art" aria-hidden="true"><span>HEXA / INDUSTRIAL PROGRESS</span><div className="insights-feature-ring"/><strong>{String(visible.indexOf(featured)+1).padStart(2,"0")}</strong></div>
       <div className="insights-feature-copy"><p className="eyebrow">{featured.category} · {featured.date}</p><h2>{featured.title}</h2><p>{featured.summary}</p><Link className="button dark" href={"/insights/"+featured.slug}>Read this milestone ↗</Link></div></article>}
   </div>
 </div>;
}
