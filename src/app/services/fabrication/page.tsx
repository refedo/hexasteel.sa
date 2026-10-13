import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Steel Fabrication & Processing"};
const areas=[
 ["Cutting & Processing","Precision CNC laser cutting and profile processing of approved project material and component shapes."],
 ["Built-up Members","Assembled and welded structural sections manufactured to approved engineering and fabrication requirements."],
 ["C/Z Purlin Forming","Cold-formed roof purlins and girts for PEB and other industrial steel structures."],
 ["Fit-up & Welding","Controlled fabrication, welding inspection and dimensional verification to project quality criteria."],
 ["Finishing & Dispatch","Surface preparation coordination, coating interfaces, identification, packing and logistics preparation."]
];
export default function Fabrication(){return <main><PageHero eyebrow="SERVICES / STEEL FABRICATION" title="Precision manufacturing. Flexible steel solutions." intro="From complex structural assemblies to separate laser-cut components and formed purlins, our Steel Services arm helps customers source fabricated steel with accountable quality and reliable coordination."/><section className="section services-section"><div className="shell"><p className="eyebrow">FABRICATION & PROCESSING</p><div className="service-editorial-list">{areas.map(([name,description],i)=><article className="service-editorial" key={name}><div className="service-number">0{i+1}</div><div className="service-editorial-description"><h2>{name}</h2><p>{description}</p><Link href="/request-quotation" className="text-link">Request manufacturing quotation</Link></div><div className="service-art" aria-hidden="true"><span className="service-art-tag">STEEL / SERVICES</span></div></article>)}</div></div></section><CallToAction heading="Find the right fabrication solution."/></main>}
