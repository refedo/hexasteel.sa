# HEXA Steel® — Website ↔ OTS™ Integration Playbook
Controlled design note · 24 October 2026 · applies to supplier onboarding (R1-F) and later RFQ/CRM (R1-F/R2)

## Mandatory development continuity
- Website repository `refedo/hexasteel.sa`: feature branch → green `npm run check`, `npm test`, `npm run build`, CI → CEO-approved integration into `rebuild/website-v3` → existing DigitalOcean rollout to **hexasteel.sa** → live verification. Never merge the website into `main` or create a staging domain.
- OTS™ repository `refedo/OTS`: feature branch → module tests/Next.js build/differential TypeScript and test gate → PR → approved merge to `main` → existing OTS DigitalOcean deployment → live verification.
- **Always verify DB schema and private storage before public traffic is enabled.** A green HTTP health check proves only that the application responds, not that migrations or external email delivery succeeded.
- Releases and acceptance status remain separate: Developed → CI Tested → Merged → Deployed → Operationally Accepted.

## Reusable public-to-private intake boundary
```text
Browser / hexasteel.sa form
    → Next.js website POST /api/<workflow>
    → strict allowed Origin, bounded multipart stream, CSRF/Turnstile, basic abuse limits
    → HTTPS to ots.hexasteel.sa via a **server-only, scoped workflow key**
    → OTS route authenticates key and validates schema again
    → OTS MySQL persisted workflow record + scanned private documents
    → internal role-restricted review → notifications, audit trail
    → external status by reference + verified email OTP (not direct OTS login)
```
For website code, `src/lib/intakeBoundary.ts` contains reusable Origin + bounded FormData handling. Workflow-specific schemas and handlers remain independent. Never expose API keys, tokens, customer drawings or confidential PDFs in browser JavaScript, Sanity documents, GitHub or public directories.

## Contract version and field mapping
- Supplier application: `POST /api/supplier-applications` on the website forwards to `POST /api/supplier-intake` in OTS. Named form fields and `products` JSON are validated in OTS; product items carry `name`, `category` and manufacturing `origin`. Services are allowed without products.
- Supplier status: `POST /api/supplier-applications/track` forwards to `POST /api/supplier-intake/track` and supports `request`, `verify`, `resubmit`. Supplier statuses are a separate lifecycle from the OTS approved-supplier master.
- Responses return a non-sensitive reference, status or generic errors; no internal notes, document URLs, credentials or staff identity to applicants.
- **Future RFQ:** create an `RFQSubmission` entity in OTS with an immutable external reference, controlled drawing uploads, anti-malware scanning and commercially approved quote flow. Avoid using supplier keys for RFQ.
- **Future CRM:** promote qualified RFQs/leads to an explicitly reviewed `Lead` or `Opportunity` model; enforce deduplication, ownership and visibility rules. Do not directly create customers in Dolibarr or reveal internal sales records.
- Define owner, validation, status transitions and API response shape *before* adding each new form. Add UI, API, database and cross-system tests to the same milestone.

## Existing private configuration (do not commit secrets)
| Application | Secure persisted file | Variables |
| --- | --- | --- |
| HEXA Steel® website | `/root/hexasteel-v3/.env.contact` (existing deployment sources file) | `SUPPLIER_REGISTRATION_ENABLED`, `SUPPLIER_OTS_BASE_URL`, `SUPPLIER_OTS_API_KEY`, existing contact Turnstile values |
| OTS™ | `/var/www/hexasteel.sa/ots/.env` | `SUPPLIER_INTAKE_ENABLED`, `SUPPLIER_INTAKE_API_KEY`, independent `SUPPLIER_OTP_SECRET`, verified Resend from address, private scanned document directory |
Use the **same** shared website/OTS intake key, with independent OTP key. Both environment files should be `0600`, service-owned. Existing Resend domain and Turnstile may be reused under the correct host; keys never appear in CI logs. Keep both feature flags false until acceptance is demonstrated.

## Deployment verification — automated wherever possible
1. Record website integration baseline SHA and OTS main SHA and exact PR numbers.
2. Create and **preserve** a fresh OTS backup, then verify that it is non-empty and outside the seven-backup rotation; a restore test is a separate acceptance gate.
3. Confirm the OTS schema exists via read-only `information_schema` query. If missing, execute only the reviewed additive migration using an authorized DBA account, not a broad replay of historic migrations.
4. Confirm ClamAV signatures/scanning, permissions and persistent private PDF backups. Confirm sending email credentials without printing values.
5. Deploy OTS first; verify deployed Git SHA, health, supplier table and authenticated reviewer route. Do not trust a green deploy when manual migrations log warnings.
6. Deploy website to `hexasteel.sa` through its existing approved integration branch, retaining rollback; verify website canonical, supplier page and Turnstile.
7. With production test records and explicit activation approval, enable OTS then website supplier flags; test reference creation, email OTP, per-product categories and origins, private document rejection/access, review/update/resubmit/approval, login/permission enforcement and rollback.
8. Record results and evidence in PR/project status; count operational completion only after sign-off.

## Known integration risk discovered during supplier rollout
The [OTS PR #620 production deployment](https://github.com/refedo/OTS/actions/runs/40028517675) returned HTTP 200 but its manual migration loop logged `ERROR 1045` for `ots_user` for multiple .sql files, including `v46_0_supplier_applications.sql`; the workflow **continues** on migration errors. Do not presume `ScSupplierApplication` exists until verified on MySQL. Fix the fail-open migration procedure as its own controlled OTS deployment-hardening change before RFQ and CRM rollouts. Avoid running all old migrations against a live database.

## Milestone progress
R1 management baseline 68%; R2 and R3 0% until separately verified. Supplier portal deployment is not operational acceptance.
