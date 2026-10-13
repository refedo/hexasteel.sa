# HEXA Steel® — RFQ Intake V3.11 / Controlled Configuration

**Latest rule:** Follow this section and `RFQ_OPERATIONS.md`. The original V3.10 email-first notes below are historical implementation records only. They must not be used as deployment instructions because they predate the Master Blueprint V3.2 durability reconciliation.

**Current system:** Next.js RFQ form → validation → file signature/size checks → mandatory clean malware scan for attachments → private S3-compatible storage → PostgreSQL RFQ row and two notification outbox rows in one committed transaction → receipt reference → independent background notification processing. An optional signed CRM webhook runs only after record acceptance.

**Disabled until approved:** `RFQ_SUBMISSIONS_ENABLED=false` is mandatory until the private database, encrypted/restricted bucket, sender/DNS configuration, outbox worker, scoped access, safe retention and end-to-end tests are operationally accepted. Secure upload picker is hidden without scanner configuration. WhatsApp remains accessible.

**Idempotency:** The browser maintains a UUID for retries of the *same* enquiry. A different payload with the same key is rejected. If COMMIT response is lost, do not delete files that might belong to a committed RFQ; reconcile using the UUID. Customer references are not quotation numbers.

**Email separation:** Technical drawings remain in the private object store. The outbox has two messages: Sales detailed notification and a separate customer acknowledgement without drawings. The worker logs provider acceptance, retries and terminal failures; do not claim mailbox delivery without independent evidence.

---

## Historical V3.10/V3.11 notes (superseded by current section)


## Customer workflow
- Machinery page `Request this service` links to `/request-quotation?service=<approved-code>`.
- Preserves the chosen service and asks only for contact, company, rough quantity, delivery date and scope. Optional PDF, DWG, DXF, DOCX or XLSX attachments, capped to 2 files / 5 MB each / 8 MB total.
- Displays a direct WhatsApp link to +966 59 171 6020, with selected-service context, irrespective of email setup.
- After secure email delivery **acceptance**, generates a server-side `HX-RFQ-YYYYMMDD-XXXXXXXXXXXX` identifier, sends an internal Sales email with permitted drawings and then a separate customer receipt **without drawings**, and shows the reference in-page. This is an *RFQ receipt*, not a commercial quotation/estimation number.
- No CRM tracking/dashboard or persistent searchable ticket database is claimed in this release.

## Server configuration
On the **DigitalOcean** host, configure environment variables for the PM2 app process using your team's usual secure secret store:
- `RESEND_API_KEY`: server-only Resend credential.
- `CONTACT_FROM_EMAIL`: from address on a verified sending domain.
- `RFQ_TO_EMAIL`: dedicated **private** Steel Sales / Estimating inbox (e.g. estimations@yourdomain). Falls back to `CONTACT_TO_EMAIL`.
- `NEXT_PUBLIC_SITE_URL=https://hexasteel.sa`: used for Origin validation.
Never put secrets into Sanity, GitHub commits, or client-side `NEXT_PUBLIC_` variables.

If a credential is missing, the site shows a WhatsApp request route and does **not** advertise a working upload form or fabricate a reference.

## Security posture
- All uploads are processed by the Node.js API route; file sizes and signatures are checked and total multipart request size is bounded.
- Explicit consent, a honeypot, origin validation, a basic in-process throttle, and a file extension/signature allowlist are provided.
- Uploaded files are **not stored** in the public Sanity dataset, public assets, static folders, or URL query parameters.
- Before large-volume production use, add a managed anti-bot service, **virus/malware scanning for CAD and office documents**, distributed rate limiting, a private durable CRM datastore and monitored mail bounces/failures.
- Resend API acceptance is not guaranteed delivery and does not itself constitute a durable sales queue. Sales and customer messages have separate acceptance reporting.
- Sensitive customer documents should be limited to authorised project data.

## Acceptance tests before activating
1. Verify all service CTAs preselect their respective machinery services.
2. Use a test sales recipient and verified domain. Submit an RFQ with PDF and DWG; confirm Sales receives a private notification with attachments, and the customer receives a separate receipt with **the same reference but without attachments**.
3. Verify malformed files, too many/large files, invalid service IDs, missing consent, spam traps and invalid origins are rejected.
4. Verify no customer details/attachment metadata leak into Sanity, search indexes, URLs or application logs.
5. Verify WhatsApp prefilled service routing on iPhone and Android.
6. Run Next.js build/TypeScript checks; deploy only after older queued workflow is resolved.

## Future V3.11 — Private CRM / RFQ workflow
Persist a record to a **private** managed database before returning successful submission, with authenticated, expiring upload URLs. Add a sales queue and milestones:
Received → Technical Review → Clarification → Estimating → Quoted → Won / Lost.
Connect to OTS™ or a supported CRM after process ownership and data protection are agreed. **Do not expose request status or files publicly using guessable sequential references.**


## V3.11 security and lead handoff (feature branch; NOT production-active)

- Existing V3.10 service selection now exposes two contextual, optional technical prompts per selected service to improve estimation without burdening buyers with compulsory engineering questions.
- Secure upload UI is hidden unless both `RFQ_FILE_SCAN_URL` and `RFQ_FILE_SCAN_TOKEN` are configured. Server validation still rejects documents unless each is declared **clean** by the private HTTPS malware scanner; errors/timeouts fail closed. The scanner receives raw document bytes and must comply with Hexa data protection agreements. No third-party scanning may be activated without review of where files are transferred and stored.
- Optional `RFQ_LEAD_WEBHOOK_URL` + `RFQ_LEAD_WEBHOOK_SECRET` send a private `rfq.received` event after email-provider acceptance. Event includes service, contact and requirements plus **metadata/hash only** for files. Downstream CRM must verify HMAC SHA-256 signature over exact raw JSON request body and deduplicate by RFQ reference / Idempotency-Key. HTTPS required.
- Email-only mode remains a **non-durable** lead intake; webhook failure is logged with *reference only*, with Sales email acting as recovery channel. Do not label this as a completed CRM queue or show public tracking status. Store lead/file records in a real private database before advertising durable RFQ tracking.
- File transfer through WhatsApp is an alternative **only if client authorises that channel**. Never assert that WhatsApp yields an RFQ reference or that website-upload absence blocks plain-text RFQs.
- Enforce private access, scanner operational SLAs, monitored email delivery, privacy/retention policies, distributed rate limiting and verified inboxes before enabling `RFQ_SUBMISSIONS_ENABLED` in production.
- Verification: `npm run check && npm run build && npm run test:rfq`. This test covers preselection CTA URLs, HTTP page availability, cross-origin rejection and attachment rejection when scanner is unconfigured.


### V3.11 two-message email separation
- **Sales notification first:** sends RFQ details and clean-scanned documents only to the restricted Sales inbox, using customer address as `reply_to`.
- **Customer acknowledgement second:** sends a short receipt with the same reference **without drawings**, reducing unnecessary exposure of confidential plans.
- Success response is based on Sales email-provider acceptance; if customer acknowledgement is not accepted, UI shows the RFQ reference and warns the customer to retain it. It does **not** cause a duplicate request retry.
- A successful Resend response indicates provider acceptance only, **not confirmed mailbox delivery**, and outbound email is not a durable queue. Validate both inboxes and provider failure/bounce handling before activation.
