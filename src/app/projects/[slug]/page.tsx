import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {references} from "@/content/site";
import {CallToAction,PageHero} from "@/components/PageBlocks";
import {getProjects} from "@/lib/cms";
import {ProjectImages} from "@/components/ProjectImages";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return references.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const p=(await getProjects()).find(x=>x.slug===slug);return{title:p?p.title:"Project"}}
export default async function Project({params}:Props){
 const{slug}=await params;const p=(await getProjects()).find(x=>x.slug===slug);if(!p)notFound();
 return <main><PageHero eyebrow={"PROJECT REFERENCE / "+p.category.toUpperCase()} title={p.title} intro={p.description}/>
 <ProjectImages title={p.title} coverImage={p.image} gallery={p.gallery}/>
 <section className="section"><div className="shell case-study-grid">
   <div className="case-study-principal"><p className="eyebrow">SCOPE OF INVOLVEMENT</p><h2>Engineering confidence.<br/><span>Delivery discipline.</span></h2><p>{p.description}</p><p>Hexa integrates manufacturing processes and project documentation with fabrication, inspection, coating and dispatch planning according to the contracted scope.</p><Link href="/project-delivery" className="text-link">Our delivery management methodology</Link></div>
   <aside className="case-study-aside"><p className="eyebrow">PROJECT REFERENCE</p><div><small>DELIVERY STATUS</small><strong>{p.status}</strong></div><div><small>SERVICE</small><strong>{p.category}</strong></div>{p.year&&<div><small>REFERENCE YEAR</small><strong>{p.year}</strong></div>}{p.size&&<div><small>REPORTED STEEL QUANTITY</small><strong>{p.size}</strong></div>}</aside>
 </div><div className="shell"><p className="project-visual-footnote">Public project information and quantities are based on management references without identifying confidential customers. Project-specific site imagery, client logos and endorsements are used only with appropriate authorization.</p><Link href="/projects" className="text-link">← All selected projects</Link></div></section>
 <CallToAction/></main>}
