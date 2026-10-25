import type {JobPosting} from '@/lib/careers';
import {CAREER_APPLICATION_URL,canApplyToJob} from '@/lib/careerApply';
export function CareerApplications({jobs}:{jobs:JobPosting[]}){
 return <div className="careers-jobs">{jobs.map(job=><article className="career-card" key={job._id}><details className="career-role">
 <summary><div className="career-card-heading"><span className="career-code">{job.code}</span><h3>{job.title}</h3><p>{job.team} · {job.location} · {job.employmentType}</p><span className={'career-status '+job.status}>{job.status==='open'?'Open':job.status==='onHold'?'On hold':'Closed'}</span></div><span className="career-expand" aria-hidden="true">+</span></summary>
 <div className="career-role-detail"><p>{job.workplace} · {job.openings} opening(s) · {job.minExperience}{job.maxExperience!=null?'–'+job.maxExperience:'+'} years of relevant experience</p>{job.closesAt&&<p>Application deadline: {new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Riyadh'}).format(new Date(job.closesAt))} (Riyadh)</p>}
 {([['Role overview',job.overview],['Responsibilities',job.responsibilities],['Qualifications',job.qualifications],['Technical skills',job.skills],['Certifications',job.certifications],['Languages',job.languages],['Benefits',job.benefits],['Salary / package',job.salaryDisplay],['Application instructions',job.applicationInstructions]] as const).filter(([,text])=>text).map(([heading,text])=><section key={heading}><h4>{heading}</h4><p className="career-copy">{text}</p></section>)}

 </div></details>{canApplyToJob(job)&&<div className="career-card-apply"><a className="button dark" href={CAREER_APPLICATION_URL} target="_blank" rel="noopener noreferrer" aria-label={"Apply for this job: "+job.title}>Apply for this job</a><p>Applications are completed on Google Forms. Google sign-in is required.</p></div>}</article>)}</div>;
}
