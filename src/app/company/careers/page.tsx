import {getEditorialPage} from '@/lib/cms';
import type {Metadata} from 'next';
import {PageHero} from '@/components/PageBlocks';
import {CareerApplications} from '@/components/CareerApplications';
import {getCareerJobs,jobAcceptsApplications} from '@/lib/careers';
import {careersConfigured} from '@/lib/careerSecurity';
export const dynamic='force-dynamic';
export const metadata:Metadata={alternates:{canonical:'https://hexasteel.sa/company/careers'},title:'Join Our Team — Career Opportunities',description:'Explore career opportunities at HEXA Steel® in engineering, production, quality, sales and project delivery.'};
export default async function Careers(){
 const editorial=await getEditorialPage("company--careers");let unavailable=false;
 const records=await getCareerJobs().catch(()=>{unavailable=true;return [];});const now=Date.now();
 const jobs=records.filter(j=>j.title&&j.code&&(!j.opensAt||Date.parse(j.opensAt)<=now)).map(j=>({...j,status:j.status==='open'&&!jobAcceptsApplications(j,now)?'closed' as const:j.status}));
 return <main><PageHero eyebrow="COMPANY / JOIN OUR TEAM" title="Join our team." intro={editorial?.intro||'Join our engineering, production, quality, sales and project-delivery teams. HEXA Steel® values science, flexibility and continuous learning.'}/><section className="section careers-section"><div className="shell"><p className="eyebrow">CAREER OPPORTUNITIES</p><h2>Grow with <span>HEXA Steel®.</span></h2><p className="careers-intro">Explore each position’s responsibilities, qualifications and application requirements.</p>{jobs.length?<CareerApplications jobs={jobs} siteKey={process.env.CONTACT_TURNSTILE_SITE_KEY||''} enabled={careersConfigured()}/>:<p role="status">{unavailable?'Career opportunities are temporarily unavailable. Please check back shortly.':'There are currently no published opportunities. Please check back for new positions.'}</p>}</div></section></main>;
}
