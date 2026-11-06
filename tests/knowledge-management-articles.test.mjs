import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const lessonsSource=fs.readFileSync(path.join(root,"src/content/managementLessons.ts"),"utf8");
const marker="export const managementLessons:ManagementLesson[] = ";
const json=lessonsSource.split(marker)[1]?.trim().replace(/;\s*$/,"");
if(!json)throw new Error("Management lessons data missing");
const lessons=JSON.parse(json);
const read=(file)=>fs.readFileSync(path.join(root,file),"utf8");

test("Knowledge Centre contains exactly 13 dated, unique management lessons",()=>{
 assert.equal(lessons.length,13);
 assert.equal(new Set(lessons.map(x=>x.slug)).size,13);
 assert.equal(lessons[0].date,"2026-10-09");
 assert.equal(lessons.at(-1).date,"2026-11-06");
 const dates=lessons.map(x=>x.date);
 assert.deepEqual([...dates].sort(),dates,"Lessons must remain in original chronological order");
 for(const item of lessons){
  assert.match(item.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.match(item.date,/^2026-(10|11)-\d{2}$/);
  assert.ok(item.title.length>15 && item.intro.length>30);
  assert.ok(item.sections.length>=4);
  for(const section of item.sections)assert.ok(section.length===2 && section.every(x=>x.length>12));
  assert.match(item.resource.url,/^https:\/\//);
  assert.ok(item.resource.title && item.resource.creator && item.resource.format && item.resource.time);
 }
});

test("Each lesson has a discoverable public route and date-aware rendering",()=>{
 const cms=read("src/lib/cms.ts");
 const list=read("src/app/knowledge/page.tsx");
 const detail=read("src/app/knowledge/[slug]/page.tsx");
 const search=read("src/lib/searchIndex.ts");
 assert.match(cms,/managementLessons/);
 assert.match(cms,/publicationDate/);
 assert.match(list,/lessons\.map/);
 assert.match(list,/<time dateTime=\{entry\.date\}/);
 assert.match(detail,/generateStaticParams/);
 assert.match(detail,/managementLessons/);
 assert.match(detail,/entry\.resource\.url/);
 assert.match(search,/managementLessons\.map/);
});
