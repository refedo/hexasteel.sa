## V3.15 R1-C EDITORIAL ACCEPTANCE UPDATE — 18 October 2026

**Official R1: 65% — explicitly approved by the CEO.** This replaces the earlier 60.60% (rounded 61%) management progress figure in the historical handover below. R2 and R3 remain 0%/not started. This new figure belongs to R1 only.

**Developed / tested / integrated / deployed:** V3.14–V3.15 CMS activation/importer running on `hexasteel.sa`, application release `a181e0f0`; production GitHub CI and deployment succeeded. **User-operational acceptance now includes** homepage hero-image editing and publishing plus the Airport Infrastructure Steelwork project cover-image and delivery-status edits reaching the public website. The project's missing publication clearance was diagnosed by [read-only live Sanity check](https://github.com/refedo/hexasteel.sa/actions/runs/39073417376) and addressed in Studio, without production code changes.

**Partial, not general CMS acceptance:** Site-wide page-body content, all galleries, every qualification, people/team/testimonials, multilingual editorial workflows and the full release QA checklist are not yet verified. Separate optional draft [PR #19](https://github.com/refedo/hexasteel.sa/pull/19) for clearer approval switches is not merged/deployed. RFQ/CRM remains postponed. Do not convert these acceptance observations into claims that R1 itself or R2/R3 is complete.

**Stopping point:** R1 official 65%, functional homepage hero and one project case study publishing confirmed; proceed to remaining CMS content-field coverage and multi-image project gallery acceptance (V3.17 gallery and approved cover are live; additional photos still need publication), with security and publication permission gates preserved.


---

# HEXA Steel® V3.15 — Sanity Studio import usability and content seeding

**Audit date:** 17 October 2026  
**Baseline:** `rebuild/website-v3` at `ea962e6` (documentation-only head following successfully deployed V3.14 application `ae735ac3`).  
**Feature branch:** `feature/v315-studio-import-usability`.  
**Release scope:** R1-C editorial onboarding; PR #12 RFQ and OTS™ CRM held unchanged.

## Previous stopping point
V3.14 code was deployed and independently HTTP-verified (Sanity Studio 200, public CORS and website search/legacy regressions), but no authenticated content import or editor publishing exercise had been completed. CEO iPhone screenshots at 23:09 KSA show all lists other than Website Settings empty, a long poorly contrasted import explanation and an almost completely offscreen import button. Thus V3.14 is *not* editorially accepted. Official R1 is 60.60% (≈61%), no approved increase.

## V3.15 corrective work
1. **Mobile-first importer:** Move the one-click import action before the lengthy explanatory content; use Sanity-theme inherited text colors and distinct, high-contrast controls; show progress, errors, success, and document counts (including drafts). Correct raw-perspective retrieval of the siteSettings draft, keeping already-published or editor-modified content unchanged.
2. **Usable record organization:** Immediately visible CMS-connected collections: Website Page, Public Project Case Study, Knowledge Centre articles, News/Insights, and Public Qualifications. Group inactive types under **Other Schemas — Not Yet Connected to Website** so editors do not confuse empty unused schemas with failed data migration.
3. **Preserve existing editorial detail:** Import approved-for-review *drafts* of all 21 page titles/introductions, nine anonymous project references with attributed illustrative-photo URLs, three complete technical articles, six full historical Insight narratives (rather than empty sections), eleven qualification descriptions with read-only external logo-reference links, and published homepage settings as a separate draft with its existing illustrative slides. No data is published automatically.
4. **Public presentation:** Use uploaded project cover if cleared and present; otherwise retain the attributed illustration. Continue to respect project approval and identity-cleared flags. Previously deployed homepage asset priority and project galleries remain preserved.
5. **Regression coverage:** Add automated tests for prominent action, theme-safe text, raw-draft queries, non-destructive writes, full story content, illustrative image carryover, connected-vs-unconnected navigation. Existing TypeScript/build and regression checks run in GitHub.

## Security and limitations
The Sanity production dataset is public; document drafts and `approvedForWeb` flags are **not a security boundary**. Never import confidential customer identities, commercial files, private site photos or internal operational records. Authentic project media and corporate logos require documented rights/verification before uploading or publishing. The import tool uses the signed-in Sanity editor's permissions; it cannot execute by merely deploying source code. Existing *fully structured page body panels* are still largely authored in Next.js, so V3.15 is a reliable content onboarding fix, **not** complete WYSIWYG CMS coverage.

## Acceptance plan
- [ ] CI green: logo URLs, TypeScript, automated tests, Next.js build, search regressions.
- [ ] CEO authorizes integration and deployment to `rebuild/website-v3` (without merging main), existing DigitalOcean pipeline only.
- [ ] On iPhone, `/studio` shows readable heading and primary import button without scrolling.
- [ ] Authenticated editor taps **Import existing website content** and receives success + actual counts; at least the identified records appear in their categories. Zero-count/permission errors must display clearly.
- [ ] Confirm current published siteSettings accent and homepage still display unchanged after *draft* import.
- [ ] Edit/publish one cleared homepage slide, one anonymized project cover/gallery and one approved page intro; verify public render, site search, and nonpublication of unapproved records.
- [ ] Capture screenshot/evidence of actual Sanity CRUD and publish flow.
- [ ] Keep previous DigitalOcean release and rollback option intact.

## Deployment closure (18 October 2026)

Production deployment and independent HTTP checks passed. [PR #18](https://github.com/refedo/hexasteel.sa/pull/18) integrated into `rebuild/website-v3` without touching `main` or deferring PR #12. Release commit [`a181e0f0`](https://github.com/refedo/hexasteel.sa/commit/a181e0f0874cb8483141e0dcbaca2c3da8914d52). [Production CI](https://github.com/refedo/hexasteel.sa/actions/runs/39070900175) · [DigitalOcean activation](https://github.com/refedo/hexasteel.sa/actions/runs/39070900174) · [Studio availability/CORS](https://github.com/refedo/hexasteel.sa/actions/runs/38424091525) · [Public website regression](https://github.com/refedo/hexasteel.sa/actions/runs/38511951704). These checks did not authenticate or click the import button; live record population, edits and CEO visual acceptance remain pending. Official R1 is still 60.60% ≈ 61%; R2/R3 not started.

## Original pre-deployment development record (superseded above)
**Developed:** code committed on feature branch; tests running (check final PR).  
**Tested:** awaiting final workflow result and post-release editor exercises.  
**Merged/deployed:** not done; no production change authorized in this milestone yet.  
**Operationally accepted:** not yet.  
**Official R1:** 60.60% ≈ 61%; R2 and R3 not started.  
**Next exact step:** review green PR, obtain explicit release authorization, deploy direct to `hexasteel.sa`, run authenticated import and prove live editorial changes. Do not merge into `main` or reactivate RFQ PR #12.
