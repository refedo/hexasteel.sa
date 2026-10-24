import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
const studio=read("sanity.config.ts");
const bulk=read("src/sanity/tools/PublishDraftProjects.tsx");
const cms=read("src/lib/cms.ts");

test("Studio provides the bulk publishing manager without requiring the 22-project manifest",()=>{
 assert.match(studio,/Publish Project Drafts/);
 assert.match(studio,/S\.component\(PublishDraftProjects\)/);
 assert.match(bulk,/const DRAFT_QUERY=/);
 assert.match(bulk,/\[_type=="project"/);
 assert.doesNotMatch(bulk,/projectPortfolioDrafts|Publish all 22|hexa-public-project-/);
});

test("publishing selection supports individual projects and select all without touching unselected",()=>{
 assert.match(bulk,/selectedSet/);
 assert.match(bulk,/toggle\(id:string\)/);
 assert.match(bulk,/toggleAll\(\)/);
 assert.match(bulk,/setSelected\(allSelected\?\[\]:drafts\.map/);
 assert.match(bulk,/selection=selectedIds\.map/);
 assert.match(bulk,/Publish selected/);
 assert.match(bulk,/No unselected drafts were changed/);
});

test("project publish requires factual and identity attestation and existing two public gates",()=>{
 assert.match(bulk,/factApproved/);
 assert.match(bulk,/identityApproved/);
 assert.match(bulk,/approvedForWeb:true,identityClearedForWeb:true/);
 assert.match(bulk,/ifRevisionId\(draft\._rev\)/);
 assert.match(bulk,/new Set\(slugs\)\.size/);
 assert.match(bulk,/RELATED_QUERY/);
 assert.match(bulk,/getPublishedId\(d\)===doc\._id/);
 assert.match(cms,/approvedForWeb==true && identityClearedForWeb==true/);
});

test("publication process is editor-authenticated and non-destructive to images and other types",()=>{
 assert.match(bulk,/useClient\(\{apiVersion/);
 assert.match(bulk,/tx\.createOrReplace\(/);
 assert.match(bulk,/tx\.delete\(draft\._id\)/);
 assert.match(bulk,/const \{_rev,_createdAt,_updatedAt,\.\.\.content\}=draft/);
 assert.doesNotMatch(bulk,/withToken\(|process\.env\.SANITY|NEXT_PUBLIC_SANITY_WRITE/);
 assert.match(bulk,/BATCH_SIZE=50/);
});
