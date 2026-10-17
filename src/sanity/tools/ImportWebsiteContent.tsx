"use client";

import {useEffect,useState} from "react";
import {useClient} from "sanity";
import {references,articles,insights,reportedQualifications} from "../../content/site";
import {defaultHeroSlides,homeCopy} from "../../content/cmsSeed";
import {publicPageDefaults} from "../../content/cmsPages";
import {projectIllustrations} from "../../content/cmsSeed";
import {stories} from "../../content/insightStories";
import styles from "./ImportWebsiteContent.module.css";

/**
 * One-time, idempotent editorial onboarding. Runs in the authenticated Studio
 * browser with the signed-in editor's Sanity permissions, never an API token.
 * Existing records are not overwritten. Imported records are DRAFTS ONLY.
 */
export function ImportWebsiteContent(){
 const client=useClient({apiVersion:"2025-02-01"});
 const [busy,setBusy]=useState(false);
 const [report,setReport]=useState("");
 const [error,setError]=useState("");
 const [counts,setCounts]=useState<Record<string,number>|null>(null);
 const [phase,setPhase]=useState("");
 useEffect(()=>{
  let cancelled=false;
  client.fetch<Record<string,number>>(`{
    "pages":count(*[_type=="page"]),
    "projects":count(*[_type=="project"]),
    "knowledge":count(*[_type=="knowledgeArticle"]),
    "insights":count(*[_type=="companyUpdate"]),
    "qualifications":count(*[_type=="publicQualification"])
  }`,{}, {perspective:"raw",useCdn:false}).then(data=>{if(!cancelled)setCounts(data)}).catch(()=>{if(!cancelled)setCounts(null)});
  return ()=>{cancelled=true};
 },[client]);
 async function importContent(){
  setBusy(true);setPhase("Preparing existing public records…");setError("");setReport("");
  try{
   const existing=await client.fetch<Array<{_type:string;name?:string;slug?:{current:string};publicSlug?:{current:string}}>>(
    '*[_type in ["project","knowledgeArticle","companyUpdate","publicQualification","page"]]{_type,name,slug,publicSlug}',{}, {perspective:"raw",useCdn:false}
   );
   const known=new Set(existing.map(doc=>doc._type+":"+(doc.publicSlug?.current||doc.slug?.current||doc.name||"").toLowerCase()));
   const tx=client.transaction();
   let newProjects=0,newArticles=0,newInsights=0,newQualifications=0,newPages=0;
   for(const p of publicPageDefaults){
    const routeKey=p.route.replaceAll("/","--");
    if(known.has("page:"+routeKey))continue;
    tx.createIfNotExists({
     _id:"drafts.hexa-page-"+routeKey,_type:"page",
     title:{_type:"localizedText",en:p.title},intro:{_type:"localizedText",en:p.intro},
     slug:{_type:"slug",current:routeKey},
     approvedForWeb:false,sections:[]
    });
    newPages++;
   }
   for(const [index,p] of references.entries()){
    if(known.has("project:"+p.slug))continue;
    tx.createIfNotExists({
     _id:"drafts.hexa-public-project-"+p.slug,_type:"project",
     publicTitle:{_type:"localizedText",en:p.title},
     publicSlug:{_type:"slug",current:p.slug},sector:p.category,
     publicSummary:p.description,quantityDisplay:p.size||undefined,
     illustrativeUrl:projectIllustrations[index%projectIllustrations.length],
     deliveryStatus:p.status,
     completionYear:p.year?Number(p.year):undefined,
     approvedForWeb:false,identityClearedForWeb:false
    });
    newProjects++;
   }
   for(const article of articles){
    if(known.has("knowledgeArticle:"+article.slug))continue;
    tx.createIfNotExists({
     _id:"drafts.hexa-knowledge-"+article.slug,_type:"knowledgeArticle",
     title:{_type:"localizedText",en:article.title},
     slug:{_type:"slug",current:article.slug},
     intro:{_type:"localizedText",en:article.intro},category:article.category,
     sections:article.sections.map(([heading,body],i)=>({
      _key:"section"+String(i+1),_type:"object",
      heading:{_type:"localizedText",en:heading},
      body:{_type:"localizedText",en:body}
     })),
     approvedForWeb:false
    });
    newArticles++;
   }
   for(const item of insights){
    if(known.has("companyUpdate:"+item.slug))continue;
    tx.createIfNotExists({
     _id:"drafts.hexa-insight-"+item.slug,_type:"companyUpdate",
     title:{_type:"localizedText",en:item.title},slug:{_type:"slug",current:item.slug},
     category:item.category,displayDate:item.date,
     summary:{_type:"localizedText",en:item.summary},
     sections:(stories[item.slug]?.sections||[]).map(([heading,body],i)=>({
       _key:"section"+String(i+1),_type:"object",
       heading:{_type:"localizedText",en:heading},
       body:{_type:"localizedText",en:body}
     })),approvedForWeb:false
    });
    newInsights++;
   }
   for(const item of reportedQualifications){
    if(known.has("publicQualification:"+item.name.toLowerCase()))continue;
    const slug=item.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
    tx.createIfNotExists({
     _id:"drafts.hexa-qualification-"+slug,_type:"publicQualification",
     name:item.name,category:"Other",detail:item.detail,
     logoUseAuthorized:false,verifiedScope:false,approvedForWeb:false
    });
    newQualifications++;
   }
   if(newProjects+newArticles+newInsights+newQualifications+newPages>0){
    setPhase("Creating editorial drafts in Sanity…");
    await tx.commit();
   }
   setPhase("Preparing homepage media and settings…");
   const defaultFields={
    heroHeadline:{_type:"localizedText",en:homeCopy.heroHeadline},
    heroDescription:{_type:"localizedText",en:homeCopy.heroDescription},
    marketPositioning:{_type:"localizedText",en:homeCopy.marketPositioning},
    heroSlides:defaultHeroSlides.map((slide,i)=>({
     _key:"original"+String(i+1),_type:"object",
     illustrativeUrl:slide.src,alt:slide.alt,title:slide.title,credit:slide.credit
    }))
   };
   const settings=await client.fetch<Array<Record<string,unknown> & {_id:string}>>(
    '*[_id in ["siteSettings","drafts.siteSettings"]]'
   );
   const draft=settings.find(d=>d._id==="drafts.siteSettings");
   if(draft){
    // setIfMissing never replaces an editor's existing draft content.
    await client.patch("drafts.siteSettings").setIfMissing(defaultFields).commit();
   }else{
    const live=settings.find(d=>d._id==="siteSettings");
    const safeCopy=Object.fromEntries(Object.entries(live||{}).filter(([key])=>!["_id","_rev","_createdAt","_updatedAt"].includes(key)));
    // Preserve genuine editorial content, but populate absent/empty source-driven
    // fields so the current homepage does not appear blank in Studio.
    const selected=(key:"heroHeadline"|"heroDescription"|"marketPositioning")=>{
     const value=safeCopy[key] as {en?:string}|undefined;
     return value?.en?.trim()?value:defaultFields[key];
    };
    await client.createIfNotExists({
     ...defaultFields,...safeCopy,
     heroHeadline:selected("heroHeadline"),
     heroDescription:selected("heroDescription"),
     marketPositioning:selected("marketPositioning"),
     heroSlides:Array.isArray(safeCopy.heroSlides)&&safeCopy.heroSlides.length>0?safeCopy.heroSlides:defaultFields.heroSlides,
     _id:"drafts.siteSettings",_type:"siteSettings",
     accentColor:(safeCopy.accentColor as string|undefined)||"#C6D547"
    });
   }
   const updated=await client.fetch<Record<string,number>>(`{
    "pages":count(*[_type=="page"]),
    "projects":count(*[_type=="project"]),
    "knowledge":count(*[_type=="knowledgeArticle"]),
    "insights":count(*[_type=="companyUpdate"]),
    "qualifications":count(*[_type=="publicQualification"])
   }`,{}, {perspective:"raw",useCdn:false});
   setCounts(updated);
   setPhase("");
   setReport("Created editable drafts: "+newPages+" website pages, "+newProjects+" projects, "+newArticles+" articles, "+newInsights+" insights, "+newQualifications+" qualifications. Existing records were left untouched. Homepage settings are saved as a draft; you must review and publish them to update the website.");
  }catch(cause){
   setError(cause instanceof Error?cause.message:"Import failed. Check your editorial permissions and retry.");
  }finally{setBusy(false);setPhase("");}
 }
 return <div className={styles.wrapper}>
  <p className={styles.eyebrow}>HEXA STEEL® / SANITY EDITORIAL</p>
  <h1 className={styles.title}>Populate existing website content</h1>
  <p className={styles.lead}>The website is already online, but most content still lives in source code. Use this action to create its missing editable Sanity records.</p>
  <div className={styles.action}>
   <button className={styles.primary} type="button" disabled={busy} onClick={importContent}>
    {busy?"Import in progress…":"Import existing website content"}
   </button>
   <span className={styles.note}>One-time import. Existing Sanity documents are preserved; changes are not published automatically.</span>
  </div>
  {busy&&<p className={styles.progress} role="status">{phase}</p>}
  {error&&<div className={styles.error} role="alert"><strong>Import did not finish.</strong><p>{error}</p><p>Nothing is auto-published. Check your Sanity editor permissions or connection and retry.</p></div>}
  {report&&<div className={styles.success} role="status"><strong>Import finished.</strong><p>{report}</p><p>Return to the Studio document lists (top-left back arrow) to see the newly created drafts.</p></div>}
  <h2 className={styles.subheading}>Existing records in Sanity</h2>
  <div className={styles.grid}>
   {([
    ["Website pages","pages",publicPageDefaults.length],
    ["Project references","projects",references.length],
    ["Knowledge articles","knowledge",articles.length],
    ["Insights","insights",insights.length],
    ["Qualifications","qualifications",reportedQualifications.length]
   ] as const).map(([name,key,target])=><div className={styles.metric} key={key}>
      <span className={styles.metricNumber}>{counts?counts[key]:"—"} <small>/ {target} starting records</small></span>
      <span className={styles.metricName}>{name}</span>
   </div>)}
  </div>
  <p className={styles.note}>Counts include existing documents and drafts, not just newly created items. They refresh after import. A fresh Studio navigation may be needed to update document lists.</p>
  <div className={styles.warning}>
   <strong>Public-content safeguards</strong>
   <p>Project titles and descriptions stay anonymous. Imported images are credited as illustrative, not HEXA project photographs. Replace them with authorized images and review accuracy, permissions, quantities and qualification status before publishing.</p>
  </div>
  <h2 className={styles.subheading}>What becomes editable</h2>
  <p>Homepage hero photographs and settings, project summaries and galleries, 21 website page headlines/introductions, Knowledge articles, Insight stories and public qualifications. You can edit each record under its Studio category after importing.</p>
  <p className={styles.note}>Full page-body layouts, some services, people profiles and other unconnected schemas remain a separate development milestone. Their empty folders do not mean the import failed.</p>
 </div>;
}
