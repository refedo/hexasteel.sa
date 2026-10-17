import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
test("project Studio editor displays public-release gates before the cover image",()=>{
 const source=read("src/sanity/schemaTypes/index.ts");
 const project=source.slice(source.indexOf("const project=defineType("),source.indexOf("const machine=defineType("));
 const approval=project.indexOf('name:"approvedForWeb"'),privacy=project.indexOf('name:"identityClearedForWeb"'),cover=project.indexOf('name:"coverImage"');
 assert.ok(approval>0&&privacy>approval&&cover>privacy,"both gates must appear before imagery");
 assert.match(project,/HIDDEN FROM WEBSITE/);
 assert.match(project,/Both switches must be enabled in a Published document/);
});
test("public project adapter does not bypass approval or privacy checks",()=>{
 const source=read("src/lib/cms.ts");
 assert.match(source,/approvedForWeb==true && identityClearedForWeb==true/);
 assert.match(source,/coalesce\(coverImage\.asset->url,illustrativeUrl\)/);
 assert.match(source,/safeFetch<CmsProject>\(projectQuery,\{fresh:true,revalidate:30\}\)/);
 assert.match(source,/client\.withConfig\(\{useCdn:false\}\)/);
});
test("other CMS content retains original cache policy",()=>{
 const source=read("src/lib/cms.ts");
 assert.match(source,/options\?\.revalidate\?\?120/);
 assert.match(source,/getHomeSettings/);
 assert.match(source,/getEditorialPage/);
});
