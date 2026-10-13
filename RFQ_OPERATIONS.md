# HEXA Steel® — RFQ Durable Intake Operations & Acceptance

**Status:** Application commit `0e54b7f` on draft PR #12 passed TypeScript, build, RFQ HTTP, mocked database/S3 durability tests and worker syntax check (GitHub runs `38482515220` and `38482521542`). No cloud resources created, no credentials provisioned, no live end-to-end verification or deployment approved. `https://hexasteel.sa` is the only approved review/production domain; no separate staging domain is required or authorised.

## Components (R1-F)
- Existing Next.js server route validates service, identity/contact, consent, origin, file sizes and allowed signatures. Files must receive a clean verdict from the approved private HTTPS scanner before storage.
- A restricted PostgreSQL database stores a unique RFQ reference, browser submission UUID, controlled lead payload, object manifest, consent timestamp, and **Sales + customer outbox rows committed atomically**.
- A private S3-compatible bucket stores authorised drawings/BOQs under reference-based keys. Objects are not published in Sanity or sent as unrestricted email attachments. The access-control/expiring-link workflow requires a separately approved authenticated internal interface before operational acceptance.
- An isolated worker (`scripts/process-rfq-outbox.mjs`) claims outbox rows, calls Resend with provider-side idempotency keys, and retries errors with backoff. Delivery failures after retries require operator intervention. Provider acceptance is **not** final inbox delivery.
- Optional `rfq.received` CRM handoff remains non-authoritative and best-effort. A Sales dashboard and customer tracking portal are future R2 work.

## Environment / least-privilege provisioning
Provision these **only after approval** in the existing DigitalOcean deployment workflow:

`RFQ_SUBMISSIONS_ENABLED=false` (leave off until acceptance)
`RFQ_DATABASE_URL` (private PostgreSQL, strict TLS, least-privilege role)
`RFQ_DATABASE_CA_PEM` (CA certificate when required; no TLS verification bypass)
`RFQ_FILES_BUCKET`, `RFQ_S3_ENDPOINT`, `RFQ_S3_REGION`
`RFQ_S3_ACCESS_KEY_ID`, `RFQ_S3_SECRET_ACCESS_KEY` (restricted to private bucket/prefix)
`RFQ_FILE_SCAN_URL`, `RFQ_FILE_SCAN_TOKEN` (approved clean/blocked private HTTPS scanner)
`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `RFQ_TO_EMAIL` (verified sender and restricted Sales inbox)

Store credentials in protected DigitalOcean/server secrets; never GitHub source, public `NEXT_PUBLIC_*`, Sanity public data or pull-request logs. Run `database/migrations/001_rfq_intake.sql` using a privileged migration account, **not** the public app role. Verify backups, encrypted transport, bucket ACLs and restricted object access before enabling the app role.

## Outbox worker deployment
Execute `node scripts/process-rfq-outbox.mjs` from a separately controlled server-side schedule (approximately every minute is reasonable), with a dedicated DB role and verified Resend credentials. Never expose the worker as an HTTP route. The process claims up to 50 messages using PostgreSQL row locks and a 90-second lease. Monitor queued/sending/failed counts; send alerts on terminal failures. Provider-level deduplication must be independently tested.

## Acceptance matrix — no claims without test evidence
- [ ] Provision private DB, run migration, confirm scoped credentials and backup/restore.
- [ ] Provision private object storage and verify encryption at rest, network restrictions, file retention/deletion and orphan cleanup plan.
- [ ] Approve malware scanner handling of confidential CAD/BOQ data; test clean PDF/DWG and malicious/renamed files.
- [ ] Verify persistent UUID idempotency across multiple app replicas, different payload conflict (409), atomic outbox state, simulated DB interruption and retry.
- [ ] Verify two separate Resend mails: correct reference, Sales notification, customer acknowledgement and actual delivery/bounce monitoring.
- [ ] Implement trusted-proxy identification, distributed rate limiting, bot protection and privacy/retention policy before public activation.
- [ ] Verify internally authenticated, auditable, short-lived file-access process for authorised estimators.
- [ ] Verify accessibility/mobile/RTL impact and ensure existing WhatsApp workflow remains functional.
- [ ] Run `npm run check`, `npm run build`, `npm run test:rfq`, `npm run test:rfq-store`, `npm run test:rfq-worker`.
- [ ] Obtain explicit CEO merge and deployment authorisation; verify `hexasteel.sa` and preserve rollback. Never merge to `main` without separate approval.

## Operational status / handover
Current feature branch: `feature/rfq-lead-intake-v3-11`. Draft pull request: https://github.com/refedo/hexasteel.sa/pull/12. Integration branch `rebuild/website-v3` auto-deploys application pushes, so do **not** push there without deployment approval.

Formal acceptance remains BLOCKED on private resources, real mail/scanner integration tests, abuse protection and authorised Sales file access. Official R1 remains **61%**; the earlier 65% was only an unapproved provisional estimate.
