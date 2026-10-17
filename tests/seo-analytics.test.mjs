import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const landing = [
  ["services/laser-cutting", /laser cutting/i],
  ["products/cz-purlins", /purlin/i],
  ["services/tekla-detailing", /Tekla/i],
  ["products/puddle-flanges", /puddle flange/i],
];

test("high-intent routes are in the public sitemap", () => {
  const sitemap = read("src/app/sitemap.ts");
  for (const [path] of landing) assert.ok(sitemap.includes('"/'+path+'"'), path);
});

test("landing pages include semantic, useful content and unique canonical metadata", () => {
  for (const [route, phrase] of landing) {
    const page = read(`src/app/${route}/page.tsx`);
    assert.match(page, phrase);
    assert.ok(page.includes(`"path":"/${route}"`), route);
    assert.match(page, /SearchLandingPage/);
  }
  const component = read("src/components/SearchLandingPage.tsx");
  assert.match(component, /<h3>/);
  assert.match(component, /<PageHero/);
  assert.match(component, /<CallToAction/);
});

test("analytics script requires a configured GA4 ID and affirmative opt-in", () => {
  const analytics = read("src/components/ConsentAnalytics.tsx");
  assert.match(analytics, /G-\[A-Z0-9\]/);
  assert.match(analytics, /consent === "accepted"/);
  assert.match(analytics, /send_page_view: false/);
  assert.match(analytics, /page_location: analyticsPageLocation/);
  assert.match(analytics, /whatsapp_click/);
  assert.match(analytics, /rfq_cta_click/);
  assert.ok(!analytics.includes("formData"));
  assert.match(read("src/app/layout.tsx"), /ConsentAnalytics/);
});

test("corporate schema correctly identifies HEXA Steel without naming an obsolete company identity", () => {
  const schema = read("src/lib/structuredData.ts");
  assert.doesNotMatch(schema, /HexaMetals/);
  assert.match(schema, /https:\/\/hexasteel\.sa/);
  assert.match(schema, /Organization/);
  assert.doesNotMatch(read("src/app/company/about/page.tsx"), /HexaMetals/);
});

test("existing public crawler policy remains available", () => {
  const robots = read("src/app/robots.ts");
  assert.match(robots, /"\/studio\/"/);
  assert.match(robots, /"\/api\/"/);
  assert.match(robots, /https:\/\/hexasteel\.sa\/sitemap\.xml/);
});
