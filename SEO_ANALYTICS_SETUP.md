# HEXA Steel® — Search Visibility, Analytics & Brand Migration (V3.14)
Date: 17 October 2026 | Release R1-G (SEO, security and testing) | Development branch: `feature/v314-search-analytics-seo`

## Objective and precise scope

Give `hexasteel.sa` a measurable search-acquisition foundation, without prematurely launching advertising, exposing customer data, altering dormant RFQ/CRM, or touching production. Search indexing, account registration and brand/domain migration require verified owner accounts, not merely code deployment.

Existing baseline: `rebuild/website-v3` at `0e6fe45` (deployed V3.13 app commit `6f9a7d3`; V3.13 independently verified October 14). R1 official progress **60.60% ≈ 61%**; R2/R3 not started. RFQ PR #12 remains separate.

### Developed in the isolated feature branch

- Public static service landing pages for CNC laser cutting, cold-formed C/Z purlins/profiles, Tekla steel detailing, puddle flanges and feasibility review of gooseneck flanges.
- Canonical metadata and unique commercial-page OpenGraph data; sitemap entries and Products & Services contextual internal links.
- Corporate Organization/WebSite JSON-LD, including `HexaMetals` only as a historic/alternate company identity. No false ratings, certifications, ranking or approval markup.
- GA4 optional script behind affirmative visitor consent, with Accept/Decline and preference control; `page_view`, `whatsapp_click`, `call_click`, `email_click` and `rfq_cta_click`. These are click-intent metrics, **not confirmed RFQs or qualified sales leads**. The component excludes arbitrary URL parameters and never sends phone numbers, form fields or customer drawing details.
- Node regression tests for service pages, sitemap, privacy gating and brand continuity.

### Configure (not activated by source changes)

1. **Google Search Console**: create a **Domain** property for `hexasteel.sa` using a HEXA-owned Google account, obtain its TXT verification token and add the exact record to the **authoritative Cloudflare DNS** zone. Verify ownership. Repeat for `hexametals.com` if company controls it. Do not paste verification tokens into a public chat.
2. Submit `https://hexasteel.sa/sitemap.xml`. Inspect the homepage and the new commercial pages after deployment; fix excluded/soft-404/canonical/crawl findings rather than blindly requesting indexing. Source code already serves `robots.txt` and a dynamic sitemap; check live response on deployed commit.
3. **Bing Webmaster Tools**: import verified Search Console sites or verify with DNS; submit the same sitemap. Use IndexNow only after safe key verification if needed. Bing generally covers additional discovery sources such as Yahoo; do not claim universal indexing.
4. **GA4**: create a HEXA-owned property with timezone **Asia/Riyadh** and SAR currency. Create the website data stream for `https://hexasteel.sa`. Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX` in the existing DigitalOcean production build environment (public measurement ID; no admin API keys). Trigger the authorized existing pipeline after CEO deployment approval. Without a valid ID the analytics component is inert and does not show a banner. Test consent, Realtime, DebugView, cross-page navigation, and absence of events on Decline. Restrict administration to authorized company users.
5. Link Google Search Console to GA4 to see relevant query and landing-page aggregates. **Search queries belong principally to Search Console**; GA4 organic-search data does not expose every individual visitor's search phrase. Set up channel and campaign reporting, with UTM conventions.
6. Make a documented cookie/analytics privacy disclosure and review it against Saudi PDPL and any other applicable rules before activating optional measurement. Do not presume that installing GA4 itself creates compliance. Keep any later session-recording product disabled until masking, consent and review are done.
7. In GA4 measure users, engaged sessions, bounce rate, landing pages, country, device, source/medium and campaign. Compare bounce rate by channel and page, not one global number. **Do not promote CTA-click events as lead conversions**; use distinct real successful RFQ and CRM events only after that workflow is activated and validated.

### HexaMetals → HEXA Steel® migration — mandatory owner-side tasks

- Confirm rights/control and hosting/DNS for `hexametals.com` and `www.hexametals.com`. Before changing redirects, collect old-domain URLs and inbound backlinks from verified old Search Console, existing logs and sitemap.
- Maintain **one-to-one permanent 301/308 redirects** from each relevant old URL to the closest equivalent new page on `hexasteel.sa`, preserving relevant content and avoiding redirect-all-to-home. Retain redirects long term (Google recommends at least one year; indefinitely when possible). Verify HTTPS, www, non-www and query/path behavior.
- Verify old and new domain Search Console properties; complete Google's **Change of Address** procedure when applicable. Monitor old/new indexing, traffic, crawl errors and inbound links. This is different from updating Google Maps.
- For the **existing** eligible Google Business Profile, keep the same genuine business record rather than duplicating it, and align its actual trading name, URL, telephone, logo, categories and services with real-world HEXA Steel branding. Business names must match actual signage/branding and should not be stuffed with service keywords.
- Update LinkedIn (`brand.linkedIn` currently points to a hexametals path), directories, procurement portals, press materials and customer-facing profiles. Preserve historic brand references for discovery without implying that the former business is a separate company.

### Target terms and matching intent

| Cluster | English searches | Arabic search ideas | Destination |
|---|---|---|---|
| Structural steel | steel structures Saudi Arabia; steel fabricators Riyadh; steel companies KSA | هياكل حديدية؛ مصنع هياكل حديدية | /solutions/structural-steel |
| PEB | pre-engineered buildings; PEB manufacturers; steel warehouse | مباني حديد جاهزة؛ هناجر حديد | /solutions/peb |
| Cold-formed sections | C purlins; Z purlins; CZ profiles; cold-formed steel | مدادات سي وزد؛ قطاعات حديد مشكلة على البارد | /products/cz-purlins |
| Cutting | CNC laser cutting; steel plate laser cutting | قص ليزر حديد؛ قص صفائح حديد | /services/laser-cutting |
| Engineering | Tekla detailing services; steel shop drawings | تفصيل هياكل حديدية؛ رسومات تيكلا | /services/tekla-detailing |
| Flanges | puddle flanges; gooseneck flanges; custom steel flanges | فلنجات مانعة لتسرب المياه؛ فلنجات خاصة | /products/puddle-flanges |
| Brand | Hexa Steel; HexaMetals; Hexa Metals | هيكسا ستيل؛ هيكسا ميتالز | / |

**Do not auto-publish Arabic doorway translations:** actual Arabic localized pages and correct hreflang belong to the separate R1-E localization acceptance scope. Verify exact technical product terms against real HEXA sales language before paid campaign launch.

### SEM launch after analytics and landing-page verification

- Create a company-owned Google Ads account and connect to GA4, Search Console where supported and validated lead events.
- Start with **Search-only**, Saudi location-targeted campaigns, organized by high-intent cluster: Structural Steel, PEB, Laser Cutting, C/Z Profiles, Detailing and Specialist Flanges. Separate brand terms (`Hexa Steel`, `HexaMetals`) from non-brand campaigns to avoid misleading CPA attribution.
- Begin with exact and phrase match, suitable negative keywords (jobs, careers, free software, tutorials, scrap, used), and Arabic only after Arabic landing-page quality is adequate.
- Define success as **qualified inquiries, RFQs and pipeline opportunities**, not impressions or click-through rate alone. Apply budget only after testing real destination pages and lead reception; avoid advertising an inactive intake form.

### Acceptance / release gate

1. `npm run check`, `npm run test`, `npm run build` and existing logo/search CI succeed on the final feature SHA.
2. Verify rendered metadata, canonical URL for every new page, robots, sitemap, internal links, and schema parser warnings in built output.
3. Verify consent behavior on mobile and desktop; no GA4 requests before opt-in; no form/PII in analytics payload.
4. Obtain CEO explicit approval **before** integration into `rebuild/website-v3`; never merge into `main` or create staging domains.
5. After approved deployment: test live domain, indexing, analytics DebugView, phone/WhatsApp clicks, old URL redirects when the old domain is controlled and migration approved.
6. Verify actual Search Console/Bing/Google Business ownership and submissions in the account UIs; record separate screenshots/evidence, not passwords.

**Ownership gaps:** Google/Bing/Analytics/Ads/Business Profile accounts and Cloudflare/old-domain DNS are not available through the repository connector. Therefore no registration, verification, live traffic counts, redirects, ad spend or production activation can be claimed merely from this PR.
