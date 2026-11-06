import {spawn} from "node:child_process";
import assert from "node:assert/strict";

const origin="http://127.0.0.1:4598";
const child=spawn("npm",["run","start","--","-p","4598"],{stdio:"ignore",env:{...process.env,NEXT_PUBLIC_SITE_URL:origin}});
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function run(){
 try{
  let ready=false;
  for(let i=0;i<100;i++){
   if(child.exitCode!==null)throw Error("Next server exited during search tests");
   try{const r=await fetch(origin+"/solutions/structural-steel");if(r.ok){ready=true;break;}}catch{}
   await delay(250);
  }
  assert(ready,"Next server did not start");
  const structural=await (await fetch(origin+"/solutions/structural-steel")).text();
  for(const phrase of ["Mezzanine structures","Poultry farm structures","Industrial platforms","Warehouses and hangars"]){
   assert(structural.includes(phrase),"Missing actual structural-page copy: "+phrase);
  }
  for(const term of ["metal works","poultry farms","poultr","mezzanine","industrial platforms","roof trusses","warehouses"]){
   const api=await fetch(origin+"/api/search?q="+encodeURIComponent(term));
   assert.equal(api.status,200,"API search failed for "+term);
   const result=await api.json();
   assert(result.results.some(x=>x.href==="/solutions/structural-steel"),"Missing structural steel result for "+term);
   const page=await fetch(origin+"/search?q="+encodeURIComponent(term));
   assert.equal(page.status,200,"Search page failed for "+term);
   const html=await page.text();
   assert(html.includes("/solutions/structural-steel"),"Dedicated search page is missing the structural result for "+term);
  }
  for(const [term,anchor] of [["poultry farms","poultry-farm-structures"],["mezzanine","mezzanine-structures"]]){
   const result=await (await fetch(origin+"/api/search?q="+encodeURIComponent(term))).json();
   assert(result.results.some(x=>x.href==="/solutions/structural-steel#"+anchor),"Missing direct product result for "+term);
  }
  for(const term of ["SIRI","ITP","laser","PEB","Qiddiya","manufacturing discipline"]){
   const result=await (await fetch(origin+"/api/search?q="+encodeURIComponent(term))).json();
   assert(result.results.length>0,"Existing content regression for "+term);
  }
  const sitemap=await (await fetch(origin+"/sitemap.xml")).text();
  for(const route of ["/solutions/structural-steel","/company/approvals","/project-delivery"]){
   assert(sitemap.includes("https://hexasteel.sa"+route),"Sitemap missing "+route);
  }
  assert(!sitemap.includes("https://hexasteel.sa/services/supply-chain"),"Retired Supply Chain route must be excluded from sitemap");
  const legacy=await fetch(origin+"/services/supply-chain",{redirect:"manual"});
  assert.equal(legacy.status,308,"Legacy Supply Chain route must permanently redirect");
  const location=new URL(legacy.headers.get("location")||"",origin);
  assert.equal(location.pathname+location.hash,"/project-delivery#procurement","Legacy link must redirect to Procurement section");
  const delivery=await (await fetch(origin+"/project-delivery")).text();
  assert(delivery.includes('id="procurement"'),"Project Delivery must contain a Procurement anchor");
  for(const label of ["Strategic Sourcing","Project Procurement","Quality at Receipt","Logistics"]){
   assert(delivery.includes(label),"Project Delivery missing "+label);
  }
  const procurement=(await (await fetch(origin+"/api/search?q=procurement")).json()).results;
  assert(procurement.some(x=>x.href==="/project-delivery#procurement"),"Search should direct procurement to Project Delivery");
  assert(!procurement.some(x=>x.href==="/services/supply-chain"),"Search should not recommend retired Supply Chain route");
  const approvals=await (await fetch(origin+"/company/approvals")).text();
  assert(approvals.includes("Saudi Aramco"),"Company-reported qualifications missing");
  for(const org of ["Saudi_aramco_logo.svg","Ma%27aden.svg","500px-National_Water_Company_Logo_2021.png","Qiddiya%20City%20Dual%20Stacked","387013_0.png","60633.jpg","seven-saudi-entertainments-venture"]){
   assert(approvals.includes(org),"Missing curated organization logo: "+org);
  }
  assert.equal((approvals.match(/class="approval-logo-slot"/g)||[]).length,11,"Every reported organization must render a logo slot");
  assert(approvals.includes("does not imply endorsement"),"Missing logo ownership disclaimer");
  console.log("V3.12/V3.13 search smoke checks passed: structural subcategories, synonyms, procurement redirect, and sitemap.");
 }finally{child.kill("SIGTERM");}
}
await run();
