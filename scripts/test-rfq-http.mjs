import {spawn} from "node:child_process";
import assert from "node:assert/strict";

const origin="http://127.0.0.1:4599";
const child=spawn("npm",["run","start","--","-p","4599"],{
 stdio:"ignore",
 env:{...process.env,NEXT_PUBLIC_SITE_URL:origin,RFQ_SUBMISSIONS_ENABLED:"true",
  RESEND_API_KEY:"not-a-real-key",CONTACT_FROM_EMAIL:"noreply@example.com",
  RFQ_TO_EMAIL:"sales@example.com",RFQ_FILE_SCAN_URL:"",RFQ_FILE_SCAN_TOKEN:""},
});
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function run(){
 try{
  let ready=false;
  for(let i=0;i<100;i++){
   if(child.exitCode!==null)throw Error("Next server exited unexpectedly.");
   try{const response=await fetch(origin+"/capabilities/machinery");if(response.ok){ready=true;break;}}catch{}
   await delay(250);
  }
  assert(ready,"Next server did not start");
  const machinery=await (await fetch(origin+"/capabilities/machinery")).text();
  for(const code of ["laser-cutting","built-up-sections","cz-purlins","steel-fabrication"]){
   assert(machinery.includes("/request-quotation?service="+code),"Missing service link: "+code);
  }
  for(const [route,code] of [
   ["/solutions/peb","peb"],["/solutions/structural-steel","structural-steel"],
   ["/services/design-detailing","design-detailing"],["/services/supply-chain","supply-chain"],
   ["/services/fabrication","steel-fabrication"],["/services/pipes-vessels","pipes-vessels"],
   ["/capabilities/coating","coating"],["/project-delivery","project-delivery"],
   ["/products/sheeting","sheeting"],["/products/steel-accessories","steel-accessories"]
  ]){
   const result=await fetch(origin+route);
   assert.equal(result.status,200,route+" failed to render");
   const text=await result.text();
   assert(text.includes("/request-quotation?service="+code),"Missing contextual quote CTA for "+route);
  }
  const page=await fetch(origin+"/request-quotation?service=laser-cutting");
  assert.equal(page.status,200);
  const html=await page.text();
  assert(html.includes("Precision Laser Cutting"),"Missing preselected service option");
  assert(html.includes("Plate material / grade"),"Missing laser-specific technical questions");
  assert(html.includes("noindex"),"Pre-launch RFQ pages must be noindex by default");
  assert(html.includes("wa.me/966591716020"),"Missing direct WhatsApp contact");
  assert(!html.includes('name="attachments"'),"Attachment picker must remain hidden without malware scan");
  const invalidOrigin=await fetch(origin+"/api/rfq",{method:"POST",headers:{origin:"https://malicious.example"}});
  assert.equal(invalidOrigin.status,403);
  const data=new FormData();
  data.set("service","laser-cutting");data.set("fullName","Example Buyer");data.set("company","Example Factory");
  data.set("email","buyer@example.com");data.set("phone","+966591234567");
  data.set("description","Please quote a laser cutting service for attached technical drawings.");
  data.set("unit","pcs");data.set("consent","yes");
  data.append("attachments",new File([new TextEncoder().encode("%PDF-1.4\nexample")],"sample.pdf",{type:"application/pdf"}));
  const noScanner=await fetch(origin+"/api/rfq",{method:"POST",headers:{origin},body:data});
  assert.equal(noScanner.status,503,"Fail closed if scanner is not configured");
  const body=await noScanner.json();
  assert.match(body.error,/scanning/i);
  console.log("RFQ HTTP smoke checks passed: contextual service CTAs, form, WhatsApp, origin, fail-closed attachment scanning.");
 }finally{child.kill("SIGTERM");}
}
await run();
