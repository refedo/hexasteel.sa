import type {Metadata} from "next";
import Link from "next/link";
import {insights} from "@/content/site";
import {PageHero} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Insights & Milestones"};
export default function Insights(){return <main><PageHero eyebrow="INSIGHTS / NEWS / INDUSTRIAL PROGRESS" title="Progress worth documenting." intro="Industrial milestones, manufacturing investments, strategic initiatives, knowledge development and Hexa Steel® corporate news."/>
<section className="section"><div className="shell editorial-grid insights-list">{insights.map((p,i)=><article className={i===0?"editorial-feature":"editorial-card"} key={p.slug}><span>{p.category} · {p.date}</span><h3>{p.title}</h3><p>{p.summary}</p><Link href={"/insights/"+p.slug}>Read the update ↗</Link></article>)}</div></section></main>}
