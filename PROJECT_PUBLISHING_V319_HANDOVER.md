# V3.19 — Selective Project Draft Publishing (20 October 2026)

## Previous stopping point
R1 V3.18 PR #24 merged into `rebuild/website-v3` at `0c630d5858b8dafe5340e006a8ed5b6861ed998a`. Both feature and post-merge CI passed. DigitalOcean deployment run #39488140858 completed successfully and verified production website routes at https://hexasteel.sa. The 22 project candidates were added as importer-supported **unpublished** entries, not as published Sanity records. Manual Studio import, editorial rights clearance and live project acceptance remained open.

## Current starting point
The verified V3.18 integration SHA is `0c630d5`. Source `/studio` supports the existing one-time draft importer, individual project editing, optional project galleries, and independent public approval/identity clearance flags. Open unrelated PR #12 (RFQ) and #19 (optional project CMS publication UX) were not touched. No Sanity publishing connector, credentials, or authorized remote editing session was available for direct publishing from ChatGPT.

## V3.19 planned and implemented
The owner corrected the prior hard-coded "Publish all 22" idea: provide **general, reusable bulk publication of project drafts** from Sanity. Implemented on `feature/v319-bulk-project-publishing`:
- New Studio menu item **Bulk Publish Project Drafts**, next to existing Import Current Website Content.
- Show every project draft in the signed-in Sanity user's dataset, with project title, slug and status.
- **Select all draft projects** checkbox plus individual selection, independent of any 22-project manifest. `Publish selected (N)` publishes only those checked. The 22 candidates may be imported first using existing importer; all future project drafts are covered.
- Two explicit attestations: factual/imagery publication rights and permission to name customer/site identities; existing `approvedForWeb` and `identityClearedForWeb` remain prerequisites before website exposure. Project editorial content and galleries are preserved; no other content type affected.
- Re-fetch before write, verify IDs, uniqueness of slugs, ownership and document revisions, fail on conflicts. Sanity editor-authenticated transactional batches of 50; with a very large selection, earlier successful batches are reported if a later batch fails. No write token in browser or repository.
- Refresh and report publication results; actual visibility depends on Sanity publication and existing live cache revalidation.

## Verification and stage gates
- Developed: isolated feature branch; source, CSS, test, docs changes committed.
- Tested: GitHub CI TypeScript, automated tests, build and relevant regressions to be verified by run status. Manual Sanity authorization/session, checkbox/device QA not yet accepted.
- Integrated: NO.
- Deployed: NO. Integration branch `rebuild/website-v3` and production deployment are gated on separate CEO approval.
- Operationally accepted: NO — requires signed-in Studio user, draft import if needed, selection, attestation, publishing, and live project/filter checks.
- Official management status remains R1 **65%**, R2 **0%**, R3 **0%**. Never equate V3.19 source completion with overall release completion.

## Publication caveats
Project names such as major customer references require real publication rights, and may include confidential scope or images. "Select all" is a convenience for choosing records, not evidence that all records are approved. A user with appropriate Sanity permissions must explicitly confirm both checkboxes. The implementation must not silently bypass identity clearance. Do not use publishing automation outside the signed-in Studio session.

## Exact stopping point and next recommended milestone
Verify all feature CI checks, prepare PR targeting `rebuild/website-v3`, obtain explicit authorization, deploy through existing GitHub–DigitalOcean pipeline, check https://hexasteel.sa/studio in an authenticated session, and confirm that selecting one draft publishes just that project before bulk publishing others. Verify gallery/warehouse filters and preserve rollback. Neither `main` nor RFQ/OTS have been changed.
