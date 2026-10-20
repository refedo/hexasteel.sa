import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");

test("GTM and Google consent mode stay installed without analytics cookie storage",()=>{
 const layout=read("src/app/layout.tsx");
 const consent=layout.indexOf('id="google-consent-default"');
 const gtm=layout.indexOf('id="google-tag-manager"');
 assert.ok(consent>0&&gtm>consent);
 for(const field of ["analytics_storage","ad_storage","ad_user_data","ad_personalization"])
  assert.match(layout,new RegExp(field));
 assert.match(layout,/hexAnalytics='denied'/);
 assert.match(layout,/gtag\('consent','default'/);
 assert.doesNotMatch(layout,/hexa_analytics_consent_v1/);
 assert.match(layout,/GTM-N7QJSQTB/);
 assert.doesNotMatch(layout,/G-JG2HQGQ2P3/);
});

test("No privacy route or analytics-consent controls are displayed",()=>{
 const layout=read("src/app/layout.tsx");
 assert.doesNotMatch(layout,/<AnalyticsConsentBanner\/>|<AnalyticsConsentSettings\/>/);
 assert.doesNotMatch(layout,/googletagmanager\.com\/ns\.html/);
 assert.equal(existsSync("src/app/privacy/page.tsx"),false);
 assert.equal(existsSync("src/components/AnalyticsConsent.tsx"),false);
 assert.doesNotMatch(read("src/components/SiteFooter.tsx"),/href="\/privacy"/);
 assert.doesNotMatch(read("src/app/sitemap.ts"),/"\/privacy"/);
 assert.doesNotMatch(read("src/components/CustomerFeedbackForm.tsx"),/href="\/privacy"/);
});
