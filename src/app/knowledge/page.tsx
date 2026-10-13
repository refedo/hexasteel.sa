import type {Metadata} from "next";
import Link from "next/link";
import {articles,faqs} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {getKnowledgeArticles} from "@/lib/cms";
export const metadata:Metadata={title:"Knowledge Centre"};
export default async function KnowledgePage(){const entries=await getKnowledgeArticles();return <main><PageHero eyebrow="KNOWLEDGE CENTRE / SPREADING KNOWLEDGE" title="Knowledge that builds industry." intro="Practical engineering explanations, project delivery insights, manufacturing practices and steel quality resources—openly shared as part of our mission."/>
<section className="section"><div className="shell"><p className="eyebrow">ENGINEERING / QUALITY / OPERATIONS</p><div className="editorial-grid">{entries.map((a,i)=><article key={a.slug} className={i===0?"editorial-feature":"editorial-card"}><span>{a.category}</span><h3>{a.title}</h3><p>{a.intro}</p><Link href={"/knowledge/"+a.slug}>Read article ↗</Link></article>)}</div></div></section>
<section className="section service-panel" id="faq"><div className="shell"><p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2>Answers from the factory floor.</h2><div className="faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section><CallToAction heading="Bring us a technical question."/></main>}
