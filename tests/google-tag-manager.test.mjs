import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(path,"utf8");
const layout=read("src/app/layout.tsx");
const cms=read("src/lib/analyticsSettings.ts");

test("GTM loads exactly once and resolves its validated container ID from Sanity",()=>{
 assert.match(layout,/import Script from "next\/script"/);
 assert.match(layout,/<Script id="google-tag-manager" strategy="beforeInteractive">/);
 assert.equal((layout.match(/id="google-tag-manager"/g)||[]).length,1);
 assert.match(layout,/gtm\.start/);
 assert.match(layout,/googletagmanager\.com\/gtm\.js\?id=/);
 assert.match(layout,/JSON\.stringify\(analytics\.gtmContainerId\)/);
 assert.match(cms,/GTM-N7QJSQTB/);
 assert.match(layout,/getAnalyticsSettings/);
});

test("Sanity ID values are validated before reaching executable GTM/GA4 bootstrap",()=>{
 assert.match(cms,/GTM_ID_PATTERN=\/\^GTM-/);
 assert.match(cms,/GA4_ID_PATTERN=\/\^G-/);
 assert.match(cms,/validatedId\(/);
 assert.match(layout,/JSON\.stringify\(analytics\.ga4MeasurementId\)/);
 assert.match(layout,/JSON\.stringify\(analytics\.gtmContainerId\)/);
 assert.doesNotMatch(layout,/dataLayer','GTM-N7QJSQTB'/);
});

test("GA4 direct loader requires an explicit verified mode; GTM remains the default",()=>{
 assert.match(cms,/value\?\.ga4Source==="direct"&&value\?\.directGa4Confirmed===true/);
 assert.match(layout,/analytics\.directGa4Enabled&&<Script/);
 assert.match(layout,/hexa_ga4_measurement_id/);
 assert.match(layout,/gtag\('config'/);
 assert.doesNotMatch(layout,/googletagmanager\.com\/ns\.html/);
 assert.doesNotMatch(layout,/<AnalyticsConsentBanner\/>/);
});

test("GTM and analytics settings preserve the normal page metadata and layout",()=>{
 assert.match(layout,/export async function generateMetadata/);
 for(const component of ["SiteStructuredData","SiteHeader","BrandTransitionNotice","SiteFooter","ContactShortcuts"])
  assert.ok(layout.includes("<"+component+"/>"),component);
 assert.match(layout,/<html lang="en">/);
 assert.match(layout,/\{children\}/);
});
