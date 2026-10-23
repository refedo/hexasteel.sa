
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
test("supplier route is server-gated and challenge protected",()=>{
 const route=read("src/app/api/supplier-applications/route.ts");
 assert.match(route,/supplierConfigured/);assert.match(route,/verifyTurnstile/);assert.match(route,/sameOrigin/);
 assert.match(read("src/lib/supplierGateway.ts"),/x-hexa-supplier-key/);
});
test("supplier application requires origins and offers services",()=>{
 const form=read("src/components/SupplierRegistrationForm.tsx");
 assert.match(form,/country of origin/i);assert.match(form,/SERVICES/);assert.match(form,/documents/);assert.match(form,/consent/);
});
test("status OTP and clarification are independent of public listing",()=>{
 const tracker=read("src/components/SupplierTracker.tsx");
 assert.match(tracker,/one-time-code/);assert.match(tracker,/resubmit/);
});

test("supplier and status APIs use bounded multipart parsing before forwarding",()=>{
 const boundary=read("src/lib/intakeBoundary.ts");
 assert.match(boundary,/readBoundedMultipart/);
 assert.match(boundary,/getReader/);
 assert.match(boundary,/total > maxBytes/);
 assert.match(boundary,/allowedOrigins\.has\(origin\)/);
 for(const path of ["src/app/api/supplier-applications/route.ts","src/app/api/supplier-applications/track/route.ts"]){
  assert.match(read(path),/readBoundedMultipart\(request\)/);
 }
});

test("supplier products can span multiple categories with per-product manufacturing origin",()=>{
 const form=read("src/components/SupplierRegistrationForm.tsx");
 const tracker=read("src/components/SupplierTracker.tsx");
 assert.match(form,/Category of product/);
 assert.match(form,/category:p.category/);
 assert.match(tracker,/Corrected category of product/);
 assert.match(read("src/lib/supplierCategories.ts"),/Fasteners & anchors/);
});

test("supplier registration validates PDF count, per-file limits, and completion feedback",()=>{
 const form=read("src/components/SupplierRegistrationForm.tsx");
 assert.match(form,/MAX_FILES = 3/);
 assert.match(form,/MAX_FILE_BYTES = 2 \* 1024 \* 1024/);
 assert.match(form,/validateDocuments\(documents\)/);
 assert.match(form,/resetTurnstile\(\)/);
 assert.match(form,/aria-live="assertive"/);
 assert.match(form,/Supplier registration/);
});
test("supplier landing uses canonical and qualification guidance",()=>{
 const page=read("src/app/become-a-supplier/page.tsx");
 assert.match(page,/alternates:\{canonical:"https:\/\/hexasteel\.sa\/become-a-supplier"\}/);
 assert.match(page,/registration does not guarantee approval/);
 assert.match(page,/SUPPLIER_REGISTRATION_ENABLED/);
 assert.match(page,/SupplierRegistrationForm/);
});
