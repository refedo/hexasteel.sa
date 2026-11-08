# V3.26 — Vacancy cards, favicon and contact editorial controls

24 October 2026. Baseline: `rebuild/website-v3` / `9624eefbbceb8d974813249491dde92b594dc3cb` (deployed V3.25, PR #36). Feature branch: `feature/v326-careers-contact-cms`.

## Planned and delivered
- Responsive two-column vacancy cards, stacking on mobile. Expanding a vacancy spans the grid for readable descriptions/application. Existing vacancy status, schedule and private recruitment gates preserved.
- Website Theme & Settings → Website favicon: optional square PNG (minimum 64 px, recommended 512 px), published asset supplies global browser and Apple icons through Next metadata. Sanity-hosted PNG URL validation, no remote URL entry. No favicon was uploaded or published on behalf of management. Browser caches may require refresh after publication.
- Contact Form & Enquiry Email singleton: editable hero, form heading/intro, field labels/placeholders, categories, submit text, consent/privacy copy, confirmation copy and receiving-email text. Defaults preserve existing operation when no document exists. Categories shared with server validation; core required fields, consent, origin/size/rate limits and Turnstile stay enforced. Private recipient/provider credentials remain server controlled. This is content editing, not an arbitrary field/schema builder.
- Branded navy responsive table-layout HTML receiving email, clear sender/company/category/message sections, reply-to retained and plain-text alternative. All user and editorial text escaped. Both Resend and gated SMTP use the template. Turnstile resets after failed contact submissions.

## Verification and release state
- Local TypeScript passed; 72 automated tests passed; Next production build passed.
- New behavioral tests cover corrupt/offline settings defaults, topic normalization/header controls, HTML escaping, both mail transports and favicon URL validation.
- Full logo/search checks and GitHub final-head CI recorded in PR. Browser visual check status also recorded there; do not infer browser acceptance from source or tests.
- No real enquiry sent. Real inbox rendering, editor publication and live favicon verification require approved deployment and acceptance.
- No production deployment, integration branch change, main change, or Sanity document mutation performed in this milestone.

## Acceptance after approved deployment
1. Verify Careers with HR-published vacancies at desktop/mobile widths; expand role and confirm status/application gates.
2. Upload square PNG in Website Theme & Settings, publish, verify browser icon; allow CMS revalidation and browser caching.
3. Publish Contact Form & Enquiry Email changes; confirm labels/categories/confirmation match.
4. Submit an authorized safe enquiry through human Turnstile and verify branded receiving email plus Reply behavior. Do not claim delivery based solely on provider acceptance.

## Progress and stopping point
R1 remains **70%** (CEO-confirmed management estimate); R2/R3 **0%**. Historical status lines below the latest PROJECT_STATUS entry are superseded. V3.25 deployment is confirmed by PR #36; HR intake/publication acceptance still pending. This milestone is Developed → locally Tested, pending final CI, approval, deployment and operational acceptance. Next milestone: controlled editorial and contact-inbox acceptance of V3.26.
