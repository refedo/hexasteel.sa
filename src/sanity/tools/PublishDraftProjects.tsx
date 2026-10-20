"use client";

import {useCallback,useEffect,useMemo,useState} from "react";
import {useClient} from "sanity";
import styles from "./ImportWebsiteContent.module.css";

type ProjectDraft={
 _id:string;_rev:string;_type:"project";
 _createdAt?:string;_updatedAt?:string;
 publicTitle?:{en?:string};
 publicSlug?:{current?:string};
 publicSummary?:string;
 deliveryStatus?:string;
 approvedForWeb?:boolean;
 identityClearedForWeb?:boolean;
 [key:string]:unknown;
};
type ProjectIdentity={_id:string;slug?:string};

const DRAFT_PREFIX="drafts.";
const BATCH_SIZE=50;
const DRAFT_QUERY='*[_type=="project" && _id in path("drafts.**")] | order(_updatedAt desc)';
const RELATED_QUERY='*[_type=="project" && (_id in $ids || publicSlug.current in $slugs)]{"_id":_id,"slug":publicSlug.current}';
const STATUS_VALUES=new Set(["Completed","Ongoing","Status to confirm"]);

function getPublishedId(draft:ProjectDraft){
 return draft._id.slice(DRAFT_PREFIX.length);
}
function validateDraft(draft:ProjectDraft):string|null {
 const title=draft.publicTitle?.en?.trim();
 const slug=draft.publicSlug?.current?.trim();
 if(draft._type!=="project"||!draft._id.startsWith(DRAFT_PREFIX)||!draft._rev)return "invalid draft identifier or revision";
 if(!title)return "missing public title";
 if(!slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))return "missing or invalid public URL slug";
 if(!draft.publicSummary?.trim())return "missing public scope summary";
 if(!STATUS_VALUES.has(draft.deliveryStatus||""))return "delivery status needs editorial confirmation";
 return null;
}

/**
 * Studio-only project bulk publishing. Uses authenticated Sanity editor session.
 * Selection is taken from every current draft, not a hard-coded project list.
 * The explicit two-part editorial attestation is required before approval flags
 * are granted; unrelated projects and other document types are never changed.
 */
export function PublishDraftProjects(){
 const client=useClient({apiVersion:"2025-02-01"});
 const [drafts,setDrafts]=useState<ProjectDraft[]>([]);
 const [selected,setSelected]=useState<string[]>([]);
 const [factApproved,setFactApproved]=useState(false);
 const [identityApproved,setIdentityApproved]=useState(false);
 const [busy,setBusy]=useState(false);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");
 const [report,setReport]=useState("");

 const refresh=useCallback(async()=>{
  const result=await client.fetch<ProjectDraft[]>(DRAFT_QUERY,{}, {perspective:"raw",useCdn:false});
  const safe=(Array.isArray(result)?result:[]).filter(d=>d?._type==="project"&&d._id?.startsWith(DRAFT_PREFIX));
  setDrafts(safe);
  setSelected(previous=>previous.filter(id=>safe.some(d=>d._id===id)));
 },[client]);

 useEffect(()=>{
  let active=true;
  client.fetch<ProjectDraft[]>(DRAFT_QUERY,{}, {perspective:"raw",useCdn:false})
   .then(docs=>{if(active){setDrafts((docs||[]).filter(d=>d?._type==="project"&&d._id?.startsWith(DRAFT_PREFIX)));setLoading(false)}})
   .catch(cause=>{if(active){setError(cause instanceof Error?cause.message:"Could not load drafts.");setLoading(false)}});
  return()=>{active=false};
 },[client]);

 const selectedSet=useMemo(()=>new Set(selected),[selected]);
 const allSelected=drafts.length>0&&drafts.every(d=>selectedSet.has(d._id));
 const selectedCount=drafts.filter(d=>selectedSet.has(d._id)).length;

 function toggle(id:string){
  setSelected(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);
  setFactApproved(false);setIdentityApproved(false);setReport("");setError("");
 }
 function toggleAll(){
  setSelected(allSelected?[]:drafts.map(d=>d._id));
  setFactApproved(false);setIdentityApproved(false);setReport("");setError("");
 }

 async function publishSelected(){
  if(busy||selectedCount===0||!factApproved||!identityApproved)return;
  setBusy(true);setError("");setReport("");
  let published=0;
  try{
   const selectedIds=[...selectedSet];
   // Work from freshly loaded drafts, never from stale checkboxes.
   const current=await client.fetch<ProjectDraft[]>(DRAFT_QUERY,{}, {perspective:"raw",useCdn:false});
   const latest=new Map(current.map(doc=>[doc._id,doc]));
   const selection=selectedIds.map(id=>{
    const item=latest.get(id);
    if(!item)throw new Error("A selected draft is no longer available: "+id);
    return item;
   });
   // Fail closed when a document changed since the editor selected it.
   const displayed=new Map(drafts.map(doc=>[doc._id,doc._rev]));
   for(const draft of selection){
    if(displayed.get(draft._id)!==draft._rev)throw new Error("Some selected drafts changed. Refresh and review the updated content before publishing.");
    const issue=validateDraft(draft);
    if(issue)throw new Error((draft.publicTitle?.en||draft._id)+": "+issue);
   }

   const slugs=selection.map(d=>d.publicSlug!.current!);
   const publishedIds=selection.map(getPublishedId);
   if(new Set(slugs).size!==slugs.length)throw new Error("Selected drafts contain duplicate public URLs.");
   const related=await client.fetch<ProjectIdentity[]>(RELATED_QUERY,{ids:publishedIds,slugs},{perspective:"raw",useCdn:false});
   for(const doc of related){
    if(doc.slug&&slugs.includes(doc.slug)&&!selection.some(d=>d._id===doc._id||getPublishedId(d)===doc._id))
     throw new Error("Another project already uses the URL "+doc.slug+". Resolve the conflict in Studio.");
   }

   for(let start=0;start<selection.length;start+=BATCH_SIZE){
    const chunk=selection.slice(start,start+BATCH_SIZE);
    const tx=client.transaction();
    for(const draft of chunk){
     // Optimistic revision lock prevents publishing a draft modified during review.
     tx.patch(draft._id,patch=>patch.ifRevisionId(draft._rev).set({
      approvedForWeb:true,identityClearedForWeb:true
     }));
     const {_rev,_createdAt,_updatedAt,...content}=draft;
     tx.createOrReplace({
      ...content,_id:getPublishedId(draft),
      approvedForWeb:true,identityClearedForWeb:true
     });
     tx.delete(draft._id);
    }
    await tx.commit();
    published+=chunk.length;
   }
   setSelected([]);
   setFactApproved(false);setIdentityApproved(false);
   setReport("Published "+published+" selected "+(published===1?"project":"projects")+". No unselected drafts were changed. The public website may take up to two minutes to refresh.");
   await refresh();
  }catch(cause){
   setError((cause instanceof Error?cause.message:"Publishing failed.")+(published?" "+published+" projects were published before the error; refresh to review the remaining drafts.":" No projects were published by this action."));
   try{await refresh()}catch{/* Retain the publishing error instead of masking it. */}
  }finally{setBusy(false)}
 }

 return <div className={styles.wrapper}>
  <p className={styles.eyebrow}>HEXA STEEL® / SANITY EDITORIAL</p>
  <h1 className={styles.title}>Draft Projects Manager</h1>
  <p className={styles.lead}>Select any project drafts below or select all. Publish only the selected projects using your authorized Sanity account. New drafts added later will appear automatically when you refresh.</p>
  <div className={styles.action}>
   <button className={styles.secondary} type="button" disabled={busy||loading} onClick={()=>{setLoading(true);setError("");setReport("");refresh().catch(e=>setError(e instanceof Error?e.message:"Refresh failed.")).finally(()=>setLoading(false))}}>Refresh drafts</button>
   <span className={styles.note}>{loading?"Loading project drafts…":drafts.length+" draft projects available"}</span>
  </div>
  <div className={styles.selectionBar}>
   <label className={styles.selectionLabel}>
    <input type="checkbox" checked={allSelected} disabled={busy||drafts.length===0} onChange={toggleAll}/>
    Select all draft projects
   </label>
   <strong>{selectedCount} selected</strong>
  </div>
  <div className={styles.draftList} role="group" aria-label="Project drafts available for publication">
   {drafts.map(d=><label className={styles.draftRow} key={d._id}>
    <input type="checkbox" checked={selectedSet.has(d._id)} disabled={busy} onChange={()=>toggle(d._id)}/>
    <span className={styles.draftInfo}>
     <strong>{d.publicTitle?.en||"Untitled draft"}</strong>
     <small>{d.publicSlug?.current||"Missing URL slug"} · {d.deliveryStatus||"Status to confirm"}</small>
    </span>
   </label>)}
   {!loading&&drafts.length===0&&<p className={styles.empty}>No project drafts found. To prepare the 22 recently supplied projects, run “Import Current Website Content” in Studio first. New drafts you create directly in Studio will also appear here.</p>}
  </div>
  {selectedCount>0&&<div className={styles.warning}>
   <strong>Publication approval — {selectedCount} selected projects</strong>
   <p>Publishing releases project names, descriptions and any attached images on the public HEXA website. Only confirm after checking the selected projects. Both existing public-approval checks will be enabled for those records.</p>
   <label className={styles.confirmation}><input type="checkbox" checked={factApproved} disabled={busy} onChange={e=>setFactApproved(e.target.checked)}/>I have verified the selected projects’ details, image rights, and public scope.</label>
   <label className={styles.confirmation}><input type="checkbox" checked={identityApproved} disabled={busy} onChange={e=>setIdentityApproved(e.target.checked)}/>I confirm the selected customer and project identities may be disclosed publicly.</label>
  </div>}
  <div className={styles.action}>
   <button type="button" className={styles.primary} onClick={publishSelected} disabled={busy||!selectedCount||!factApproved||!identityApproved}> {busy?"Publishing selected projects…":"Publish selected ("+selectedCount+")"} </button>
   <span className={styles.note}>Only selected project drafts are affected. No changes to other projects or content types.</span>
  </div>
  {report&&<div role="status" className={styles.success}><strong>Publication completed</strong><p>{report}</p><p><a href="/projects" target="_blank" rel="noreferrer">Review published projects</a></p></div>}
  {error&&<div role="alert" className={styles.error}><strong>Publication not completed</strong><p>{error}</p></div>}
 </div>;
}
