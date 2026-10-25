## V3.27 — Google Forms application links and engineering vacancies (25 October 2026)

- Starting integration: `cd580ab381b1f67753f4b2d0218028c29966624b`; application baseline V3.26 `06db864`. Latest official progress remains **R1 75.50% ≈ 76%, R2/R3 0%**.
- CEO-authorized live Sanity updates: HX-CAR-006 Steel Design Engineer (existing draft reused) and HX-CAR-007 Steel Detailing Engineer (Steel Detailer) completed and published, both 6–10 years. Seven open roles verified on public Careers page.
- Isolated `feature/v327-careers-google-form`: visible “Apply for this job” on eligible open cards links to CEO-provided Google Form; native intake UI replaced temporarily, no OTS integration claimed. Google sign-in requirement disclosed.
- Code integration/deployment pending separate approval. Form completion/response receipt not tested. See `CAREERS_GOOGLE_FORM_V327_HANDOVER.md` and PR for tests and handover. No progress increase for unmerged code.

---

## Current release progress — 25 October 2026 (authorized weighted reassessment)

**R1: 75.50% ≈ 76%. R2: 0%. R3: 0%.** This supersedes older management percentages for current reporting. The CEO requested publication and a fresh calculated estimate on 25 October. This measures development maturity; operational acceptance remains tracked separately.

[Full calculation, evidence, remaining scope and handover](ROADMAP_PROGRESS_20261025.md).

| Workstream | Weight | Estimated completion | Contribution to R1 | Remaining R1 points |
| --- | ---: | ---: | ---: | ---: |
| R1-A — Foundation, architecture and responsive design | 25% | 95% | 23.75 | 1.25 |
| R1-B — Corporate pages, products, services and navigation | 15% | 95% | 14.25 | 0.75 |
| R1-C — Sanity CMS and editorial management | 15% | 80% | 12.00 | 3.00 |
| R1-D — Projects, qualifications, Knowledge Centre and media | 20% | 80% | 16.00 | 4.00 |
| R1-E — Arabic/English localization and RTL | 10% | 0% | 0.00 | 10.00 |
| R1-F — RFQ, secure uploads, notifications, Careers and basic vendor registration | 10% | 55% | 5.50 | 4.50 |
| R1-G — SEO, security, testing and operational acceptance | 5% | 80% | 4.00 | 1.00 |
| **R1 total** | **100%** | — | **75.50% ≈ 76%** | **24.50** |

**Weight continuity:** Original weights retained: A = strategy 10% + visual/responsive 15%; B = page architecture 15%; C = CMS 15%; D = projects/trust 10% + Knowledge/Insights 10%; E = localization 10%; F = intake 10%; G = QA/security/sign-off 5%. Scores are evidence-informed estimates, not measured acceptance-test coverage. The prior 70% was a management estimate; 76% is a newly calculated rebaseline of already delivered work, not new operational acceptance.

**Latest verified application baseline:** `rebuild/website-v3` `06db8641277498c105942ae7ed50b60a184e21a2`, merged V3.26 [PR #37](https://github.com/refedo/hexasteel.sa/pull/37). Final-head CI [#40137673024](https://github.com/refedo/hexasteel.sa/actions/runs/40137673024) / [#40137669866](https://github.com/refedo/hexasteel.sa/actions/runs/40137669866), deployment [#40137669936](https://github.com/refedo/hexasteel.sa/actions/runs/40137669936), preflight [#40137669860](https://github.com/refedo/hexasteel.sa/actions/runs/40137669860) all succeeded. This supersedes V3.26's historical deployment-pending text below.

**Acceptance still open:** Careers legacy vacancy population, authenticated HR publishing/closure and private CV delivery; supplier E2E (last verified disabled); contact HTML inbox appearance and contact/favicon CMS publication; RFQ remains draft/incomplete; Arabic/RTL not implemented; remaining content/evidence, indexing and final release QA.

**Next milestone:** Resolve missing Careers vacancies and verify the HR lifecycle/private intake; then close deployed CMS/contact/supplier acceptance, resume secure RFQ, implement Arabic/RTL and finish R1 operational sign-off. Scope remains the agreed R1-A–G, R2 commercial platform and R3 supervised AI estimation. No blended programme percentage.

**This reconciliation:** documentation-only branch `docs/roadmap-progress-20261025`; no application changes, integration/main changes, deployment, email or Sanity mutations. Historical entries below are preserved for traceability.

---

## V3.26 — Careers cards, favicon and contact editing (24 October 2026; feature branch)

- **Verified previous stopping point:** V3.25 PR #36 merged/deployed at `9624eefbbceb8d974813249491dde92b594dc3cb`; deployment #40082912941 succeeded, public routes/Studio bundle verified. HR publication, scanner/mailbox and private delivery acceptance remain pending. This supersedes stale deployment-pending notes below.
- **Current baseline:** isolated `feature/v326-careers-contact-cms` from that integration revision. Existing V3.25 vacancies, contact delivery, supplier/nav/SEO retained. No production or main changes.
- **Delivered:** responsive vacancy cards; Sanity favicon upload wired to metadata; Contact Form & Enquiry Email singleton for labels/hints/categories/page/confirmation/email copy; escaped branded HTML email with text alternative in both transports. See `V326_CAREERS_CONTACT_HANDOVER.md`.
- **Validation:** local TypeScript, 72 automated tests and production build passed. Final-head CI and remaining visual/search/logo evidence recorded in milestone PR. No real mail sent, no Sanity records altered. Deployment/operational acceptance pending.
- **Official progress remains R1 70%, R2/R3 0%.** No increase before accepted operation.

---

## V3.25 — HR-managed Careers (24 October 2026; feature branch)

- Baseline: integration `c435985bb6fad5f6c83a0de550ed312da536885e`. PR #35 records successful read-only live verification at this revision, superseding the earlier failed-rollout notes below. No new live acceptance is claimed here.
- Developed on `feature/v325-hr-careers-cms`: comprehensive Sanity vacancy editor, published Open/On Hold/Closed lifecycle, opening/deadline gates, legacy roles draft preparation, dynamic careers listing and comprehensive applicant form with private scanned PDF delivery.
- Submission activation is gated pending verified HR mailbox, scanner and safe E2E acceptance; no candidate data in Sanity. HR Sanity permissions must be configured, not inferred from menu visibility.
- Testing/deployment stages and operational checklist: `HR_CAREERS_V325_HANDOVER.md` and milestone PR. No integration/main changes or deployment without CEO approval.
- **Official progress: R1 70%; R2 0%; R3 0%, unchanged pending acceptance.**

---

## Official progress reconciliation — 24 October 2026 (CEO confirmation; V3.24 branch)

| Release | Current management progress | Basis |
| --- | ---: | --- |
| **R1 — Corporate Website, CMS & Lead Generation** | **70%** | CEO-confirmed management estimate, as documented in [PR #31](https://github.com/refedo/hexasteel.sa/pull/31): operational contact inbox delivery and deployed technical canonical SEO work |
| **R2 — Commercial Platform & CRM** | **0%** | Not started / deferred |
| **R3 — AI-Assisted Steel Estimation** | **0%** | Not started |

**Reconciliation:** Historical 65% and 68% entries below are superseded for current management reporting by the 70% figure confirmed by the CEO. PR #31 is the separate acceptance-record branch; this entry records the same figure on V3.24 without claiming PR #31 has been merged into the integration branch. Google indexing confirmation and branded email formatting remain open. The V3.24 navigation changes in [PR #32](https://github.com/refedo/hexasteel.sa/pull/32) were integrated at `1c341c9b` after CI; the DigitalOcean deployment at that revision failed on the previously reported invalid `/root/hexasteel-v3/.env.contact` text line, so those navigation changes are not yet verified live and do not increase the 70% figure. No change to `main` or production.

---

## V3.24 — Become a Supplier experience and deployment safeguards (24 October 2026)

- **Previous stopping point:** V3.23 Supplier Registration PR #29 merged to `rebuild/website-v3` as `f8fbbb0423d3a20762963678a6bfc7ed7f3026c6`. Merge commit passed website foundation CI (#40031761231 / #40031754468) but DigitalOcean rollout #40031754305 **failed** while shell-sourcing persistent `.env.contact`: line 10 `Supplier: command not found`. Previous website release `6f482d7d` was preserved; V3.23 cannot be claimed deployed or accepted.
- **Current starting point:** Integration branch `rebuild/website-v3` `f8fbbb04`, website `main` unchanged at `8502ecf7`. OTS PR #620 merged `7b114b85`; follow-up PR #621 merged `f8734f52` and DigitalOcean deployment #40031896526 succeeded. OTS logged MySQL migration error 1045 during prior rollout; supplier table existence and private end-to-end functional acceptance remain **unverified**.
- **Current milestone:** Isolated feature branch `feature/v324-supplier-experience-hardening` from verified website integration head. Premium navy supplier landing page; evidence-based qualification criteria; structured accessible form; per-product categories and manufacturing origin; PDF count/MIME/size preflight; consistent error feedback and Turnstile reset; deployment preflight rejects invalid persistent env lines without printing credentials.
- **Acceptance criteria:** TypeScript checks, website tests, search/logo check and Next production build all pass in CI; no unrelated page regressions. Independent confirmation of persistent env fix, live website version, OTS supplier schema, page and form integration before enabling supplier submission. Feature development does not imply activation or operational acceptance.
- **Release accounting:** Documented management baseline **R1 68%**, R2/R3 0%. V3.24 developed on feature branch only. No deployment, merge into integration or production acceptance claimed for this milestone.


- **New verified integration baseline:** website `rebuild/website-v3` `1c341c9b` following the navigation PR. The last attempted deployment of this revision also failed before activation while sourcing the malformed server environment file; owner reports having edited the file on 24 October, but its syntax has not yet been independently rechecked.
- **New DB evidence:** CEO ran a read-only MySQL table-existence query on DigitalOcean and returned `1` for `ots_db.ScSupplierApplication`. This verifies table presence, not schema conformance, email or form E2E.
- **Reconciliation:** V3.24 Supplier UX remains isolated on `feature/v324-supplier-experience-hardening`; content/css have been merged with the latest navigation and official 70% status on the feature branch. No pushes to integration or website main in this reconciliation.

---

## V3.23 — Supplier intake integration (24 October 2026, isolated reconciliation)

- **Last verified production baseline:** `rebuild/website-v3` 6f482d7dbf5c; current website integration includes canonical/SEO updates and contact activation, which this conflict resolution preserves.
- **Current milestone:** Rebase-by-merge supplier feature PR #29 against the verified integration head and run fresh CI. OTS companion PR #620 remains draft and is not merged into `main`.
- **Release policy:** website integration and OTS production deploy only on explicitly approved workflow, with public supplier submission gated off until cross-system tests pass.
- **Official status:** R1 68% documented baseline, R2 0%, R3 0%. No deployment or operational acceptance claimed for V3.23 yet.

---
## V3.22 — Contact enquiry activation (23 October 2026; conflict resolution on feature branch)

- **Previous stopping point:** V3.22 PR #28 at `d27f411` passed TypeScript, Node tests, build and search checks but became unmergeable after R1-G03 PR #30 integrated. R1-G03 subsequently deployed to `hexasteel.sa` at `d2b4e0f` with successful CI, preflight and DigitalOcean deployment.
- **Current verified baseline:** `rebuild/website-v3` `d2b4e0f739324c82c55c65c282d22b718b04ee1c`; V3.22 remains isolated to `feature/v322-siteground-contact-enquiries`. SEO canonical fixes are retained including the self-referencing `/contact` canonical and all 27 public sitemap pages.
- **Operational prerequisites reported by management:** Resend `notify.hexasteel.sa` verified (Cloudflare DNS displays two DNS-only CNAME records and DKIM TXT). DigitalOcean root console shows `/root/hexasteel-v3/.env.contact` exists with mode `0600`. **The actual key values, Turnstile configuration, deployment SSH username / HOME and runtime mail delivery remain unverified**; no secrets copied to source.
- **Current milestone:** Reconcile two conflicts (`src/app/contact/page.tsx`, `PROJECT_STATUS.md`) while retaining R1-G03 and V3.22. Feature branch only. Run CI on the resolution head; do not integrate, push auto-deploying branch or claim operational acceptance without separate approval.
- **Progress:** R1 **68%** documented management estimate, R2 **0%**, R3 **0%**. New changes not counted until accepted. See `CONTACT_SITEGROUND_V322_HANDOVER.md`.

---

## R1-G03 — Canonical URL / Search Console Duplicate Handling (22 October 2026; feature branch)

- **Previous verified milestone:** V3.21 PR #27 merged to `rebuild/website-v3` at `0964ff92`; source verifies CMS-managed analytics. Production deployment/operational acceptance was not revalidated during this SEO audit. V3.22 PR #28 and V3.23 PR #29 remain separately open.
- **Current verified starting point:** Integration branch `rebuild/website-v3` commit `0964ff92eef09e778ac95198403dccdf815d483a`. Existing SEO helper provides canonicals for six static sitemap entries and individual dynamic project/article details, but 21 public static routes lacked self-referencing canonicals.
- **Google report:** Search Console email says `Duplicate without user-selected canonical`. Specific example URLs, Google-selected canonicals and live domain routing were not supplied or available, so the scope of Google's report is **not yet proven** to match each code change.
- **Implemented on isolated branch:** `feature/r1g03-canonical-indexing-coverage`: self-referencing canonicals now declared across all **27** static sitemap routes; limited permanent `www` → `https://hexasteel.sa` redirect at the Next.js origin; regression tests for canonical/sitemap consistency and exclusion of private/search pages.
- **Current milestone and gates:** Source committed; TypeScript/test/build and final CI pending verification. PR approval, integration, production deployment, external Cloudflare/Nginx redirects, exact Google Search Console inspection and indexed-result confirmation remain separate. No change to `main` or production.
- **Official release progress:** R1 **68%** existing management estimate; R2 **0%** and R3 **0%**. This unmerged patch is not counted. Details: `R1G03_CANONICAL_INDEXING_HANDOVER.md`.

---

## V3.21 — Automatic Google Analytics and CMS-Editable Tracking IDs (21 October 2026; feature branch)

- **Previous verified stop:** V3.20 PR #26 deployed at `adfe5ab` on `rebuild/website-v3`; CI and DigitalOcean health passed. Google Tag Manager `GTM-N7QJSQTB` retained; `analytics_storage` denied by default; no Privacy route or visitor analytics buttons.
- **Starting baseline:** `adfe5ab` deployed integration branch, `main` unchanged.
- **Feature scope:** Automatic GA4 measurement (`analytics_storage:granted`), advertising consent remains denied; a new **Website Analytics** Studio singleton edits validated GTM and GA4 IDs. The server loads these with 30-second revalidation and safe defaults, no arbitrary scripts. One-time GTM Data Layer Variable `hexa_ga4_measurement_id` configuration is needed for GA4 ID changes when using GTM-managed tracking; the alternative direct-loader mode requires explicit confirmation that GA4 tags were disabled in GTM.
- **Development stage:** Source/tests/documentation on `feature/v321-ga4-default-measurement`; CI, integration, deployment and operational acceptance tracked separately. No unapproved production/main push.
- **Official completion:** R1 **68%** existing management reassessment; R2 **0%**, R3 **0%**. Unmerged V3.21 not counted. See `V321_HANDOVER.md`.

---

## V3.20 — Studio Editorial & Website Experience (21 October 2026 — Feature branch)

- **Previous verified stopping point:** PR #25 V3.19 integrated and deployed to `hexasteel.sa` from `rebuild/website-v3` commit `6999184`; CI and DigitalOcean health checks passed. User screenshots confirm access to the editorial Studio menu but do not establish publication delivery. Open PR #12 RFQ and #19 editorial UX remain unmerged.
- **Current verified baseline:** `rebuild/website-v3` at `6999184`, V3.19 Studio, project filters and photography/watermark preserved; `main` remains untouched.
- **Current milestone:** V3.20 isolated `feature/v320-studio-ux-corporate-polish`. Implement: meaningful Studio labels; bulk project status; image-upload guidance; Join Our Team naming; persistent beta dismissal; existing GTM/Consent Mode preserved with no Privacy page or analytics-consent UI (deferred until full launch); rotating delivery/excellence panels, planning Gantt and site micro-motion; full Knowledge card navigation; project-tracking coming-soon; corporate footer; secure gated customer feedback to `customer.feedback@hexasteel.sa`.
- **Progress reconciliation:** Previous **officially documented** R1 65%. The CEO authorized a progress reassessment after demonstrating live Studio navigation. **New R1 estimate 68%** reflects deployed and visually verified CMS editorial advancements, NOT any V3.20 code pending merge, bulk-publication acceptance or the RFQ. R2 0%, R3 0%; no blended completion figure.
- **Development stage:** Feature-branch code and documentation, automated checks pending final confirmation, not merged, not deployed and not operationally accepted. Feedback live mail requires verified provider/anti-bot configuration before activating. No OTS™ customer tokens exist on the website.
- **Handover and next step:** See `V320_HANDOVER.md`; complete CI, PR review, explicit CEO approval before integration into `rebuild/website-v3`. Deploy only through approved existing DigitalOcean workflow and verify production; do not merge into `main`.

---

## V3.19 — Sanity draft project selective/bulk publication (20 October 2026; isolated branch)

- **Previous stopping point:** V3.18 PR #24 approved and merged only to `rebuild/website-v3` at `0c630d5`; feature/post-merge CI and DigitalOcean live deployment checks passed. The 22 management-supplied projects remained unpublished editable drafts requiring Studio import and publication rights.
- **Current starting point:** Deployed V3.18 project filters, galleries, Sanity schemas and dual approval gates; no direct authenticated Sanity publication access from ChatGPT. PR #12 RFQ and optional PR #19 remain separate and unmerged.
- **Current milestone (feature code):** User-requested **general** Studio draft project manager, not limited to 22 records: show all project drafts, select all or individual records, publish only selected with explicit factual/photo rights and customer-identity attestations, revision/slug conflict checks and clear results. New import action not required for future draft records.
- **GitHub:** `feature/v319-bulk-project-publishing`; handover `PROJECT_PUBLISHING_V319_HANDOVER.md`. CI/PR/deployment and authenticated Studio acceptance must be verified separately. No `main` merge, unapproved integration or production change.
- **Official releases:** R1 **65%**, R2 **0%**, R3 **0%**, unchanged pending operational acceptance.

---

## V3.18 — Industry-classified projects and Warehouse filter (20 October 2026; feature branch)

- **Previous stopping point:** R1-G02 PR #23 integrated to `rebuild/website-v3` at `36c70534`; CI and DigitalOcean deployment workflows passed. RFQ #12 and optional project-publishing UX #19 remain separate unmerged drafts.
- **Current starting point:** Verified integration branch `36c70534`, preserving V3.17 project gallery/watermark and dual Sanity publication gates.
- **Milestone (code developed on isolated branch):** 22 user-supplied public project candidates imported as protected, unpublished Sanity drafts through the existing editor action. Independent Industry / Project Type / Steel System fields and filters (including 8 Warehouse tags), searchable public CMS facets and detail views. Additional projects remain creatable through Sanity.
- **GitHub:** `feature/v318-industry-project-portfolio` targets `rebuild/website-v3`; see `PROJECT_PORTFOLIO_V318_HANDOVER.md`. CI, integration, production, named-publication permissions and operational acceptance must be recorded separately. No merge/deployment authorization implied.
- **Official completion:** R1 **65%** (management-approved), R2 **0%**, R3 **0%**. Unchanged; no blended programme percentage.

---

## R1-G02 — Search visibility and analytics consent (19 October 2026; feature branch)

- **Previous verified milestone:** PR #22 integrated to `rebuild/website-v3` `b01c324`, DigitalOcean deployment and independent production SEO/security/GTM audit passed.
- **Current verified starting point:** Connected Search Console (domain property) and GA4 property, but GA4 17–19 Oct reporting had zero rows. Corporate Search Console baseline had no reported corporate URLs yet. Independent live audit read-only workflow passed.
- **Current milestone:** Introduce visitor Google Consent Mode v2 default-denied and explicit analytics opt-in/opt-out; preserve the single GTM container, remove unconsented no-JS fallback, add privacy/analytics settings page, and maintain SEO/security regression checks.
- **Release status:** Isolated on `feature/r1g02-search-consent-audit`, CI and editorial/legal/Tag Assistant review pending, not integrated, not deployed. See `R1G02_HANDOVER.md`.
- **R1 officially 65%** unchanged; R2/R3 0%. No `main` changes. **Next:** CI, PR review, explicit approval, direct production deployment and browser verification; submit corporate XML sitemap and validate GA4 measurement in GTM.

---

## R1-G01 — Google Tag Manager container installation (19 October 2026; feature branch)

- **Request and implementation:** Add owner-supplied `GTM-N7QJSQTB` across the HEXA Steel® Next.js site. Site-wide `src/app/layout.tsx` now places the official bootstrap in an early head script using `next/script` `beforeInteractive`, and matching no-JavaScript iframe immediately inside the opening body. Distinct OTS™ deployment remains untouched.
- **GitHub:** Existing `feature/r1g01-technical-seo-security` branch and [PR #22](https://github.com/refedo/hexasteel.sa/pull/22), targeting only `rebuild/website-v3`. This milestone does not merge PR #22 or deploy production.
- **Quality gates:** New deterministic regression `tests/google-tag-manager.test.mjs`, plus existing TypeScript, Node tests, build, and search/SEO checks. CI status and post-approval live Tag Assistant verification to be recorded separately; do not claim success until observed.
- **Measurement/privacy limits:** GTM container installation alone does not create a GA4 property, publish analytics/conversion tags, confirm Search Console, or establish consent compliance. Configure required consent controls before enabling measurement tags.
- **Official release completion:** R1 **65%**, R2 **0%**, R3 **0%**, unchanged pending deployment and operational acceptance.
- **Next:** Confirm PR CI; obtain explicit approval before integration/deployment; verify on `hexasteel.sa` through Tag Assistant and browser inspection. Preserve rollback and assess duplicates/consent on live.
  
---

## R1-G01 — Technical SEO and security baseline (19 October 2026; isolated feature branch)

- **Previous stopping point:** V3.17 gallery on `hexasteel.sa` deployed and cover/watermark independently verified; PR #20 updated official R1 completion to **65%**, integration branch at `9261acd`.
- **Starting point:** Source audit of `rebuild/website-v3` at `9261acd`; PR #12 RFQ and PR #19 optional CMS publishing UX remain unmerged; the production app version is V3.17 `9b780cd`.
- **Current milestone:** R1-G01 adds canonical/metadata for priority SEO pages, published-page structured data and verification hooks, Studio/API/search crawler hygiene, cautious baseline HTTP security headers and deterministic regression tests. Existing external-logo CI now distinguishes Wikimedia HTTP 429 throttling from genuinely broken URLs without falsely claiming the logo verified. Google/Bing account verification, analytics consent, performance/security acceptance and final indexed visibility **not yet achieved**.
- **Branch:** `feature/r1g01-technical-seo-security`; CI/PR review pending. No source integration, main merge or deployment permitted before separate CEO approval.
- **Official status:** R1 **65%** unchanged (management-approved estimate); R2/R3 not started. Developer implementation does not establish operational acceptance.
- **Next:** CI, CEO PR approval, production rollout through existing GitHub–DigitalOcean pipeline, post-release live verification, followed by Google/Bing/GA4 account linking and consent/measurement acceptance. See `R1G01_HANDOVER.md`.

---

## OFFICIAL RELEASE PROGRESS — CEO-APPROVED R1 UPDATE (18 October 2026)

| Release | Official completion | Basis / stage |
| --- | ---: | --- |
| **R1 — Corporate Website, CMS & Lead Generation** | **65%** | CEO-approved management completion figure; V3.14–V3.15 CMS implemented/deployed, homepage image editing and one project's cover-image + delivery-status publishing operationally demonstrated |
| **R2 — Commercial Platform & CRM** | **0%** | Not started; RFQ/OTS™ CRM integration postponed, with separate draft PR #12 |
| **R3 — AI-Assisted Steel Estimation** | **0%** | Not started |

**Supersedes prior R1 completion reporting:** 60.60% (rounded 61%) was the earlier documented baseline. The CEO explicitly **approved 65%** on 18 October 2026 in recognition of the significant Sanity CMS progress. This is a management-approved milestone assessment, **not** a recalculation from individually weighted features; it does not mean 65% of the overall R1+R2+R3 programme is complete. Previous 61% entries below remain historical handover snapshots only.

**Operational evidence/limits:** The CEO confirmed that changing a homepage hero photograph in Sanity updates the live website, and separately confirmed the published *Airport Infrastructure Steelwork* cover photograph and **Completed** delivery status appeared on the public projects page after the `identityClearedForWeb` publication gate was satisfied. The [read-only Sanity diagnostic](https://github.com/refedo/hexasteel.sa/actions/runs/39073417376) had verified the exact original approval gate issue (published record, image present, status Completed, `approvedForWeb=true`, `identityClearedForWeb=false`). V3.15 provided the original verified Sanity publishing capability; V3.17 has since been deployed to `hexasteel.sa` at [`9b780cd`](https://github.com/refedo/hexasteel.sa/commit/9b780cdeffb95414173df55554aa34caabdd23d0) ([successful deployment](https://github.com/refedo/hexasteel.sa/actions/runs/39161291906)). Updating this **documentation** does not require another application deployment.

**Still open in R1:** Complete editing of source-managed page-body sections and remaining CMS schemas; multi-photo project gallery end-to-end acceptance (V3.17 gallery and cover/watermark render live, but the audited airport project had zero extra uploaded gallery images); qualification/logo editorial permissions; broader Arabic/RTL, RFQ, security, SEO and final operational/visual acceptance. The optional V3.16 publishing-guidance/30-second-refresh [draft PR #19](https://github.com/refedo/hexasteel.sa/pull/19) remains **unmerged and undeployed**; do not bypass the existing two approval gates.

**Change-control:** This entry records a CEO-authorized **status/documentation update only**. No merge to `main`, no new production deployment, and no change to the postponed RFQ/CRM scope. Future progress must be assessed from new verified work; do not reuse the historical 61% as the current official baseline.


---

## V3.17 — Approved gallery deployment and independent live verification (18 October 2026)

- **Planned versus delivered:** Cover-first project image galleries, every approved attached photo, deduplication, responsive presentation and the existing HEXA STEEL® typographic watermark overlay on uploaded assets. Original Sanity files remain unchanged. Illustrative external photos are not rebranded as genuine project images.
- **GitHub and deployment:** [PR #21](https://github.com/refedo/hexasteel.sa/pull/21) merged by the owner **only into `rebuild/website-v3`**. Release [`9b780cd`](https://github.com/refedo/hexasteel.sa/commit/9b780cdeffb95414173df55554aa34caabdd23d0). [Feature CI passed](https://github.com/refedo/hexasteel.sa/actions/runs/39108002269), [DigitalOcean deployment and rollback-safe activation passed](https://github.com/refedo/hexasteel.sa/actions/runs/39161291906), and [independent live Sanity/website verification passed](https://github.com/refedo/hexasteel.sa/actions/runs/39161761535).
- **Acceptance boundary:** The live airport project has a permission-cleared Sanity cover image, displayed in the gallery with watermark. At verification, **zero additional gallery photos** were attached/published; multi-image editorial and mobile-device acceptance remain outstanding. Both `approvedForWeb` and `identityClearedForWeb` must remain required.
- **CI limitation:** Some post-merge general checks initially failed because a previously referenced third-party National Water Company logo endpoint returned HTTP 429; this is unrelated to the V3.17 gallery changes. Feature branch and deployment compilation/build checks passed. Do not treat the unrelated image-host throttling as a gallery regression.
- **Official release progress:** R1 **65%** CEO-approved management estimate (supersedes historical 60.60%/61% below). R2/R3 **0%**, not started. This is not an overall-program completion percentage.
- **Stopping point / next:** Documentation re-baselined after V3.17; authorized Sanity editor must attach multiple permission-cleared project photographs and verify order, watermark and mobile appearance. Continue remaining R1-C CMS long-form content, R1-E localization and R1-F/G acceptance work; R2/R3 deferred.

---

## V3.17 — Project image gallery + HEXA Steel® watermark (18 October 2026; feature branch only)

- **Previous verified milestone:** V3.15 CMS importer repair application `a181e0f0` released and live smoke-tested; authenticated CMS editorial acceptance remains pending. Integration documentation head `3bbb268`.
- **Current starting point:** `rebuild/website-v3` at `3bbb268`, with distinct open PR #19 on project-publication flags and draft RFQ PR #12 deferred. This V3.17 work starts from that verified integration commit without incorporating unapproved PR #19.
- **Planned versus developed:** Ensure every approved project detail displays its Sanity cover first plus its complete deduplicated image gallery; add responsive image presentation and existing HEXA STEEL® wordmark watermark overlays to uploaded assets on both detail and project listing cards. Illustrative stock photos remain clearly marked and are not branded as original HEXA photography.
- **GitHub:** `feature/v317-project-gallery-watermark`; feature PR targets only `rebuild/website-v3`. **No merge to integration/main, no deployment.**
- **Validation:** Feature CI (TypeScript, tests, build) and user acceptance pending release checks. Watermarks are website overlays, **not** embedded into Sanity asset bytes.
- **Project data dependency:** Published airport project currently lacks `identityClearedForWeb=true` (documented in PR #19). No bypass of `approvedForWeb` / identity clearance; editor approval and Sanity publication must precede live gallery visibility.
- **Official completion:** R1 **60.60% ≈61%** unchanged; R2/R3 not started. New feature is developed, not yet tested/deployed/accepted.
- **Exact stopping point:** Complete isolated V3.17 gallery review and CI; obtain separate approval before integrating/deploying. See `PROJECT_GALLERY_V317_HANDOVER.md`.

---

## V3.15 CMS Import Usability — authorized release deployed and verified (18 October 2026)

**Owner approval:** Explicit authorization to release tested Sanity import usability repair to `hexasteel.sa`. The latest integration branch had advanced to the separately deployed welcome/beta release `be2f3f2`; PR #18 was safely reconciled against that baseline before a fast-forward of **only** `rebuild/website-v3`.

- **Planned versus delivered:** Responsive high-contrast top-positioned Studio import action, editor-visible import progress/errors/success, counts of draft/published records, draft-aware non-destructive import, full previously hardcoded Insight narratives, existing public project illustrations, qualification logo candidate references and connected-vs-unconnected Studio document organization. Existing welcome notice, logo/search and supply chain work were preserved.
- **GitHub:** [PR #18](https://github.com/refedo/hexasteel.sa/pull/18), application release [`a181e0f0`](https://github.com/refedo/hexasteel.sa/commit/a181e0f0874cb8483141e0dcbaca2c3da8914d52), merged only into `rebuild/website-v3` via verified fast-forward. `main` remained untouched; RFQ/CRM PR #12 deferred.
- **Testing:** [Feature/PR CI passed](https://github.com/refedo/hexasteel.sa/actions/runs/39070699975) and [production CI passed](https://github.com/refedo/hexasteel.sa/actions/runs/39070900175): TypeScript, automated tests, production Next.js build, site-search regressions and URL checks for eleven legacy logo assets. [DigitalOcean readiness passed](https://github.com/refedo/hexasteel.sa/actions/runs/39070900209). [Production deployment successful](https://github.com/refedo/hexasteel.sa/actions/runs/39070900174), including rollback-safe activation, server route checks and HTTPS domain health.
- **Independent live checks:** Re-ran [Studio HTTP/CORS smoke test](https://github.com/refedo/hexasteel.sa/actions/runs/38424091525) and [V3.12/V3.13 public site regressions](https://github.com/refedo/hexasteel.sa/actions/runs/38511951704) **after deployment**; both passed. These are HTTP/public API checks, not authenticated Sanity CRUD or device-level visual tests.
- **Status:** Developed ✓ → CI tested ✓ → Integrated ✓ → Deployed ✓ → Automated live smoke verification ✓ → **CMS import/publishing operational acceptance pending**. Deployment does *not* create Sanity records on its own; it exposes an editor action that must be run under an authorized Sanity login.
- **Next verification:** Editor visits `https://hexasteel.sa/studio`, selects **Import Current Website Content**, presses **Import existing website content**, and confirms success plus expected draft counts. Open the Studio lists, verify current published homepage values are preserved and import contents are anonymous/public-safe. Then edit and publish one cleared hero photograph, one anonymized project/gallery and one page introduction; confirm live/search behavior. Retain rollback release.
- **Official R1:** **60.60% ≈ 61%**, unchanged until genuine CMS editorial acceptance; previous 65% was provisional, not approved. R2/R3 have not started. Full page-body CMS wiring still incomplete.

**Exact stopping point:** V3.15 importer repair deployed with automated evidence; importer execution/editor workflow and full page-body control remain open R1-C work. Do not claim operational acceptance based on route HTTP 200.

---

## V3.15 — Sanity Studio import usability correction (17 October 2026; pending verification and deployment)

**CEO authorization:** Approved corrective V3.15 importer integration/deployment to `hexasteel.sa` after successful CI, separately from the already deployed website welcome notice. The integration branch advanced to `be2f3f2` after the original PR #18 fork; reconcile existing welcome code through a two-parent feature merge without reverting it.

- **Starting point:** `rebuild/website-v3` `be2f3f2`, with production DigitalOcean deployment and CI confirmed for the welcome notice, and prior V3.14 import screen live but unpopulated.
- **Scope:** Repair high-contrast iPhone import UI, add document counts and completion/error reporting, draft-aware non-destructive record creation, preserve public illustrations and import full source Insight story sections, clarify which schemas are editorially connected. Retain all V3.15 welcome/beta-notice changes and separate RFQ PR #12.
- **Stage gate:** Await reconciled branch CI, integration branch CI, DigitalOcean release and independent live Studio checks. Authenticated import and editorial publication remain **unverified**, regardless of deployment success.
- **Progress:** Official R1 60.60% ≈ 61% until operational acceptance. R2/R3 not started. No `main` merge, staging domain or unapproved CRM work.
- **Source of truth:** [PR #18](https://github.com/refedo/hexasteel.sa/pull/18) and `CMS_V315_HANDOVER.md`.

---

## V3.15 — New website welcome & beta notice (17 October 2026; FEATURE BRANCH — NOT DEPLOYED)

**Corporate identity:** HEXA Steel® has always been the company name. The previous domain was only an old website address. Neither visitor-facing copy nor structured company identity should suggest a renamed business.

- **Previous stopping point:** V3.14 Sanity content activation was CEO-authorized, integrated and deployed to `hexasteel.sa`; TypeScript, build, CI, DigitalOcean and HTTP checks passed. The authenticated CMS content import and editorial/visual acceptance remain outstanding.
- **Current starting point:** Latest `rebuild/website-v3` application/deployment branch, after V3.14, with V3.11 RFQ / OTS™ CRM work still separately deferred. The V3.15 welcome was developed only on `feature/v315-brand-transition-welcome`.
- **Planned versus developed:** Premium navy new-website welcome for identified visitors from the previous domain; no former-company-name claims; dismissible responsive beta notice across the website; session-based dismissal, accessible focus, and neutral `?from=previous-site` detection plus exact old-domain referrer fallback. Tracking identification is internal only.
- **Release gate:** PR #17 must pass updated CI after reconciliation with deployed V3.14 documentation. No changes to Sanity imports, RFQ/CRM, `main`, existing DigitalOcean deployment triggers or production. Obtain CEO approval for integration and deployment.
- **External dependency:** Confirm permanent SiteGround redirect behavior for both old hostnames and important indexed deep paths. A neutral arrival marker is needed where browser referrers are unavailable; avoid rewriting all old URLs to homepage.
- **Official progress:** R1 60.60% ≈ 61% unchanged; R2 and R3 not started.
- **Exact stopping point:** Reconciled feature branch and updated PR awaiting checks and CEO integration/deployment approval; after approved rollout verify redirect welcome behavior, layout on mobile, dismissal and beta notice on `hexasteel.sa`.

---

## V3.14 — Authorized deployment and live verification (17 October 2026)

**CEO approval:** Authorized direct deployment of V3.14 Sanity editorial activation on `hexasteel.sa`. No merge into `main`; RFQ/OTS™ CRM draft PR #12 remains deferred.

- **Planned vs delivered:** Authenticated Studio content import action; editable drafts for 21 existing page titles/introductions, anonymous projects, Knowledge, Insights, qualifications and homepage hero metadata; approved CMS page title/intro overrides; user-uploaded hero/project imagery and project gallery rendering; website search of published CMS page leads; no consumer contact overlay over Studio. The importer is **available but has not been run by an authenticated editor**.
- **Integration / PR:** [PR #16](https://github.com/refedo/hexasteel.sa/pull/16) was automatically recognized as merged after an authorized **fast-forward of only** `rebuild/website-v3` to release SHA [`ae735ac3`](https://github.com/refedo/hexasteel.sa/commit/ae735ac377be0012184fa78ee188c626129f2ac6). `main` untouched. Any subsequent documentation-only branch SHA is **not** the deployed application SHA.
- **Testing:** [Production branch CI passed](https://github.com/refedo/hexasteel.sa/actions/runs/39064602130) (TypeScript, full Next.js build, automated tests including V3.14, logo URL and search regressions). [DO preflight passed](https://github.com/refedo/hexasteel.sa/actions/runs/39064602184). [DigitalOcean deploy and rollback-capable server/domain smoke checks passed](https://github.com/refedo/hexasteel.sa/actions/runs/39064602201). Previous release retained for rollback.
- **Independent live verification (rerun after deployment):** [Studio GET 200, embedded editor shell and public Sanity CORS/API 200](https://github.com/refedo/hexasteel.sa/actions/runs/38424091525); [V3.12 logos/search and V3.13 relocation live regressions passed](https://github.com/refedo/hexasteel.sa/actions/runs/38511951704).
- **Stage:** Developed ✓ → Tested ✓ → Integrated into `rebuild/website-v3` ✓ → Deployed ✓ → HTTP/live automated checks ✓. **Authenticated import, editor CRUD, publishing genuine photo assets, and CEO visual/editorial operational acceptance still pending**. The Studio collections remain empty until authorized import or manual creation.
- **Official R1:** **60.60% ≈ 61%, unchanged**; R2/R3 not started. The earlier provisional 65% is not accepted. A deployed import UI does not prove CMS editorial operations are accepted.
- **Outstanding limitations:** Full page-body section editing and some Studio document types remain disconnected; project source photography is still illustrative; never infer logo endorsement, verification or photographic publication consent.
- **Exact stopping point:** V3.14 app live; next action is for the authorized HEXA editor to visit `https://hexasteel.sa/studio`, select **Import Current Website Content**, click **Create missing editable drafts**, verify counts and current published settings, then edit/publish one permission-cleared hero, one anonymous case-study cover/gallery and one page lead. Verify changes and withholding of drafts on the production site/search. Preserve production rollback capability.

---

## V3.14 — Development record (superseded by deployed release above)

**CEO priority decision:** Postpone V3.11 RFQ and any OTS™ CRM integration; do not change draft PR #12. Activate the existing Sanity Studio and migrate current website content into editable, permissioned public CMS documents, prioritizing homepage hero imagery and anonymous project cases.

- **Previously verified:** V3.13 Supply Chain relocation and V3.12 logo/search deployed and externally checked on 14 October; latest documented live app SHA `6f9a7d3`. `rebuild/website-v3` remains the integration branch. Prior source editor-publishing acceptance applies to the theme/settings singleton, **not** all document types.
- **Working branch:** `feature/v314-sanity-content-activation` based on verified `rebuild/website-v3` at `0e6fe45`. No push to the integration branch, no `main` merge, and no deployment.
- **Planned vs coded:** Non-destructive, authenticated Studio draft importer for 21 currently public page headers, anonymized projects, Knowledge articles, Insights, and qualifications; import homepage hero slides as explicitly labelled illustrative images; allow authorized Sanity upload to replace slide imagery; render approved project cover images and project detail galleries; connect approved CMS page titles/intros on 21 live routes and feed them into website search; hide public WhatsApp/Call controls in Studio.
- **Publication safeguards:** Existing published settings are retained; imported objects are drafts and are not auto-approved. Only public-safe project fields may be stored in Sanity's public dataset. Do not treat illustrative imagery as genuine HEXA project photography. Unapproved or confidential data must remain outside public routes.
- **Limitations:** Most long-form page sections and several existing Studio schemas are still source-managed/unconnected. No CMS auto-publishing, no new credentials, and no R2/R3 implementation. Authentic photo assets, permission evidence and final content editing require CEO/editorial action after authorized deployment.
- **Tests and acceptance:** GitHub branch CI/PR checks will be recorded in the PR; production, import execution and CEO editorial validation remain **pending**. Full delivery handover is in `CMS_V314_HANDOVER.md`.
- **Official R1:** 60.60% ≈ **61% unchanged**. The earlier provisional 65% is not accepted. R2/R3 not started.
- **Next checkpoint:** CI pass → present PR to CEO → explicit approval → integrate into `rebuild/website-v3`, deploy to `hexasteel.sa`, verify live import/publishing and visual imagery. Do not merge to `main`.

---

## V3.13 — Deployed and externally verified (14 October 2026)

**Authorized release:** The CEO approved direct deployment of the V3.13 Supply Chain relocation to `hexasteel.sa`, without merging to `main`.

- **Planned vs. delivered:** The standalone Procurement/Supply Chain item was removed from the main Products & Services navigation, the services catalogue and footer. Its four substantive sections (Strategic Sourcing, Project Procurement, Quality at Receipt and Logistics) were moved into `/project-delivery#procurement`. Homepage and site-search links now point there; the retired `/services/supply-chain` route responds with permanent HTTP 308 redirect; sitemap excludes the retired URL.
- **Branch/PR:** [PR #15](https://github.com/refedo/hexasteel.sa/pull/15) integrated **only into** `rebuild/website-v3`. Deployed application commit: [`6f9a7d3`](https://github.com/refedo/hexasteel.sa/commit/6f9a7d345d1aff84e541fe393f3902b5a62b1e42). `main` was not touched.
- **Testing:** [Production-branch CI passed](https://github.com/refedo/hexasteel.sa/actions/runs/38511613010), including TypeScript, Next.js build, unit tests, HTTP full-site search regressions, and V3.12 logo checks. [DigitalOcean activation passed](https://github.com/refedo/hexasteel.sa/actions/runs/38511612999), including rollback-safe deployment, server readiness and direct-domain health verification. [Independent production verification passed](https://github.com/refedo/hexasteel.sa/actions/runs/38511951704): public HTTP 308 redirect and correct Location, live procurement page and four content panels, services navigation/catalogue removal, homepage canonical link, search result, sitemap, and continued V3.12 search/eleven approval-logo slots.
- **Release state:** Developed ✓ → Tested ✓ → Integrated into `rebuild/website-v3` ✓ → Deployed to `hexasteel.sa` ✓ → Automated live checks ✓. Final CEO device/visual and commercial/editorial sign-off is **not yet recorded**.
- **Pending:** Visual checks on physical mobile/tablet devices (including mobile menu behavior); broader V3.12 qualification-logo provenance/right-to-use approvals. V3.11 RFQ and CRM work in PR #12 remains separate and is not approved by V3.13.
- **R1 official progress:** **60.60% ≈ 61%, unchanged**; R2/R3 have not started. No unapproved percentage increase based on information architecture correction.
- **Exact stopping point and next recommended milestone:** V3.13 live and automated smoke-verified. Obtain CEO visual acceptance in normal website review, then resume the separately scoped R1 RFQ/OTS™ CRM integration decision. Retain rollback to the previous DigitalOcean release.

---

## V3.13 — Development handover (superseded by the verified release above)

- **Owner decision:** Supply Chain/Procurement is an integrated operations capability, not a standalone service available for purchase.
- **Base:** latest `rebuild/website-v3` at `1ff7d4d` (incorporates V3.12 search and qualification logo updates; those changes preserved).
- **Branch:** `feature/v313-supply-chain-relocation`, PR #15.
- **Developed:** moved all four panels (strategic sourcing, project procurement, receiving QC, logistics) to `/project-delivery#procurement`. Removed the Products & Services card and header/footer entry, updated homepage and full-site search result, excluded old route from sitemap, and permanently redirected old route (HTTP 308) to the new section.
- **Verification gates:** TypeScript, production build, automated regression tests, and existing V3.12 search/logo checks in GitHub CI; after CEO-approved integration/deployment, verify live page, 308 redirect, menus, search, image assets and mobile layout. Retain rollback.
- **State:** feature branch and PR prepared. CI run and production deployment status must be tracked separately. No unapproved integration or production deployment; no merge to `main`.
- **Official R1 completion:** 61% (unchanged). R2/R3 remain not started.
- **Next milestone:** integration and live QA only after explicit CEO deployment approval. RFQ PR #12 remains separate.

---

### V3.12 — Deployed and independently verified (14 October 2026)

**Release status:** Developed → CI tested → deployed to `https://hexasteel.sa` → automated operational smoke tests passed. **CEO visual/brand-use acceptance remains separate.**

- **Authorized scope:** Internal site-search coverage and official-identity logo display for the eleven organizations listed on Approvals. Original release isolated from unapproved V3.11 RFQ/CRM work; no RFQ route, form, database, outbox or CRM changes were deployed.
- **Deployed application SHA:** [`1ff7d4d4423fdb6b7b8da4a9e4070f6659b5b424`](https://github.com/refedo/hexasteel.sa/commit/1ff7d4d4423fdb6b7b8da4a9e4070f6659b5b424), from isolated `feature/v312-release-search-logos-only` based on prior integration `00abfd0b`.
- **Release CI:** [all checks passed](https://github.com/refedo/hexasteel.sa/actions/runs/38510140999): eleven logo image URL checks, generated public-page search corpus, TypeScript, Next.js build and HTTP search regressions.
- **DigitalOcean:** [deployment and rollback-aware activation passed](https://github.com/refedo/hexasteel.sa/actions/runs/38510388261), with server readiness and public-domain health checks.
- **Independent production evidence:** [V3.12 live verification passed](https://github.com/refedo/hexasteel.sa/actions/runs/38510789147). From an external GitHub runner, all returned HTTP 200: `/api/search`, `/search`, `/solutions/structural-steel` and `/company/approvals`. Confirmed relevant structural-steel search results for `poultr`, `poultry farms`, `mezzanine`, `metal works` and `industrial platforms`. The approvals HTML rendered eleven logo slots, all eleven organization names, and a trademark/non-endorsement disclaimer.
- **Workflow:** `rebuild/website-v3` production branch; `main` unchanged. The subsequent workflow-only commit `f21adcfc` adds reproducible production verification and does not trigger another app deployment.
- **Remaining controls:** Remote logo images may change independently of the build; replace them with authorized HEXA-hosted/CMS originals after formal rights/provenance checks. Current supplier/registration claims remain company reported and subject to documentary scope review. CEO mobile visual and logo correctness review remain open. Internal website search is distinct from external Google/Bing indexing.
- **Official release progress:** **R1 = 60.60% ≈ 61%**, unchanged pending broader operational acceptance. R2/R3 separately tracked as not started.
- **Exact stopping point:** V3.12 production deployed and external tests green. Next recommended milestone: return to the separately isolated V3.11 RFQ operations/OTS™ decision, without inadvertently activating the RFQ workflow.

---

## V3.12 — CEO-authorized release candidate (14 October 2026)

**Approval:** CEO expressly approved deployment of the V3.12 website search and qualification logos on hexasteel.sa via the existing GitHub–DigitalOcean pipeline. This approval does **not** include unaccepted V3.11 RFQ / CRM work.

**Release branch:** `feature/v312-release-search-logos-only`, based on the deployed integration SHA `00abfd0b0daa7bc3771690da4a6d3ab95d8cc2f4`. Only V3.12 files and tests are in scope. RFQ routes, email, forms and database/worker code remain unchanged.

**Planned and implemented:** Search across public static sitemap routes and CMS content, with shared Structural Steel narratives and product sections indexed (metal works, poultry farms, mezzanine); direct anchored results; structured rankings and CMS/static index merge. Display eleven sourced logo candidates beside accurately described qualification relationships, with Sanity logo upload/approval override, disclaimers and image health verification.

**Acceptance:** Run isolated CI (image health, TypeScript, Next production build, search HTTP regression), then push tested commit onto `rebuild/website-v3` with compare-and-swap lease after explicit authorization. Verify DigitalOcean deployment/rollback and live API search and rendered qualification images.

**Editorial note:** Sourced public brand images are nominative identifiers, not proof of endorsement. Image URL validity is separately tested; trademark-use conditions and documentary approval scope remain subject to management review.

**Official R1:** 60.60% ≈ 61% unchanged pending deployed operational verification; R2/R3 separately tracked.

---

# HEXA Steel® — Website V3 Delivery Dashboard

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
