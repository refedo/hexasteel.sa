"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {references} from "@/content/site";
import type {PublicProject} from "@/content/projectTaxonomy";
import {projectIllustrations,isIllustrativeImage} from "@/content/cmsSeed";
import {ProjectWatermark} from "@/components/ProjectWatermark";

const typeFilters=[
 {label:"All Projects",value:"all"},
 {label:"Warehouses",value:"Warehouse"},
 {label:"Factories",value:"Factory"},
 {label:"Hotels",value:"Hotel"},
 {label:"Entertainment",value:"Entertainment Venue"},
 {label:"Logistics Hubs",value:"Logistics Hub"}
];
export function ProjectExplorer({projects=references}:{projects?:PublicProject[]}){
 const [type,setType]=useState("all");
 const [industry,setIndustry]=useState("all");
 const [term,setTerm]=useState("");
 const industries=useMemo(()=>[...new Set(projects.flatMap(p=>p.industries||[]))].sort(),[projects]);
 const filtered=useMemo(()=>projects.filter(p=>{
  if(type!=="all"&&!(p.projectTypes||[]).includes(type))return false;
  if(industry!=="all"&&!(p.industries||[]).includes(industry))return false;
  const corpus=[p.title,p.description,p.category,p.steelSystem,...(p.projectTypes||[]),...(p.industries||[])].filter(Boolean).join(" ").toLowerCase();
  return corpus.includes(term.trim().toLowerCase());
 }),[projects,type,industry,term]);
 return <div className="project-explorer">
  <div className="project-filters">
   <div className="project-filter-group">
    <span className="project-filters-label">PROJECT TYPE</span>
    <div className="project-filter-buttons" role="group" aria-label="Filter projects by type">
     {typeFilters.map(f=><button key={f.value} type="button" className={type===f.value?"active":""} aria-pressed={type===f.value} onClick={()=>setType(f.value)}>{f.label}</button>)}
    </div>
   </div>
   <div className="project-filter-controls">
    <label className="project-industry-select"><span className="sr-only">Filter by industry</span>
     <select value={industry} onChange={e=>setIndustry(e.target.value)}><option value="all">All industries</option>{industries.map(x=><option key={x} value={x}>{x}</option>)}</select>
    </label>
    <label className="project-search"><span className="sr-only">Search projects</span><input type="search" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search project or sector…" /></label>
   </div>
  </div>
  <p className="project-results-count" aria-live="polite">Showing {filtered.length} of {projects.length} projects</p>
  <div className="project-showcase">
   {filtered.map(p=><article className="project-showcase-card" key={p.slug}>
    <Link className="project-showcase-image" href={"/projects/"+p.slug} aria-label={"Explore "+p.title}>
     <span className="project-cover-photo" style={{backgroundImage:'linear-gradient(to bottom,rgba(20,37,49,.03),rgba(20,37,49,.42)),url("'+(p.image||projectIllustrations[projects.indexOf(p)%projectIllustrations.length])+'")'}}/>
     {(!p.image||isIllustrativeImage(p.image))&&<span className="project-photo-caption">ILLUSTRATIVE INDUSTRIAL PHOTOGRAPHY</span>}
     {Boolean(p.image&&!isIllustrativeImage(p.image))&&<ProjectWatermark/>}
     {p.size&&<span className="project-mass">{p.size}<small>PROJECT STEELWORK REFERENCE</small></span>}
    </Link>
    <div className="project-showcase-meta"><span>{p.industries?.length?p.industries.join(" / "):p.category}</span><span>{p.year||"SELECTED REFERENCE"}</span></div>
    <div className="project-identity"><h3>{p.title}</h3><span className={"project-status "+(p.status==="Completed"?"completed":p.status==="Ongoing"?"ongoing":"unverified")}>{p.status}</span></div>
    {Boolean(p.projectTypes?.length||p.steelSystem)&&<p className="project-card-classification">{[...(p.projectTypes||[]),p.steelSystem].filter(Boolean).join(" · ")}</p>}
    <p>{p.description}</p><Link className="project-showcase-arrow" href={"/projects/"+p.slug}>Explore project</Link>
   </article>)}
  </div>
  {filtered.length===0&&<p className="project-empty">No published projects match these filters. Try another industry or project type.</p>}
 </div>;
}
