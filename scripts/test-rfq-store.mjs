import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const fakeEnv={
 RFQ_DATABASE_URL:"postgresql://test:test@db.internal:5432/hexa",
 RFQ_FILES_BUCKET:"hexa-private-rfq",
 RFQ_S3_ENDPOINT:"https://files.internal.example",
 RFQ_S3_REGION:"test-1",
 RFQ_S3_ACCESS_KEY_ID:"test",
 RFQ_S3_SECRET_ACCESS_KEY:"test",
};

let rows=new Map(),outbox=[],s3Objects=new Map(),events=[],fault="",failCommit=false;
class FakePut {constructor(input){this.input=input;}}
class FakeDelete {constructor(input){this.input=input;}}
class FakeS3 {
 async send(command){
  if(command instanceof FakePut){
   events.push("object.put");
   s3Objects.set(command.input.Key,command.input);
  }else if(command instanceof FakeDelete){
   events.push("object.delete");
   s3Objects.delete(command.input.Key);
  }
 }
}
class FakePool {
 async connect(){
  let pending=null;
  return {
   async query(sql,params=[]){
    const query=String(sql);
    if(query==="BEGIN"){pending={rows:new Map(rows),outbox:outbox.slice()};events.push("db.begin");return {rows:[],rowCount:0};}
    if(query.startsWith("SELECT pg_advisory"))return {rows:[],rowCount:1};
    if(query.startsWith("SELECT reference,fingerprint")){
     const found=pending.rows.get(params[0]);
     return {rowCount:found?1:0,rows:found?[found]:[]};
    }
    if(query.includes("INSERT INTO rfq_submissions")){
     if(fault==="record")throw Error("database refused insert");
     pending.rows.set(params[1],{reference:params[0],fingerprint:params[2]});
     events.push("db.record");
     return {rowCount:1,rows:[]};
    }
    if(query.includes("INSERT INTO rfq_outbox")){
     if(fault==="outbox_customer"&&params[1]==="customer")throw Error("queue insert failed");
     pending.outbox.push({reference:params[0],kind:params[1]});
     events.push("db.outbox."+params[1]);
     return {rowCount:1,rows:[]};
    }
    if(query==="COMMIT"){
     events.push("db.commit");
     rows=pending.rows;
     outbox=pending.outbox;
     if(failCommit)throw Error("commit acknowledgement lost");
     pending=null;
     return {rowCount:0,rows:[]};
    }
    if(query==="ROLLBACK"){events.push("db.rollback");pending=null;return {rowCount:0,rows:[]};}
    throw Error("Unexpected SQL "+query);
   },
   release(){events.push("db.release");},
  };
 }
}
const source=fs.readFileSync(new URL("../src/lib/rfqStore.ts",import.meta.url),"utf8");
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const exports={};
vm.runInNewContext(compiled,{
 exports,process:{env:fakeEnv},Buffer,URL,AbortSignal,
 require(name){
  if(name==="pg")return {Pool:FakePool};
  if(name==="@aws-sdk/client-s3")return {S3Client:FakeS3,PutObjectCommand:FakePut,DeleteObjectCommand:FakeDelete};
  if(name==="node:crypto")return {createHash};
  throw Error("Unexpected module "+name);
 }
},{filename:"rfqStore.test.js"});
const {persistRfq,rfqStoreConfigured}=exports;
assert.equal(rfqStoreConfigured(),true);
const bytes=Buffer.from("%PDF-1.7\nSANITISED SAMPLE");
const sha256=createHash("sha256").update(bytes).digest("hex");
const sample=(reference,description="Steel factory roof")=>({
 schemaVersion:1,event:"rfq.received",reference,receivedAt:"2026-10-14T10:00:00.000Z",
 status:"Received",source:"website",serviceCode:"peb",serviceName:"Pre-Engineered Buildings (PEB)",
 customer:{name:"Test Person",company:"Test Co",email:"buyer@example.com",phone:"+966500000000"},
 project:{description,quantity:"20",unit:"t",location:"Riyadh",requiredDate:"",technicalSpec:"",technicalDetail:""},
 attachments:[{filename:"drawing.pdf",sizeBytes:bytes.length,sha256}],
});
const docs=[{filename:"drawing.pdf",bytes,sha256}];
const request=(id,reference,description)=>({idempotencyKey:id,lead:sample(reference,description),documents:docs,salesAddress:"sales@example.com"});
const id1="0cb01c24-bde7-4a1f-a12c-a430ff0d6c73";
const ref1="HX-RFQ-20261014-ABCDEF012345";
const result=await persistRfq(request(id1,ref1));
assert.equal(result.reference,ref1);
assert.equal(result.replayed,false);
assert.equal(rows.size,1);
assert.deepEqual(outbox.map(row=>row.kind),["sales","customer"]);
assert.equal(s3Objects.size,1);
assert.equal([...s3Objects.values()][0].ServerSideEncryption,"AES256");
assert(events.indexOf("db.record")<events.indexOf("db.commit"));
assert(events.indexOf("db.outbox.customer")<events.indexOf("db.commit"));

const second=await persistRfq(request(id1,"HX-RFQ-20261014-999999888888"));
assert.equal(second.replayed,true);
assert.equal(second.reference,ref1);
assert.equal(rows.size,1);assert.equal(outbox.length,2);assert.equal(s3Objects.size,1);
await assert.rejects(persistRfq(request(id1,ref1,"Changed specification")),/RFQ_IDEMPOTENCY_CONFLICT/);

fault="outbox_customer";
await assert.rejects(persistRfq(request("398b30d9-f708-4376-9997-2dcce7a13d4b","HX-RFQ-20261014-111111222222")),/queue insert failed/);
assert.equal(rows.size,1,"failed transaction cannot persist a partial RFQ");
assert.equal(outbox.length,2,"failed transaction cannot retain a half-queued outbox");
assert.equal(s3Objects.size,1,"rolled back document must be deleted");
fault="";

failCommit=true;
await assert.rejects(persistRfq(request("aac2a39d-370c-49f9-838b-c7f90dd9146c","HX-RFQ-20261014-333333444444")),/commit acknowledgement lost/);
assert.equal(s3Objects.size,2,"ambiguous COMMIT must not delete possibly committed drawings");
failCommit=false;

console.log("RFQ durability tests passed: atomic record+outbox, private documents, replay deduplication, rollback and uncertain commit.");
