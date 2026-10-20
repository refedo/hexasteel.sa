import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
test("Sanity Studio provides descriptive categories and bulk project status tool",()=>{
 const config=read("sanity.config.ts");
 for(const name of ["Website Pages","Projects & Case Studies","Knowledge Centre","Company News & Insights","Client Approvals & Qualifications","Bulk Update Project Status"])
  assert.ok(config.includes(name),name);
 const manager=read("src/sanity/tools/BulkProjectStatus.tsx");
 assert.match(manager,/Select all projects/);
 assert.match(manager,/Update selected/);
 assert.match(manager,/ifRevisionId/);
 assert.match(manager,/deliveryStatus:status/);
 assert.match(manager,/perspective:"raw"/);
});
test("Editor-facing Sanity image upload guidance recommends real high resolution media",()=>{
 const schema=read("src/sanity/schemaTypes/index.ts");
 assert.match(schema,/1920×1080/);
 assert.match(schema,/1600×900/);
 assert.match(schema,/JPEG\/WebP\/PNG/);
 assert.match(schema,/image rights|authorized|authorized genuine/i);
});
test("Website keeps analytics denied without fixed consent prompts and remembers beta dismissal on device",()=>{
 const layout=read("src/app/layout.tsx");
 const notice=read("src/components/BrandTransitionNotice.tsx");
 assert.match(layout,/hexAnalytics='denied'/);
 assert.doesNotMatch(layout,/<AnalyticsConsentBanner\/>/);
 assert.match(notice,/localStorage\.getItem\(BETA_DISMISSED_KEY\)/);
 assert.match(notice,/localStorage\.setItem\(BETA_DISMISSED_KEY/);
 assert.equal(existsSync("src/app/privacy/page.tsx"),false);
 assert.doesNotMatch(read("src/components/SiteFooter.tsx"),/href="\/privacy"/);
});
test("Marketing pages preserve routes and have premium interactive additions",()=>{
 const site=read("src/content/site.ts");
 assert.match(site,/Join Our Team/);
 assert.match(read("src/app/company/careers/page.tsx"),/Join our team/);
 const capability=read("src/components/CapabilityNarrative.tsx");
 assert.match(capability,/setInterval/);
 assert.match(capability,/prefers-reduced-motion/);
 assert.match(capability,/IntersectionObserver/);
 assert.match(capability,/onMouseEnter/);
 assert.match(read("src/app/project-delivery/page.tsx"),/ProjectPlanningVisual/);
 assert.match(read("src/app/project-delivery/page.tsx"),/Track Your Project/);
 assert.ok(existsSync("src/app/project-tracking/page.tsx"));
 assert.match(read("src/components/ProjectPlanningVisual.tsx"),/Illustrative/);
 const knowledge=read("src/app/knowledge/page.tsx");
 assert.match(knowledge,/hexa-stretched-link/);
});
test("Footer uses HEXA contact details, official media and categorised navigation",()=>{
 const footer=read("src/components/SiteFooter.tsx");
 assert.match(footer,/hexa-footer-grid/);
 assert.match(footer,/brand\.linkedIn/);
 assert.match(footer,/contact\.whatsapp/);
 assert.match(footer,/Riyadh/);
 assert.match(footer,/customer\.feedback@hexasteel\.sa/);
 assert.match(footer,/Knowledge & More/);
 assert.doesNotMatch(footer,/sbs-contracting|sbs@/i);
});
test("Customer feedback form never sends without verified server-side services and consent",()=>{
 const page=read("src/app/feedback/page.tsx");
 const form=read("src/components/CustomerFeedbackForm.tsx");
 const route=read("src/app/api/feedback/route.ts");
 assert.match(form,/cf-turnstile/);
 assert.match(form,/privacyConsent/);
 assert.match(page,/active\?/);
 assert.match(route,/TURNSTILE_SECRET_KEY/);
 assert.match(route,/RESEND_API_KEY/);
 assert.match(route,/customer\.feedback@hexasteel\.sa/);
 assert.match(route,/siteverify/);
 assert.match(route,/result\.hostname!=="hexasteel\.sa"/);
 assert.match(route,/categories\.has\(category\)/);
 assert.match(route,/privacyConsent/);
 assert.doesNotMatch(route,/authorization:\s*"Bearer.*secret"/i);
});
