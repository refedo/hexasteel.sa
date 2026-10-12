import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {articles} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const a=articles.find(x=>x.slug===slug);return{title:a?.title||"Technical Article",description:a?.intro}}
export default async function KnowledgeArticle({params}:Props){const{slug}=await params;const a=articles.find(x=>x.slug===slug);if(!a)notFound();return <main><PageHero eyebrow={a.category.toUpperCase()+" / KNOWLEDGE CENTRE"} title={a.title} intro={a.intro}/>
<section className="section"><article className="shell article-body">{a.sections.map(([heading,body],i)=><section key={heading}><p className="eyebrow">0{i+1} / FIELD NOTE</p><h2>{heading}</h2><p>{body}</p></section>)}<p className="legal-note">For educational purposes. Project-specific engineering requirements, standards and approved design documents take precedence.</p><div className="article-rule"/><Link href="/knowledge" className="text-link">← Knowledge Centre</Link></article></section><CallToAction heading="Discuss the technical requirements."/></main>}
