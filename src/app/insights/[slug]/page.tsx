import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {insights} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {getInsights,getCmsInsights} from "@/lib/cms";
type Props={params:Promise<{slug:string}>};
const stories:Record<string,{lead:string,sections:[string,string][],link?:{href:string,label:string}}>={
 "amp-cohort-one":{lead:"Hexa Steel® was formally selected for Cohort #1 of the Public Investment Fund (PIF) Accelerated Manufacturing Program (AMP) in September 2024.",sections:[
 ["Industrial capability development","Participation in AMP formed part of Hexa's commitment to developing its operations, strengthening manufacturing competitiveness and engaging with Saudi industrial initiatives."],
 ["From assessment to implementation","For Hexa, industrial development translates into manufacturing investment, production improvement, people capability and better project execution."]],
 link:{href:"/company/operational-excellence",label:"Explore operational excellence"}},
 "private-sector-forum-2025":{lead:"In February 2025, Hexa Steel® participated in the Public Investment Fund (PIF) Private Sector Forum (PSF), a platform connecting industry and business partners.",sections:[
 ["Industry collaboration","The forum provides an opportunity for industrial companies to engage with partners across Saudi Arabia's growing private-sector ecosystem."],
 ["Our objective","Our participation supported visibility for Hexa's steel engineering, manufacturing and project-delivery capabilities."]]},
 "saudi-industry-forum-2025":{lead:"Hexa Steel® participated in Saudi Industry Forum (SIF) in Dhahran in June 2025.",sections:[
 ["Industrial engagement","SIF brings together manufacturers, sector specialists and business stakeholders. For Hexa, participation helps strengthen relationships and present our integrated steel capabilities."],
 ["What we represent","Structural steel, pre-engineered buildings, precision manufacturing, steel services and accountable project delivery."]]},
 "siri-assessment-2025":{lead:"Hexa Steel® conducted the Smart Industry Readiness Index (SIRI) assessment in 2025 as part of its commitment to continuous industrial improvement.",sections:[
 ["A structured maturity baseline","SIRI supports evaluation of industrial operations and transformation readiness. The assessment helps organizations understand process, technology and organizational development needs."],
 ["Turning maturity into improvement","Hexa uses assessment-led thinking to prioritize standardization, automation, digital visibility, capability-building, infrastructure and manufacturing process improvements."],
 ["Continuous improvement, not a one-time event","The assessment contributes to a broader journey that includes internal operational systems, quality documentation, skills development, and more deliberate execution."]],link:{href:"/company/operational-excellence",label:"Our improvement philosophy"}},
 "aramco-approval-2025":{lead:"Hexa Steel® gained Saudi Aramco manufacturer approval in October 2025, a major qualification milestone in its industrial journey.",sections:[
 ["Manufacturing discipline","Manufacturer qualification reflects the importance of documented processes, production capability, quality systems and responsible delivery."],
 ["Scope of approval","Hexa communicates approved manufacturing categories to clients through the relevant official qualification documentation."]],link:{href:"/capabilities/quality",label:"Our quality approach"}},
 "modon-expansion-2026":{lead:"Hexa Steel® has planned a 16,415 m² facility expansion in MODON as part of its next chapter of industrial growth.",sections:[
 ["Manufacturing growth","The planned facility is intended to support more integrated operations, production technology and room for continued industrial development."],
 ["Future capacity","The expansion remains planned and is not presented as existing, commissioned production capacity."]],link:{href:"/capabilities/machinery",label:"Explore our manufacturing services"}}
};
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
