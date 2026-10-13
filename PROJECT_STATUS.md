## V3.12 — Approvals logo support & full-content search coverage (2026-10-14, feature branch; not released)

- **Branch:** `feature/v312-approvals-search-index`, based on the latest verified `feature/rfq-lead-intake-v3-11` head `ed7b94c`. Stacked behind draft PR #12; no merge or deployment authorized.
- **Search fix:** Structural steel's displayed narrative/product range now shares its source with the on-site search index. Mezzanine, poultry farm(s), industrial platforms, trusses, warehouses and the alias “metal works” return `/solutions/structural-steel` in both header search API and dedicated results page. CMS-approved Insights/Knowledge full section copy and project scope join the searchable corpus. Company overview and reported qualification names are included.
- **Vendor logos:** CMS `publicQualification` now supports an official logo image, accessible alt text and mandatory per-logo `logoUseAuthorized` approval. The approvals page displays uploaded/cleared Sanity logos responsively, retaining the existing text-only presentation otherwise; never synthesize logos or imply unsupported endorsement.
- **Testing:** CI adds `test:search` for API, search results page, actual structural content, existing queries and sitemap. Verify successful CI for the feature SHA before review; perform responsive browser QA after approval to deploy.
- **Operational blockers:** Obtain rights-cleared official logo files for all eleven listed organizations (or each current approved CMS qualification); upload and explicitly clear them in Sanity; verify approved status/scope per name. No remote logo hotlinking. Until these assets and clearances exist, no official vendor logos will display.
- **SEO distinction:** Internal website search indexing is separate from Google/Bing crawl indexing. The global `SITE_INDEXING_APPROVED` opt-in remains **false**; never enable external indexing without CEO approval.
- **R1 weighted completion:** **61% unchanged** until editorial assets, CI and operational acceptance are verified; R2 and R3 separate.
- **Next:** Confirm logos, editorial scopes, staged PR stack and green CI. Seek explicit permission before integration merge / DigitalOcean deployment. Record final PR, commit and CI outcomes here after verified.

---

# HEXA Steel® — Website V3 Delivery Dashboard

## V3.11 — RFQ & Lead Generation security milestone (14 October 2026)

**Branch:** `feature/rfq-lead-intake-v3-11`, based on `rebuild/website-v3`. **Release state:** implementation and code verification completed; **draft PR #12**, **no merge/deployment initiated**. Full Next.js build, TypeScript and RFQ HTTP smoke tests **passed** on [`b88fb78`](https://github.com/refedo/hexasteel.sa/commit/b88fb785fea3cfb7362e04ac9261292fe0da3efb) ([CI 38476945035](https://github.com/refedo/hexasteel.sa/actions/runs/38476945035) and [PR CI 38476951970](https://github.com/refedo/hexasteel.sa/actions/runs/38476951970)).

- Existing V3.10 already implemented service-prefilled forms, optional drawing/BOQ uploads, high-entropy receipt references, a Resend customer email with Sales BCC, and WhatsApp fallback. **V3.11 separates restricted Sales attachment notification from the customer receipt** for privacy. This is **not** evidence that email delivery or production activation has passed.
- V3.11 introduces contextual technical questions by service, malware-scan-gated attachments with fail-closed checks, and an optional authenticated server-to-server private CRM lead event (HMAC SHA-256, idempotency key, no raw attachments).
- CI contract strengthened with HTTP RFQ tests and TypeScript/build checks.
- Pre-launch crawl-control discrepancy corrected at source: index/follow metadata now defaults OFF until `SITE_INDEXING_APPROVED=true` is explicitly configured for approved go-live; this requires a new build. This is not a substitute for access control.
- **Gates remaining:** verified scanner vendor and file privacy; verified sending domain and real customer/Sales delivery with PDF+DWG; hardened throttling/bot defence and privacy/retention; secure durable database and tracking queue; explicit CEO deployment permission.
- **R1 weighted progress stays at 61% pending acceptance.** Do not equate code-complete RFQ with commercially operational lead intake.

---


**Baseline:** 13 October 2026  
**Status:** Release 1 in implementation / iterative executive visual review and CMS connection  
**Repository:** [refedo/hexasteel.sa](https://github.com/refedo/hexasteel.sa)  
**Working branch:** `rebuild/website-v3` (never merge to `main` without approval)  
**Review domain:** https://hexasteel.sa (pre-launch)  
**Last verified application release:** `a936a6f` (V3.8 corporate redesign); [DigitalOcean deployment passed](https://github.com/refedo/hexasteel.sa/actions/runs/38450949331)  
**External verification:** [V3.8 pages and client confidentiality check passed](https://github.com/refedo/hexasteel.sa/actions/runs/38451975065)  
**Current implementation baseline:** `a936a6f` (focused homepage, sticky dropdown menus, client-safe projects, new services, CMS field audit).

## Change log — V3.7 (2026-10-13)

**Implementation:** [441f6aec](https://github.com/refedo/hexasteel.sa/commit/441f6aecf3a85bdb8febed8f21bfaeef9fec328a) and [b427cd3](https://github.com/refedo/hexasteel.sa/commit/b427cd3b3cd5070cca21fd395cd389cd4e471ae8).  
**Validation:** [Build/TypeScript passed](https://github.com/refedo/hexasteel.sa/actions/runs/38376802813), [DigitalOcean deployment passed](https://github.com/refedo/hexasteel.sa/actions/runs/38376802853), [external URL checks passed](https://github.com/refedo/hexasteel.sa/actions/runs/38377181392).

**Delivered:**
- Global website-level search in the header, Ctrl/⌘ + K, search overlay, backend search endpoint and dedicated /search results page.
- Public search index covering company pages, steel services, clients/projects, Knowledge Centre, Insights and quality; merges approved CMS content once Sanity is provisioned.
- Structural Steel, PEB and Operational Excellence redesigned into interactive editorial capability panels, matching the visual language of Projects/Quality/Insights rather than card piles.
- Sanity content schemas refined for approved web projects, Knowledge articles, Insights, public steel services, homepage slider imagery and selected brand accent.
- CMS loaders integrated into Homepage, Projects, Insights and Knowledge pages with current references retained as fallback.
- /studio editorial workspace entry point built. Without the Sanity Project ID it intentionally displays a setup message; no editorial content is actually editable yet.
- Corporate onboarding and quality controls documented in [CMS_SETUP.md](CMS_SETUP.md).

**Not yet accepted or completed:** actual Sanity project connection, role management, live editor publishing, authentic HEXA media, permissioned client case studies, bilingual Arabic/RTL, secure RFQ/email/vendor intake and final security/performance QA.

**Next milestone:** provision the Sanity project under a HEXA-owned account, configure the public project ID and authorized editors, and prove the six end-to-end CMS acceptance tests without changing source code.

---

## Change log — V3.6 (2026-10-13)

**Implementation commit:** [a50b744](https://github.com/refedo/hexasteel.sa/commit/a50b74497b3fbf9b32e525a7b210778c0f9f4d9c)  
**Release verified:** TypeScript/Next.js build, DigitalOcean deployment and independent public-URL tests passed. Design/content approval remains open.
**Scope delivered in source (awaiting external design acceptance):**
- Three-image slider for structural steel construction / industrial buildings / manufacturing reference imagery (illustrative, not Hexa project photos), with slide controls and motion-reduction support.
- Replaced historic 2,250 tonne capacity notice with people/machinery/process capabilities and "thousands of tonnes each year" positioning.
- Added a company ambition statement to become the #1 mid-sized Saudi steel fabrication company; **not** a verified industry-ranking claim.
- QC sequence revised to 01 MIR/material receiving, 02 dimensional, 03 welding, 04 surface preparation/blasting/coating, 05 TQM/controlled documentation and OTS™ records; ITP is mandatory across inspection checkpoints.
- Projects expanded to eight named references with searchable/filterable industry portfolio, known tonnages only and clearly labelled illustrative sector photographs. Client logos/endorsements/actual project photos not invented.
- Insights redesigned with interactive story selection, categorical navigation and featured editorial view.
- PSF/SIF abbreviations and PIF/AMP expansions added; SIRI (Smart Industry Readiness Index) milestone published in source content.
- Removed generic "photos/documentation will be added" copy from Insights detail pages and capacity-verification announcement from Knowledge Centre FAQ.

**Executive acceptance remaining:** actual Hexa project photographs, publication consent for named client references, production facts, #1 market positioning wording, mobile aesthetics; further CMS/editorial integration.
**Next milestone:** connect the working Sanity CMS, make page sections, news, article assets, and theme settings independently editable after design approval.

---

## Sanity Studio connectivity verification — 13 October 2026

- **Sanity Project ID:** \`ik7morln\`; dataset \`production\`.
- **Applied fix:** removed the environment-variable-only Studio placeholder and provided the public Sanity Project ID as a fallback in the Studio configuration and CMS readers.
- **DigitalOcean deployment:** [passed](https://github.com/refedo/hexasteel.sa/actions/runs/38423275394) on V3 branch.
- **Independent domain smoke test:** [passed](https://github.com/refedo/hexasteel.sa/actions/runs/38424091525). \`/studio\` returns HTTP 200, contains the Sanity editor shell, and no longer shows the connection placeholder.
- **Sanity public data API:** HTTP 200; CORS headers confirmed \`access-control-allow-origin: https://hexasteel.sa\` and \`access-control-allow-credentials: true\`.
- **Remaining acceptance gate:** corporate owner logs into the Studio from a browser, successfully edits/publishes the Website Settings accent, and confirms the live website reflects the edit after cache revalidation. Other CMS content CRUD and role permissions remain to be tested.
- **R1 progress stays at 54%** until the authenticated editor/publishing test passes; operational setup is not equivalent to editorial acceptance.

## CMS publishing test accepted — 13 October 2026

**Sanity project:** \`ik7morln\` / \`production\` | **Plan:** 30-day Growth feature trial, configured to downgrade to Free automatically unless explicitly upgraded.

**Verified:** HEXA company owner accessed the live Sanity Studio and published the \`siteSettings\` document with accent **Concrete Silver #CDD3D8**. Independent probes returned that exact published value from Sanity and the live website. Next.js stale HTML briefly showed the previous lime color; the website then served Concrete Silver.

**Caching improvement deployed:** theme data fetch and root layout revalidation reduced from 120 to 30 seconds, preserving static caching. [DigitalOcean release passed](https://github.com/refedo/hexasteel.sa/actions/runs/38426349900), and [external test passed](https://github.com/refedo/hexasteel.sa/actions/runs/38427221666), confirming published color equals live \`--signal\` and the website uses \`s-maxage=30\`.

**Status:** Embedded Studio authentication and CMS brand-accent edit/publish are accepted. Remaining: publish and verify approved Projects, Insights, and Knowledge documents with images, permissions and search; verify restricted drafts and editorial workflows. **Release 1 estimate: 57%** (CMS workstream maturity moved from 35% to 55%, adding 3 weighted points). CMS still not complete.

**Next milestone:** Editor adds one approved Knowledge Centre article with original image, publishes, and verifies it appears in listing, detail URL and global search without a GitHub deploy.

---

## Accepted V3.8 release — 13 October 2026

**Application:** [a936a6f](https://github.com/refedo/hexasteel.sa/commit/a936a6f3692b88847ce0578c4e2422557bb651d8); **DigitalOcean activation:** [passed](https://github.com/refedo/hexasteel.sa/actions/runs/38450949331).  
**Independent external test:** [passed](https://github.com/refedo/hexasteel.sa/actions/runs/38451975065), validating homepage, project status, no listed confidential names in the portfolio or query, Company and new services pages, coating C2/C3/C4/C5 and AISC/MBMA/AWS D1.1 information.

**Delivered:**
- Homepage significantly reduced to slider, trust indicators, company market-position statement, Why Hexa (agility / quality / speed / supply chain), and commercial CTA.
- Company ranking published as **Hexa's corporate positioning**, not as an independently verified ranking. \`300+\` completed projects and annual production language are **management-reported statements** requiring supporting evidence before broader public claims.
- Sticky responsive top navigation with desktop and mobile dropdowns, reorganized Products & Services, Company, Knowledge Centre.
- Added missing \`/company\` landing page and Who We Are, Approvals and Careers. Added service pages for Supply Chain, Steel Design & Detailing, Steel Fabrication, Pipes & Vessels, and revised Coating & Galvanization page with C2–C5 as ISO 12944 environmental categories.
- Portfolio anonymization extends across project index, individual cases, metadata, URL slugs and global search. Completed / Ongoing tags populated where reported; four older reference statuses still require project-owner confirmation.
- New Knowledge Centre technical guide covering steel grades, strengths, heat numbers, MTCs, material traceability and project-specific AISC/MBMA/AWS D1.1 applicability.
- Sanity models now provide publication-gated, anonymous project fields; optional CMS-driven trust indicators, header tagline, market statement and verified approval entries. Details in [CMS_FIELD_AUDIT.md](CMS_FIELD_AUDIT.md).
- **Sanity public privacy check:** zero project records containing a populated legacy \`client\` field returned by external API query on 13 October 2026.
- No merge to \`main\`. Independent browser/device visual acceptance still outstanding.

**Open risks / not yet complete:**
- Verify documentary basis for any market leader/ranking, \`300+\` total projects, approval/registration scopes and current certification validity.
- Obtain genuine Hexa-approved project and event images, and decide which customer project information can be published, if any.
- CMS coverage remains partial: insight/article cover images, SEO metadata, project galleries, testimonials, teams, generic pages and advanced service content are not fully published from Sanity.
- Arabic/RTL, secure RFQ/email/vendor forms, recruitment intake, responsive QA and go-live permissions remain open.

**Weighted Release 1 progress estimate: 61%** (provisional workstream estimates; adjusted only after successful deployment/verification).  
**Next milestone:** editorial media and CMS publishing completion, then secure commercial forms.

---

## One-page executive summary

- **Release 1 (corporate website + CMS + secure enquiry intake) completion: approximately 61%**.
- **Release 2 (advanced vendor qualification + commercial dashboard/OTS links): not started.**
- **Release 3 (human-approved AI estimation): not started.**
- These percentages are *management planning estimates* computed from weighted R1 workstreams. They are **not** objective code coverage, cost burn, or a claim that 44% of the entire three-release program is complete.
- **Current review gate:** CEO visual feedback continues iteratively in parallel with connecting Sanity.
- **Next engineering milestone:** verify an editor-published Knowledge Centre article end to end (listing, detail page, global search), then Projects and Insights; confirm permissions and content-approval controls.

## Release 1 weighted completion score

| Workstream | Weight | Estimated work completed | Weighted contribution | Status |
|---|---:|---:|---:|---|
| Strategy, sitemap, blueprint | 10% | 97% | 9.70% | IA revised, implementation in place |
| Visual system, responsive UX | 15% | 90% | 13.50% | Editorial layout expanded, mobile CEO review pending |
| Page architecture and interactions | 15% | 96% | 14.40% | Sticky dropdowns, services, company, search verified |
| Approved reference projects and trust proof | 10% | 40% | 4.00% | Portfolio anonymized; claims/evidence still pending |
| Connected Sanity CMS / editorial freedom | 15% | 60% | 9.00% | Brand, public project and qualifications schemas wired; media/SEO pending |
| Knowledge Centre, Insights and SEO content | 10% | 60% | 6.00% | New material grades guide; media/meta editorial work pending |
| Arabic / English, RTL, localization | 10% | 0% | 0.00% | Not implemented |
| Contact, secure RFQ and vendor intake | 10% | 10% | 1.00% | Contact UI exists, delivery/portal not launched |
| Accessibility, security, QA and release sign-off | 5% | 60% | 3.00% | Production/privacy route verification passed; mobile & policy QA pending |
| **Release 1** | **100%** | — | **60.60% ≈ 61%** | **In progress** |

**Method:** Each row's weight × estimated row completion. Revise only after accepted deliverables and release evidence. Release 2 and Release 3 are tracked separately.

## What has actually been built

### Implemented and deployed for review

- [x] Next.js V3 clean application with GitHub CI and isolated DigitalOcean release process
- [x] Homepage with structural steel and PEB presented as equal primary solutions; three-image industrial slider and management-approved aspiration phrasing still require executive visual sign-off
- [x] Responsive V3 layout, typography, HEXA primary #2C3E50 and selectable accent configuration in code
- [x] Project Delivery page, 7-activity/3-stage connected timeline, expandable site delivery sections
- [x] Quality Control page with interactive ITP-governed checkpoints in order: MIR/material, dimensional, welding, surface/coating, TQM/documents
- [x] Service-led manufacturing capability page without public machine brands/models
- [x] Structural Steel and PEB detail pages
- [x] Coating and fire protection overview
- [x] Expanded 8-reference project index, category/search filters and individual pages; management client/project data and illustrative images await client and image publication clearance
- [x] Knowledge Centre listing and three linked technical articles (draft editorials)
- [x] Insights index with category filters and interactive featured stories; six milestone/story detail pages including SIRI; editorial accuracy still requires management sign-off
- [x] Operational Excellence and Hexa Academy/People landing pages
- [x] Contact page UI; quotation information page
- [x] Homepage high-level trust/qualification strip (not Kirby-style quantified evidence tiles)
- [x] Direct LinkedIn link
- [x] Verified global search, overlay and dedicated /search endpoint
- [x] Interactive editorial solutions and operational-excellence narrative panels
- [x] CMS read adapters and Studio onboarding route (not connected)
- [x] Server-side route checks and rollback-capable pre-launch deployment

### Designed or partly coded, but NOT operationally finished

- [ ] Connect actual Sanity project/dataset; enable editor sign-in, previews, role controls
- [ ] Enable CMS color selector for a real editor; **model and frontend fallback exist, not a connected editor workflow**
- [ ] Complete dynamic CMS coverage (projects, articles, insights and hero are wired; testimonials, services, every page section and preview workflows remain)
- [ ] Confirm trademark/branding and integrate approved official HEXA logo assets
- [ ] Replace illustrative imagery with actual HEXA-approved photo/video library
- [ ] Approve real project data and customer/client-name/logo/endorsement use
- [ ] Publish only verified tonnage, production capacity, accreditation and live certification status
- [ ] Implement Arabic layouts, translation, RTL, accessible language switching, Arabic SEO
- [ ] Finish contact email delivery with verified sender, anti-spam, consent, rate limits and error handling
- [ ] Build secured RFQ database, private file upload, malware scanning and reference IDs
- [ ] Build initial supplier/vendor registration intake and approval workflow
- [ ] Add genuine permissioned testimonials (currently no verified quotes)
- [ ] Conduct real iPhone/tablet/desktop visual QA and WCAG/performance/security testing
- [ ] Complete privacy policy, retention, terms and production approvals
- [ ] Set production-launch robots/indexing only after explicit management approval

## Planned Release 1 web pages

| Destination | Structure available | Data/publication maturity |
|---|---|---|
| Homepage | Yes | Slider and capability-led copy deployed; CEO reviewing visuals and aspiration; trust proof unverified |
| Structural Steel | Yes | Interactive editorial service narrative implemented, visuals subject to ongoing refinement |
| PEB | Yes | Interactive editorial service narrative; MODON/scope evidence required |
| Project Delivery & Site | Yes | Timeline interactive/accordion; mobile review pending |
| Machinery / Steel Services | Yes | Service-led, no machine brands/models in current client UI |
| Coating / Fire Protection | Yes | Confirm offered and subcontracted scopes |
| Quality Control | Yes | Five interactive ITP checkpoints incl. MIR, dimensional, welding, coating and TQM; credentials pending |
| Projects + case studies | Yes | Eight named references and filters; authentic photo/client-use approvals pending |
| Knowledge Centre + article pages | Yes | Three draft linked articles |
| Insights + milestone pages | Yes | Six story pages incl. SIRI and updated PSF/SIF/PIF/AMP terminology; editorial approval pending |
| Operational Excellence | Yes | Interactive editorial systems; operational claims need evidence review |
| People / Academy | Yes | Team profiles/photos consent pending |
| Contact | UI only | Email delivery not signed off |
| Request quotation | Intro only | Secure intake/uploads not operational |
| Vendor registration | No | Planned for R1 basic intake |
| Arabic site | No | Planned for R1 |

## Proposed trust & proof section (NOT YET DEPLOYED)

**Design intent:** premium 2 × 3 (mobile) or 3 × 2 (desktop) proof tiles in HEXA navy/white/industrial greys, restrained accent, thin-line industrial pictograms. Not orange, not inflated vanity metrics. Each metric has label, period and evidence owner.

| Proposed tile | Public copy | Verification gate |
|---|---|---|
| Company longevity | **2020** — Established | Confirm corporate registration wording |
| Actual production | **~2,250 t** — Reported fabrication output, 2025 | Verify official production/finance report and whether this means fabricated or sold tonnes |
| Manufacturing footprint | **3 operational factory units** | Confirm exact current physical units and public wording |
| Delivery discipline | **7 activities / 3 stages** — Integrated delivery | Confirm process-owner wording, already approved concept |
| Industrial participation | **Cohort #1** — PIF AMP, selected Sep 2024 | Use written cohort confirmation; approved mark use |
| Growth milestone | **16,415 m²** — *planned* MODON expansion | Confirm signed documentation and permission to announce; NEVER imply existing capacity |

Additional qualification/credibility row: MODON accredited/project references, Aramco manufacturer approval (approved scope), ISO certificates (current validity), AWS CWI-qualified inspectors (personal certificate validation). Avoid numeric ranking such as “#1” without independent substantiation.

**CEO approval gate for trust tiles:** choose which five or six measurements are publication-ready, and provide proof. The cards should not be deployed with unverified values.

## Planned releases and acceptance gates

### R1 — High-end bilingual website and secure enquiry intake (in progress)
1. **R1-A: Foundation & responsive prototype** — accepted code/build; visual review open.
2. **R1-B: CEO visual/content acceptance** — rolling reviews in parallel with CMS implementation; no premature final design freeze.
3. **R1-C: Sanity operating CMS** — integration code done; connect live Sanity project, verify editing and publication WITHOUT GitHub, establish previews and editorial roles.
4. **R1-D: Trust, evidence and approved media** — launch with validated content, photos, credentials and approved testimonies.
5. **R1-E: Bilingual implementation** — mobile Arabic RTL, English, locale routes and SEO.
6. **R1-F: Contact + RFQ + vendor registration intake** — confirmed email receipt, secure file access, audit trails and notification.
7. **R1-G: Pre-launch release** — security/accessibility/performance checks, policy and indexing approval, rollback rehearsal.

### R2 — Commercial platform (not started)
Advanced supplier qualification; internal dashboards; commercial pipeline tracking and approved OTS™ integrations.

### R3 — AI estimation (not started)
Restricted supervised estimator pilot for repeatable Steel Services; engineering approval before client-binding quotations.

## CEO review checklist (CURRENT ACTION)

- [ ] Trust section approach and proposed facts approved/adjusted
- [ ] Homepage hero feels structural steel + PEB, not generic/farming
- [ ] Structural Steel and PEB retain equal prominence
- [ ] 7-activity/3-stage timeline is legible and intuitive on iPhone
- [ ] Quality interactions feel professional and useful, not academic
- [ ] Project Management content and mobile expanders are acceptable
- [ ] Steel Services sell outcomes, do not expose suppliers or machine models
- [ ] Palette/typography/brand mark appropriate for premium HEXA image

## Reporting protocol

**At every website development checkpoint, report:**
1. Planned outcome and acceptance tests.
2. Changes since last checkpoint (code/links + status).
3. What is verified live versus draft/placeholders.
4. Overall R1 percentage with weighted workstream adjustment.
5. Blockers and required CEO decisions.
6. Exactly one recommended next milestone.

**Rules:** Never inflate completion merely because a page route exists. Never claim an actual testimonial, manufacturer approval scope, certificate validity or capacity without documentary validation. Only increase a workstream's percentage when an acceptance criterion is met. Update this markdown file after every accepted release and explain the percentage change.

_Last updated: 2026-10-13 after verified V3.7 deployment. This is a working tracker, not a certification of launch readiness._
