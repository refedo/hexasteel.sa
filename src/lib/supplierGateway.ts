
import { NextResponse } from "next/server";
const allowedHost = "ots.hexasteel.sa";
export function supplierConfigured(){
 return process.env.SUPPLIER_REGISTRATION_ENABLED === "true" &&
 Boolean(process.env.SUPPLIER_OTS_API_KEY) &&
 Boolean(process.env.SUPPLIER_TURNSTILE_SECRET_KEY);
}
export function sameOrigin(request:Request){
 const origin=request.headers.get("origin");
 if(!origin) return false;
 try {
  const u=new URL(origin);
  const host=new URL(request.url).host;
  return u.protocol==="https:" && u.host===host && (host==="hexasteel.sa"||host==="www.hexasteel.sa");
 } catch { return false; }
}
export async function verifyTurnstile(token:string){
 if(!token||!process.env.SUPPLIER_TURNSTILE_SECRET_KEY) return false;
 const data=new URLSearchParams({secret:process.env.SUPPLIER_TURNSTILE_SECRET_KEY,response:token});
 try {
  const response=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:data,cache:"no-store",signal:AbortSignal.timeout(8000)});
  if(!response.ok) return false;
  const result=await response.json() as {success?:boolean;hostname?:string};
  return result.success===true && ["hexasteel.sa","www.hexasteel.sa"].includes(result.hostname||"");
 }catch{return false;}
}
export async function supplierProxy(path:"" | "/track",body:FormData) {
 const key=process.env.SUPPLIER_OTS_API_KEY;
 if(!supplierConfigured()||!key) return NextResponse.json({error:"Supplier registration is not enabled yet."},{status:503});
 const configured=process.env.SUPPLIER_OTS_BASE_URL||"https://ots.hexasteel.sa";
 let url:URL;
 try {url=new URL(configured);}catch{return NextResponse.json({error:"Supplier service is unavailable."},{status:503});}
 if(url.protocol!=="https:"||url.hostname!==allowedHost||url.pathname!=="/"||url.search||url.hash) return NextResponse.json({error:"Supplier service configuration is invalid."},{status:503});
 try{
  const result=await fetch(url.origin+"/api/supplier-intake"+path,{method:"POST",headers:{"x-hexa-supplier-key":key},body,cache:"no-store",signal:AbortSignal.timeout(80000)});
  const json=await result.json().catch(()=>({error:"Supplier service did not respond correctly."}));
  // The OTS API only exposes public-safe fields for this interface.
  return NextResponse.json(json,{status:result.status,headers:{"Cache-Control":"no-store"}});
 }catch{return NextResponse.json({error:"Supplier service is temporarily unavailable."},{status:502});}
}
