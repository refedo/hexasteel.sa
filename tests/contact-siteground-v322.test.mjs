import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");

test("contact prefers HTTPS API and supports gated SiteGround SMTP instead of the disabled placeholder",()=>{
 const route=read("src/app/api/contact/route.ts");
 const mailer=read("src/lib/contactMail.ts");
 assert.doesNotMatch(route,/RESEND_API_KEY|after launch/);
 assert.match(route,/contactMailConfigured\(\)/);
 assert.match(route,/sendContactEnquiry\(/);
 assert.match(mailer,/nodemailer\.createTransport/);
 assert.match(mailer,/resendReady\(\)/);
 assert.match(mailer,/process\.env\.CONTACT_RESEND_API_KEY/);
 assert.match(mailer,/process\.env\.CONTACT_RESEND_FROM_EMAIL/);
 assert.doesNotMatch(mailer,/process\.env\.RESEND_API_KEY\b/);
 assert.match(mailer,/api\.resend\.com\/emails/);
 assert.match(mailer,/reply_to:input\.email/);
 assert.match(mailer,/if\(resendReady\(\)\)return sendThroughResend\(input\)/);
 assert.match(mailer,/requireTLS:\s*port\s*===\s*587/);
 assert.match(mailer,/secure:\s*port\s*===\s*465/);
 assert.match(mailer,/rejectUnauthorized:\s*true/);
 assert.match(mailer,/inquiries@hexasteel\.sa/);
 assert.match(mailer,/replyTo:/);
 assert.match(mailer,/receipt\.accepted\.some/);
 assert.doesNotMatch(mailer,/process\.env\.[A-Z_]*PASSWORD\s*\|\|\s*["'][^"']+["']/);
});

test("enquiry endpoint validates source, input size, bot challenge, and consent",()=>{
 const route=read("src/app/api/contact/route.ts");
 assert.match(route,/request\.headers\.get\("origin"\)/);
 assert.match(route,/MAX_BODY\s*=\s*24_000/);
 assert.match(route,/total>MAX_BODY/);
 assert.match(route,/rateLimited\(request\)/);
 assert.match(route,/CONTACT_TURNSTILE_SECRET_KEY/);
 assert.doesNotMatch(route,/process\.env\.TURNSTILE_SECRET_KEY\b/);
 assert.match(route,/CONTACT_TURNSTILE_SITE_KEY/);
 assert.match(route,/cf-turnstile-response/);
 assert.match(route,/siteverify/);
 assert.match(route,/data\.hostname/);
 assert.match(route,/form\.get\("consent"\)!=="yes"/);
 assert.match(route,/topics\.has\(topic\)/);
 assert.match(route,/new URL\("\/contact\/received"/);
 assert.match(route,/status:.*no-store|Cache-Control":"no-store/);
});

test("contact page exposes secure form only if runtime SMTP and Turnstile are configured",()=>{
 const page=read("src/app/contact/page.tsx");
 const form=read("src/components/ContactEnquiryForm.tsx");
 assert.match(page,/dynamic="force-dynamic"/);
 assert.match(page,/CONTACT_TURNSTILE_SITE_KEY/);
 assert.match(page,/formActive\?<ContactEnquiryForm/);
 assert.match(page,/contactMailConfigured\(\)/);
 assert.match(page,/mailto:inquiries@hexasteel\.sa/);
 assert.match(form,/cf-turnstile/);
 assert.match(form,/name="consent"/);
 assert.match(form,/name="website"/);
 assert.match(form,/role="alert"/);
 assert.match(form,/disabled=\{busy\}/);
 assert.match(form,/\/api\/contact/);
 assert.ok(existsSync("src/app/contact/received/page.tsx"));
 assert.match(read("src/app/contact/received/page.tsx"),/accepted by our email service/);
});

test("deployment reads private SMTP configuration outside immutable release",()=>{
 const workflow=read(".github/workflows/deploy-v3-preview.yml");
 assert.match(workflow,/\.env\.contact/);
 assert.match(workflow,/set -a/);
 assert.match(workflow,/set \+a/);
 assert.doesNotMatch(workflow,/^\s+SITEGROUND_SMTP_PASSWORD:\s*\S+/m);
});
