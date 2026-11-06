import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createRequire} from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");
function load(path,mocks={}) {
  const source = readFileSync(new URL("../"+path,import.meta.url),"utf8");
  const {outputText} = ts.transpileModule(source,{compilerOptions:{module:1,target:9}});
  const exports = {};
  new Function("require","exports",outputText)(key=>key in mocks ? mocks[key] : require(key),exports);
  return exports;
}

const totalsModule = load("src/lib/marketplaceTotals.ts");
const {checkoutTotals} = totalsModule;
const products = [{slug:"c-purlins",title:"C purlins",unit:"tonne",priceHalalas:500000},{slug:"quote"}];
const line = {slug:"c-purlins",quantity:1.25};

test("bank transfer totals use server prices, fractional tonnes and VAT",()=>{
  const totals = checkoutTotals([line],products);
  assert.equal(totals.subtotal,625000);
  assert.equal(totals.vat,93750);
  assert.equal(totals.total,718750);
  for (const invalid of [[line,line],[{...line,quantity:0.0009}],[{...line,slug:"quote"}],[{...line,quantity:NaN}]]) {
    assert.equal(checkoutTotals(invalid,products),null);
  }
});

test("checkout rejects stale prices and uncleared files, and sends a cleared slip only to Finance",async()=>{
  const reference = "HX-"+"a".repeat(32);
  const form = new FormData();
  for (const [key,value] of Object.entries({reference,name:"Buyer",company:"Example",email:"buyer@example.test",specifications:"C profile",consent:"yes",lines:JSON.stringify([line]),total:"718750","cf-turnstile-response":"token"})) {
    form.set(key,value);
  }
  form.set("slip",new File(["%PDF-example"],"slip.pdf"));
  let prices = [{...products[0],priceHalalas:600000}];
  let scanned = false;
  const config = {finance:"finance@example.test",scanner:"/tmp/scanner",publicDetails:{fulfillment:"Collection by arrangement"}};
  const {POST} = load("src/app/api/marketplace/bank-transfer/route.ts",{
    "next/server":{NextResponse:{json:Response.json.bind(Response)}},
    "@/lib/cms":{getMarketplaceItems:async()=>prices},
    "@/content/marketplace":{formatMarketplacePrice:String},
    "@/lib/marketplaceBank":{getBankCheckoutConfig:()=>config},
    "@/lib/marketplaceTotals":totalsModule,
    "@/lib/intakeBoundary":{trustedIntakeOrigin:req=>req.headers.get("origin")==="https://hexasteel.sa",readBoundedMultipart:async()=>form},
    "@/lib/careerSecurity":{scanPrivateUpload:async()=>scanned},
  });
  const request = origin=>new Request("https://hexasteel.sa/api/marketplace/bank-transfer",{method:"POST",headers:{origin}});
  const previous = globalThis.fetch;
  const emails = [];
  globalThis.fetch = async (url,options)=>{
    if (url.includes("siteverify")) return Response.json({success:true,hostname:"hexasteel.sa",action:"marketplace_transfer"});
    emails.push({body:JSON.parse(options.body),key:options.headers["Idempotency-Key"]});
    return Response.json({id:"test-mail"});
  };
  try {
    assert.equal((await POST(request("https://other.test"))).status,403);
    assert.equal((await POST(request("https://hexasteel.sa"))).status,409);
    prices = products;
    assert.equal((await POST(request("https://hexasteel.sa"))).status,422);
    assert.equal(emails.length,0);
    scanned = true;
    const result = await POST(request("https://hexasteel.sa"));
    assert.equal(result.status,201);
    assert.deepEqual(await result.json(),{reference,status:"pending_payment_verification"});
    assert.deepEqual(emails[0].body.to,["finance@example.test"]);
    assert.equal(emails[0].body.attachments[0].filename,reference+".pdf");
    assert.equal(emails[0].key,reference);
  } finally {
    globalThis.fetch = previous;
  }
});
