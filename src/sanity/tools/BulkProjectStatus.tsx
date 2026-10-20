"use client";
import {useClient} from "sanity";
import {useEffect,useState} from "react";
import styles from "./ImportWebsiteContent.module.css";

type ProjectRecord={
 _id:string;_rev:string;
 publicTitle?:{en?:string};publicSlug?:{current?:string};
 deliveryStatus?:string;approvedForWeb?:boolean;identityClearedForWeb?:boolean;
};
const QUERY='*[_type=="project"] | order(publicTitle.en asc){_id,_rev,publicTitle,publicSlug,deliveryStatus,approvedForWeb,identityClearedForWeb}';
const OPTIONS=["Completed","Ongoing","Status to confirm"] as const;
type Status=typeof OPTIONS[number];

export function BulkProjectStatus(){
 const client=useClient({apiVersion:"2025-02-01"});
 const [records,setRecords]=useState<ProjectRecord[]>([]);
 const [checked,setChecked]=useState<string[]>([]);
 const [status,setStatus]=useState<Status>("Status to confirm");
 const [loading,setLoading]=useState(true);
 const [working,setWorking]=useState(false);
 const [confirm,setConfirm]=useState(false);
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");
 async function load(){
  const list=await client.fetch<ProjectRecord[]>(QUERY,{}, {perspective:"raw",useCdn:false});
  // Show a draft in preference to its corresponding published record, so
  // unapproved edits are never overwritten in the public version.
  const unique=new Map<string,ProjectRecord>();
  for(const doc of list){
   const id=doc._id.replace(/^drafts\./,"");
   const previous=unique.get(id);
   if(!previous||doc._id.startsWith("drafts."))unique.set(id,doc);
  }
  const docs=[...unique.values()];
  setRecords(docs);
  setChecked(previous=>previous.filter(id=>docs.some(d=>d._id===id)));
 }
 useEffect(()=>{
  let alive=true;
  client.fetch<ProjectRecord[]>(QUERY,{}, {perspective:"raw",useCdn:false}).then(list=>{
   if(!alive)return;
   const unique=new Map<string,ProjectRecord>();
   for(const doc of list){
    const id=doc._id.replace(/^drafts\./,"");
    const previous=unique.get(id);
    if(!previous||doc._id.startsWith("drafts."))unique.set(id,doc);
   }
   setRecords([...unique.values()]);setLoading(false);
  }).catch(err=>{if(alive){setError(String(err));setLoading(false);}});
  return()=>{alive=false};
 },[client]);
 const allSelected=records.length>0&&records.every(r=>checked.includes(r._id));
 function changeSelection(next:string[]){setChecked(next);setConfirm(false);setMessage("");}
 async function apply(){
  if(!confirm||working||checked.length===0)return;
  setWorking(true);setError("");setMessage("");
  try{
   const fresh=await client.fetch<ProjectRecord[]>(QUERY,{}, {perspective:"raw",useCdn:false});
   const byId=new Map(fresh.map(doc=>[doc._id,doc]));
   for(const id of checked){
    const displayed=records.find(d=>d._id===id),live=byId.get(id);
    if(!displayed||!live||displayed._rev!==live._rev)throw new Error("Selected project changed; refresh before updating.");
   }
   const tx=client.transaction();
   for(const id of checked){
    const doc=byId.get(id)!;
    tx.patch(id,patch=>patch.ifRevisionId(doc._rev).set({deliveryStatus:status}));
   }
   await tx.commit();
   setMessage("Updated "+checked.length+" project status values to "+status+". Draft changes are not automatically published. Existing live records change on the public website after cache refresh.");
   setChecked([]);setConfirm(false);
   await load();
  }catch(cause){setError(cause instanceof Error?cause.message:"Update failed.");}
  finally{setWorking(false);}
 }
 return <div className={styles.wrapper}>
  <p className={styles.eyebrow}>HEXA STEEL® / PROJECT EDITORIAL</p>
  <h1 className={styles.title}>Bulk Project Status</h1>
  <p className={styles.lead}>Select projects and apply one delivery status to all selected records. Drafts remain drafts; changing a published project updates its public status.</p>
  <div className={styles.action}><button className={styles.secondary} disabled={loading||working} onClick={()=>{setLoading(true);load().catch(e=>setError(String(e))).finally(()=>setLoading(false));}}>Refresh list</button><span className={styles.note}>{records.length} project records</span></div>
  <div className={styles.selectionBar}><label className={styles.selectionLabel}><input type="checkbox" disabled={!records.length||working} checked={allSelected} onChange={()=>changeSelection(allSelected?[]:records.map(d=>d._id))}/>Select all projects</label><strong>{checked.length} selected</strong></div>
  <div className={styles.draftList}>{records.map(d=><label key={d._id} className={styles.draftRow}><input type="checkbox" disabled={working} checked={checked.includes(d._id)} onChange={()=>changeSelection(checked.includes(d._id)?checked.filter(id=>id!==d._id):[...checked,d._id])}/><span className={styles.draftInfo}><strong>{d.publicTitle?.en||"Untitled Project"}</strong><small>{d.deliveryStatus||"Status to confirm"} · {d._id.startsWith("drafts.")?"Draft":"Published record"}</small></span></label>)}</div>
  <div className={styles.action}><label className={styles.selectionLabel}>Set delivery status <select value={status} disabled={working} onChange={e=>{setStatus(e.target.value as Status);setConfirm(false);}}>{OPTIONS.map(option=><option key={option}>{option}</option>)}</select></label></div>
  <label className={styles.confirmation}><input type="checkbox" checked={confirm} disabled={working||checked.length===0} onChange={e=>setConfirm(e.target.checked)}/>I confirm the selected projects' delivery statuses are verified and may be updated.</label>
  <div className={styles.action}><button className={styles.primary} disabled={working||!confirm||checked.length===0} onClick={apply}>{working?"Updating…":"Update selected ("+checked.length+")"}</button></div>
  {message&&<p className={styles.success} role="status">{message}</p>}{error&&<p className={styles.error} role="alert">{error}</p>}
 </div>;
}
