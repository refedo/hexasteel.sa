'use client';
import {useState} from 'react';
import {useClient} from 'sanity';
import {openRoles} from '../../lib/jobs';
export function ImportCareerRoles(){
 const client=useClient({apiVersion:'2025-02-01'});const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
 async function seed(){setBusy(true);try{
  const existing=await client.fetch<{code:string}[]>('*[_type=="jobPosting"]{code}',{},{perspective:'raw',useCdn:false});
  const known=new Set(existing.map(x=>x.code));const tx=client.transaction();let count=0;
  for(const role of openRoles){if(known.has(role.code))continue;tx.createIfNotExists({_id:'drafts.hexa-career-'+role.code,_type:'jobPosting',code:role.code,title:role.title,team:role.team,overview:role.overview,minExperience:5,maxExperience:8,status:'draft',approvedForWeb:false,location:'Riyadh, Saudi Arabia',employmentType:'Full-time',workplace:'On-site',openings:1});count++;}
  if(count)await tx.commit();setMessage(`${count} missing roles prepared as drafts. Complete responsibilities, qualifications and skills, set Open and approve for website, then Publish. Existing roles were preserved.`);
 }catch{setMessage('Import failed. Check your Sanity permissions and retry.');}finally{setBusy(false);}}
 return <section style={{padding:32,maxWidth:760}}><h1>Prepare existing career opportunities</h1><p>Import the five existing website roles once as unpublished drafts. Existing references and published or closed roles will never be overwritten. Applicants and CVs are never stored here.</p><button disabled={busy} onClick={seed}>{busy?'Preparing…':'Prepare missing career drafts'}</button><p role="status">{message}</p></section>;
}
