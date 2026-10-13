import type {Metadata} from "next";
import Link from "next/link";
import {machines} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Steel Manufacturing Services & Capabilities"};
export default function Machinery(){return <main>
<PageHero eyebrow="CAPABILITIES / STEEL SERVICES" title="What we can make. How precisely we deliver." intro="Our manufacturing capabilities help customers move from approved drawings to fabricated steel—with flexibility across precision cutting, built-up members, purlins and structural assemblies."/>
<section className="section services-section"><div className="shell">
  <p className="eyebrow">OUR MANUFACTURING SERVICES</p>
  <div className="service-editorial-list">{machines.map((m,i)=><article className="service-editorial" id={m.slug} key={m.slug}>
    <div className="service-number">0{i+1}<span> / 04</span></div>
    <div className="service-editorial-description"><p className="eyebrow">{m.type}</p><h2>{m.name}</h2><p>{m.service}</p><details className="service-reveal"><summary>What we deliver <span>+</span></summary><ul>{m.outcomes.map(x=><li key={x}>{x}</li>)}</ul></details><Link className="text-link" href="/request-quotation">Request this service</Link></div>
    <div className={"service-art service-art-"+i} aria-hidden="true"><span className="service-art-form"/><span className="service-art-tag">{m.headline}</span></div>
  </article>)}</div>
</div></section>
<section className="section services-promise"><div className="shell services-promise-inner"><div><p className="eyebrow on-dark">PRECISION · FLEXIBILITY · QUALITY</p><h2>Manufacturing built around your project.</h2></div><p>We combine engineered shop drawings, production coordination, documented fabrication controls and the flexibility to support both complete steel packages and specialized manufacturing orders.</p></div></section>
<CallToAction heading="Tell us what you need manufactured." text="Send requirements, quantities and approved drawings to our commercial team."/></main>}
