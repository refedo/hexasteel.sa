# HEXA Steel® V3.14 — Sanity Editorial Activation Handover

**Date:** 17 October 2026  
**Repository:** refedo/hexasteel.sa  
**Feature branch:** `feature/v314-sanity-content-activation` (base `rebuild/website-v3` at `0e6fe45`)  
**Release:** R1-C (CMS & editorial operations); no R2 CRM or R3 estimator changes.

## Previous stopping point and baseline
V3.13 was deployed and automated verified 14 October 2026 at app SHA `6f9a7d3`; executive visual acceptance remains open. V3.12 approvals logos/search were released separately. Studio/brand accent publishing was previously verified for the `siteSettings` singleton in project `ik7morln`, dataset `production`. Other empty Studio lists were **not** evidence that Sanity authentication was broken. V3.11 RFQ/CRM PR #12 remains a separate, unmerged draft and is explicitly postponed.

## Planned / developed
- Populate existing editable Sanity document types from the public code baseline, without hand-copying content or replacing current published documents.
- Add a visible authenticated Studio import tool. It creates **drafts only**, skips existing identified records, and preserves settings when they already exist.
- Migrate default homepage hero slide metadata into Studio drafts. Preserve credits and clearly label Unsplash images as illustrative. Sanity-uploaded authorized images take display priority; navy HEXA palette and current live design are preserved.
- Expose new project cover/gallery image controls and render project gallery photos on case-study pages, with URL and identity/publication gates.
- Connect **21** existing public page headlines and introductions to approved CMS page records, preserving unchanged fallback copy and the remainder of the current layouts; index approved edits in website search.
- Preserve existing Knowledge, Insights and qualification adapters and import their source records as drafts.
- Hide floating consumer contact shortcuts over Studio mobile controls.

## Security and acceptance rules
Sanity `production` is a public dataset. Draft imports are not equivalent to private storage. Do not enter sensitive customer names, RFQ drawings, staff records, unpublished endorsements or restricted site imagery. Project documents require `approvedForWeb` and `identityClearedForWeb`; qualifications require their scope verification and logo-use clearance. Any legacy sensitive data in a public dataset must be audited and removed separately.

## Stage gate
**Developed:** code committed to feature branch.  
**Tested:** pending final GitHub CI completion at time of writing; report the actual run in PR.  
**Integrated:** no.  
**Deployed:** no.  
**Operationally accepted:** no; signed-in CMS editing and actual asset import can only be checked after deployment.

## Remaining tasks
- Review CI on feature branch; TypeScript, build, automated test and HTTP search/logo tests.
- CEO deployment authorization followed by existing GitHub–DigitalOcean pipeline and production smoke verification.
- Editor opens `/studio` and invokes Import Current Website Content; verifies draft quantities and existing published settings remain intact.
- Edit, approve and publish one actual HEXA hero photograph (title, accessible alt, rights); confirm visible on homepage and refresh works.
- Edit and publish one anonymous project with a genuine cover/gallery image; verify listing/detail/search, status and privacy gates.
- Edit and publish one public page title/intro; verify rendering and site search without GitHub deployment.
- Confirm Knowledge/Insights schema workflow and nonpublication for unapproved documents.
- Later milestone: full section-level editor, image/SEO fields for Knowledge & Insights, navigation, services, testimonials and people; avoid publishing fabricated claims.

**R1 official completion:** 60.60% ≈ 61%, unchanged pending operational acceptance. R2/R3 not started.  
**Exact stopping point:** V3.14 proposed editorial activation on feature branch, awaiting CI and CEO release gate. No new stage domain; no main-branch merge; no DigitalOcean deployment without CEO approval.
