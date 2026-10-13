import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {getQualifications} from "@/lib/cms";
export const metadata:Metadata={title:"Industrial Approvals & Qualifications"};
export default async function Approvals(){const qualifications=await getQualifications();return <main><PageHero eyebrow="COMPANY / QUALIFICATIONS" title="Qualified to serve demanding industries." intro="Manufacturer approval, registration and prequalification demonstrate the importance of documented systems and the trust placed in engineering and manufacturing providers."/>
<section className="section approvals-section"><div className="shell"><div className="section-intro"><p className="eyebrow">INDUSTRIAL QUALIFICATION NETWORK</p><h2>Broader reach.<br/><span>Higher standards.</span></h2><p>Industrial qualifications, registrations and project relationships across Saudi Arabia.</p></div>
<div className="approval-list">{qualifications.map((entry,i)=><article className="approval-entry" key={entry.name}><span className="approval-number">{String(i+1).padStart(2,"0")}</span><h3>{entry.name}</h3><p>{entry.detail}</p><span className="approval-indicator">QUALIFICATION / REGISTRATION</span></article>)}</div>
</div></section>
<section className="industrial-section-band"><div className="shell industrial-band-layout"><div><p className="eyebrow on-dark">CERTIFICATIONS & TECHNICAL COMPETENCE</p><h2>ISO management systems. Welding inspection. Project evidence.</h2><p>Hexa reports ISO 9001, ISO 14001 and ISO 45001 certifications, along with CWI-qualified QC personnel. Current certificate validity and relevant approval scopes are provided through verified qualification records upon request.</p></div><Link href="/capabilities/quality" className="button outline">Our quality assurance</Link></div></section>
<CallToAction heading="Request Hexa Steel® prequalification documents."/></main>}
