# V3.25 — HR careers in Sanity

Date: 24 October 2026. Baseline: `rebuild/website-v3` at `c435985bb6fad5f6c83a0de550ed312da536885e`. Working branch: `feature/v325-hr-careers-cms`.

## Continuation and reconciliation

V3.24 navigation and supplier UX are integrated at c435985. PR #35 records successful read-only production evidence at that revision, superseding earlier failed-rollout notes in PROJECT_STATUS.md. Supplier intake remains disabled and its full E2E acceptance is outstanding. Open PR #32 is an older navigation branch, not the current integration baseline; #31 is the separate acceptance record. #12 RFQ, #19 CMS UX and #35 live supplier smoke remain independent work. No new production verification or deployment is claimed here.

Official progress remains **R1 70%, R2 0%, R3 0%**. Careers development does not count as operational acceptance.

## Delivered versus planned

- Dedicated Studio **HR — Careers & Opportunities**, using public `jobPosting` documents.
- Comprehensive vacancy editor: title, unique reference, department, location, employment type, workplace, openings, summary, responsibilities, education, technical skills, experience range, certifications, languages, benefits, optional approved public salary, instructions, scheduled opening and closing, publication approval.
- Draft/Open/On Hold/Closed lifecycle. Publish every status change. Closed and paused roles remain visible with applications disabled; unapproved and draft roles are hidden.
- Uncached published Sanity reads on both page and submission endpoint. No fallback merge with fixed roles. Deadline blocks applications server-side even from a previously opened form; recheck after scanning.
- One-click **Prepare Existing Career Drafts**, authenticated with editor permissions: creates only missing legacy references as unpublished drafts, never overwrites published or closed jobs. No Sanity content mutated by development.
- Comprehensive applicant form: contact/location, qualification, experience, current role/employer, skills, certificates, languages, notice/availability, work authorisation needs, optional salary expectation/profile URL/cover letter, PDF CV and consent. No identity/bank documents requested.
- Private HR email delivery; CVs/applicant records never enter public Sanity. PDF only, 5 MB limit, bounded multipart streaming, server validation, same-origin, Turnstile hostname verification, per-process rate backstop, private local ClamAV scan, controlled errors and timeouts.

## HR operation after approved deployment

1. Invite HR editors to the existing Sanity project `ik7morln`, dataset `production`; validate their available role permissions. Studio menu visibility is not an HR-only access-control boundary. Restricted custom roles require a separate project permission configuration where supported.
2. Open `/studio` → Prepare Existing Career Drafts once, or HR — Careers & Opportunities → Create.
3. Fill required vacancy fields. Optional opening/deadline timestamps display on public page in Riyadh time.
4. Set Open, enable Approved for public website, then Publish. Refresh `/company/careers` to verify.
5. To stop intake, set On Hold or Closed and Publish. A draft edit alone does not change the published vacancy. Remove public approval to hide the entire listing. Reopen using Open and a future/empty deadline, then Publish.

## Activation and operational limitations

Careers submission defaults disabled. Before activation verify the destination `CAREERS_TO_EMAIL` with the owner, working `CONTACT_RESEND_API_KEY` / `CONTACT_RESEND_FROM_EMAIL`, existing contact Turnstile site/secret keys, `CAREERS_CLAMAV_SOCKET` readable/writable by the website runtime, and `CAREERS_SUBMISSIONS_ENABLED=true`. Use the existing protected runtime environment, never commit values. The scanner uses local ClamAV INSTREAM; no candidate CV is sent to a public scanning service. Failed/unavailable scan blocks sending.

This is email-based recruitment intake, not an applicant tracking database. HR must manage access, retention and deletion in its private mailbox. No candidate receipt email is sent. A provider timeout may leave delivery uncertain; response states that uncertainty. Rate limit is a process backstop and requires trusted proxy IP headers; Turnstile is primary abuse protection.

No pre-existing CMS vacancies are assumed. Until HR completes/publishes drafts the new page correctly shows no opportunities. Prepare those drafts alongside the deployment handover to avoid an unexpected empty list. Completing legacy drafts requires approved role requirements, not invented responsibilities.

## Verification and exact stopping point

Automated checks and CI outcomes are recorded in the PR. Required acceptance: HR publishes a safe vacancy, verifies public fields, submits sanitized PDF to authorized HR inbox, confirms closure/deadline rejection and paused state, mobile/desktop visual review, scanner permission/error test and private mailbox access. No external email, synthetic application, published CMS mutation, integration push, main merge or production deployment performed during development.

Next milestone: approve integration into `rebuild/website-v3` and deployment through existing GitHub–DigitalOcean workflow; verify Studio lifecycle and HR intake prerequisites before enabling applications. Preserve c435985 as rollback baseline.

### Local verification and GitHub publication approval

- TypeScript passed; 68 automated tests passed (including four executable careers regression tests); production build passed; all eleven logo sources verified.
- HTTP search smoke passed when the local Next server explicitly bound to 127.0.0.1. The unchanged test launcher initially failed because the restricted local runtime denies network-interface enumeration on wildcard binding; no production/script behavior was changed.
- Turnstile is explicitly mounted after selecting a vacancy and cleaned up on vacancy switch; it does not rely on initial page auto-discovery.
- Initial GitHub publication was blocked by automatic approval review. The CEO explicitly approved uploading this milestone to `refedo/hexasteel.sa` in the next turn. Feature-branch publication and PR creation are now authorized; GitHub CI evidence will be recorded in the PR. Integration and production deployment still require separate approval.
