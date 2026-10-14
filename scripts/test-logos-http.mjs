import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
// External image health must be validated separately from local DOM rendering.
// Verify every candidate resolves to an image before requesting deployment.
const src=readFileSync(new URL("../src/content/qualificationLogos.ts",import.meta.url),"utf8");
const images=[...src.matchAll(/url:"(https:\/\/[^"]+)"[\s\S]*?source:"(https:\/\/[^"]+)"/g)].map(m=>({url:m[1],source:m[2]}));
assert.equal(images.length,11,"Expected all 11 branded logo candidates");
const invalid=[];
for(const {url,source} of images){
 try {
  // Some official CDNs block HEAD; a small GET is used as fallback.
  let response=await fetch(url,{method:"HEAD",redirect:"follow",signal:AbortSignal.timeout(11000),headers:{"User-Agent":"HEXA-Steel-Website-Audit/1.0"}});
  if(!response.ok||!(response.headers.get("content-type")||"").toLowerCase().startsWith("image/")){
   response=await fetch(url,{method:"GET",redirect:"follow",signal:AbortSignal.timeout(12000),headers:{"User-Agent":"HEXA-Steel-Website-Audit/1.0",Range:"bytes=0-200"}});
  }
  const mime=response.headers.get("content-type")||"";
  if(!response.ok||!mime.toLowerCase().startsWith("image/"))invalid.push({url,status:response.status,mime,source});
  else console.log("Image verified:",new URL(url).hostname,"status",response.status,mime);
  await response.body?.cancel().catch(()=>{});
 }catch(error){invalid.push({url,reason:String(error),source});}
}
if(invalid.length){console.error("Logo image health failures:",JSON.stringify(invalid,null,2));process.exitCode=1;}
else console.log("Logo source health confirmed for all",images.length,"organizations");
