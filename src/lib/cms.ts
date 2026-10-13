import {createClient} from "next-sanity";
import {articles,insights,references} from "@/content/site";
import type {SearchResult} from "@/lib/searchIndex";

type Project = (typeof references)[number];
type Insight = (typeof insights)[number];
type Article = (typeof articles)[number];

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ik7morln";
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const client=projectId ? createClient({projectId,dataset,apiVersion:"2025-02-01",useCdn:true}) : null;
const siteQuery='*[_type=="siteSettings" && _id=="siteSettings"][0]{ "heroHeadline":heroHeadline.en, "heroDescription":heroDescription.en, "ambition":ambition.en, "heroSlides":heroSlides[]{"src":asset.asset->url,"alt":alt,"title":title,"credit":credit} }';
type HomeSettings={heroHeadline?:string|null;heroDescription?:string|null;ambition?:string|null;heroSlides?:{src:string;alt:string;title:string;credit:string}[]};
type CmsProject={slug:string;title:string;category:string;description:string;year?:string;size?:string;status?:string;image?:string};
type CmsInsight={slug:string;title:string;summary:string;category:string;date:string;sections?:{heading:string;body:string}[]};
type CmsArticle={slug:string;title:string;intro:string;category:string;sections:{heading:string;body:string}[]};
const projectQuery='*[_type=="project" && approvedForWeb==true && clientPermissionVerified==true && defined(slug.current)]{ "slug":slug.current,"title":title.en,"category":sector,"description":summary,"year":string(completionYear),"size":quantityDisplay,"status":status,"image":coverImage.asset->url }';
const insightQuery='*[_type=="companyUpdate" && approvedForWeb==true && defined(slug.current)]{ "slug":slug.current,"title":title.en,"summary":summary.en,"category":category,"date":displayDate,"sections":sections[]{"heading":heading.en,"body":body.en} }';
const knowledgeQuery='*[_type=="knowledgeArticle" && approvedForWeb==true && defined(slug.current)]{ "slug":slug.current,"title":title.en,"intro":intro.en,"category":category,"sections":sections[]{"heading":heading.en,"body":body.en} }';

async function safeFetch<T>(query:string):Promise<T[]> {
 if(!client)return [];
 try {const result=await client.fetch<T[]>(query,{}, {next:{revalidate:120}});return Array.isArray(result)?result:[]}
 catch {return []}
}
function combine<T extends {slug:string}>(fallback:readonly T[],cms:T[]):T[]{
 const bySlug=new Map(fallback.map(x=>[x.slug,x]));
 for(const record of cms)if(record.slug)bySlug.set(record.slug,record);
 return [...bySlug.values()];
}
export async function getCmsProjects():Promise<CmsProject[]>{
 return (await safeFetch<CmsProject>(projectQuery)).filter(x=>x.slug&&x.title&&x.description).map(x=>({...x,category:x.category||"Structural Steel",year:x.year||"",size:x.size||"",status:x.status||"Selected Project",image:x.image?.startsWith("https://cdn.sanity.io/")?x.image:""}));
}
export async function getProjects():Promise<Project[]> {return combine(references,await getCmsProjects() as Project[])}
export async function getCmsInsights():Promise<CmsInsight[]>{
 return (await safeFetch<CmsInsight>(insightQuery)).filter(x=>x.slug&&x.title&&x.summary&&x.category).map(x=>({...x,date:x.date||"News"}));
}
export async function getInsights():Promise<Insight[]> {return combine(insights,await getCmsInsights() as Insight[])}
export async function getCmsArticles():Promise<CmsArticle[]>{
 return (await safeFetch<CmsArticle>(knowledgeQuery)).filter(x=>x.slug&&x.title&&x.intro&&x.category&&x.sections?.length>0);
}
export async function getKnowledgeArticles():Promise<Article[]> {
 return combine(articles,(await getCmsArticles()).map(x=>({...x,sections:x.sections.map(section=>[section.heading,section.body] as [string,string])})));
}
export async function getHomeSettings():Promise<HomeSettings>{
 if(!client)return {};
 try {
 const result=await client.fetch<HomeSettings|null>(siteQuery,{}, {next:{revalidate:120}});
 if(!result)return {};
 const heroSlides=(result.heroSlides||[]).filter(x=>x.src?.startsWith("https://cdn.sanity.io/")&&x.title&&x.alt).slice(0,6);
 return {...result,heroSlides};
 } catch {return {}}
}
export async function getCmsSearchEntries():Promise<SearchResult[]>{
 if(!client)return [];
 const [projects,stories,guides]=await Promise.all([getCmsProjects(),getCmsInsights(),getCmsArticles()]);
 return [
 ...projects.map(x=>({title:x.title,description:x.description,category:"Projects",href:"/projects/"+x.slug,keywords:x.category})),
 ...stories.map(x=>({title:x.title,description:x.summary,category:"Insights",href:"/insights/"+x.slug,keywords:x.category+" "+x.date})),
 ...guides.map(x=>({title:x.title,description:x.intro,category:"Knowledge",href:"/knowledge/"+x.slug,keywords:x.category+" "+x.sections.map(s=>s.heading).join(" ")}))
 ];
}
export const cmsConfigured=Boolean(projectId);
