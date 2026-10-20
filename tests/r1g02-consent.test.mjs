import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");
test("Google consent mode initializes denied before the unchanged GTM container",()=>{
 const layout=read("src/app/layout.tsx");
 const consent=layout.indexOf('id="google-consent-default"');
 const gtm=layout.indexOf('id="google-tag-manager"');
 assert.ok(consent>0&&gtm>consent);
 for(const field of ["analytics_storage","ad_storage","ad_user_data","ad_personalization"])assert.match(layout,new RegExp(field));
 assert.match(layout,/hexAnalytics='denied'/);
 assert.match(layout,/gtag\('consent','default'/);
 assert.match(layout,/GTM-N7QJSQTB/);
 assert.doesNotMatch(layout,/G-JG2HQGQ2P3/,"Do not duplicate GA4 in code; control it from GTM");
});
test("privacy controls remain accessible without a fixed opt-in banner",()=>{
 const cmp=read("src/components/AnalyticsConsent.tsx");
 assert.match(cmp,/Enable optional website analytics/);
 assert.doesNotMatch(read("src/app/layout.tsx"),/<AnalyticsConsentBanner\/>/);
 assert.match(cmp,/hexa_analytics_consent_v1/);
 assert.match(cmp,/gtag\?\.\("consent","update"/);
 assert.match(cmp,/storage",sync/);
 assert.match(read("src/app/privacy/page.tsx"),/AnalyticsConsentSettings/);
 assert.match(read("src/components/SiteFooter.tsx"),/href="\/privacy"/);
});
test("unconsented visitors do not invoke the no-JS tracking iframe",()=>{
 const layout=read("src/app/layout.tsx");
 assert.doesNotMatch(layout,/googletagmanager\.com\/ns\.html/);
 assert.doesNotMatch(layout,/<AnalyticsConsentBanner\/>/);
});
test("privacy entry is published as a real route, not a claim of legal sign-off",()=>{
 const sitemap=read("src/app/sitemap.ts");
 assert.match(sitemap,/"\/privacy"/);
 assert.match(read("src/app/privacy/page.tsx"),/publicPageMetadata\("\/privacy"/);
});
