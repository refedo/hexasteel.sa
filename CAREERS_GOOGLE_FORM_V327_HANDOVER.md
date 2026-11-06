# V3.27 — Temporary Google Forms recruitment

25 October 2026. Feature branch: `feature/v327-careers-google-form`. Verified integration baseline `cd580ab381b1f67753f4b2d0218028c29966624b` (V3.26 application plus approved roadmap documentation). R1 **75.50% ≈ 76%**, R2/R3 0%; unchanged by this unmerged feature.

## Delivered

Every eligible open vacancy has a visible **Apply for this job** link outside its expandable description, pointing to the exact Google Forms URL supplied by the CEO. Opens in a new tab with noopener/noreferrer and a vacancy-specific accessible label. Closed, on-hold, unapproved, future and expired records do not get an application link. Existing server eligibility checks and private native intake code remain; the website no longer renders the native applicant form while Google Forms is the chosen destination. No applicant data passes through the website or Sanity on this path; the link carries no candidate data or unverified prefill identifiers.

Destination: https://docs.google.com/forms/d/e/1FAIpQLSe97YW_xAJpLyu6iOt-0_8gyPu3CpcrlZjrXEsLwAzWEQh_tA/viewform

The form was opened in a signed-out browser and redirects to Google sign-in. On-page copy discloses this. Form questions, respondent permissions after sign-in, CV upload and actual response receipt were not verified; no test submission sent.

## Live CMS work explicitly requested by CEO — complete

Sanity authenticated as the existing owner. Before creating records, the list showed a pre-existing **Design Engineer** draft at reference HX-CAR-006 with inconsistent experience fields (4–6 versus copy 5–8) and public approval off. Reused that record, renamed **Steel Design Engineer**, aligned experience to **6–10**, replaced its role summary, responsibilities, qualifications and technical competencies with the requested steel-design scope, set public approval, and published. Existing ID retained: `3d4f6749-2583-4731-857f-2088771fd38b`.

Created and published **Steel Detailing Engineer (Steel Detailer)**, HX-CAR-007, **6–10 years**, Engineering & Detailing, Riyadh, full-time, on-site, one opening. Complete summary, responsibilities, education and technical competencies include Tekla Structures, approved detailing, GA/assembly/single-part/erection drawings, material lists and CNC outputs, drawing checks, revisions, fabrication and erection interfaces. ID: `ba355dbb-1d22-4dea-beba-422f92cad5ec`.

Both records are Open and approved for the public website. Optional salary, benefits, dates and certifications were left blank rather than making unsupported commitments. All previous five records preserved. Browser verifies **seven open roles** on the live Careers page. This CMS publication is already live and does not require a code deployment. Google Form buttons remain feature-branch-only until approved deployment.

## Verification and handover

Local TypeScript, automated tests and production build results are recorded in the PR. Regression renders test the exact approved URL and one visible external CTA for the eligible open fixture, with none for closed/on-hold fixtures, and verify no native form/captcha/API submission in the component. Eligibility tests cover future and expired dates. CI must pass before separate CEO approval to integrate/deploy.

Next: integrate PR into `rebuild/website-v3` only after approval, deploy through existing GitHub–DigitalOcean workflow, verify seven links and new-tab destination, then an authorised HR member checks actual form questions and response routing. No website main merge. No OTS recruitment module built or enabled.
