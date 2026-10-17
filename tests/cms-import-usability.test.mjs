import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=p=>readFileSync(p,"utf8");
test("Studio V3.15 import action is visible near heading and uses theme-safe styles",()=>{
 const ui=read("src/sanity/tools/ImportWebsiteContent.tsx");
 const css=read("src/sanity/tools/ImportWebsiteContent.module.css");
 assert.ok(ui.indexOf('className={styles.action}')<ui.indexOf('className={styles.grid}'),"button must precede record counts");
 assert.ok(ui.indexOf('className={styles.action}')<ui.indexOf('className={styles.warning}'),"button must precede editorial disclaimer");
 assert.match(css,/\.wrapper\{[^\n]*color:inherit/);
 assert.match(css,/\.primary\{[^\n]*color:#fff/);
 assert.match(css,/@media\(max-width:650px\)/);
 assert.match(ui,/role="alert"/);
 assert.match(ui,/role="status"/);
});
test("Import reads actual draft and published Sanity records without overwrites",()=>{
 const ui=read("src/sanity/tools/ImportWebsiteContent.tsx");
 assert.match(ui,/perspective:"raw",useCdn:false/);
 assert.match(ui,/createIfNotExists/);
 assert.match(ui,/drafts\.siteSettings/);
 assert.match(ui,/setIfMissing\(defaultFields\)/);
 assert.match(ui,/approvedForWeb:false/);
 assert.match(ui,/identityClearedForWeb:false/);
 assert.match(ui,/setCounts\(updated\)/);
 assert.doesNotMatch(ui,/withToken\(|SANITY_WRITE_TOKEN/);
});
test("Existing imagery and Insight narratives survive draft import",()=>{
 const ui=read("src/sanity/tools/ImportWebsiteContent.tsx");
 const story=read("src/content/insightStories.ts");
 const schema=read("src/sanity/schemaTypes/index.ts");
 const cms=read("src/lib/cms.ts");
 assert.match(ui,/illustrativeUrl:projectIllustrations/);
 assert.match(ui,/illustrativeUrl:slide\.src/);
 assert.match(ui,/stories\[item\.slug\]\?\.sections/);
 assert.match(story,/industrial/i);
 assert.match(ui,/qualificationLogos\[item\.name\]/);
 assert.match(schema,/externalLogoReference/);
 assert.match(cms,/coalesce\(coverImage\.asset->url,illustrativeUrl\)/);
});
test("Studio distinguishes connected editorial types from disconnected schemas",()=>{
 const config=read("sanity.config.ts");
 assert.match(config,/Other Schemas — Not Yet Connected to Website/);
 assert.match(config,/"page","project","knowledgeArticle","companyUpdate","publicQualification"/);
});
