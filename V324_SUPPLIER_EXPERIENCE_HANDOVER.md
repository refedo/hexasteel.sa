# HEXA Steel® — V3.24 Become a Supplier Development Handover

**Date:** 24 October 2026  
**Website repository:** `refedo/hexasteel.sa`  
**Feature branch:** `feature/v324-supplier-experience-hardening`  
**PR target:** `rebuild/website-v3` (never website `main`)  
**Verified starting integration commit:** `f8fbbb0423d3a20762963678a6bfc7ed7f3026c6`

## Previous stopping point and production position
- V3.23 PR #29 code was merged, CI passed; deployment #40031754305 failed before activation because the root-owned persisted website environment file included an invalid bare `Supplier` line (error on line 10). Prior release retained; supplier web page must not be called live.
- OTS™ PR #620 (supplier-intake feature) and PR #621 (CEO/Admin permissions, sidebar and multi-category product review) merged to OTS `main`. Latest OTS DigitalOcean deployment #40031896526 passed. Its successful health check does **not** verify supplier DB schema: previous OTS logs reported `ERROR 1045` during `v46_0_supplier_applications.sql` manual migration.
- All contact and supplier secrets stay on server in separate `.env` files, never in source, PR descriptions or CI logs. Website `/root/hexasteel-v3/.env.contact` and OTS `/var/www/hexasteel.sa/ots/.env` must be `0600`.

## Planned versus delivered development
1. Premium Fortune 500 industrial navy-branded supplier hero, qualification guidance, application call-to-action and four evidence categories; preserve existing site typography, responsive layout and canonical SEO.
2. Preserve supplier registration contract: company identity, manufacturer/distributor/agent/service/subcontractor, per-product category and origin, services, secure document uploads, consent and server-side Cloudflare Turnstile.
3. Structured, accessible three-section form with file selection summary, browser checks for exactly 1–3 PDFs no more than 2 MB each, user-facing submission state, appropriate error feedback and Turnstile challenge reset after rejected submissions.
4. Safeguard the existing release workflow: on remote preflight, detect stray non-assignment shell lines and unmatched quotes in `.env.contact` before proceeding; log line numbers only, not credentials.

## CI and release gate
- Run `npm run check`, `npm run test`, `npm run build` and existing logo/search CI against **final feature head**.
- Do not merge or deploy without explicit approval and successful CI. Do not create a staging domain.
- Fix the persisted website environment file **on DigitalOcean** before any rollout. The correct action is to prefix the stray prose heading on line 10 with `#` or delete it after checking its content locally, then run a syntax/preflight check without printing secrets.
- Query actual OTS MySQL `information_schema` for `ScSupplierApplication` before enabling public intake. Resolve only the reviewed additive migration if absent; do not rerun historic SQL migrations blindly.
- Keep `SUPPLIER_REGISTRATION_ENABLED=false` and `SUPPLIER_INTAKE_ENABLED=false` until CEO accepts cross-system live upload, OTP, notification, private documents, RBAC, and rollback tests.

## Milestone status
- **Developed:** site experience, form and pipeline preflight.
- **Tested:** CI results will be linked after validation; not equivalent to acceptance.
- **Merged/deployed/accepted:** not yet for V3.24.
- **Official release progress:** R1 68%, R2 0%, R3 0% unchanged.
- **Next recommended milestone:** Resolve website env syntax, validate OTS supplier table, deploy website through existing GitHub–DigitalOcean workflow with approval, then perform production E2E supplier qualification review before starting RFQ/CRM.
