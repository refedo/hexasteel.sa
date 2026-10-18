import type {MetadataRoute} from "next";
import {getProjects,getInsights,getKnowledgeArticles} from "@/lib/cms";
const base="https://hexasteel.sa";
const routes=[
"/","/products-services","/solutions/structural-steel","/solutions/peb",
"/services/design-detailing","/services/fabrication","/services/pipes-vessels",
"/products/sheeting","/products/steel-accessories",
"/capabilities/quality","/capabilities/coating","/capabilities/machinery",
"/company","/company/about","/company/approvals","/company/operational-excellence","/company/people","/company/careers",
"/project-delivery","/projects","/knowledge","/insights","/contact","/privacy","/request-quotation",
"/knowledge/peb-frame-systems","/knowledge/peb-building-components"
];
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const [projects,insights,articles]=await Promise.all([getProjects(),getInsights(),getKnowledgeArticles()]);
 const dynamic=[
 ...projects.map(x=>"/projects/"+x.slug),
 ...insights.map(x=>"/insights/"+x.slug),
 ...articles.map(x=>"/knowledge/"+x.slug)
 ];
 return [...new Set([...routes,...dynamic])].map(path=>({url:base+path,changeFrequency:path==="/"?"weekly" as const:"monthly" as const,priority:path==="/"?1:0.6}));
}
