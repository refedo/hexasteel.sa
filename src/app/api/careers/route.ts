import {NextResponse} from 'next/server';
import {readBoundedMultipart,trustedIntakeOrigin} from '@/lib/intakeBoundary';
import {getApplicationJob,jobAcceptsApplications} from '@/lib/careers';
import {applicationFields,validateCareerApplication} from '@/lib/careerApplication';
import {careersConfigured,careerRateLimited,scanCareerPdf} from '@/lib/careerSecurity';
export const runtime='nodejs';
function error(message:string,status:number){return NextResponse.json({error:message},{status,headers:{'Cache-Control':'no-store'}});}
export async function POST(request:Request){
 if(!trustedIntakeOrigin(request))return error('Invalid submission origin.',403);
 if(!careersConfigured())return error('Online applications are not enabled. Please contact HEXA Steel® for the HR application channel.',503);
 if(careerRateLimited(request))return error('Too many attempts. Please try again later.',429);
 const form=await readBoundedMultipart(request,5*1024*1024+40000);if(!form)return error('Invalid form or upload exceeds the 5 MB limit.',413);
 if(form.get('website'))return error('Invalid submission.',400);
 const input=validateCareerApplication(form);const id=form.get('jobId');const token=form.get('cf-turnstile-response');const cv=form.get('cv');
 if(!input||typeof id!=='string'||id.length>150||typeof token!=='string'||!token||token.length>3000||!(cv instanceof File))return error('Please check all required fields, consent and verification.',400);
 if(!cv.size||cv.size>5*1024*1024||!cv.name.toLowerCase().endsWith('.pdf')||!['application/pdf','application/octet-stream',''].includes(cv.type))return error('Upload a PDF CV up to 5 MB.',400);
 const bytes=new Uint8Array(await cv.arrayBuffer());if(Buffer.from(bytes.subarray(0,5)).toString()!=='%PDF-')return error('The CV is not a valid PDF file.',400);
 try{
  const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:process.env.CONTACT_TURNSTILE_SECRET_KEY!,response:token}),cache:'no-store',signal:AbortSignal.timeout(8000)});
  const check=await verification.json();if(!verification.ok||check.success!==true||!['hexasteel.sa','www.hexasteel.sa'].includes(check.hostname))return error('Verification failed. Please retry.',403);
  const job=await getApplicationJob(id);if(!job||!jobAcceptsApplications(job))return error('This position is no longer accepting applications.',409);
  if(!await scanCareerPdf(bytes))return error('CV security screening did not pass or is temporarily unavailable. Please retry with a PDF CV.',422);
  // Re-read immediately before delivery: status may have changed during scanning.
  const current=await getApplicationJob(id);if(!current||!jobAcceptsApplications(current))return error('This position is no longer accepting applications.',409);
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+process.env.CONTACT_RESEND_API_KEY},cache:'no-store',signal:AbortSignal.timeout(15000),body:JSON.stringify({from:process.env.CONTACT_RESEND_FROM_EMAIL,to:[process.env.CAREERS_TO_EMAIL],reply_to:input.email,subject:'HEXA Job Application — '+current.code+' — '+current.title,text:['Position: '+current.title,'Vacancy reference: '+current.code,...applicationFields.map(f=>f.label+': '+(input[f.name]||'Not provided')),'Recruitment consent: yes','Consent time: '+new Date().toISOString()].join('\n\n'),attachments:[{filename:'HEXA-CV.pdf',content:Buffer.from(bytes).toString('base64')}]})});
  if(!response.ok)return error('HR email delivery is temporarily unavailable. Please retry later.',502);
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch{return error('We could not confirm application delivery. Please try again later.',502);}
}
