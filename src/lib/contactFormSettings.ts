import {createClient} from "next-sanity";
export const contactFormDefaults={
 heroTitle:"Let's make the next project happen.",
 heroDescription:"Discuss your structural steel project, industrial building, manufacturing requirements or engineering enquiry directly with our team.",
 formEyebrow:"GENERAL ENQUIRY",formTitle:"How can we help?",formIntro:"Tell us about your requirements. Our team will help you take the next step.",
 nameLabel:"Full name",emailLabel:"Work email",companyLabel:"Company",topicLabel:"Enquiry type",messageLabel:"Message",
 namePlaceholder:"Your full name",emailPlaceholder:"you@company.com",companyPlaceholder:"Company name",topicPlaceholder:"Select a category",messagePlaceholder:"Tell us about your project, scope and requirements…",
 submitLabel:"Submit enquiry",sendingLabel:"Sending…",
 consentLabel:"I agree that HEXA Steel® may use my details to respond to this enquiry.",
 privacyNote:"Your enquiry will be sent privately to our commercial team. Do not include confidential drawings or credentials.",
 successTitle:"Thank you for contacting HEXA Steel®.",
 successMessage:"Your enquiry has been accepted by our email service for delivery to our commercial team. We will review your message and respond using the email address you supplied.",
 emailHeading:"New website enquiry",emailIntro:"A new enquiry has been received through hexasteel.sa.",emailFooter:"Private commercial correspondence · HEXA Steel®",
 topics:["Structural Steel","Pre-Engineered Buildings","Project Management","Steel Services","Vendor Registration","General Enquiry"]
};
export type ContactFormSettings=typeof contactFormDefaults;
export function normalizeContactFormSettings(raw:Record<string,unknown>|null):ContactFormSettings{
 const result={...contactFormDefaults};
 for(const key of Object.keys(contactFormDefaults) as (keyof ContactFormSettings)[]){
  if(key==='topics')continue;
  const value=raw?.[key];
  if(typeof value==='string'&&value.trim())result[key]=value.trim().slice(0,2000);
 }
 const topics=raw?.topics;
 if(Array.isArray(topics)){
  const valid=[...new Set(topics.filter((x):x is string=>typeof x==='string').map(x=>x.trim()).filter(x=>x.length>0&&x.length<=100&&!/[\r\n\u0000-\u001f]/.test(x)))].slice(0,20);
  if(valid.length)result.topics=valid;
 }
 return result;
}
export async function getContactFormSettings():Promise<ContactFormSettings>{
 try{
  const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"ik7morln",dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-02-01",useCdn:true});
  return normalizeContactFormSettings(await client.fetch('*[_type=="contactFormSettings" && _id=="contactFormSettings"][0]',{}, {next:{revalidate:30}}));
 }catch{return normalizeContactFormSettings(null);}
}
