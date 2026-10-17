import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {insights} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {getInsights,getCmsInsights} from "@/lib/cms";
type Props={params:Promise<{slug:string}>};
import {stories} from "@/content/insightStories";

export function generateStaticParams(){return insights.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;return {title:(await getInsights()).find(x=>x.slug===slug)?.title||"Insights"}}
export default async function Insight({params}:Props){
 const {slug}=await params;const item=(await getInsights()).find(x=>x.slug===slug);if(!item)notFound();
 const live=(await getCmsInsights()).find(x=>x.slug===slug);
 const story=live?{lead:live.summary,sections:live.sections?.length?live.sections.map(s=>[s.heading,s.body] as [string,string]):(stories[slug]?.sections||[])}:stories[slug];if(!story)notFound();
 return <main><PageHero eyebrow={item.category.toUpperCase()+" / "+item.date} title={item.title} intro={story.lead}/>
  <section className="section"><article className="shell article-body"><p className="eyebrow">HEXA STEEL® / INDUSTRIAL JOURNEY</p>
  {story.sections.map(([heading,copy],i)=><section key={heading}><p className="eyebrow">0{i+1} / DEVELOPMENT</p><h2>{heading}</h2><p>{copy}</p></section>)}
  {"link" in story && story.link&&<Link href={story.link.href} className="text-link">{story.link.label}</Link>}
  <div className="article-rule"/><Link href="/insights" className="text-link">← All insights and milestones</Link></article></section>
  <CallToAction heading="Explore what Hexa can deliver."/></main>
}
