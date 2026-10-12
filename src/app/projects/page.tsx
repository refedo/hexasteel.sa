import type {Metadata} from "next";
import Link from "next/link";
import {references} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Project Portfolio"};
export default function Projects(){return <main><PageHero eyebrow="PORTFOLIO / PROJECT EXECUTION" title="Experience measured in what we deliver." intro="Selected structural steel project references and the evidence behind them—scope, tonnage, constraints, manufacturing methods, quality and logistics."/>
<section className="section"><div className="shell"><p className="eyebrow">COMPLETED / HISTORICAL REFERENCES</p><div className="project-grid">{references.map(p=><article className="project-card" key={p.slug}><div className="project-image-placeholder"><span>ENGINEERING / FABRICATION / DELIVERY</span><strong>{p.size}</strong></div><div className="project-card-body"><p className="eyebrow">{p.category} · {p.year}</p><h2>{p.title}</h2><p>{p.description}</p><Link href={"/projects/"+p.slug}>View project details ↗</Link></div></article>)}</div></div></section>
<section className="section service-panel"><div className="shell"><p className="eyebrow">ONGOING PROJECTS</p><h2>Work in progress, reported responsibly.</h2><p>Current active work will be published once project status, approved scope, client confidentiality and imagery have been cleared for public release. Hexa's internal project portfolio remains a controlled document.</p><p className="legal-note">Historic references above are management-reported and awaiting release approval, so client names and photography are intentionally withheld.</p></div></section>
<CallToAction heading="Have a comparable project?"/></main>}
