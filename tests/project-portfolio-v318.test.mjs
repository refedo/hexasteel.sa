import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
const manifest=read("src/content/projectPortfolioDrafts.ts");
const match=manifest.match(/export const projectPortfolioDrafts: PortfolioDraft\[\] = (\[[\s\S]*?\]);/);
assert.ok(match,"Portfolio import manifest must be a literal array");
const projects=JSON.parse(match[1]);

test("all 22 requested project references included with unique slugs",()=>{
 assert.equal(projects.length,22);
 assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);
 for(const name of ["Jax District 3 Project","Periodic Inspection Project","Jafurah Aramco Project","Ad-Dawaa Pharmacy","Green Pipes Factory","King Fahd University of Petroleum & Minerals (KFUPM)","Saudi Arabian Military Industries (SAMI)","Zakat Project","Yamama Palace","Hilton Hotel","Kempinski Hotel","SEVEN — Riyadh Exit 10","SEVEN — Jizan","Boulevard World","Al Khobar Parks","Coffee Factory","Yeast Factory","Cement Factory","Plastic Factory","Yogurt Factory","Perfumes Factory","Logistics Hub Factory"])
  assert.ok(projects.some(p=>p.title===name),name);
 assert.equal(projects.filter(p=>p.projectTypes.includes("Warehouse")).length,8);
 assert.deepEqual(projects.find(p=>p.title==="Jax District 3 Project").industries,["Entertainment","Utilities"]);
 assert.deepEqual(projects.find(p=>p.title==="Plastic Factory").projectTypes,["Factory","Warehouse"]);
 for(const p of projects){assert.ok(p.industries.length>0&&p.projectTypes.length>0);assert.doesNotMatch([p.title,p.publicSummary,p.steelSystem||""].join(" "),/\bss\b/i);}
});

test("Sanity project schemas expose industry, type, and explicit steel system",()=>{
 const s=read("src/sanity/schemaTypes/index.ts");
 for(const name of ["industries","projectTypes","steelSystem","approvedForWeb","identityClearedForWeb"])assert.match(s,new RegExp('name:"'+name+'"'));
 for(const name of ["industrySectors.map","projectTypeOptions.map","steelSystemOptions.map"])assert.ok(s.includes(name));
});

test("importer creates missing named projects as protected drafts without altering old records",()=>{
 const s=read("src/sanity/tools/ImportWebsiteContent.tsx");
 assert.match(s,/for\(const p of projectPortfolioDrafts\)/);
 assert.match(s,/known\.has\("project:"\+p\.slug\)/);
 assert.match(s,/tx\.createIfNotExists/);
 assert.match(s,/_id:"drafts\.hexa-public-project-"\+p\.slug/);
 assert.match(s,/approvedForWeb:false,identityClearedForWeb:false/);
 assert.doesNotMatch(s,/withToken\(|sanityWriteToken/);
});

test("warehouse selection and industry work independently and respect dual publication gates",()=>{
 const e=read("src/components/ProjectExplorer.tsx");
 const cms=read("src/lib/cms.ts");
 const d=read("src/app/projects/[slug]/page.tsx");
 assert.match(e,/label:"Warehouses",value:"Warehouse"/);
 assert.match(e,/setType/);
 assert.match(e,/setIndustry/);
 assert.match(e,/aria-pressed=/);
 assert.match(e,/p\.projectTypes/);
 assert.match(e,/p\.industries/);
 assert.match(cms,/approvedForWeb==true && identityClearedForWeb==true/);
 assert.match(cms,/"projectTypes":projectTypes/);
 assert.match(cms,/"industries":industries/);
 assert.match(d,/p\.steelSystem\|\|p\.category/);
});
