import type {Metadata} from "next";
import Link from "next/link";
import {PageHero} from "@/components/PageBlocks";
import {InsightsExplorer} from "@/components/InsightsExplorer";
import {getInsights} from "@/lib/cms";
export const metadata:Metadata={title:"Insights, News & Milestones"};
export default async function Insights(){const entries=await getInsights();return <main>
 <PageHero eyebrow="INSIGHTS / HEXA STEEL®" title="Progress worth documenting." intro="The investments, achievements, people and ideas behind our industrial development—from manufacturing approvals to technology, improvement and participation in Saudi industry."/>
 <section className="section insights-redesign"><div className="shell"><div className="section-intro"><p className="eyebrow">MILESTONES / INITIATIVES / INDUSTRIAL KNOWLEDGE</p><h2>Our journey.<br/><span>Our next benchmark.</span></h2><p>Browse the progress we make in operational excellence, manufacturing capability, talent development and industry engagement.</p></div><InsightsExplorer entries={entries}/></div></section>
 <section className="insights-next"><div className="shell insights-next-inner"><div><p className="eyebrow on-dark">FROM INDUSTRY PROGRESS TO SHARED KNOWLEDGE</p><h2>Improvement becomes valuable when knowledge is shared.</h2></div><Link className="button outline" href="/knowledge">Visit Knowledge Centre ↗</Link></div></section>
</main>}
