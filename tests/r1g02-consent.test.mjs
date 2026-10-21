import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");

test("GTM remains installed and standard analytics measurement is enabled by default",()=>{
 const layout=read("src/app/layout.tsx");
 const consent=layout.indexOf('id="google-consent-default"');
 const gtm=layout.indexOf('id="google-tag-manager"');
 assert.ok(consent>0&&gtm>consent);
 for(const field of ["analytics_storage","ad_storage","ad_user_data","ad_personalization"])
  assert.match(layout,new RegExp(field));
 assert.match(layout,/analytics_storage:'granted'/);
 assert.match(layout,/ad_storage:'denied'/);
 assert.match(layout,/ad_user_data:'denied'/);
 assert.match(layout,/ad_personalization:'denied'/);
 assert.match(layout,/gtag\('consent','default'/);
 assert.doesNotMatch(layout,/hexa_analytics_consent_v1/);
 assert.match(read("src/lib/analyticsSettings.ts"),/GTM-N7QJSQTB/);
 assert.match(read("src/lib/analyticsSettings.ts"),/G-JG2HQGQ2P3/);
 assert.match(layout,/JSON\.stringify\(analytics\.gtmContainerId\)/);
 assert.doesNotMatch(layout,/G-JG2HQGQ2P3/);
});

test("Prelaunch does not display a privacy page or analytics-consent controls",()=>{
 const layout=read("src/app/layout.tsx");
 assert.doesNotMatch(layout,/<AnalyticsConsentBanner\/>|<AnalyticsConsentSettings\/>/);
 assert.doesNotMatch(layout,/googletagmanager\.com\/ns\.html/);
 assert.equal(existsSync("src/app/privacy/page.tsx"),false);
 assert.equal(existsSync("src/components/AnalyticsConsent.tsx"),false);
 assert.doesNotMatch(read("src/components/SiteFooter.tsx"),/href="\/privacy"/);
 assert.doesNotMatch(read("src/app/sitemap.ts"),/"\/privacy"/);
 assert.doesNotMatch(read("src/components/CustomerFeedbackForm.tsx"),/href="\/privacy"/);
});
