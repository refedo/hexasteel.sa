import Link from "next/link";
import type {Metadata} from "next";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Products & Services"};
const groups=[
 {label:"01 / PRODUCTS",title:"Structural Steel",description:"Engineered heavy and conventional steel for industrial, commercial and infrastructure works.",href:"/solutions/structural-steel",symbol:"STRUCTURES"},
 {label:"02 / PRODUCTS",title:"Pre-Engineered Buildings",description:"Integrated factory and warehouse systems with primary steel, secondary framing and managed project delivery.",href:"/solutions/peb",symbol:"PEB"},
 {label:"03 / ENGINEERING",title:"Design & Detailing",description:"Structural design and fabrication detailing coordinated around the contract's AISC, MBMA and AWS requirements.",href:"/services/design-detailing",symbol:"DESIGN"},
 {label:"04 / MANUFACTURING",title:"Steel Fabrication & Processing",description:"Complex fabricated assemblies, CNC laser cutting, C/Z purlins and built-up sections.",href:"/services/fabrication",symbol:"STEEL"},
 {label:"05 / INDUSTRIAL",title:"Pipes & Vessels",description:"Industrial mechanical steelwork and engineered tank / vessel packages by documented project scope.",href:"/services/pipes-vessels",symbol:"PROCESS"},
 {label:"06 / PROTECTION",title:"Coating & Galvanization",description:"Protective systems selected by environmental corrosivity and project standards.",href:"/capabilities/coating",symbol:"COATING"},
 {label:"07 / BUILDING ENVELOPE",title:"Sheeting & Cladding",description:"Sandwich panels, single-skin roofing, metal decks, gutters, ridge caps and flashings.",href:"/products/sheeting",symbol:"CLADDING"},
 {label:"08 / INDUSTRIAL ACCESSORIES",title:"Steel Accessories",description:"Grating, handrails, stairs, platforms, crane support systems, C/Z purlins, girts and shear studs.",href:"/products/steel-accessories",symbol:"COMPONENTS"},
 {label:"09 / SUPPLY CHAIN",title:"Procurement & Supply Chain",description:"Approved steel sourcing, supplier coordination, documentation, logistics and project-based material planning.",href:"/services/supply-chain",symbol:"SOURCING"}
];
export default function ProductsServices(){return <main><PageHero eyebrow="PRODUCTS & SERVICES / WHAT WE DELIVER" title="A complete steel capability." intro="Engineering and manufacturing are integrated with documented quality, supply chain control and deliberate contractual delivery."/>
 <section className="section services-section"><div className="shell"><p className="eyebrow">SOLUTIONS & CAPABILITIES</p><div className="service-editorial-list">{groups.map((g,i)=><article className="service-editorial" key={g.href}><div className="service-number">{String(i+1).padStart(2,"0")}</div><div className="service-editorial-description"><p className="eyebrow">{g.label}</p><h2>{g.title}</h2><p>{g.description}</p><Link className="text-link" href={g.href}>Explore the service</Link></div><div className="service-art" aria-hidden="true"><span className="service-art-tag">{g.symbol}</span></div></article>)}</div></div></section>
 <CallToAction heading="Tell us what needs to be engineered and fabricated."/></main>}
