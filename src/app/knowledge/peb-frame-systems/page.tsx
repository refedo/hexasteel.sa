import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {PEBFrames} from "@/components/PEBFrames";
export const metadata:Metadata={title:"PEB Frame Types & Applications",description:"Illustrated guide to single-span, multi-span, multi-gable, lean-to, cantilever and curved pre-engineered building frames."};
export default function Frames(){return <main>
 <PageHero eyebrow="KNOWLEDGE CENTRE / PEB FRAME SYSTEMS" title="A frame for every industrial purpose." intro="Explore popular pre-engineered steel building configurations and how their geometry influences space, fabrication, loads and site constraints."/>
 <section className="section"><div className="shell"><p className="eyebrow">ILLUSTRATED ENGINEERING GUIDE</p><h2>Frame forms.<br/><span>Explained visually.</span></h2><p>Conceptual illustrations; actual clear spans, column positions, member sizes and anchorage are determined by each project's design criteria.</p><PEBFrames/></div></section>
 <section className="industrial-section-band"><div className="shell industrial-band-layout"><div><p className="eyebrow on-dark">ENGINEERING & MANUFACTURING</p><h2>The right system starts with the building's function.</h2><p>Crane loads, roof drainage, ventilation, expansion, column positions, and local environmental loads all influence the framing strategy.</p></div><Link href="/solutions/peb" className="button outline">Explore PEB manufacturing</Link></div></section>
 <CallToAction heading="Discuss your next PEB structure."/></main>}