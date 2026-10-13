import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {values} from "@/content/site";
export const metadata:Metadata={title:"Who We Are"};
export default function About(){return <main><PageHero eyebrow="COMPANY / WHO WE ARE" title="Science at our foundation. Quality in our culture." intro="Founded in 2020, Hexa Steel® is an ambitious Saudi steel fabrication and project-delivery company committed to industrial quality, delivery discipline and continuous development."/>
<section className="section editorial-capability-intro"><div className="shell editorial-statement"><div><p className="eyebrow">OUR VISION</p><h2>To dominate steel<br/><span>through quality and speed.</span></h2></div><p>Our vision is to lead through premium quality and speed of delivery. Our Big Hairy Audacious Goal (BHAG) is to become the industry's benchmark, while our mission is spreading knowledge and leveraging industrial steel standards.</p></div></section>
<section className="section values-section"><div className="shell"><p className="eyebrow">MINDSET DNA</p><h2>Values that guide<br/><span>every decision.</span></h2><div className="values">{values.map(([name,description],i)=><div key={name}><small>0{i+1}</small><h3>{name}</h3><p>{description}</p></div>)}</div></div></section>
<section className="industrial-section-band"><div className="shell industrial-band-layout"><div><p className="eyebrow on-dark">TOISC™ / OUR FIVE OPERATING PILLARS</p><h2>Team. Operations. Infrastructure. Strategy. Creativity.</h2><p>Our industrial culture combines competent people, disciplined operations, continual investment, deliberate strategic planning and creative problem-solving.</p></div><Link href="/company/operational-excellence" className="button outline">Our improvement journey</Link></div></section>
<CallToAction heading="Work with an ambitious industrial partner."/></main>}
