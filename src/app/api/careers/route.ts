import {NextResponse} from "next/server";
import {openRoles} from "@/lib/jobs";
export const runtime="nodejs";
const maxSize=5*1024*1024;
function textValue(v:FormDataEntryValue|null,max:number){return typeof v==="string"?v.trim().slice(0,max):""}
export async function POST(request:Request){
 const expectedOrigin=new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://hexasteel.sa").origin;
 if(request.headers.get("origin")!==expectedOrigin)return NextResponse.json({error:"Invalid submission origin."},{status:403});
 const key=process.env.RESEND_API_KEY,receiver=process.env.CAREERS_TO_EMAIL,from=process.env.CONTACT_FROM_EMAIL;
 if(!key||!receiver||!from)return NextResponse.json({error:"CV submission is not active yet. Please contact our HR team for the application channel."},{status:503});
 const length=Number(request.headers.get("content-length")||0);
 if(length>maxSize+50000)return NextResponse.json({error:"CV exceeds the 5 MB limit."},{status:413});
 let form:FormData;
 try{form=await request.formData()}catch{return NextResponse.json({error:"Invalid request."},{status:400})}
 if(textValue(form.get("website"),100))return NextResponse.json({ok:true});
 const jobCode=textValue(form.get("jobCode"),20),name=textValue(form.get("fullName"),120),email=textValue(form.get("email"),180),mobile=textValue(form.get("mobile"),24),exp=Number(textValue(form.get("experience"),3));
 const role=openRoles.find(x=>x.code===jobCode),attachment=form.get("cv");
 if(!role||name.length<2||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||!/^[+0-9 ()-]{7,24}$/.test(mobile)||!Number.isFinite(exp)||exp<0||exp>50||form.get("consent")!=="yes"||!(attachment instanceof File))
 return NextResponse.json({error:"Please complete all required fields."},{status:400});
 if(attachment.size<1||attachment.size>maxSize)return NextResponse.json({error:"Your CV must be under 5 MB."},{status:400});
 const ext=attachment.name.toLowerCase().split(".").pop();
 if(ext!=="pdf"&&ext!=="docx")return NextResponse.json({error:"Only PDF or DOCX files are accepted."},{status:400});
 const data=new Uint8Array(await attachment.arrayBuffer());
 const pdf=ext==="pdf"&&data.slice(0,5).join(",")==="37,80,68,70,45";
 const docx=ext==="docx"&&data.slice(0,4).join(",")==="80,75,3,4";
 if(!(pdf||docx))return NextResponse.json({error:"CV file format did not pass validation."},{status:400});
 // Keep recruitment files away from Sanity's public content dataset. Email to the private HR inbox only.
 const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+key},body:JSON.stringify({from,to:[receiver],reply_to:email,subject:"HEXA Job Application — "+jobCode+" — "+role.title,
 text:["Job: "+role.title,"Reference: "+jobCode,"Applicant: "+name,"Email: "+email,"Mobile: "+mobile,"Relevant experience: "+exp+" years","Recruitment consent: yes"].join("\n"),
 attachments:[{filename:"HEXA-CV-"+jobCode+"."+ext,content:Buffer.from(data).toString("base64")}]}),cache:"no-store"});
 if(!response.ok)return NextResponse.json({error:"Recruitment email delivery is temporarily unavailable."},{status:502});
 return NextResponse.json({ok:true});
}
