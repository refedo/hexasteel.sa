import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Operational Excellence & Innovation"};
const items=[
 ["Continuous improvement","Standard work, repeatable quality, workplace improvement and disciplined operational routines."],
 ["Industrial assessment","SIRI maturity assessment and internal FDI / OPERI diagnostic methodologies used to understand performance and prioritize development."],
 ["Digitalization — OTS™","Hexa's internal operational system under development to strengthen visibility over work orders, production logs, project dependencies and inspection evidence."],
 ["Advanced machinery","Precision lasers, PEB assembly/welding technology and automated C/Z roll forming to improve consistency and flexibility."],
 ["People capability","Hexa Academy, technical training, experienced professional recruitment and developing teams from within."],
 ["Vertical integration & expansion","Manufacturing integration and the planned 16,415 m² MODON expansion to support future growth. The expansion is not yet commissioned."]
];
export default function Excellence(){return <main><PageHero eyebrow="COMPANY / CONTINUOUS IMPROVEMENT" title="The benchmark is built, not declared." intro="Our long-term ambition is to establish Hexa Steel® as an industry benchmark through measurable progress in people, processes, technology, quality and customer delivery."/>
<section className="section"><div className="shell"><p className="eyebrow">TOISC™ / TEAM · OPERATIONS · INFRASTRUCTURE · STRATEGY · CREATIVITY</p><div className="feature-grid">{items.map(([title,description],i)=><article className="feature-card" key={title}><small>0{i+1}</small><h3>{title}</h3><p>{description}</p></article>)}</div><p className="legal-note">We aspire to benchmark leadership in Saudi mid-sized steel fabrication; we do not claim an independently verified #1 market rank.</p><Link className="text-link" href="/insights">Read our initiatives and company milestones ↗</Link></div></section><CallToAction heading="Build with a team committed to improving."/></main>}
