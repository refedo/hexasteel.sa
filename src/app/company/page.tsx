import {getEditorialPage} from "@/lib/cms";
import type {Metadata} from "next";
import Link from "next/link";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Company — Who We Are"};
const topics=[
 {number:"01",title:"Who We Are",tag:"IDENTITY & PHILOSOPHY",description:"Our vision, mission, core values, industrial mindset and journey.",href:"/company/about"},
 {number:"02",title:"Operational Excellence",tag:"CONTINUOUS IMPROVEMENT",description:"Standardization, SIRI assessment, OTS™, industrial technology and infrastructure.",href:"/company/operational-excellence"},
 {number:"03",title:"Our People & Academy",tag:"TEAM DEVELOPMENT",description:"Technical capability, engineering leadership and our knowledge-sharing philosophy.",href:"/company/people"},
 {number:"04",title:"Approvals & Qualifications",tag:"INDUSTRIAL CREDENTIALS",description:"Reported manufacturing approvals, prequalification and supply-chain registration.",href:"/company/approvals"},
 {number:"05",title:"Careers",tag:"JOIN HEXA STEEL®",description:"Develop your professional capabilities with an ambitious industrial team.",href:"/company/careers"}
];
export default async function Company(){const editorial=await getEditorialPage("company");return <main><PageHero eyebrow="COMPANY / HEXA STEEL®" title={editorial?.title||"Built on knowledge. Driven by progress."} intro={editorial?.intro||"A Saudi steel company integrating engineering, manufacturing and managed execution, with the ambition to set the benchmark for a new generation of industrial companies."}/><section className="section site-execution-section"><div className="shell"><p className="eyebrow">DISCOVER HEXA STEEL®</p><div className="execution-editorial">{topics.map(t=><Link href={t.href} className="company-navigation-row" key={t.href}><span>{t.number}</span><div><small>{t.tag}</small><strong>{t.title}</strong><p>{t.description}</p></div><b></b></Link>)}</div></div></section><CallToAction heading="Build with confidence."/></main>}
