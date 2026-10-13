import type {Metadata} from "next";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import Link from "next/link";
export const metadata:Metadata={title:"Careers at Hexa Steel®"};
export default function Careers(){return <main><PageHero eyebrow="COMPANY / CAREERS" title="Build structures. Build your career." intro="A culture of science, quality, flexibility, trust and simplicity provides an opportunity to grow with an ambitious Saudi industrial company."/>
<section className="section"><div className="shell editorial-statement"><div><p className="eyebrow">WE BUILD PEOPLE</p><h2>Capability is our<br/><span>greatest long-term asset.</span></h2></div><p>We develop technical expertise across engineering, project delivery, steel fabrication, quality, procurement, operations and manufacturing technologies. Hexa Academy supports learning and development.</p></div></section>
<section className="industrial-section-band"><div className="shell"><p className="eyebrow on-dark">PROFESSIONAL OPPORTUNITIES</p><h2>Interested in joining Hexa?</h2><p>Open roles and a dedicated recruitment application workflow will be published here once vacancies and HR submission processes are confirmed.</p><Link className="button outline" href="/contact">Contact our team ↗</Link></div></section><CallToAction heading="Progress begins with people."/></main>}
