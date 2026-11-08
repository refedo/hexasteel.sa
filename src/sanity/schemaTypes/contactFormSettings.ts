import {defineField,defineType} from "sanity";
import {contactFormDefaults} from "../../lib/contactFormSettings";
export const contactFormSettings=defineType({
 name:"contactFormSettings",title:"Contact Form & Enquiry Email",type:"document",
 groups:[{name:"page",title:"Page & form"},{name:"fields",title:"Field labels & hints"},{name:"messages",title:"Consent & confirmation"},{name:"email",title:"Receiving email"}],
 fields:[
 ...Object.entries(contactFormDefaults).filter(([key])=>key!=="topics").map(([name,value])=>defineField({
  name,title:name.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase()),type:/Description|Intro|Note|Message|consentLabel/.test(name)?"text":"string",
  group:name.startsWith("email")&&!/Label|Placeholder/.test(name)?"email":/Label|Placeholder/.test(name)&&!['submitLabel','sendingLabel','consentLabel'].includes(name)?"fields":/success|consent|privacy/.test(name)?"messages":"page",
  initialValue:String(value),validation:r=>r.required().max(/Description|Intro|Note|Message|consentLabel/.test(name)?2000:200)
 })),
 defineField({name:"topics",title:"Enquiry categories",type:"array",group:"fields",description:"Published categories are used by both the website and server validation. Keep at least one category. Required core fields, security controls and private delivery destination are managed in code/server configuration.",initialValue:contactFormDefaults.topics,of:[{type:"string",validation:r=>r.required().max(100).regex(/^[^\r\n\u0000-\u001f]+$/)}],validation:r=>r.required().min(1).max(20).unique()})
 ],preview:{prepare:()=>({title:"Contact form & enquiry email"})}
});
