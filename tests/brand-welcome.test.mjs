import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read = (path) => readFileSync(path,"utf8");
const notice = read("src/components/BrandTransitionNotice.tsx");
const layout = read("src/app/layout.tsx");
const css = read("src/components/BrandTransitionNotice.module.css");

test("visitor-facing welcome identifies one company and the new website", () => {
  assert.match(notice,/Welcome to HEXA Steel/);
  assert.match(notice,/Welcome to our new digital home/);
  assert.match(notice,/Our website has evolved/);
  assert.doesNotMatch(notice,/Previously known as|Our name has evolved|BRAND TRANSITION/);
  assert.match(notice,/Website beta status/);
  assert.match(notice,/WEBSITE BETA/);
});

test("redirect attribution is internal, supports neutral markers and exact hostname matching", () => {
  assert.match(notice,/marker === "previous-site"/);
  assert.match(notice,/host === "hexametals.com"/);
  assert.match(notice,/host === "www.hexametals.com"/);
  assert.match(notice,/window\.sessionStorage\.getItem/);
  assert.match(notice,/Dismiss new website welcome/);
  assert.match(notice,/aria-label="Dismiss beta status notice"/);
});

test("notice is displayed by the global layout with isolated responsive styles", () => {
  assert.match(layout,/import \{ BrandTransitionNotice \}/);
  assert.match(layout,/<BrandTransitionNotice\/>/);
  assert.match(css,/@media \(max-width: 720px\)/);
  assert.match(css,/focus-visible/);
});
