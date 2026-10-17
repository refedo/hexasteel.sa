import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"PEB Building Components & Terminology",description:"Eave height, ridge height, primary rafters, joists, purlins, girts, sag rods, struts, bracing and more."};
const glossary=[
 ["Eave height","Vertical height to the specified roof/eave reference point at the building edge."],
 ["Ridge height","Height of the roof's highest intersection, measured using the agreed building datum."],
 ["Primary columns","Main structural support members carrying loads to base plates and anchors."],
 ["Primary rafters","Structural roof members forming the load-carrying frames."],
 ["Primary beams & secondary beams","Structural beams spanning between supports and distributing loads to larger framing."],
 ["Joists","Secondary beams commonly used in mezzanines, floors and roof framing."],
 ["C & Z purlins","Cold-formed secondary roof members that support sheeting and distribute its loading."],
 ["Wall girts","Horizontal members supporting wall cladding and transferring loads into the frames."],
 ["Sag rods & struts","Restraint, alignment and stability members for secondary framing."],
 ["Bracing systems","Vertical and roof stability systems designed for wind, seismic and erection forces."],
 ["Roof sheeting & flashing","Building envelope systems, ridge caps, edge trims, gutters, valley drainage and weather seals."],
 ["Shear studs & deck panels","Composite floor interfaces in suitable steel–concrete systems."]
];
export default function Components(){return <main>
 <PageHero eyebrow="KNOWLEDGE CENTRE / PEB ANATOMY" title="Understand every component." intro="The vocabulary of a pre-engineered building, from framing geometry to secondary structural systems and weatherproofing details."/>
 <section className="section"><div className="shell"><div className="building-components-visual">
 <svg viewBox="0 0 960 430" role="img" aria-label="Simplified portal building showing columns, sloping rafters, purlins, girts, eave and ridge points">
 <rect width="960" height="430" fill="#E6EDF1"/>
 <g stroke="#2C3E50" strokeWidth="9" fill="none" strokeLinejoin="round"><path d="M98 355V167L383 58L668 167V355 M302 355V199L525 119L850 225V355 M98 167L302 199M383 58L525 119M668 167L850 225"/></g>
 <g stroke="#AC5555" strokeWidth="4" fill="none"><path d="M155 145L377 110L631 178M220 118L423 86L718 190M288 94L480 105L781 205"/><path d="M98 225H302M98 282H302M668 232H850M668 292H850"/></g>
 <g fill="#2C3E50" fontSize="19" fontWeight="700"><text x="335" y="37">RIDGE</text><text x="687" y="142">EAVE</text><text x="55" y="399">COLUMN</text><text x="459" y="270">RAFTER</text></g></svg>
 <p>Illustrative building anatomy. Primary framing is navy; secondary framing is red.</p></div>
 <div className="component-glossary">{glossary.map(([title,description],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div><Link className="text-link" href="/knowledge/peb-frame-systems">Explore frame types</Link></div></section>
 <CallToAction heading="Ask our engineers about your building."/></main>}