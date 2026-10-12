import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {insights} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return insights.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;return{title:insights.find(x=>x.slug===slug)?.title||"News"}}
export default async function Insight({params}:Props){const{slug}=await params;const p=insights.find(x=>x.slug===slug);if(!p)notFound();return <main><PageHero eyebrow={p.category.toUpperCase()+" / "+p.date} title={p.title} intro={p.summary}/><section className="section"><div className="shell article-body"><p>This milestone forms part of Hexa Steel®'s long-term commitment to industrial development, professional capabilities, operational improvement and disciplined execution.</p><p>Further original photographs, approved documentation and milestone-specific details will be added by the communications team after editorial verification.</p><div className="article-rule"/><Link href="/insights" className="text-link">← All insights & milestones</Link></div></section><CallToAction heading="Explore our industrial capabilities."/></main>}
