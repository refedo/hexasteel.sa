# R1-G03 — Canonical URL and Google duplicate-indexing hygiene
Date: 22 October 2026
Repository: refedo/hexasteel.sa
Feature branch: feature/r1g03-canonical-indexing-coverage
Base branch: rebuild/website-v3 (starting commit `0964ff92eef09e778ac95198403dccdf815d483a`)
Official progress unchanged: R1 68% (management estimate), R2 0%, R3 0%.

## Previous stopping point and audited start
- V3.20 PR #26 merged to the integration branch at `adfe5abd`; V3.21 PR #27 merged to the integration branch at `0964ff92` (Google Analytics configuration). Their actual production release / GA4 operational acceptance is outside this SEO patch and was not independently confirmed by this audit.
- V3.22 contact email PR #28 and V3.23 supplier registration PR #29 are open, separately gated, and not part of this implementation.
- The source already contains `src/lib/seo.ts`, project/knowledge/insights dynamic canonical metadata, a 27-route corporate sitemap, and crawler exclusions for Studio, API and search.
- Google Search Console email identifies "Duplicate without user-selected canonical" but does NOT supply the affected URLs, Google-selected canonicals, or specific host variant. A missing canonical tag is a confirmed source-code gap on some pages; it is not proven to be the cause of every reported Google exclusion. Intentional duplicate exclusions can remain appropriate.

## Planned vs developed (isolated code only)
1. Set explicit HTTPS, non-www, page-specific canonical metadata on the 21 sitemap-listed corporate, manufacturing, product, contact, feedback, RFQ and illustrated-knowledge routes that previously had title-only metadata. These now complement six existing canonical-equipped index routes, achieving static coverage of all 27 declared sitemap routes.
2. Retain the existing canonical helper for the homepage, solutions, projects, knowledge, insights and dynamic project/article detail pages; do NOT set a homepage canonical on the root layout.
3. Permanently redirect `www.hexasteel.sa/:path*` to `https://hexasteel.sa/:path*` only when a www request reaches this Next.js origin. External Cloudflare DNS/edge and Nginx TLS/redirect behavior cannot be assumed from repository source and still needs production verification.
4. Preserve existing sitemap URL entries (canonical host `https://hexasteel.sa`), robots exclusion for Studio/API, search noindex and dynamic missing-document noindex.
5. Add `tests/canonical-sitemap.test.mjs` to enforce static sitemap canonical coverage, proper origin, host redirect policy, distinct dynamic detail canonicals, and private/search route exclusions. Existing GitHub CI already runs `npm run check`, `npm run test`, `npm run build`, and HTTP search checks.

## Acceptance gates
- DEVELOPED: Canonical changes, optional www-at-origin host redirect, and regression tests committed to the feature branch.
- TESTED: Confirm successful CI on FINAL feature/PR commit; TypeScript, all automated tests, production build, and applicable HTTP tests. Review for unrelated failures independently. Do not call the implementation tested based solely on the commits.
- MERGED: Requires explicit CEO approval to integrate only into `rebuild/website-v3`. Never merge to `main`.
- DEPLOYED: Requires explicit CEO deployment approval via existing GitHub–DigitalOcean path to `hexasteel.sa`, not a preview/staging URL.
- OPERATIONALLY ACCEPTED: Check actual canonical tags in final server-rendered HTML and redirects (http, https, www, trailing slash, optional query parameters), sitemap, robots and live availability. Validate public routes and ensure no unexpected duplicate/noindex tags. Confirm Search Console affected URLs via Page indexing -> Duplicate without user-selected canonical -> Examples and URL Inspection, which distinguishes user-declared canonical from Google's chosen canonical. After deployment, use Validate Fix / Request Indexing where appropriate; wait for Google's recrawl. Do not promise that all excluded URLs will become indexed, because some duplicates should remain excluded.

## Out of scope / pending
- No direct access to Google Search Console property, its affected URL list, Cloudflare dashboard or DigitalOcean Nginx/TLS origin configuration. Any duplication from multiple domains, proxy routing, actual content similarity, or URL-specific Google-selected canonical still requires examination against Search Console examples.
- No change to CRM, RFQ delivery, contact form behavior, supplier registrations, Sanity publishing or GA4.
- No unapproved production, main or integration push.
- Next step: review final CI and PR, obtain explicit deployment approval, verify live URLs, then investigate any residual exact GSC examples before marking the Google alert resolved.

Exact stopping point: feature branch prepared for CI and code review. Official R1 remains 68%, not increased by unmerged, undeployed technical SEO work.
