'use client';
import {useState,useRef,useEffect} from 'react';
import Script from 'next/script';
import type {JobPosting} from '@/lib/careers';
import {applicationFields} from '@/lib/careerApplication';
function Application({id,siteKey}:{id:string;siteKey:string}){
 const challenge=useRef<HTMLDivElement>(null);const widget=useRef<string|null>(null);
 useEffect(()=>{
  const api=()=> (window as Window&{turnstile?:{render:(element:HTMLElement,options:{sitekey:string})=>string;remove:(id:string)=>void}}).turnstile;
  const render=()=>{const turnstile=api();if(challenge.current&&turnstile&&widget.current===null)widget.current=turnstile.render(challenge.current,{sitekey:siteKey});};
  render();const timer=setInterval(render,250);
  return ()=>{clearInterval(timer);if(widget.current!==null){api()?.remove(widget.current);widget.current=null;}};
 },[siteKey]);
 const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');const [message,setMessage]=useState('');
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;const body=new FormData(form);const cv=body.get('cv');
  if(!(cv instanceof File)||!cv.size||cv.size>5*1024*1024){setMessage('Choose a PDF CV up to 5 MB.');setState('error');return;}
  setState('sending');setMessage('');
  try{const response=await fetch('/api/careers',{method:'POST',body,headers:{Accept:'application/json'}});const result=await response.json();if(!response.ok)throw new Error(result.error||'Unable to submit. Please retry.');form.reset();setState('success');setMessage('Your application has been delivered to HR. Thank you for your interest.');}
  catch(error){setState('error');setMessage(error instanceof Error?error.message:'Unable to submit.');}
  finally{(window as Window&{turnstile?:{reset:(id?:string)=>void}}).turnstile?.reset(widget.current||undefined);}
 }
 return <form className="career-application" onSubmit={submit} encType="multipart/form-data">
  <input type="hidden" name="jobId" value={id}/><p>Required fields are marked *. Provide recruitment information only; do not upload identity documents, bank details or other sensitive records.</p>
  {['Contact details','Professional background','Availability'].map(section=><fieldset key={section}><legend>{section}</legend><div className="career-fields">{applicationFields.filter(f=>f.section===section).map(f=>{
   const type='type' in f?f.type:'text';const required='required' in f&&f.required;
   return <label key={f.name}>{f.label}{required?' *':''}{type==='textarea'?<textarea name={f.name} required={required} maxLength={f.max} rows={4}/>:<input name={f.name} type={type} required={required} maxLength={f.max} min={type==='number'?0:undefined} max={type==='number'?50:undefined} step={type==='number'?1:undefined}/>}</label>;
  })}</div></fieldset>)}
  <label>CV (PDF only; maximum 5 MB) *<input type="file" required name="cv" accept=".pdf,application/pdf"/></label>
  <label className="career-consent"><input required name="consent" type="checkbox" value="yes"/> I consent to HEXA Steel® HR receiving and using my application and CV to evaluate this vacancy. My information will be sent to the private HR mailbox; it will not be published on the website.</label>
  <label className="careers-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
  <div ref={challenge}/>
  <button type="submit" className="button dark" disabled={state==='sending'}>{state==='sending'?'Sending application…':'Submit application'}</button>
  {message&&<p role={state==='error'?'alert':'status'} className={'career-feedback'+(state==='success'?' positive':'')}>{message}</p>}
 </form>;
}
export function CareerApplications({jobs,siteKey,enabled}:{jobs:JobPosting[];siteKey:string;enabled:boolean}){
 const [selected,setSelected]=useState<string|null>(null);
 return <div className="careers-jobs">{enabled&&<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive"/>}{jobs.map(job=><details className="career-role" key={job._id}>
 <summary><div className="career-card-heading"><span className="career-code">{job.code}</span><h3>{job.title}</h3><p>{job.team} · {job.location} · {job.employmentType}</p><span className={'career-status '+job.status}>{job.status==='open'?'Open':job.status==='onHold'?'On hold':'Closed'}</span></div><span className="career-expand" aria-hidden="true">+</span></summary>
 <div className="career-role-detail"><p>{job.workplace} · {job.openings} opening(s) · {job.minExperience}{job.maxExperience!=null?'–'+job.maxExperience:'+'} years of relevant experience</p>{job.closesAt&&<p>Application deadline: {new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Riyadh'}).format(new Date(job.closesAt))} (Riyadh)</p>}
 {([['Role overview',job.overview],['Responsibilities',job.responsibilities],['Qualifications',job.qualifications],['Technical skills',job.skills],['Certifications',job.certifications],['Languages',job.languages],['Benefits',job.benefits],['Salary / package',job.salaryDisplay],['Application instructions',job.applicationInstructions]] as const).filter(([,text])=>text).map(([heading,text])=><section key={heading}><h4>{heading}</h4><p className="career-copy">{text}</p></section>)}
 {job.status==='open'?(enabled?(selected===job._id?<Application id={job._id} siteKey={siteKey}/>:<button className="button dark" onClick={()=>setSelected(job._id)}>Apply for this position</button>):<p>Online applications are not currently enabled. Please contact HEXA Steel® for the HR application channel.</p>):<p>This position is {job.status==='onHold'?'on hold':'closed'} and is not accepting applications.</p>}
 </div></details>)}</div>;
}
