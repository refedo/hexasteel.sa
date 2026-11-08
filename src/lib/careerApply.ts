import type {JobPosting} from './careers';
/** Temporary recruitment destination authorized by management until OTS intake is ready. */
export const CAREER_APPLICATION_URL='https://docs.google.com/forms/d/e/1FAIpQLSe97YW_xAJpLyu6iOt-0_8gyPu3CpcrlZjrXEsLwAzWEQh_tA/viewform';
export function canApplyToJob(job:JobPosting,now=Date.now()){
 return job.approvedForWeb===true&&job.status==='open'&&Boolean(job.title&&job.code)&&(!job.opensAt||Date.parse(job.opensAt)<=now)&&(!job.closesAt||Date.parse(job.closesAt)>now);
}
