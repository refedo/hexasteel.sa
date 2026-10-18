import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const layout = readFileSync("src/app/layout.tsx", "utf8");
const containerId = "GTM-N7QJSQTB";

test("GTM is installed once in the shared Next.js root layout", () => {
  assert.match(layout, /import Script from "next\/script";/);
  assert.match(layout, /<Script id="google-tag-manager" strategy="beforeInteractive">/);
  assert.match(layout, /<head>[\s\S]*?<Script id="google-tag-manager"[\s\S]*?<\/Script>[\s\S]*?<\/head>/);
  assert.match(layout, /gtm\.start/);
  assert.match(layout, /googletagmanager\.com\/gtm\.js\?id=/);
  assert.match(layout, /'dataLayer','GTM-N7QJSQTB'/);
  assert.equal(layout.split("'dataLayer','"+containerId+"'").length - 1, 1);
});

test("GTM noscript fallback is first inside body and uses the same container ID", () => {
  const body = layout.slice(layout.indexOf("<body style={themeStyle}>"));
  assert.match(body, /^<body style=\{themeStyle\}>\s*<noscript><iframe/);
  assert.match(body, /<iframe title="Google Tag Manager" src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-N7QJSQTB" height="0" width="0"/);
  assert.match(body, /style=\{\{display:"none",visibility:"hidden"\}\}/);
  assert.ok(body.indexOf("<noscript>") < body.indexOf("<SiteHeader/>"));
  assert.equal((body.match(/ns\.html\?id=GTM-N7QJSQTB/g) || []).length, 1);
});

test("GTM leaves normal page metadata and component tree in place", () => {
  assert.match(layout, /export const metadata: Metadata/);
  for (const component of ["SiteStructuredData", "SiteHeader", "BrandTransitionNotice", "SiteFooter", "ContactShortcuts"]) {
    assert.ok(layout.includes("<"+component+"/>"), component+" remains present");
  }
  assert.match(layout, /\{children\}/);
  assert.match(layout, /<html lang="en">/);
});
