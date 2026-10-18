import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");

test("canonical URLs are bound to the official HTTPS host and not a request header",()=>{
 const seo=read("src/lib/seo.ts");
 assert.match(seo,/https:\/\/hexasteel\.sa/);
 assert.match(seo,/alternates:\{canonical\}/);
 assert.match(seo,/openGraph:/);
 assert.match(seo,/twitter:/);
 assert.doesNotMatch(seo,/headers\(\)|Host header\}/);
 for(const path of ["src/app/page.tsx","src/app/solutions/structural-steel/page.tsx","src/app/solutions/peb/page.tsx","src/app/projects/page.tsx","src/app/insights/page.tsx","src/app/knowledge/page.tsx"]){
  assert.match(read(path),/publicPageMetadata\(/,path);
 }
 for(const path of ["src/app/projects/[slug]/page.tsx","src/app/insights/[slug]/page.tsx","src/app/knowledge/[slug]/page.tsx"]){
  const content=read(path);
  assert.match(content,/publicPageMetadata\(/,path);
  assert.match(content,/robots:\{index:false,follow:false\}/,path);
 }
});
test("project search preview uses approved original photos, not Unsplash illustration as an original",()=>{
 const p=read("src/app/projects/[slug]/page.tsx");
 assert.match(p,/isSafePublicImage\(p\.image\)/);
 assert.match(p,/!isIllustrativeImage\(p\.image\)/);
});
test("public crawler policy excludes Studio/API and noindexes low-value search",()=>{
 const robots=read("src/app/robots.ts");
 const headers=read("next.config.mjs");
 assert.match(robots,/disallow:\["\/studio","\/api\/"\]/);
 assert.match(headers,/source:"\/studio"/);
 assert.match(headers,/source:"\/studio\/:path\*"/);
 assert.match(headers,/source:"\/api\/:path\*"/);
 assert.match(headers,/source:"\/search"/);
 assert.match(headers,/X-Robots-Tag/);
 assert.match(read("src/app/search/page.tsx"),/robots:\{index:false,follow:true\}/);
 assert.match(read("src/app/studio/[[...index]]/layout.tsx"),/robots:\{index:false,follow:false\}/);
});
test("basic security headers do not assert a restrictive untested CSP or subdomain HSTS",()=>{
 const next=read("next.config.mjs");
 for(const header of ["X-Content-Type-Options","X-Frame-Options","Referrer-Policy","Permissions-Policy","Strict-Transport-Security"])assert.ok(next.includes(header),header);
 assert.doesNotMatch(next,/Content-Security-Policy"/);
 assert.doesNotMatch(next,/value:"[^"]*includeSubDomains"/);
});
test("public structured data and search verification hooks do not invent credentials",()=>{
 const site=read("src/components/SiteStructuredData.tsx");
 const layout=read("src/app/layout.tsx");
 assert.match(site,/schema\.org/);
 assert.match(site,/Organization/);
 assert.match(site,/WebSite/);
 assert.match(site,/application\/ld\+json/);
 assert.match(layout,/GOOGLE_SITE_VERIFICATION/);
 assert.match(layout,/BING_SITE_VERIFICATION/);
 assert.doesNotMatch(layout,/G-[A-Z0-9]{8,}/);
});
