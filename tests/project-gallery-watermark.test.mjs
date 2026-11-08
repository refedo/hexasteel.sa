import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(path,"utf8");

test("project detail includes the cover image alongside all gallery photographs",()=>{
 const page=read("src/app/projects/[slug]/page.tsx");
 const gallery=read("src/components/ProjectImages.tsx");
 assert.match(page,/<ProjectImages title=\{p\.title\} coverImage=\{p\.image\} gallery=\{p\.gallery\}/);
 assert.match(gallery,/\.\.\.\(coverImage\?/);
 assert.match(gallery,/\.\.\.\(gallery\|\|\[\]\)\.map/);
 assert.match(gallery,/seen\.has\(photo\.src\)/);
 assert.match(gallery,/isSafePublicImage\(photo\.src\)/);
 assert.match(gallery,/images\.map\(/);
});

test("HEXA wordmark appears on uploaded images in detail and listing, never on third-party illustrative photos",()=>{
 const gallery=read("src/components/ProjectImages.tsx");
 const cards=read("src/components/ProjectExplorer.tsx");
 const watermark=read("src/components/ProjectWatermark.tsx");
 const css=read("src/components/ProjectWatermark.module.css");
 assert.match(gallery,/!photo\.illustrative&&<ProjectWatermark\/>/);
 assert.match(cards,/p\.image&&!isIllustrativeImage\(p\.image\)/);
 assert.match(watermark,/HEXA STEEL<sup>®<\/sup>/);
 assert.match(css,/pointer-events:none/);
 assert.match(gallery,/Illustrative industrial photography/);
});

test("all Sanity project assets still require public publication and identity clearance",()=>{
 const cms=read("src/lib/cms.ts");
 assert.match(cms,/approvedForWeb==true && identityClearedForWeb==true/);
 assert.match(cms,/"image":coalesce\(coverImage\.asset->url,illustrativeUrl\)/);
 assert.match(cms,/"gallery":photos\[\]/);
});
