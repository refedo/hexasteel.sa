import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire,stripTypeScriptTypes} from 'node:module';
const require=createRequire(import.meta.url);
function load(path,mocks={}){
 let source=readFileSync(new URL('../'+path,import.meta.url),'utf8');
 // Use TypeScript in Node 22 CI; the native stripper keeps this suite runnable on Node 24 too.
 let js;
 try{js=require('typescript').transpileModule(source,{compilerOptions:{module:1,target:9}}).outputText;}
 catch{js=stripTypeScriptTypes(source);js=js.replace(/import \{([^}]+)\} from ['"]([^'"]+)['"];?/g,(_,names,key)=>`const {${names}}=require('${key}');`).replace(/export (async )?function (\w+)/g,(_,asyncPart,name)=>`exports.${name}=${asyncPart||''}function ${name}`).replace(/export const (\w+)=/g,'const $1=exports.$1=');}
 const exports={};new Function('require','exports',js)(key=>key in mocks?mocks[key]:require(key),exports);return exports;
}
const {jobAcceptsApplications}=load('src/lib/careers.ts',{'next-sanity':{createClient:()=>({})}});
const base={code:'HX-CAR-006',title:'Engineer',status:'open',approvedForWeb:true};
test('vacancy lifecycle closes stale applications, enforces schedule and rejects invalid dates',()=>{
 const now=Date.parse('2026-10-24T09:00:00Z');
 assert.equal(jobAcceptsApplications(base,now),true);
 for(const status of ['draft','closed','onHold'])assert.equal(jobAcceptsApplications({...base,status},now),false);
 for(const changes of [{approvedForWeb:false},{closesAt:new Date(now).toISOString()},{opensAt:new Date(now+1).toISOString()},{closesAt:'invalid'},{opensAt:'invalid'}])assert.equal(jobAcceptsApplications({...base,...changes},now),false);
 assert.equal(jobAcceptsApplications({...base,opensAt:new Date(now).toISOString(),closesAt:new Date(now+1).toISOString()},now),true);
});
const {applicationFields,validateCareerApplication}=load('src/lib/careerApplication.ts');
function form(){const data=new FormData();for(const field of applicationFields)if(field.required)data.set(field.name,'Example');data.set('email','person@example.com');data.set('mobile','+966501234567');data.set('experience','7');data.set('consent','yes');return data;}
test('comprehensive application validation accepts optional omissions and rejects missing, oversized or unsafe fields',()=>{
 assert.ok(validateCareerApplication(form()));
 for(const [key,value] of [['experience',''],['experience','-1'],['experience','51'],['experience','5.5'],['email','bad'],['consent','no'],['skills','x'.repeat(1501)],['profileUrl','javascript:alert(1)'],['profileUrl','https://user:pass@example.com']]){const data=form();data.set(key,value);assert.equal(validateCareerApplication(data),null,key);}
 for(const field of applicationFields.filter(x=>x.required)){const data=form();data.delete(field.name);assert.equal(validateCareerApplication(data),null,field.name);}
});
test('careers API fails closed on untrusted origin, disabled intake and closed vacancy without sending mail',async()=>{
 let mail=0;let open=false;const data=form();data.set('jobId','job-1');data.set('cf-turnstile-response','token');data.set('cv',new File(['%PDF-example'],'cv.pdf',{type:'application/pdf'}));
 const {POST}=load('src/app/api/careers/route.ts',{
  'next/server':{NextResponse:{json:(body,options)=>new Response(JSON.stringify(body),options)}},
  '@/lib/intakeBoundary':{trustedIntakeOrigin:req=>req.headers.get('origin')==='https://hexasteel.sa',readBoundedMultipart:async()=>data},
  '@/lib/careers':{getApplicationJob:async()=>({...base,status:'closed'}),jobAcceptsApplications},
  '@/lib/careerApplication':{applicationFields,validateCareerApplication},
  '@/lib/careerSecurity':{careersConfigured:()=>open,careerRateLimited:()=>false,scanCareerPdf:async()=>true}
 });
 const request=(origin)=>new Request('https://hexasteel.sa/api/careers',{method:'POST',headers:{origin}});
 assert.equal((await POST(request('https://attacker.test'))).status,403);
 assert.equal((await POST(request('https://hexasteel.sa'))).status,503);open=true;
 const previous=globalThis.fetch;globalThis.fetch=async(url)=>{if(String(url).includes('resend'))mail++;return Response.json({success:true,hostname:'hexasteel.sa'});};
 try{assert.equal((await POST(request('https://hexasteel.sa'))).status,409);assert.equal(mail,0);}finally{globalThis.fetch=previous;}
});
test('local CV scanner accepts only an explicit clean result and rejects infected/unavailable scans',async()=>{
 const {EventEmitter}=await import('node:events');const previous=process.env.CAREERS_CLAMAV_SOCKET;process.env.CAREERS_CLAMAV_SOCKET='/tmp/test-clamav';
 try{for(const answer of ['stream: OK\0','stream: Eicar-Test-Signature FOUND\0','stream: ERROR\0']){
  const {scanCareerPdf}=load('src/lib/careerSecurity.ts',{'node:net':{createConnection:()=>{const socket=new EventEmitter();socket.setTimeout=()=>{};socket.write=()=>{};socket.destroy=()=>{};queueMicrotask(()=>{socket.emit('connect');socket.emit('data',Buffer.from(answer));});return socket;}}});
  assert.equal(await scanCareerPdf(new Uint8Array([1,2,3])),answer==='stream: OK\0');
 }
 delete process.env.CAREERS_CLAMAV_SOCKET;const {scanCareerPdf}=load('src/lib/careerSecurity.ts');assert.equal(await scanCareerPdf(new Uint8Array()),false);
 }finally{if(previous===undefined)delete process.env.CAREERS_CLAMAV_SOCKET;else process.env.CAREERS_CLAMAV_SOCKET=previous;}
});
