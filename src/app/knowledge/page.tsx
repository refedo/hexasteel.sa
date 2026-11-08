import type {Metadata} from "next";
import Link from "next/link";
import {faqs} from "@/content/site";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {getKnowledgeArticles,getEditorialPage} from "@/lib/cms";
export const metadata:Metadata=publicPageMetadata("/knowledge","Steel Engineering Knowledge Centre","Practical guidance on structural steel, PEB, fabrication quality, manufacturing excellence and management.");
import {publicPageMetadata} from "@/lib/seo";

function formatLessonDate(date:string):string{
 return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(date+"T00:00:00Z"));
}
export default async function KnowledgePage(){
 const editorial=await getEditorialPage("knowledge");
 const entries=await getKnowledgeArticles();
 const lessons=entries.filter(entry=>entry.date).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
 const guides=entries.filter(entry=>!entry.date);
 return <main>
  <PageHero eyebrow="KNOWLEDGE CENTRE / SPREADING KNOWLEDGE" title={editorial?.title||"Knowledge that builds industry."} intro={editorial?.intro||"Practical engineering explanations, manufacturing improvement, leadership and project delivery insights—shared for the industry."}/>
  {lessons.length>0&&<section className="section" id="manufacturing-management">
    <div className="shell">
      <p className="eyebrow">MANUFACTURING / LEADERSHIP / FINANCE</p>
      <h2>Manufacturing & Management Field Notes</h2>
      <p>Practical lessons on factory performance, operations, business management and continuous improvement. Each note is dated to its original lesson.</p>
      <div className="editorial-grid">
        {lessons.map((entry,i)=><article key={entry.slug} className={i===0?"editorial-feature":"editorial-card"}>
          <span>{entry.category}</span>
          <p><time dateTime={entry.date}>{formatLessonDate(entry.date!)}</time></p>
          <h3><Link href={"/knowledge/"+entry.slug} className="hexa-stretched-link">{entry.title}</Link></h3>
          <p>{entry.intro}</p>
          <Link href={"/knowledge/"+entry.slug}>Read lesson</Link>
        </article>)}
      </div>
    </div>
  </section>}
  <section className="section">
    <div className="shell">
      <p className="eyebrow">ENGINEERING / QUALITY / OPERATIONS</p>
      <h2>Engineering & Quality Guides</h2>
      <div className="editorial-grid">
        {guides.map((entry,i)=><article key={entry.slug} className={i===0?"editorial-feature":"editorial-card"}>
          <span>{entry.category}</span>
          <h3><Link href={"/knowledge/"+entry.slug} className="hexa-stretched-link">{entry.title}</Link></h3>
          <p>{entry.intro}</p>
          <Link href={"/knowledge/"+entry.slug}>Read article</Link>
        </article>)}
      </div>
    </div>
  </section>
  <section className="section">
    <div className="shell">
      <p className="eyebrow">ILLUSTRATED KNOWLEDGE / PEB</p>
      <div className="editorial-grid">
        <article className="editorial-card">
          <span>FRAME DESIGN</span>
          <h3><Link href="/knowledge/peb-frame-systems" className="hexa-stretched-link">PEB Frame Types & Applications</Link></h3>
          <p>Single-span, multi-span, multi-gable, lean-to, canopy and curved roof geometries.</p>
          <Link href="/knowledge/peb-frame-systems">Explore frame guide</Link>
        </article>
        <article className="editorial-card">
          <span>BUILDING ANATOMY</span>
          <h3><Link href="/knowledge/peb-building-components" className="hexa-stretched-link">PEB Building Components</Link></h3>
          <p>Eave and ridge height, rafters, primary and secondary beams, purlins, girts, sag rods, struts and cladding.</p>
          <Link href="/knowledge/peb-building-components">Explore component guide</Link>
        </article>
      </div>
    </div>
  </section>
  <section className="section service-panel" id="faq"><div className="shell"><p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2>Answers from the factory floor.</h2><div className="faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
  <CallToAction heading="Bring us a technical question."/>
 </main>;
}
