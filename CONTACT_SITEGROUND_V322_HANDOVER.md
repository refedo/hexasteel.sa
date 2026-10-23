# HEXA Steel® V3.22 — Contact Enquiries Delivered to SiteGround Inbox

Date: 22 October 2026
Working branch: `feature/v322-siteground-contact-enquiries`
Target: `rebuild/website-v3` (never `main`)
Verified integration baseline: `0964ff92eef09e778ac95198403dccdf815d483a`
Contact page: https://hexasteel.sa/contact

## Previous stop and verified root cause
- V3.21 PR #27 was approved and merged into the integration branch. Its CI and DigitalOcean deployment passed at `0964ff92`.
- `/api/contact` formerly required Resend credentials (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`), otherwise always returned the "Enquiry submission is not enabled yet" error. Activating a SiteGround mailbox **does not** automatically configure the website's outbound email.
- The public form still said disabled and had no email-delivery confirmation, bot challenge or explicit consent.
- Official R1 remains **68%**; R2/R3 **0%**.

## Infrastructure finding affecting implementation
DigitalOcean's July/August 2026 documentation states outbound **SMTP ports 25, 465, and 587 are blocked on all Droplets by default**. SiteGround's normal outgoing SMTP port is 465. Therefore building **only** a SiteGround SMTP sender would be an unreliable or blocked solution. See:
- https://docs.digitalocean.com/support/why-is-smtp-blocked/
- https://docs.digitalocean.com/products/droplets/details/limits/
- https://www.siteground.com/kb/how_to_configure_my_mail_client

Contact credentials are intentionally namespaced so enabling general enquiries does **not** silently activate the separate customer feedback form or postponed RFQ. The destination remains the active SiteGround mailbox `inquiries@hexasteel.sa`. The preferred *outbound transport from DigitalOcean* is the existing **Resend HTTPS email API**, and an authenticated SiteGround SMTP fallback is available **only if actual Droplet outbound SMTP connectivity is confirmed**.

## Developed on this isolated branch
1. Dedicated server-side contact email module. Prefer HTTPS API when `RESEND_API_KEY` and verified `CONTACT_FROM_EMAIL` are configured; otherwise permit SMTP only if its credentials exist and outgoing connectivity is verified. Fixed recipient `inquiries@hexasteel.sa`; visitor email Reply-To; plain text content.
2. Add origin verification, bounded 24 KB multipart form, required fields, consent and server-side Cloudflare Turnstile verification with explicit allowed hostnames. Best-effort per-process rate limit and a honeypot reject abusive requests.
3. Show a submission form only when Turnstile and a mail provider are configured, otherwise display direct `mailto:`, telephone and WhatsApp. The form displays errors and disables the button during submission.
4. A dedicated `/contact/received` page states **provider acceptance** rather than claiming confirmed inbox delivery.
5. Preserve feedback route, RFQ draft PR #12, OTS™ integration, website analytics, project CMS and `main` unchanged.
6. GitHub DigitalOcean release workflow loads a private root-owned-by-deployer configuration file outside the immutable release, on each activation and rollback, never from a public environment variable or repository commit.

## Mandatory production setup
The existing DigitalOcean deployment user must securely create `$HOME/hexasteel-v3/.env.contact`, with permissions `chmod 600`.

**Preferred: HTTPS email API to SiteGround inbox.** Obtain an API key from Resend and verify the chosen HEXA Steel® sending domain/address, adding only the necessary DNS records in Cloudflare without replacing existing SiteGround MX/SPF/DKIM/DMARC records. Restrict the API key to transactional email where supported. Example private env file:
```sh
CONTACT_RESEND_API_KEY='PRIVATE_CONTACT_RESEND_API_KEY'
CONTACT_RESEND_FROM_EMAIL='HEXA Steel <verified-sender@hexasteel.sa>'
CONTACT_TURNSTILE_SITE_KEY='PUBLIC_CLOUDFLARE_TURNSTILE_KEY'
CONTACT_TURNSTILE_SECRET_KEY='PRIVATE_CLOUDFLARE_TURNSTILE_SECRET'
```
Turnstile must be provisioned for `hexasteel.sa`. Treat private key/password values as sensitive: never paste into PR, source control or chat. The SiteGround inbound mailbox remains unchanged; SMTP login is **not required** for HTTPS delivery.

**Alternative only if directly verified**: configure `CONTACT_SMTP_EGRESS_VERIFIED=true` **only after a successful connectivity check from the actual Droplet**, plus `SITEGROUND_SMTP_HOST`, `SITEGROUND_SMTP_PORT=465`, `SITEGROUND_SMTP_USER`, `SITEGROUND_SMTP_PASSWORD` from SiteGround > Email > Accounts > Mail Configuration > Manual Settings, alongside Turnstile keys. Because DigitalOcean blocks these ports by default, do **not** authorize direct SMTP as the primary production route without an explicit connectivity test from the actual Droplet or confirmation of an exception. Do not infer hostnames from DNS.

The existing workflow checks for the private configuration file, enforces mode `0600`, and loads it before PM2 starts. It requires Turnstile and **one** of the two email provider configurations (SMTP additionally requires the explicit verified-egress flag). This does not insert secrets into GitHub or deploy before approval.

## Tests and release gates
- Developed: code, form, provider transports, tests, docs and deployment plumbing.
- Tested: CI TypeScript, build, Node tests and search tests; mark passed only after checking the final head.
- Merged to integration: **NO**; requires explicit CEO approval.
- Deployed: **NO**.
- Operationally accepted: **NO**. Actual inbound delivery cannot be verified without configured credentials and real submission.
- After approved rollout: submit test from an external mailbox on https://hexasteel.sa/contact, validate Turnstile, confirmation URL, subject/body and correct Reply-To **received at SiteGround**; test rejection of missing consent/invalid Turnstile and unauthorized origin. Monitor spam/bounce, ensure no duplicate mail or leaked credentials. Existing rollback symlink must be preserved.
- Limitations: No durable general-enquiry database/outbox; email provider acceptance is not proof of inbox receipt; process-local limiter complements but does not replace Cloudflare WAF and Turnstile. RFQ/OTS CRM remains separate.

## Exact stopping point / next step
PR for V3.22 against `rebuild/website-v3`; confirm final CI, configure HTTPS provider + Turnstile securely, obtain CEO deployment approval, then verify **actual SiteGround inbox arrival** after deployment. R1 **68%** unchanged until management accepts production functionality.


---

## Operational acceptance addendum — 23 October 2026

- **GitHub:** PR #28 merged by CEO authorization only into `rebuild/website-v3`, final commit `6f482d7dbf5c16f52c291bc00396fe897760bf5c`. `main` unchanged. Post-merge TypeScript/test/build/search CI passed: https://github.com/refedo/hexasteel.sa/actions/runs/40019403575
- **Deployment:** Successful existing DigitalOcean pipeline: https://github.com/refedo/hexasteel.sa/actions/runs/40019403827 ; runtime confirmed HTTPS provider setup, with existing rollback release preserved.
- **Operationally VERIFIED (scope-limited):** Management's real live form test delivered **two messages** to the existing SiteGround/Outlook recipient inbox. Screenshot dated 23 October 2026 shows `HEXA Steel® website enquiry — Structural Steel` and the submitted name, company, enquiry type and message body. Screenshot and customer's personally identifying data are deliberately **not published to GitHub**. This establishes the live site-to-inbox path; no assertion about all future deliverability or durable CRM storage.
- **Outstanding minor improvements:** Current notification is text-only; create HEXA Steel® branded HTML email as a **separate** future milestone. Explicitly inspect Reply-To header and negative security test scenarios when next running mail QA. These are not evidence of failed inbox delivery.
- **Progress management reassessment:** R1 **70%** (previous 68%; +1 percentage point verified contact delivery and +1 deployed technical SEO coverage). R2 **0%**, R3 **0%**. See leading 23 October 2026 status entry in `PROJECT_STATUS.md`.
- **Next stopping point:** R1 technical SEO Search Console recrawl/URL inspections and remaining R1 acceptance work. Avoid claiming the separate RFQ, feedback or OTS™ CRM features were accepted.
