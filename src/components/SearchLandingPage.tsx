import Link from "next/link";
import { PageHero, CallToAction } from "@/components/PageBlocks";

type Section = { heading: string; detail: string };
type Related = { label: string; href: string };

export function SearchLandingPage({ eyebrow, title, intro, sections, related, cta }:{
  eyebrow: string; title: string; intro: string; sections: Section[]; related: Related[]; cta: string;
}) {
  return <main>
    <PageHero eyebrow={eyebrow} title={title} intro={intro}/>
    <section className="section">
      <div className="shell">
        <p className="eyebrow">SCOPE & TECHNICAL COORDINATION</p>
        <h2>Project requirements.<br/><span>Manufacturing discipline.</span></h2>
        <div className="component-glossary">
          {sections.map((section, index) => <article key={section.heading}>
            <span>{String(index + 1).padStart(2,"0")}</span>
            <div><h3>{section.heading}</h3><p>{section.detail}</p></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section">
      <div className="shell">
        <p className="eyebrow">EXPLORE RELATED CAPABILITIES</p>
        <div className="edge-links">
          {related.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </div>
      </div>
    </section>
    <CallToAction heading={cta} text="Share the project scope, drawing, quantities and quality requirements so we can assess the available fabrication or engineering route."/>
  </main>;
}
