"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {references} from "@/content/site";
type Project=typeof references[number];
import {projectIllustrations,isIllustrativeImage} from "@/content/cmsSeed";
import {ProjectWatermark} from "@/components/ProjectWatermark";
export function ProjectExplorer({projects=references}:{projects?:Project[]}){
 const [category,setCategory]=useState("All Projects");const [term,setTerm]=useState("");
 const categories=["All Projects",...new Set(projects.map(x=>x.category))];
 const filtered=useMemo(()=>projects.filter(x=>(category==="All Projects"||x.category===category)&&(x.title+" "+x.description).toLowerCase().includes(term.toLowerCase())),[projects,category,term]);
 return <div className="project-explorer">
   <div className="project-filters"><div className="project-filter-buttons">{categories.map(x=><button key={x} type="button" className={category===x?"active":""} onClick={()=>setCategory(x)}>{x}</button>)}</div><label className="project-search"><span className="sr-only">Search projects</span><input type="search" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search project or sector…" /></label></div>
   <div className="project-showcase">
    {filtered.map(p=><article className="project-showcase-card" key={p.slug}>
      <Link className="project-showcase-image" href={"/projects/"+p.slug} aria-label={"Explore "+p.title}>
       <span className="project-cover-photo" style={{backgroundImage:'linear-gradient(to bottom,rgba(20,37,49,.03),rgba(20,37,49,.42)),url("'+(p.image||projectIllustrations[projects.indexOf(p)%projectIllustrations.length])+'")'}}/>
       {(!p.image||isIllustrativeImage(p.image))&&<span className="project-photo-caption">ILLUSTRATIVE INDUSTRIAL PHOTOGRAPHY</span>}
       {Boolean(p.image&&!isIllustrativeImage(p.image))&&<ProjectWatermark/>}
       {p.size&&<span className="project-mass">{p.size}<small>PROJECT STEELWORK REFERENCE</small></span>}
      </Link>
      <div className="project-showcase-meta"><span>{p.category}</span><span>{p.year||"SELECTED REFERENCE"}</span></div>
      <div className="project-identity"><h3>{p.title}</h3><span className={"project-status "+(p.status==="Completed"?"completed":p.status==="Ongoing"?"ongoing":"unverified")}>{p.status}</span></div><p>{p.description}</p><Link className="project-showcase-arrow" href={"/projects/"+p.slug}>Explore project</Link>
    </article>)}
   </div>
   {filtered.length===0&&<p className="project-empty">No matching projects. Try another category or search.</p>}
 </div>;
}
