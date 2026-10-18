# HEXA Steel® — R1-G01 Technical SEO & Security Baseline

**Audit date:** 19 October 2026. **Source baseline:** `rebuild/website-v3` `9261acd` (documentation-only merge after deployed gallery `9b780cd`). **Branch:** `feature/r1g01-technical-seo-security`. **Official R1:** 65% approved management estimate; R2/R3 not started.

## Previous stopping point and current starting point
- V3.17 live gallery, cover and watermark automated public audit passed; published airport project had zero extra gallery images. Additional editor/mobile acceptance remains open.
- Official R1 progress 65% was updated in `PROJECT_STATUS.md` and CMS handover through PR #20; historical 61% values are not the latest target.
- Existing site root robots `index:true`, sitemap and `robots.txt` were in source; generic global SEO only, no page-specific canonical for priority solution/case-study/article routes, no company structured data, no verification tag hooks or security response headers. Studio route had meta noindex but robots disallow missed the exact `/studio` root. Public search results were indexable. No confirmed Google/Bing property, GA4, consent or measured SEO outcomes.

## Planned versus developed
1. Canonical HTTPS URLs, page descriptions, Open Graph/Twitter metadata on the homepage, major Structural Steel / PEB solution routes, indexes for Projects/Knowledge/Insights and dynamic approved detail pages. **No canonical is set at root globally**, to avoid sending every page to the homepage. Missing dynamic documents yield noindex.
2. Public, fact-based `Organization` and `WebSite` JSON-LD; no unsupported ratings, approvals or awards.
3. Environment-configurable Google Search Console and Bing verification meta tags. No tokens or account credentials embedded. Metadata remains optional until actual owner-issued tokens are configured for the production Next.js build.
4. Improved `robots.txt` exclusion for Studio root and API. Meta + response-header noindex for search and Studio/API; search is not blocked in robots so crawlers can observe the noindex directive.
5. Production-oriented baseline headers: `nosniff`, SAMEORIGIN frame policy, controlled referrers, browser feature restrictions and six-month HSTS **without includeSubDomains** to protect independent OTS™ hosting. No speculative CSP, analytics cookies, GA4 or tracking pixels: CSP and consent require dedicated browser testing.
6. Deterministic regression tests for canonical metadata, crawler exclusions, published-image descriptions, security headers and verification placeholders.
7. Unblocked flaky historical external-logo CI: third-party HTTP 429 is explicitly logged as **inconclusive/not verified**, while confirmed bad HTTP statuses, nonimages and network errors still fail the check. The NWC logo image URL is not changed or declared healthy by a rate-limited response.

## Scope and operating decisions
- No external site registration or dashboard can be claimed without access to Google/Bing or signed ownership. No new domain, staging or analytics account invented.
- Current root layout is indexable. **Do not silently turn all of hexasteel.sa noindex**: user requested search discoverability. Indexing/go-live remains subject to explicit operational SEO acceptance.
- GA4 and Search Console serve different purposes: GA4 measures sessions, engaged sessions and traffic sources; Search Console shows Google organic queries/clicks/impressions/CTR, not every visitor's individual query. Bounce rate requires GA4 configuration and appropriate consent.
- `robots.txt` and `noindex` do **not** secure `/studio` or confidential uploads. Sanity authentication and private file controls remain mandatory. Separately audit DigitalOcean/Nginx, Cloudflare, TLS and DNS; avoid publishing backend identities.
- Do not mark a feature deployed based on CI. No changes to `main`, `rebuild/website-v3`, customer contacts, RFC/CRM pipelines or deployed site in this patch.

## CI and acceptance gates
- Feature CI: npm install, static logo HTTP checks (429 documented as unverified), TypeScript, unit tests, Next.js production build, search regressions. The former repeated failure was a third-party Wikimedia 429; do not present that asset as verified until a successful external fetch.
- Post-approval: integrate only into `rebuild/website-v3`, deploy with existing DigitalOcean pipeline; check canonical URLs for three route types, JSON-LD, robots and sitemap, Studio/API X-Robots-Tag, response headers and browser tests. Keep rollback.
- Remaining R1-G: Google domain verification through Cloudflare DNS or approved tags; Bing verification / property import, submit XML sitemap, verify indexing and crawl health; GA4 and consent/privacy settings; acquisition and conversion events; performance/Lighthouse/Core Web Vitals; security headers/CSP testing, dependencies, forms and uploads, accessibility WCAG checks, mobile QA, content verification, alerts and SEO operational acceptance.
- **Official completion stays R1 65%** (R2/R3 0%) until tested, deployed and owner-accepted. This milestone is only the first R1-G tranche.

**Exact stopping point:** Feature PR awaiting CI and CEO approval; no deploy. Next R1-G02 should establish verified Google/Bing/GA4 ownership and a privacy-compliant measurement baseline; R1-G03 expands security/performance/accessibility testing.

## GTM site-wide installation — 19 October 2026 (added to open PR #22)

- **User-provided container:** `GTM-N7QJSQTB` (Google Tag Manager).
- **Implemented in shared Next.js root layout:** an early `next/script` `beforeInteractive` GTM bootstrap inside `<head>`, plus the matching hidden `<noscript><iframe>` immediately inside the opening `<body>`. Single placement covers every route rendered by the shared layout, including locale-specific routes if added to that tree. Does not instrument the separate OTS™ application.
- **Regression test:** `tests/google-tag-manager.test.mjs` checks the single GTM container, script strategy and placement, no-JS fallback placement, and preservation of common page chrome/metadata.
- **Boundaries:** Installation of a GTM container does **not** configure or publish a GA4 measurement tag, conversions, consent mode, cookie policy, or Search Console property. Google Tag Assistant/Preview and browser network inspection must confirm GTM loads on the **live** site *after approved deployment*. Configure consent requirements before enabling analytics/advertising tags, as applicable.
- **Change control:** This extends the existing open R1-G01 feature branch/PR #22 only. No integration-branch merge, DigitalOcean deployment, `main` change or operational-acceptance claim. CI and live validation still required. Existing R1-G01 SEO/security scope unchanged. Official R1 remains **65%** (R2/R3 **0%**).
- **Acceptance:** TypeScript, tests and Next build pass; one GTM bootstrap and one matching noscript iframe in page output; Tag Assistant connects to `GTM-N7QJSQTB` on a public page without duplicate installation; no browser regression. Rollback through existing release pipeline.

