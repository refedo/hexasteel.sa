import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
const schema=read("src/sanity/schemaTypes/index.ts");
const studio=read("sanity.config.ts");
const loader=read("src/lib/analyticsSettings.ts");
const layout=read("src/app/layout.tsx");

test("Sanity Studio exposes one editable Website Analytics singleton",()=>{
 assert.match(studio,/title\("Website Analytics"\)/);
 assert.match(studio,/schemaType\("analyticsSettings"\)\.documentId\("analyticsSettings"\)/);
 assert.match(schema,/name:"analyticsSettings"/);
 for(const name of ["gtmContainerId","ga4MeasurementId","ga4Source","directGa4Confirmed"]){
  assert.match(schema,new RegExp('name:"'+name+'"'));
 }
 assert.match(schema,/schemaTypes=\[[^\]]*analyticsSettings/);
});

test("GTM and GA4 IDs are validated by Studio and normalized server-side",()=>{
 assert.match(schema,/regex\(\/\^GTM-\[A-Z0-9\]/);
 assert.match(schema,/regex\(\/\^G-\[A-Z0-9\]/);
 assert.match(loader,/GTM_ID_PATTERN=\/\^GTM-/);
 assert.match(loader,/GA4_ID_PATTERN=\/\^G-/);
 assert.match(loader,/candidate=value\.trim\(\)/);
 assert.match(loader,/pattern\.test\(candidate\)\?candidate:fallback/);
 assert.match(loader,/GTM-N7QJSQTB/);
 assert.match(loader,/G-JG2HQGQ2P3/);
 assert.match(loader,/revalidate:30/);
});

test("GTM stays single and CMS values cannot inject arbitrary scripts",()=>{
 assert.match(layout,/getAnalyticsSettings/);
 assert.match(layout,/gtmBootstrap/);
 assert.match(layout,/gtmSnippet/);
 assert.match(layout,/JSON\.stringify\(analytics\.ga4MeasurementId\)/);
 assert.match(layout,/JSON\.stringify\(analytics\.gtmContainerId\)/);
 assert.equal((layout.match(/id="google-tag-manager"/g)||[]).length,1);
 assert.match(layout,/analytics_storage:'granted'/);
 assert.match(layout,/ad_storage:'denied'/);
 assert.doesNotMatch(layout,/<AnalyticsConsentBanner\/>|<AnalyticsConsentSettings\/>/);
});

test("website-direct GA4 is never enabled without explicit editorial confirmation",()=>{
 assert.match(loader,/value\?\.ga4Source==="direct"&&value\?\.directGa4Confirmed===true/);
 assert.match(schema,/I disabled GA4 page-view tags in GTM/);
 assert.match(layout,/analytics\.directGa4Enabled&&<Script/);
 assert.match(layout,/hexa_ga4_measurement_id/);
 assert.match(schema,/visits will be counted twice/);
});
