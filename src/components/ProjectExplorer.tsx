"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {references} from "@/content/site";
type Project=typeof references[number];
const visuals=[
 "https://images.unsplash.com/photo-1748956628042-b73331e0b479?auto=format&fit=crop&w=1100&q=80",
 "https://images.unsplash.com/photo-1649587597799-4c227640f4f8?auto=format&fit=crop&w=1100&q=80",
 "https://images.unsplash.com/photo-1781156771445-404a80d7ee7a?auto=format&fit=crop&w=1100&q=80",
];
export function ProjectExplorer({projects=references}:{projects?:Project[]}){
 const [category,setCategory]=useState("All Projects");const [term,setTerm]=useState("");
 const categories=["All Projects",...new Set(projects.map(x=>x.category))];
 const filtered=useMemo(()=>projects.filter(x=>(category==="All Projects"||x.category===category)&&(x.title+" "+x.client+" "+x.description).toLowerCase().includes(term.toLowerCase())),[projects,category,term]);
 return <div className="project-explorer">
   <div className="project-filters"><div className="project-filter-buttons">{categories.map(x=><button key={x} type="button" className={category===x?"active":""} onClick={()=>setCategory(x)}>{x}</button>)}</div><label className="project-search"><span className="sr-only">Search projects</span><input type="search" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search project or client…" /></label></div>
   <div className="project-showcase">
    {filtered.map(p=><article className="project-showcase-card" key={p.slug}>
      <Link className="project-showcase-image" href={"/projects/"+p.slug} aria-label={"Explore "+p.title}>
       <span className="project-cover-photo" style={{backgroundImage:'linear-gradient(to bottom,rgba(20,37,49,.03),rgba(20,37,49,.42)),url("'+(p.image||visuals[projects.indexOf(p)%visuals.length])+'")'}}/>
       {!p.image&&<span className="project-photo-caption">ILLUSTRATIVE INDUSTRIAL PHOTOGRAPHY</span>}
       {p.size&&<span className="project-mass">{p.size}<small>PROJECT STEELWORK REFERENCE</small></span>}
      </Link>
      <div className="project-showcase-meta"><span>{p.category}</span><span>{p.year||"SELECTED REFERENCE"}</span></div>
      <h3>{p.client}</h3><p>{p.title}</p><Link className="project-showcase-arrow" href={"/projects/"+p.slug}>Explore project ↗</Link>
    </article>)}
   </div>
   {filtered.length===0&&<p className="project-empty">No matching projects. Try another category or search.</p>}
 </div>;
}
