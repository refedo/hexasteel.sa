import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function load(path,mocks={}){const exports={};const source=readFileSync(new URL('../'+path,import.meta.url),'utf8');const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','exports',code)(name=>mocks[name]||require(name),exports);return exports;}
const apply=load('src/lib/careerApply.ts');
const {CareerApplications}=load('src/components/CareerApplications.tsx',{'@/lib/careerApply':apply});
const {renderToStaticMarkup}=require('react-dom/server');const {createElement}=require('react');
const base={_id:'job1',code:'HX-CAR-001',title:'QC Engineer',status:'open',approvedForWeb:true,minExperience:5,team:'QC',location:'Riyadh',employmentType:'Full-time'};
test('only eligible open roles expose the management-approved Google Forms link',()=>{
 const now=Date.now();assert.equal(apply.canApplyToJob(base,now),true);
 for(const change of [{status:'closed'},{status:'onHold'},{status:'draft'},{approvedForWeb:false},{closesAt:new Date(now-1).toISOString()},{opensAt:new Date(now+60000).toISOString()}])assert.equal(apply.canApplyToJob({...base,...change},now),false);
 const html=renderToStaticMarkup(createElement(CareerApplications,{jobs:[base,{...base,_id:'job2',status:'closed'},{...base,_id:'job3',status:'onHold'}]}));
 assert.equal((html.match(/href="https:\/\/docs.google.com\/forms/g)||[]).length,1);
 assert.ok(html.includes(apply.CAREER_APPLICATION_URL));assert.ok(html.includes('Apply for this job</a>'));assert.ok(html.includes('rel="noopener noreferrer"'));
 assert.ok(!html.includes('<form'));assert.ok(!html.includes('cf-turnstile'));assert.ok(!html.includes('/api/careers'));
 assert.match(html,/<\/details><div class="career-card-apply">/);
});
