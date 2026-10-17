"use client";

import {useState} from "react";
import {useClient} from "sanity";
import {references,articles,insights,reportedQualifications} from "../../content/site";
import {defaultHeroSlides,homeCopy} from "../../content/cmsSeed";
import {publicPageDefaults} from "../../content/cmsPages";

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
 async function importContent(){
  setBusy(true);setError("");setReport("");
  try{
   const existing=await client.fetch<Array<{_type:string;name?:string;slug?:{current:string};publicSlug?:{current:string}}>>(
    '*[_type in ["project","knowledgeArticle","companyUpdate","publicQualification","page"]]{_type,name,slug,publicSlug}'
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
   for(const p of references){
    if(known.has("project:"+p.slug))continue;
    tx.createIfNotExists({
     _id:"drafts.hexa-public-project-"+p.slug,_type:"project",
     publicTitle:{_type:"localizedText",en:p.title},
     publicSlug:{_type:"slug",current:p.slug},sector:p.category,
     publicSummary:p.description,quantityDisplay:p.size||undefined,
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
     sections:[],approvedForWeb:false
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
   if(newProjects+newArticles+newInsights+newQualifications+newPages>0)await tx.commit();
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
    await client.createIfNotExists({
     ...defaultFields,...safeCopy,
     _id:"drafts.siteSettings",_type:"siteSettings",
     accentColor:(safeCopy.accentColor as string|undefined)||"#C6D547"
    });
   }
   setReport("Created editable drafts: "+newPages+" website pages, "+newProjects+" projects, "+newArticles+" articles, "+newInsights+" insights, "+newQualifications+" qualifications. Existing records were left untouched. Homepage settings are saved as a draft; you must review and publish them to update the website.");
  }catch(cause){
   setError(cause instanceof Error?cause.message:"Import failed. Check your editorial permissions and retry.");
  }finally{setBusy(false);}
 }
 return <div style={{padding:"clamp(20px,4vw,44px)",maxWidth:780,color:"#2C3E50",fontFamily:"system-ui,sans-serif"}}>
  <p style={{fontSize:12,fontWeight:800,letterSpacing:1}}>HEXA STEEL® / CONTENT MANAGEMENT</p>
  <h1 style={{fontSize:32,margin:"12px 0"}}>Import existing website content</h1>
  <p>Sanity is connected, but the public website currently contains several built-in editorial records. Import them as drafts so you can edit the actual live content in Studio without retyping it.</p>
  <p>The import includes the homepage headline and existing illustrative hero images, website page introductions, anonymous project references, technical articles, Insights and qualifications. It never overwrites existing documents or automatically publishes changes.</p>
  <div style={{borderLeft:"3px solid #2C3E50",padding:"12px 18px",background:"#edf2f4",margin:"24px 0"}}>
   <strong>Before you publish:</strong>
   <p style={{marginBottom:0}}>Replace illustrative Unsplash images with approved HEXA photography. Confirm anonymous project descriptions, permissions, quantities, qualifications and logo rights. Drafts and unapproved records remain outside public CMS queries.</p>
  </div>
  <button type="button" disabled={busy} onClick={importContent} style={{background:"#2C3E50",color:"#fff",border:0,padding:"14px 22px",fontWeight:750,cursor:busy?"wait":"pointer"}}>
   {busy?"Importing…":"Create missing editable drafts"}
  </button>
  {report&&<p role="status" style={{marginTop:24,whiteSpace:"pre-wrap"}}>{report}</p>}
  {error&&<p role="alert" style={{marginTop:24,color:"#a32020"}}>{error}</p>}
  <p style={{marginTop:28,fontSize:13}}>After import: open Website Settings → Homepage Hero Images, Website Page → select a page, or Public Project Case Study → select a draft → upload cover/gallery images → review publication flags → Publish. New approved records automatically replace matching built-in entries after cache refresh.</p>
 </div>;
}
