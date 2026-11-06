import {createClient} from 'next-sanity';
export type JobPosting={_id:string;code:string;title:string;status:'draft'|'open'|'onHold'|'closed';approvedForWeb:boolean;team:string;location:string;employmentType:string;workplace:string;openings:number;opensAt?:string;closesAt?:string;overview:string;responsibilities?:string;qualifications?:string;skills?:string;minExperience:number;maxExperience?:number;certifications?:string;languages?:string;benefits?:string;salaryDisplay?:string;applicationInstructions?:string};
export function jobAcceptsApplications(job:JobPosting,now=Date.now()){
 return job.approvedForWeb===true&&job.status==='open'&&Boolean(job.code&&job.title)&&
  (!job.opensAt||Date.parse(job.opensAt)<=now)&&(!job.closesAt||Date.parse(job.closesAt)>now);
}
const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'ik7morln',dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2025-02-01',useCdn:false,perspective:'published'});
const projection='{_id,code,title,status,approvedForWeb,team,location,employmentType,workplace,openings,opensAt,closesAt,overview,responsibilities,qualifications,skills,minExperience,maxExperience,certifications,languages,benefits,salaryDisplay,applicationInstructions}';
// No hard-coded fallback: a closed/deleted vacancy must never be resurrected.
export async function getCareerJobs():Promise<JobPosting[]>{
 return client.fetch<JobPosting[]>('*[_type=="jobPosting" && approvedForWeb==true && status in ["open","onHold","closed"]] | order(title asc) '+projection,{}, {cache:'no-store'});
}
export async function getApplicationJob(id:string):Promise<JobPosting|null>{
 return client.fetch<JobPosting|null>('*[_type=="jobPosting" && _id==$id][0]'+projection,{id},{cache:'no-store'});
}
