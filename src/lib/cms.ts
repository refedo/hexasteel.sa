import {createClient} from "next-sanity";
import {articles,insights,references} from "@/content/site";
import {qualificationLogos} from "@/content/qualificationLogos";
import {isSafePublicImage} from "@/content/cmsSeed";
import type {SearchResult} from "@/lib/searchIndex";

type Project = (typeof references)[number] & {gallery?:{src:string;alt:string}[];scope?:string};
type Insight = (typeof insights)[number];
type Article = (typeof articles)[number];

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ik7morln";
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const client=projectId ? createClient({projectId,dataset,apiVersion:"2025-02-01",useCdn:true}) : null;
const siteQuery='*[_type=="siteSettings" && _id=="siteSettings"][0]{ "heroHeadline":heroHeadline.en, "heroDescription":heroDescription.en, "marketPositioning":marketPositioning.en, "headerTagline":headerTagline.en, "contactMobile":contactMobile, "whatsappEnabled":whatsappEnabled, "trustIndicators":trustIndicators[approvedForWeb==true]{figure,unit,description,"symbol":coalesce(symbol,"01")}, "heroSlides":heroSlides[]{"src":coalesce(asset.asset->url,illustrativeUrl),"alt":alt,"title":title,"credit":credit} }';
type HomeSettings={heroHeadline?:string|null;heroDescription?:string|null;marketPositioning?:string|null;headerTagline?:string|null;contactMobile?:string|null;whatsappEnabled?:boolean|null;trustIndicators?:{figure:string;unit:string;description:string;symbol:string}[];heroSlides?:{src:string;alt:string;title:string;credit:string}[]};
type CmsProject={slug:string;title:string;category:string;description:string;year?:string;size?:string;status?:string;image?:string;gallery?:{src:string;alt?:string}[];scope?:string};
type CmsInsight={slug:string;title:string;summary:string;category:string;date:string;sections?:{heading:string;body:string}[]};
type CmsArticle={slug:string;title:string;intro:string;category:string;sections:{heading:string;body:string}[]};
const projectQuery='*[_type=="project" && approvedForWeb==true && identityClearedForWeb==true && defined(publicSlug.current)]{ "slug":publicSlug.current,"title":publicTitle.en,"category":sector,"description":publicSummary,"year":string(completionYear),"size":quantityDisplay,"status":deliveryStatus,"image":coverImage.asset->url,"gallery":photos[]{"src":asset->url,"alt":alt},"scope":scope }';
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
 return (await safeFetch<CmsProject>(projectQuery)).filter(x=>x.slug&&x.title&&x.description).map(x=>({...x,category:x.category||"Structural Steel",year:x.year||"",size:x.size||"",status:x.status||"Status to confirm",image:isSafePublicImage(x.image)?x.image:"",gallery:(x.gallery||[]).filter(p=>isSafePublicImage(p.src)).map(p=>({src:p.src,alt:p.alt||x.title+" approved project photograph"}))}));
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
 const heroSlides=(result.heroSlides||[]).filter(x=>isSafePublicImage(x.src)&&x.title&&x.alt).slice(0,6);
 return {...result,heroSlides};
 } catch {return {}}
}
export async function getCmsSearchEntries():Promise<SearchResult[]>{
 if(!client)return [];
 const [projects,stories,guides]=await Promise.all([getCmsProjects(),getCmsInsights(),getCmsArticles()]);
 return [
 ...projects.map(x=>({title:x.title,description:x.description,category:"Projects",href:"/projects/"+x.slug,keywords:x.category})),
 ...stories.map(x=>({title:x.title,description:x.summary,category:"Insights",href:"/insights/"+x.slug,keywords:x.category+" "+x.date+" "+(x.sections||[]).map(s=>s.heading+" "+s.body).join(" ")})),
 ...guides.map(x=>({title:x.title,description:x.intro,category:"Knowledge",href:"/knowledge/"+x.slug,keywords:x.category+" "+x.sections.map(s=>s.heading+" "+s.body).join(" ")}))
 ];
}
export type PublicQualification={name:string;detail:string;logoUrl?:string;logoAlt?:string;logoSource?:string};
export async function getQualifications():Promise<PublicQualification[]>{
 const {reportedQualifications}=await import("@/content/site");
 // Keep the public, management-reported list intact when CMS has only a subset.
 const byName=new Map<string,PublicQualification>(reportedQualifications.map(x=>{
  const image=qualificationLogos[x.name];
  return [x.name.toLowerCase(),{...x,logoUrl:image?.url,logoSource:image?.source,logoAlt:x.name+" official logo"}];
 }));
 const live=await safeFetch<{name:string;detail:string;logoUrl?:string;logoAlt?:string}>(
  '*[_type=="publicQualification" && approvedForWeb==true && verifiedScope==true]{name,detail,"logoUrl":select(logoUseAuthorized==true=>logo.asset->url,""),logoAlt}'
 );
 for(const record of live){
  if(!record.name?.trim()||!record.detail?.trim())continue;
  const name=record.name.trim(),fallback=byName.get(name.toLowerCase());
  // Prefer an explicitly-cleared, original CMS asset. Never accept arbitrary
  // CMS-hosted remote URL fields or files from restricted datasets.
  const cmsLogo=record.logoUrl?.startsWith("https://cdn.sanity.io/images/ik7morln/production/")
   ?record.logoUrl:undefined;
  const chosen=cmsLogo||fallback?.logoUrl;
  byName.set(name.toLowerCase(),{
   name,detail:record.detail,logoUrl:chosen,
   logoSource:cmsLogo?undefined:fallback?.logoSource,
   logoAlt:record.logoAlt?.trim()||name+" official logo"
  });
 }
 return [...byName.values()];
}

export const cmsConfigured=Boolean(projectId);

/** Explicit public page overrides; unapproved drafts never enter the website. */
export async function getEditorialPage(route:string):Promise<{title:string;intro:string}|null>{
 if(!client)return null;
 try{
  const data=await client.fetch<{title?:string;intro?:string}|null>(
   '*[_type=="page" && approvedForWeb==true && slug.current==$route][0]{"title":title.en,"intro":intro.en}',
   {route},{next:{revalidate:120}}
  );
  return data?.title&&data?.intro?{title:data.title,intro:data.intro}:null;
 }catch{return null}
}
