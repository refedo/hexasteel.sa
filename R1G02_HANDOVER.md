# HEXA Steel® — R1-G02 Search Visibility & Analytics Consent Handover

**Date:** 19 October 2026. **Source baseline:** `rebuild/website-v3` `b01c324`. **Feature branch:** `feature/r1g02-search-consent-audit`. **Official R1 progress:** 65% (CEO-approved management estimate), R2/R3 0%.

## Previous stopping point
PR #22, which includes core SEO metadata, GTM and security headers, was owner-approved and merged to `rebuild/website-v3` with commit `b01c324`. Feature and post-merge CI passed; DigitalOcean deployment [#39170264237](https://github.com/refedo/hexasteel.sa/actions/runs/39170264237) completed successfully. Independent read-only public-domain audit [#39173076905](https://github.com/refedo/hexasteel.sa/actions/runs/39173076905) PASSED: homepage/PEB/Structural Steel/Projects/Knowledge/Insights canonicals, Organization JSON-LD, site-wide GTM ID `GTM-N7QJSQTB`, sitemap and robots, secure headers, Studio/API/search noindex. Root canonical `https://hexasteel.sa` is a valid Next.js normalization.

## Connected analytics (read-only via Windsor.ai)
- Search Console domain `sc-domain:hexasteel.sa` is connected. For 19 Sep–16 Oct 2026, **44 search impressions, 1 click**, associated with `ots.hexasteel.sa` subdomain pages, not the corporate hostname. Search Console data lags and is historical, not evidence of live OTS index status. Query-level rows may be incomplete due to privacy/reporting aggregation.
- Google Analytics 4 property `559484784` (**Hexa Steel®**) is also connected in Windsor.ai as of this work. Querying 17–19 Oct returned **zero rows** for sessions/users/page views, page paths and event names. This means collection is **not yet operationally verified**; cannot claim zero actual visitors.
- Google sitemap connector returned `path:null`/`submitted:0`; no successful sitemap submission could be verified. Do not claim no sitemap has ever been submitted.

## Planned vs developed on feature branch
- Independent read-only GitHub Action to verify production SEO, GTM, index gates and security controls.
- Add Google Consent Mode v2 defaults, **denying analytics and advertising storage** ahead of the existing GTM initialization. Persist visitor opt-in/opt-out preference locally, permit changing it via an accessible privacy page and links, and update Google consent signals. Do not add standalone `gtag.js` or a second GA4 tag.
- Remove the no-JavaScript GTM iframe fallback, which cannot offer a consent choice. The standard GTM JS container `GTM-N7QJSQTB` remains installed.
- Add `/privacy` to the corporate website with opt-in/opt-out settings and plain-language disclosure, plus an accessible link in the site footer.
- Automated regression checks for script order, default denied, user controls, privacy route and avoiding duplicate tags.

## Explicit limitations / release gates
- GTM **still downloads** even where analytics storage is denied. Google Consent Mode controls Google tags, but arbitrary third-party tags can ignore these signals. **Do not assert privacy compliance, zero network traffic, or valid consent without a real Tag Assistant and network-level audit of the published GTM container.** The public privacy notice requires company legal/privacy review under applicable Saudi law.
- The no-JS iframe is intentionally removed to avoid unconsented fallback tracking.
- No secrets, GA4 property IDs, unsupported measurements or Google verification tokens embedded. Google Analytics measurement stream `G-JG2HQGQ2P3` previously supplied by the owner is to be configured once in the GTM container with correct Consent Mode, **not pasted again into website source**.
- No changes to the separate OTS™ application. Its possible indexing requires separate current Google URL Inspection and server/authenticated noindex review; `robots.txt` alone cannot secure or force removal.
- Before deploy: full GitHub feature CI (TypeScript, Node tests, production build, search), editor/CEO approval for publishing the privacy notice and visitor choice UI; inspect GTM tags and consent settings. The approval to deploy PR #22 does NOT approve this PR.
- After explicit deployment approval: merge only into `rebuild/website-v3`, deploy through existing DigitalOcean pipeline, verify browser/Tag Assistant actual Consent Mode default and transitions, no duplicates, revisit/mobile layout, smoke-check sitemap `/privacy` and ability to change choices. Retain rollback.
- Remaining operational tasks: verify Search Console corporate sitemap submission, main-host indexing, GA4 property receiving actual consenting visitor events, meaningful conversions without collecting personal data, optional Bing site property, Lighthouse/Core Web Vitals, WCAG/device tests, dependency/security headers, data handling audit. **R1 remains 65%** until operational acceptance.

**Exact stopping point:** R1-G02 feature branch/PR awaiting CI and owner approval. No changes to integration/main or production beyond already approved R1-G01.
