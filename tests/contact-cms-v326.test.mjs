import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
function load(path,mocks={}){
 const js=require('typescript').transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:1,target:9}}).outputText;
 const exports={};new Function('require','exports',js)(key=>key in mocks?mocks[key]:require(key),exports);return exports;
}
const settings=load('src/lib/contactFormSettings.ts',{'next-sanity':{createClient:()=>({fetch:async()=>{throw Error('offline');}})}});
const email=load('src/lib/contactEmail.ts',{'./contactFormSettings':settings});
test('contact settings preserve defaults on missing, corrupt and unavailable CMS content',async()=>{
 assert.deepEqual(await settings.getContactFormSettings(),settings.contactFormDefaults);
 const value=settings.normalizeContactFormSettings({formTitle:'  New title  ',topics:['  PEB  ','PEB','Steel\r\nBcc: victim@example.com',null,'x'.repeat(101)],nameLabel:42});
 assert.equal(value.formTitle,'New title');assert.deepEqual(value.topics,['PEB']);assert.equal(value.nameLabel,'Full name');
 assert.deepEqual(settings.normalizeContactFormSettings({topics:[]}).topics,settings.contactFormDefaults.topics);
});
test('receiving email escapes every untrusted value while retaining readable plain text',()=>{
 const attack='<img src=x onerror="alert(1)">&';
 const input={fullName:attack,email:'person@example.com',organization:attack,topic:attack,message:'Hello\n'+attack};
 const result=email.renderContactEmail(input,{...settings.contactFormDefaults,emailHeading:attack,emailIntro:attack,emailFooter:attack});
 assert.doesNotMatch(result.html,/<img|onerror="alert/);assert.match(result.html,/&lt;img/);assert.match(result.html,/&amp;/);
 assert.ok(result.text.includes(input.message));assert.match(result.html,/white-space:pre-wrap/);assert.match(result.html,/dir="auto"/);
});
test('both mail transports receive branded HTML and plain text with the configured recipient',async()=>{
 let http, smtp;
 const mail=load('src/lib/contactMail.ts',{'./contactEmail':email,'./contactFormSettings':settings,nodemailer:{default:{createTransport:()=>({sendMail:async value=>{smtp=value;return {accepted:['inquiries@hexasteel.sa']};}})}}});
 const oldEnv={...process.env};const original=globalThis.fetch;
 try{
  process.env.CONTACT_RESEND_API_KEY='test';process.env.CONTACT_RESEND_FROM_EMAIL='test@notify.hexasteel.sa';
  globalThis.fetch=async(url,options)=>{http=JSON.parse(options.body);return Response.json({id:'test'});};
  const input={fullName:'Example',email:'person@example.com',organization:'Example Co',topic:'PEB',message:'Test message only'};
  await mail.sendContactEnquiry(input);assert.match(http.html,/HEXA STEEL/);assert.ok(http.text);assert.deepEqual(http.to,['inquiries@hexasteel.sa']);assert.equal(http.reply_to,input.email);
  delete process.env.CONTACT_RESEND_API_KEY;process.env.CONTACT_SMTP_EGRESS_VERIFIED='true';process.env.SITEGROUND_SMTP_HOST='example.com';process.env.SITEGROUND_SMTP_USER='test@example.com';process.env.SITEGROUND_SMTP_PASSWORD='test';
  await mail.sendContactEnquiry(input);assert.match(smtp.html,/HEXA STEEL/);assert.ok(smtp.text);assert.equal(smtp.replyTo.address,input.email);
 }finally{process.env=oldEnv;globalThis.fetch=original;}
});
test('favicon only accepts Sanity-hosted PNG assets and falls back on invalid content',async()=>{
 for(const [value,expected] of [['https://cdn.sanity.io/images/ik7morln/production/abc-512x512.png',true],['https://attacker.test/favicon.png',false],['javascript:alert(1)',false],['https://cdn.sanity.io/images/ik7morln/production/abc.svg',false],[null,false]]){
  const loader=load('src/lib/siteSettings.ts',{'next-sanity':{createClient:()=>({fetch:async()=>value})}});
  assert.equal(Boolean(await loader.getFavicon()),expected);
 }
});
