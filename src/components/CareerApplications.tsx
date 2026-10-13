"use client";
import {useState} from "react";
import {openRoles} from "@/lib/jobs";
function Application({code}:{code:string}){
 const [state,setState]=useState<"idle"|"sending"|"success"|"error">("idle");
 const [message,setMessage]=useState("");
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault(); const form=event.currentTarget;setState("sending");setMessage("");
  try{
   const result=await fetch("/api/careers",{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
   const json=await result.json() as {error?:string};
   if(!result.ok)throw new Error(json.error||"We could not submit the application. Please try again.");
   form.reset();setState("success");setMessage("Application received. Thank you for your interest.");
  }catch(error){setState("error");setMessage(error instanceof Error?error.message:"We could not submit your application.");}
 }
 return <form className="career-application" onSubmit={submit} encType="multipart/form-data">
   <input type="hidden" name="jobCode" value={code}/>
   <div className="career-fields">
    <label>Full name <input required name="fullName" maxLength={120} autoComplete="name"/></label>
    <label>Email <input required name="email" type="email" maxLength={180} autoComplete="email"/></label>
    <label>Mobile <input required name="mobile" type="tel" maxLength={24} autoComplete="tel"/></label>
    <label>Relevant experience (years) <input required name="experience" type="number" min="0" max="50"/></label>
   </div>
   <label>Upload CV (PDF or DOCX; maximum 5 MB)<input type="file" required name="cv" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/></label>
   <label className="career-consent"><input required name="consent" type="checkbox" value="yes"/> I agree to Hexa Steel® processing my application and CV for recruitment evaluation.</label>
   <label className="careers-honeypot" aria-hidden="true">Website<input type="text" tabIndex={-1} autoComplete="off" name="website"/></label>
   <button type="submit" className="button dark" disabled={state==="sending"}>{state==="sending"?"Sending application":"Submit application"}</button>
   {message&&<p role="status" className={"career-feedback"+(state==="success"?" positive":"")}>{message}</p>}
 </form>;
}
export function CareerApplications(){return <div className="careers-jobs">{openRoles.map(job=><details className="career-role" key={job.code}>
 <summary><span className="career-code">{job.code}</span><div><h3>{job.title}</h3><p>{job.team} · {job.experience} experience</p></div><span className="career-expand" aria-hidden="true">+</span></summary>
 <div className="career-role-detail"><p>{job.overview}</p><h4>Apply for {job.title}</h4><Application code={job.code}/></div>
 </details>)}</div>}
