import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Supply Chain is no longer a standalone service", () => {
  const navigation = source("src/content/site.ts");
  const catalogue = source("src/app/products-services/page.tsx");
  const footer = source("src/components/SiteFooter.tsx");
  for (const content of [navigation, catalogue, footer]) {
    assert.doesNotMatch(content, /\/services\/supply-chain/);
  }
  assert.doesNotMatch(catalogue, /title:"Procurement & Supply Chain"/);
  assert.match(navigation, /label:"Project Management",href:"\/project-delivery"/);
});

test("All procurement panels are available under Project Delivery", () => {
  const page = source("src/app/project-delivery/page.tsx");
  assert.match(page, /id="procurement"/);
  for (const label of ["Strategic Sourcing", "Project Procurement", "Quality at Receipt", "Logistics"]) {
    assert.ok(page.includes(label), "Missing procurement topic: " + label);
  }
  assert.match(page, /CapabilityNarrative scenes={procurementScenes}/);
});

test("Home, search index, and sitemap reference the canonical location", () => {
  assert.match(source("src/app/page.tsx"), /href="\/project-delivery#procurement">Supply chain/);
  assert.match(source("src/lib/searchIndex.ts"), /href:"\/project-delivery#procurement",category:"Project Delivery"/);
  assert.doesNotMatch(source("src/app/sitemap.ts"), /\/services\/supply-chain/);
});

test("The former service path uses a permanent redirect", () => {
  assert.match(source("src/app/services/supply-chain/page.tsx"), /permanentRedirect\("\/project-delivery#procurement"\)/);
});
