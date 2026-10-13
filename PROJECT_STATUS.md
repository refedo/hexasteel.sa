# HEXA Steel® — Website V3 Delivery Dashboard

**Baseline:** 13 October 2026  
**Status:** Release 1 in implementation / executive design review  
**Repository:** [refedo/hexasteel.sa](https://github.com/refedo/hexasteel.sa)  
**Working branch:** `rebuild/website-v3` (never merge to `main` without approval)  
**Review domain:** https://hexasteel.sa (pre-launch)  
**Last verified application release:** `48132e6`; [DigitalOcean deploy success](https://github.com/refedo/hexasteel.sa/actions/runs/38312807712)  
**External path-check:** [GitHub public route verification succeeded](https://github.com/refedo/hexasteel.sa/actions/runs/38313053327)  
**Current branch HEAD at audit:** `40cd124` (documentation/workflow changes after application release).

## Change log — V3.6 (2026-10-13)

**Implementation commit:** [a50b744](https://github.com/refedo/hexasteel.sa/commit/a50b74497b3fbf9b32e525a7b210778c0f9f4d9c)  
**Status when logged:** Source committed; CI and DO deployment checks in progress. Live verification required before changing R1 completion estimate.
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

## One-page executive summary

- **Release 1 (corporate website + CMS + secure enquiry intake) completion: approximately 44%**.
- **Release 2 (advanced vendor qualification + commercial dashboard/OTS links): not started.**
- **Release 3 (human-approved AI estimation): not started.**
- These percentages are *management planning estimates* computed from weighted R1 workstreams. They are **not** objective code coverage, cost burn, or a claim that 44% of the entire three-release program is complete.
- **Current review gate:** CEO to accept/revise the active V3 visual direction and page structures.
- **Next engineering milestone after sign-off:** connect the Sanity project, make the theme and editorial content truly editable, create publishing/preview workflows, and load approved company information.

## Release 1 weighted completion score

| Workstream | Weight | Estimated work completed | Weighted contribution | Status |
|---|---:|---:|---:|---|
| Strategy, sitemap, blueprint | 10% | 90% | 9.00% | Mostly complete |
| Visual system, responsive UX | 15% | 75% | 11.25% | In CEO review |
| Page architecture and interactions | 15% | 75% | 11.25% | Core pages built |
| Approved reference projects and trust proof | 10% | 25% | 2.50% | Placeholders and draft claims |
| Connected Sanity CMS / editorial freedom | 15% | 15% | 2.25% | Schemas exist; project not connected |
| Knowledge Centre, Insights and SEO content | 10% | 50% | 5.00% | Routes/draft articles live; editorial still needed |
| Arabic / English, RTL, localization | 10% | 0% | 0.00% | Not implemented |
| Contact, secure RFQ and vendor intake | 10% | 10% | 1.00% | Contact UI exists, delivery/portal not launched |
| Accessibility, security, QA and release sign-off | 5% | 40% | 2.00% | CI & route checks; broader QA remains |
| **Release 1** | **100%** | — | **44.25% ≈ 44%** | **In progress** |

**Method:** Each row's weight × estimated row completion. Revise only after accepted deliverables and release evidence. Release 2 and Release 3 are tracked separately.

## What has actually been built

### Implemented and deployed for review

- [x] Next.js V3 clean application with GitHub CI and isolated DigitalOcean release process
- [x] Homepage with structural steel and PEB presented as equal primary solutions
- [x] Responsive V3 layout, typography, HEXA primary #2C3E50 and selectable accent configuration in code
- [x] Project Delivery page, 7-activity/3-stage connected timeline, expandable site delivery sections
- [x] Quality Control page with interactive inspection checkpoints
- [x] Service-led manufacturing capability page without public machine brands/models
- [x] Structural Steel and PEB detail pages
- [x] Coating and fire protection overview
- [x] Completed-reference project index and individual page templates (not yet approved client case studies)
- [x] Knowledge Centre listing and three linked technical articles (draft editorials)
- [x] Insights index and five milestone/story detail routes (draft editorials)
- [x] Operational Excellence and Hexa Academy/People landing pages
- [x] Contact page UI; quotation information page
- [x] Homepage high-level trust/qualification strip (not Kirby-style quantified evidence tiles)
- [x] Direct LinkedIn link
- [x] Server-side route checks and rollback-capable pre-launch deployment

### Designed or partly coded, but NOT operationally finished

- [ ] Connect actual Sanity project/dataset; enable editor sign-in, previews, role controls
- [ ] Enable CMS color selector for a real editor; **model and frontend fallback exist, not a connected editor workflow**
- [ ] Make every project, article, testimonial, machine service and section dynamically CMS-driven
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
| Homepage | Yes | CEO reviewing visuals; trust proof unverified |
| Structural Steel | Yes | Content draft |
| PEB | Yes | Content draft; MODON/scope evidence required |
| Project Delivery & Site | Yes | Timeline interactive/accordion; mobile review pending |
| Machinery / Steel Services | Yes | Service-led, no machine brands/models in current client UI |
| Coating / Fire Protection | Yes | Confirm offered and subcontracted scopes |
| Quality Control | Yes | Interactive; credential validity pending |
| Projects + case studies | Yes | Public facts/images approval pending |
| Knowledge Centre + article pages | Yes | Three draft linked articles |
| Insights + milestone pages | Yes | Milestone dates/narratives need editorial approval |
| Operational Excellence | Yes | Operational claims need evidence review |
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
2. **R1-B: CEO visual/content acceptance** — review hero, 7-stage timeline, quality interactions, project delivery and service-led capability pages.
3. **R1-C: Sanity operating CMS** — editor adds article, updates a project, switches approved accent and previews changes WITHOUT GitHub.
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

_Last updated: 2026-10-13. This is a working tracker, not a certification of launch readiness._
