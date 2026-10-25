# HEXA Steel® V3.20 — CMS Editorial & Corporate Experience Handover
Date: 21 October 2026
Branch: feature/v320-studio-ux-corporate-polish
Integration target: rebuild/website-v3 (never main)
Baseline SHA: 6999184592b29fea8fa59360685933e64ad1bf0f

## Verified previous stopping point
V3.19 PR #25 merged and deployed at 6999184. Both feature and integration CI passed; DigitalOcean workflow #39496402593 verified build, server, routes and domain with rollback saved. User supplied screenshots showing Studio menu with import and project publishing tool — this confirms access and navigation, NOT successful bulk publish, email delivery, or all-content editorial acceptance. PR #12 (RFQ) and PR #19 (publication UX) remain separately open.

## Starting point
Existing Next.js v3 with Sanity dataset ik7morln/production, project galleries/watermarks, existing Google Tag Manager/Consent Mode (storage denied by default), SiteGround email domain, existing SiteFooter and notice components; no authenticated Sanity client write or customer-feedback delivery secrets available to ChatGPT. Main remains untouched.

## Planned versus delivered on this feature branch
1. Rename Studio headings to Website Pages, Projects & Case Studies, Knowledge Centre, Company News & Insights, Client Approvals & Qualifications, Website Theme & Settings; retain Import Existing Content and Publish Project Drafts.
2. General Bulk Update Project Status action: select one/all draft or published project records, choose Completed/Ongoing/Status to confirm, transaction with revision conflict validation, explicit user confirmation, no auto-publication of drafts.
3. Sanity media guidance: hero 1920×1080 16:9, project covers 1600×900+, galleries high resolution, JPEG/WebP/PNG, proper descriptions, focal crops, file size and authorization guidance. These are editorial recommendations (not automatic rejection of valid historical media).
4. Replace transient beta banner dismissal with persistent same-browser localStorage. Storage clearing/incognito/device differences still permit the banner to reappear.
5. Per the owner's updated instruction, completely remove the public Privacy page, its footer/sitemap link and the analytics Accept/Reject controls, with no placeholder or redirection. Preserve the existing GTM installation and Google Consent Mode default-denied behavior, with no new cookie authorization. Do not add Cloudflare analytics integrations or request further settings at this stage. Revisit privacy disclosures and optional tracking only before the owner authorizes full launch.
6. Rename careers display/nav to Join Our Team; URL stays /company/careers for SEO/backwards compatibility.
7. Project tracking teaser and /project-tracking coming-soon landing. Private OTS™ tokens, authorization and CRM are **not** implemented in R1; no project details exposed.
8. Project Planning Gantt illustration showing an illustrative (NOT live) sequence; auto-rotating scene panels for procurement and operational excellence with keyboard controls, reduced-motion support, interaction pause and visibility handling. Intersection entry motion and improved card interaction.
9. Knowledge Centre full-card click via accessible stretched article-title links, retaining read links.
10. HEXA navy corporate footer with structured Company, Products & Services, Knowledge & More, and Contact blocks; verified phone from CMS, LinkedIn, WhatsApp, Riyadh general location/Google Maps search and contact email.
11. Customer feedback page and server-side form target customer.feedback@hexasteel.sa. Confidential by default; anti-bot validation through Cloudflare Turnstile, explicit privacy consent, honeypot, input constraints and Resend API. **Fail-closed** until TURNSTILE_SECRET_KEY, TURNSTILE_SITE_KEY, RESEND_API_KEY and CONTACT_FROM_EMAIL are securely configured and tested. No secret committed. Pending email and bot challenge production acceptance.

## Tests and stage controls
- Source developed on isolated feature branch; tests in tests/v320-experience.test.mjs plus relevant existing regression tests adjusted to explicit UI changes.
- Confirm GitHub CI: TypeScript check, unit suite, Next.js build and route/search tests. Manual mobile, accessibility, Sanity editor, feedback delivery and GTM/GA4 browser acceptance remain pending.
- No integration merge/deployment/main push without separate explicit approval. Any pushes to rebuild/website-v3 can trigger direct DigitalOcean production deployment.
- Existing official documented R1 = 65%; management explicitly invited progress reassessment based on demonstrated V3.19 Studio UI. Updated **management-authorized estimate R1 68%** reflects improved deployed CMS editorial capability, not current unmerged V3.20 features or RFQ. R2 = 0%; R3 = 0%. Do not interpret as overall release completion.

## Pending/blocked and exact next action
CI failures if any must be fixed before PR. Create PR against rebuild/website-v3, get authorization, integrate, deploy through existing workflow, check server/domain and authenticated Studio UI. Obtain feedback-service DNS/provider credentials for launch, test delivery/anti-bot and feedback delivery (no staging domain). Obtain real OTS token design and approval as later R2 milestone. Deferred at owner's request until full launch: revisit the privacy notice and lawful measurement configuration, feedback data handling disclosures and no automatic public disclosure.
