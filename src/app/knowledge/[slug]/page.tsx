import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {articles} from "@/content/site";
import {managementLessons} from "@/content/managementLessons";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {getKnowledgeArticles} from "@/lib/cms";
import {publicPageMetadata} from "@/lib/seo";
type Props={params:Promise<{slug:string}>};
function formatLessonDate(date:string):string{
 return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(date+"T00:00:00Z"));
}
export function generateStaticParams(){return [...articles,...managementLessons].map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const{slug}=await params;
 const entry=(await getKnowledgeArticles()).find(x=>x.slug===slug);
 return entry?publicPageMetadata("/knowledge/"+encodeURIComponent(slug),entry.title,entry.intro):{title:"Article not found",robots:{index:false,follow:false}};
}
export default async function KnowledgeArticle({params}:Props){
 const{slug}=await params;
 const entry=(await getKnowledgeArticles()).find(x=>x.slug===slug);
 if(!entry)notFound();
 const isLesson=Boolean(entry.date);
 return <main>
  <PageHero eyebrow={entry.category.toUpperCase()+" / KNOWLEDGE CENTRE"} title={entry.title} intro={entry.intro}/>
  <section className="section"><article className="shell article-body">
    {entry.date&&<p className="eyebrow">ORIGINAL LESSON DATE / <time dateTime={entry.date}>{formatLessonDate(entry.date)}</time></p>}
    {entry.sections.map(([heading,body],i)=><section key={heading}>
      <p className="eyebrow">{String(i+1).padStart(2,"0")} / {isLesson?"LEARNING NOTE":"FIELD NOTE"}</p>
      <h2>{heading}</h2><p>{body}</p>
    </section>)}
    {entry.resource&&<section>
      <p className="eyebrow">CONTINUE LEARNING / EXTERNAL RESOURCE</p>
      <h2>Recommended reading or viewing</h2>
      <p><a href={entry.resource.url} target="_blank" rel="noopener noreferrer">{entry.resource.title}</a></p>
      <p>{entry.resource.creator} · {entry.resource.format} · {entry.resource.time}</p>
    </section>}
    <p className="legal-note">Educational content. Numerical case studies are illustrative and do not report HEXA Steel® operational performance. For actual projects, contractual requirements, applicable standards and approved engineering documents take precedence.</p>
    <div className="article-rule"/>
    <Link href="/knowledge" className="text-link">← Knowledge Centre</Link>
  </article></section>
  <CallToAction heading={isLesson?"Discuss operational improvements.":"Discuss the technical requirements."}/>
 </main>;
}
