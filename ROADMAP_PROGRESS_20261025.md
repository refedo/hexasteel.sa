# Master Release Roadmap and Progress — 25 October 2026

## Decision and scope

The CEO explicitly requested publication of the roadmap reconciliation and a fresh calculated progress estimate. The master release roadmap is unchanged.

- **R1 — Corporate Website, CMS & Lead Generation: 75.50%, reported as approximately 76%.**
- **R2 — Commercial Platform & CRM: 0%, not started.**
- **R3 — AI-Assisted Steel Estimation: 0%, not started.**

This is an evidence-informed management estimate of development maturity, not an objectively measured percentage of requirements passed, spending, elapsed time, or operational acceptance. The previous official 70% was a management estimate without an up-to-date workstream calculation. This authorized rebaseline replaces it with the calculation below; it does not retroactively accept unfinished workflows.

## Method and continuity of weights

Retain all original R1 weight allocations in PROJECT_STATUS.md, grouped under the CEO's A–G roadmap:

- A: strategy/sitemap/blueprint 10% + visual/responsive UX 15% = 25%.
- B: page architecture/interactions = 15%.
- C: connected Sanity/editorial freedom = 15%.
- D: projects/trust proof 10% + Knowledge/Insights content 10% = 20%.
- E: localization = 10%.
- F: contact/RFQ/vendor intake, including Careers and notifications within the agreed scope = 10%.
- G: security/accessibility/QA/sign-off = 5%.

Weights total 100%; no redistribution makes completed work more valuable or reduces Arabic's weight. A–G completion scores are engineering judgments in broad five-point increments, anchored in the evidence and deductions below. They are not an invented count of passed acceptance tests. Grouping preserves the original weights; historic subrow scores are superseded by the current A–G assessment.

A score near 95 means substantially delivered with final review outstanding; 80 means core capability delivered with material coverage/acceptance gaps; F's 55 reflects mixed accepted, deployed-but-gated and draft-only workflows. Zero means the workstream's defining deliverable has not begun. English content alone receives no credit for a bilingual deliverable.

**Formula:** sum(workstream weight × estimated completion / 100). Round only the final total for executive reporting.

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


## Evidence and deductions by workstream

### R1-A — 95%

Architecture/branding/responsive implementation and pipeline deployed; final real-device visual checks outstanding.

### R1-B — 95%

Main route structure, revised navigation, Project Management and search implemented; final content/link/mobile review remains.

### R1-C — 80%

Theme/hero and project edit-publish accepted; import/project/HR/contact/favicon controls deployed. Remaining page-body coverage, role tests and new controls' live publication acceptance; missing legacy vacancy concern unresolved.

### R1-D — 80%

Filters, galleries/watermarks, qualification/logo support and article/story routes implemented. Approved media/claims and complete content publication/search acceptance remain.

### R1-E — 0%

English site exists; bilingual delivery is not implemented. Arabic translation, locale routing, language switch, RTL QA and multilingual SEO remain.

### R1-F — 55%

Contact inbox delivery accepted; Careers/supplier implementations deployed but gated or awaiting E2E; RFQ remains unfinished in a draft branch. New HTML email rendering, private uploads, notifications, HR lifecycle and supplier OTP/staff review need acceptance.

### R1-G — 80%

Technical SEO, analytics integration, CI and deployment checks delivered; indexing outcome, final security/accessibility/performance/device QA and operational release sign-off remain.


The 24.50 remaining weighted points are planning gaps, not delivery dates. Some final security and operational gates can block launch even though their numeric weight is small. Do not infer 76% operational acceptance, 76% of the three-release programme, or a commitment to finish in 24% of historical effort.

## Verified baseline and evidence

- Current integration branch rebuild/website-v3: **06db8641277498c105942ae7ed50b60a184e21a2**, merging [V3.26 PR #37](https://github.com/refedo/hexasteel.sa/pull/37).
- V3.26 final-head [CI #40137673024](https://github.com/refedo/hexasteel.sa/actions/runs/40137673024) and [CI #40137669866](https://github.com/refedo/hexasteel.sa/actions/runs/40137669866): success. [DigitalOcean deployment #40137669936](https://github.com/refedo/hexasteel.sa/actions/runs/40137669936) and [preflight #40137669860](https://github.com/refedo/hexasteel.sa/actions/runs/40137669860): success.
- Thus V3.26 is Developed → Tested → Merged → Deployed. Its contact/favicon editorial and real inbox acceptance remain pending. Historical V3.26 deployment-pending prose is superseded by the workflow evidence.
- [V3.25 PR #36](https://github.com/refedo/hexasteel.sa/pull/36) records HR Careers deployment at 9624eefb and successful public route/Studio-bundle verification. It explicitly leaves authenticated vacancy publication/closure, private HR recipient/scanner and sanitized PDF delivery unaccepted.
- [Supplier acceptance PR #35](https://github.com/refedo/hexasteel.sa/pull/35) records the read-only smoke [#40078637941](https://github.com/refedo/hexasteel.sa/actions/runs/40078637941): scanner and private directory checks passed, public intake flags disabled and website/OTS endpoints returned 503 as intended. DB table presence was separately confirmed; full supplier workflow was not tested.
- CMS_V315_HANDOVER.md records owner acceptance of hero-image editing and project cover/status edits reaching the website. Later deployed editorial features receive partial credit without assuming equivalent live acceptance.
- Contact delivery was owner-confirmed in the prior accepted contact/SEO milestone and recorded in PROJECT_STATUS.md / PR #31. The new branded receiving-email appearance has not been verified in an actual inbox.
- [RFQ PR #12](https://github.com/refedo/hexasteel.sa/pull/12) is a separate draft implementation, not completed operational intake. Durable storage/private access/scanning/notifications and latest-baseline reconciliation remain open.
- The preceding read-only live audit returned HTTP 200 for /company/careers with no published opportunities. This does not prove that there are no authenticated drafts or establish why legacy vacancies are missing. No new authenticated Sanity audit or mutation was performed in this documentation task.

The repository contains chronological evidence and stale summaries. Historical 61%, 65%, 68% and 70% snapshots remain for traceability but do not override this dated current estimate. README.md and CMS_FIELD_AUDIT.md include old setup states. The referenced Master Blueprint HX-WEB-003 Rev 3.2 was cited in RFQ handover material; a standalone blueprint document was not present in the audited integration tree, so no full blueprint review is claimed.

## R2 and R3 remain separate

R2: customer portal, RFQ tracking, advanced vendor qualification, sales CRM, dashboards and controlled OTS integration.

R3: drawing/BOQ analysis, quantity extraction, costing and draft quotations with mandatory engineering/commercial approval.

Basic supplier intake's OTS dependency belongs to the present R1 implementation; it does not establish delivery of the broader R2 platform. The project tracking page is a coming-soon experience, not a working customer portal.

## Open work and exact next milestone

1. **Next: Careers content recovery and controlled operational acceptance.** Inspect Sanity vacancies/drafts and legacy draft preparation, preserve existing records, resolve the CEO's missing-vacancies report, verify intended roles appear to HR, publish approved roles, check public display and Open/On Hold/Closed/deadline rules. Verify private HR mailbox and scanner before activating application intake and testing safe CV delivery.
2. Close deployed CMS/contact/favicon acceptance and basic supplier E2E: approved publication, branded inbox/reply, scanned private documents, applicant/staff notifications, OTP and access permissions.
3. Resume deferred RFQ, reconcile its existing draft against current architecture and prove durable intake, private scanned attachments, reference and Sales/customer notifications.
4. Deliver Arabic/English localization, translations, RTL, mobile review and multilingual SEO.
5. Complete remaining media/claims/content evidence, search/indexing, security/accessibility/performance checks and final R1 operational sign-off.

Open PR reconciliation: #32 is the old navigation branch, superseded functionally through merged #34; #31 is the older 70% acceptance record; #19 is optional draft editorial UX; #11/#12 are older RFQ branches; #35 is the supplier smoke workflow. Do not count duplicated branches as additional deliverables. PR #8 targets website main and must not be merged under the current policy. This task closes or merges none of these.

## Documentation handover

- Planned: publish the reconciliation and calculate current progress against the unchanged roadmap.
- Delivered: weighted A–G assessment, evidence, deductions, release boundaries and next milestone; PROJECT_STATUS.md updated on docs/roadmap-progress-20261025.
- Validation: arithmetic verified (weights 100%, contributions 75.50, remainder 24.50). Review source/CI/deployment evidence above. No new application tests or mail/CMS mutations are needed for these documentation changes.
- Publication only: documentation branch and PR; no integration/main changes or production deployment authorized by this request.
- Change in reporting: prior R1 70% → reassessed 75.50% ≈ 76%; R2/R3 remain 0%. This credits already delivered work through V3.26 and corrects stale reporting, rather than claiming new implementation or operational acceptance during the audit.
