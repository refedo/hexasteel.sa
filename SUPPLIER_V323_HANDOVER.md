# HEXA Steel® — V3.23 Supplier Registration Handover

## Previous verified milestone
V3.21 `0964ff92` integrated; workflow checks successful. PR #28 contact and PR #12 RFQ remain separate and unmerged. Official R1 68%; R2/R3 0%.

## Planned and developed
- Public /become-a-supplier page; manufacturers/distributors/agents/service providers/subcontractors.
- Product category, per-item origin country, service capabilities; company registration, up to three PDF files and explicit consent.
- Server-side Cloudflare Turnstile, HTTPS OTS gateway using a scoped shared key; no OTS key exposed in browser.
- Secure /suppliers/track reference + verified email OTP; request-update supplier response and supplementary PDF documents.
- Link in Company menu and footer; graceful unconfigured state.

## Deployment dependencies (required before enabling)
1. Deploy the companion OTS supplier-intake module and its migration **after explicit approval**; audit existing MySQL migrations and private files/backups.
2. Provision `SUPPLIER_DOCUMENT_DIR` outside publicly served paths; `SUPPLIER_CLAMSCAN_PATH` executable and updated antivirus signatures; `SUPPLIER_INTAKE_API_KEY` shared between apps; OTS `SUPPLIER_MAIL_RESEND_API_KEY`, `SUPPLIER_MAIL_FROM`, `SUPPLIER_NOTIFY_EMAIL`. OTS gating `SUPPLIER_INTAKE_ENABLED=true` only after security validation.
3. Website **persistent config file** `/root/hexasteel-v3/.env.contact` (existing deployment sources `$HOME/hexasteel-v3/.env.contact`, assuming deployment account is `root`): add `SUPPLIER_REGISTRATION_ENABLED=false`, `SUPPLIER_OTS_BASE_URL=https://ots.hexasteel.sa`, `SUPPLIER_OTS_API_KEY`. Existing `CONTACT_TURNSTILE_SITE_KEY` and `CONTACT_TURNSTILE_SECRET_KEY` are reused as server-side fallbacks. Optional dedicated keys `SUPPLIER_TURNSTILE_SITE_KEY` and `SUPPLIER_TURNSTILE_SECRET_KEY` override them. **Do not use `NEXT_PUBLIC_` for the site key:** these pages are dynamic server components that pass the public site key to client form props at request time, avoiding Next.js build-time environment substitution. Once activation is approved, set `SUPPLIER_REGISTRATION_ENABLED=true`.
   OTS application has a **different** persistent config file: `/var/www/hexasteel.sa/ots/.env`. Its `SUPPLIER_INTAKE_ENABLED` also stays false until authorized.
4. Validate domain and email authorization, Cloudflare Turnstile, authenticated staff permissions, malicious/large file rejection, magic-code attempts and non-leakage, approval duplication and supplier visibility, mobile/RTL/accessibility and actual SiteGround delivery.

## Change controls
No new staging domain, no `main` merge. Only explicit CEO authorization permits integration into `rebuild/website-v3` and website rollout. This is developed code, **not deployed or accepted**. Run npm run check, npm test and npm run build in CI and verify final HEAD.

## Shared secure intake pattern (24 October 2026)

- `src/lib/intakeBoundary.ts` centralizes strict allowed-host Origin checks and streaming bounded multipart parsing before FormData, reused in supplier submission and OTP tracking. Useful pattern for later RFQ/CRM, **not authorization** to implement them yet.
- Browser -> website API -> Turnstile validated -> scoped HTTPS OTS gateway -> OTS persisted application -> internal supply-chain review -> OTP status; CRM/RFQ should reuse the security boundary and contract discipline, with independent scope, explicit approval and separate release gates.
- No public OTS application endpoints or credentials exposed in browser. Website and OTS deployment independently controlled; website main remains untouched.
- OTS PR #620 merged at 7b114b85 and GitHub DigitalOcean deployment completed, but OTS supplier-specific live DB/permission/notification acceptance still needs evidence; controls remain disabled.
