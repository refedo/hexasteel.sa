import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Quality Control & Compliance"};
const tests=[
 ["Documentation and procedures","WPS/PQR, approved Inspection and Test Plans, welder qualifications, method statements and inspection hold points."],
 ["Material verification","Approved grades, MTCs, receiving checks, heat-number identification and material traceability through fabrication."],
 ["Dimensional control","Fit-up inspection, tolerances, member geometry, erection interface dimensions and calibrated measurement equipment."],
 ["Welding & NDT","Visual welding inspection with required NDT methods, extent and acceptance criteria specified in the project ITP."],
 ["Protective coatings","Surface preparation, approved material batches, weather conditions, DFT measurement and repair controls."],
 ["NCR and third-party witness","Nonconformance reporting, corrective actions, closeout and qualified third-party inspectors where required."]
];
export default function Quality(){return <main><PageHero eyebrow="CAPABILITIES / QUALITY ASSURANCE & INSPECTION" title="Quality built into every controlled step." intro="Traceable material, qualified welding procedures, dimensional checks, documented NDT and tested coatings are fundamental to how Hexa approaches structural steel fabrication."/>
<section className="section"><div className="shell feature-grid">{tests.map(([name,description],i)=><article className="feature-card" key={name}><small>0{i+1}</small><h3>{name}</h3><p>{description}</p></article>)}</div></section>
<section className="section service-panel"><div className="shell"><h2>Qualified people. Controlled records.</h2><p>Hexa reports AWS CWI-certified quality personnel and ISO 9001, 14001 and 45001 certifications. Active individual credentials and renewed ISO certificate validity must be verified before current-status badges or scans are published. Manufacturer approval scope must be stated by exact approved category.</p><Link className="text-link" href="/knowledge/steel-material-traceability">Read the material traceability guide ↗</Link></div></section>
<CallToAction heading="Request technical prequalification details."/></main>}
