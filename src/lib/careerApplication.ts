export const applicationFields=[
 {name:'fullName',label:'Full name',max:120,required:true,section:'Contact details'},
 {name:'email',label:'Email',max:180,required:true,type:'email',section:'Contact details'},
 {name:'mobile',label:'Mobile (with country code)',max:24,required:true,type:'tel',section:'Contact details'},
 {name:'currentLocation',label:'Current city / country',max:160,required:true,section:'Contact details'},
 {name:'education',label:'Highest qualification & specialisation',max:240,required:true,section:'Professional background'},
 {name:'experience',label:'Relevant experience (years)',max:3,required:true,type:'number',section:'Professional background'},
 {name:'currentRole',label:'Current / most recent position',max:160,required:true,section:'Professional background'},
 {name:'currentEmployer',label:'Current / most recent employer (optional)',max:160,section:'Professional background'},
 {name:'skills',label:'Relevant technical skills',max:1500,required:true,type:'textarea',section:'Professional background'},
 {name:'certifications',label:'Certifications (optional)',max:1000,type:'textarea',section:'Professional background'},
 {name:'languages',label:'Languages & proficiency',max:300,required:true,section:'Professional background'},
 {name:'noticePeriod',label:'Notice period / earliest start date',max:160,required:true,section:'Availability'},
 {name:'workAuthorization',label:'Saudi work authorisation / sponsorship needs',max:300,required:true,section:'Availability'},
 {name:'expectedSalary',label:'Expected monthly salary in SAR (optional)',max:100,section:'Availability'},
 {name:'profileUrl',label:'LinkedIn / portfolio URL (optional)',max:500,type:'url',section:'Availability'},
 {name:'coverLetter',label:'Why are you suited to this position? (optional)',max:3000,type:'textarea',section:'Availability'}
] as const;
export function validateCareerApplication(form:FormData){
 const values:Record<string,string>={};
 for(const field of applicationFields){
  const raw=form.get(field.name);const value=typeof raw==='string'?raw.trim():'';
  if(value.length>field.max||('required' in field&&field.required&&!value)||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))return null;
  values[field.name]=value;
 }
 if(values.fullName.length<2||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)||! /^[+0-9 ()-]{7,24}$/.test(values.mobile)||!/^\d{1,2}$/.test(values.experience)||Number(values.experience)>50)return null;
 if(values.profileUrl){try{const url=new URL(values.profileUrl);if(!['http:','https:'].includes(url.protocol)||url.username||url.password)return null;}catch{return null;}}
 if(form.get('consent')!=='yes')return null;
 return values;
}
