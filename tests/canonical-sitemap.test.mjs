import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";

const read=path=>readFileSync(path,"utf8");
const origin="https://hexasteel.sa";
const sitemap=read("src/app/sitemap.ts");
const routesSection=sitemap.match(/const routes=\[([\s\S]*?)\];/);
const staticRoutes=routesSection?[...routesSection[1].matchAll(/"(\/[^"]*)"/g)].map(match=>match[1]):[];

test("public sitemap uses the single HTTPS non-www origin",()=>{
 assert.match(sitemap,/const base="https:\/\/hexasteel\.sa"/);
 assert.match(read("src/lib/seo.ts"),/export const siteOrigin="https:\/\/hexasteel\.sa"/);
 assert.ok(staticRoutes.length>20,"expected the complete corporate sitemap");
 assert.equal(new Set(staticRoutes).size,staticRoutes.length,"static sitemap entries must be unique");
});

test("every static sitemap page declares a self-referencing canonical",()=>{
 for(const route of staticRoutes){
  const page=route==="/"?"src/app/page.tsx":"src/app"+route+"/page.tsx";
  assert.ok(existsSync(page),"missing public page for sitemap route: "+route);
  const source=read(page);
  const usingHelper=source.includes('publicPageMetadata("'+route+'"')||
   source.includes("publicPageMetadata('"+route+"'");
  const usingLiteral=source.includes('alternates:{canonical:"'+origin+route+'"}')||
   source.includes("alternates:{canonical:'"+origin+route+"'}");
  assert.ok(usingHelper||usingLiteral,"missing/incorrect canonical for "+route);
 }
});

test("dynamic public detail pages use individual canonical URLs",()=>{
 for(const path of [
  "src/app/projects/[slug]/page.tsx",
  "src/app/knowledge/[slug]/page.tsx",
  "src/app/insights/[slug]/page.tsx"
 ]){
  const source=read(path);
  assert.match(source,/publicPageMetadata\(/,path);
  assert.match(source,/robots:\{index:false,follow:false\}/,path);
 }
});

test("search and private routes are not submitted as indexable pages",()=>{
 for(const unwanted of ["/search","/studio","/api/","/supplier/track"]){
  assert.ok(!staticRoutes.includes(unwanted),"private/duplicate route in sitemap: "+unwanted);
 }
 assert.match(read("src/app/search/page.tsx"),/index:false/);
 assert.match(read("src/app/robots.ts"),/disallow:\["\/studio","\/api\/"\]/);
 const layout=read("src/app/layout.tsx");
 assert.doesNotMatch(layout,/alternates:\s*\{\s*canonical\s*:/,
  "the root layout must not assign the homepage canonical to every route");
});
