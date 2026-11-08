import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";

const read=path=>readFileSync(path,"utf8");
const manifest=read("src/content/cmsPages.ts");
const match=manifest.match(/export const publicPageDefaults=(\[[\s\S]*?\]) as const;/);
assert.ok(match,"Page manifest must be a literal public source");
const pages=JSON.parse(match[1]);

test("all 21 public editorial page leads have a live frontend adapter",()=>{
 assert.equal(pages.length,21);
 assert.equal(new Set(pages.map(p=>p.route)).size,pages.length);
 for(const p of pages){
  const path="src/app/"+p.route+"/page.tsx";
  assert.ok(existsSync(path),path);
  assert.ok(p.title&&p.intro,"No blank imported editorial copy");
  assert.match(read(path),new RegExp('getEditorialPage\\("'+p.route.replaceAll("/","--")+'"\\)'));
 }
});

test("CMS public page and project queries require editorial approval",()=>{
 const cms=read("src/lib/cms.ts");
 assert.match(cms,/\bapprovedForWeb==true && slug\.current==\$route/);
 assert.match(cms,/identityClearedForWeb==true/);
 assert.match(cms,/coalesce\(asset\.asset->url,illustrativeUrl\)/);
 assert.match(cms,/photos\[\]/);
 assert.match(cms,/publicPageDefaults/);
 assert.match(cms,/routeByKey\.has\(p\.slug\)/);
});

test("import is editor-authorized, draft-only and non-destructive",()=>{
 const importer=read("src/sanity/tools/ImportWebsiteContent.tsx");
 assert.match(importer,/useClient\(\{apiVersion:/);
 assert.match(importer,/createIfNotExists/);
 assert.match(importer,/_id:"drafts\./);
 assert.match(importer,/approvedForWeb:false/);
 assert.match(importer,/identityClearedForWeb:false/);
 assert.doesNotMatch(importer,/withToken\(|process\.env\.[A-Z_]*TOKEN/);
});

test("project images and Studio controls have a public-safe rendering path",()=>{
 const gallery=read("src/app/projects/[slug]/page.tsx");
 const css=read("src/app/globals.css");
 const assets=read("src/content/cmsSeed.ts");
 assert.match(gallery,/p\.gallery/);
 assert.match(assets,/cdn\\\.sanity\\\.io/);
 assert.match(assets,/isIllustrativeImage/);
 assert.match(css,/body:has\(\.hexa-studio\) > \.contact-shortcuts/);
});
