import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {references} from "@/content/site";
import {CallToAction,PageHero} from "@/components/PageBlocks";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return references.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=references.find(x=>x.slug===slug);return{title:p?.title||"Project"}}
export default async function Project({params}:Props){const {slug}=await params;const p=references.find(x=>x.slug===slug);if(!p)notFound();return <main><PageHero eyebrow={"PORTFOLIO / "+p.category.toUpperCase()} title={p.title} intro={p.description}/>
<section className="section"><div className="shell content-grid"><article><p className="eyebrow">REFERENCE INFORMATION</p><h2>{p.size}</h2><p>Reported fabrication weight</p><p>Year: {p.year}</p><p>Discipline: {p.category}</p></article><article><p className="eyebrow">PROJECT DELIVERY</p><h2>Managed lifecycle.</h2><p>Design and detailing coordination, procurement, documented fabrication, inspection, coating, delivery and project-managed site interfaces according to scope.</p></article></div><p className="shell legal-note">This historical reference is awaiting documentary and client-name publication clearance. This page does not claim a specific client's endorsement.</p><div className="shell"><Link className="text-link" href="/projects">← All projects</Link></div></section><CallToAction/></main>}
