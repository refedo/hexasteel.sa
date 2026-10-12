import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Knowledge Centre" };
const guides=[
  ["Steel Building Systems","Structural steel versus pre-engineered buildings: what drives the decision?"],
  ["Quality & Documentation","Material traceability, MTCs, WPS/PQR and inspection plans explained."],
  ["Project Delivery","Seven activities: from design, detailing and procurement to site erection."],
  ["Industrial Manufacturing","How laser cutting, welding and C/Z forming support building performance."],
];
export default function KnowledgePage(){
  return <main><section className="inner-hero"><div className="shell"><p className="eyebrow on-dark">KNOWLEDGE CENTRE / OUR MISSION</p><h1>Spreading knowledge.<br/>Strengthening industry.</h1><p>Technical insights, practical guides and frequently asked questions from the world of steel engineering and industrial manufacturing. Editorial publication is being prepared.</p></div></section><section className="section"><div className="shell content-grid">{guides.map(([category,title])=><article key={title}><p className="eyebrow">{category}</p><h2>{title}</h2><p>Planned editorial resource. Technical review and verified references will precede publication.</p></article>)}</div></section><section className="closing"><div className="shell closing-grid"><div><p className="eyebrow">HAVE A TECHNICAL QUESTION?</p><h2>Ask our team.</h2></div><Link href="/contact" className="button dark">Contact Hexa Steel ↗</Link></div></section></main>;
}
