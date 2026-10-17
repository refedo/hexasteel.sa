## V3.14 CURRENT STATUS — 17 October 2026 (supersedes the stale setup snapshot below)
Sanity project `ik7morln` / `production` is already connected and authenticated. Website Settings publishing has been verified previously. The empty Studio collections reflect **unseeded records**, not a disconnected Sanity account. V3.14 implementation is isolated on a feature branch and not deployed.

**After CI and CEO deployment authorization only:**
1. Open https://hexasteel.sa/studio with an authorized Sanity editor account.
2. Select **Import Current Website Content**, review the explanation, and choose **Create missing editable drafts**. The importer creates drafts for 21 page introductions, anonymous public projects, Knowledge Centre, Insights, and qualification entries. It prepares a draft of existing homepage settings and illustrative hero slide URLs, preserving currently published settings.
3. Open **Website Settings** → **Homepage Hero Images**; current photographs are illustrative Unsplash references with credits. Replace each with your own authorized factory/project upload in its **asset** field, verify the alt text and title, and publish the settings.
4. Open **Public Project Case Study**; choose a draft and replace illustrative project photography using **Cover Image** and **Approved Project Gallery**. Confirm all public fields, documentation, privacy clearance, and publication permissions, then enable both approval flags and publish.
5. Open **Website Page** and edit one of the 21 imported page titles/intros; set its public approval flag and publish. Only page title + introduction are overridden in this milestone; remaining page body content is still source-managed and must not be presented as fully editable.
6. Test one project, page and hero update on the public website and search after ~120 seconds; verify that pending/unapproved drafts are not exposed. Keep approved source fallbacks until all live content is migrated and accepted.
7. Inspect Knowledge Centre and Insights draft details; verify accuracy and image rights before publication. News sections with no CMS details continue to render the previously published hardcoded story.

**Important:** The importer requires an authenticated editor with create/patch permissions. It cannot run until V3.14 is deployed, and no live data is changed by opening a PR. The public dataset must not contain confidential clients, staff HR information, financial data, RFQ files or identity-bearing imagery. Legacy or unpublished data requires its own privacy audit; public-visibility flags do not make a public dataset confidential.

**Limitations:** This milestone does not provide a WYSIWYG visual page builder or live editing of every section. Page body panels, navigation, advanced service taxonomy, team testimonials and certifications still need separately accepted field connections and provenance. Studio's existing schemas alone are not proof of a live frontend integration.

---

# HEXA Steel® V3 — Sanity CMS setup and acceptance

## Current status
Sanity models, the Studio route, published-content adapters, site search and frontend fallbacks are now coded. A live Sanity project **has not yet been connected**.

## Corporate owner configuration
1. Sign in at https://www.sanity.io/manage using the corporate-owner account.
2. Create a project called HEXA Steel Website V3 and dataset production.
3. Copy the public Project ID. Never share passwords or administration tokens.
4. Configure Sanity CORS origin https://hexasteel.sa for browser Studio access; add local origin only for development.
5. Assign authorized editorial users and roles, including a content-approval procedure.
6. Add GitHub repository variables SANITY_PROJECT_ID and SANITY_DATASET (production). These are not passwords.
7. Redeploy from rebuild/website-v3. Open https://hexasteel.sa/studio and log in using the Sanity account.
8. Create a siteSettings document with ID exactly siteSettings. Select the desired accent color.
9. Publish a managed project, article or news post after approving its public-facing content.
10. Verify each appears on the website and global search after cache revalidation.

## Publishing controls
- Public CMS queries include approvedForWeb true. Unapproved articles, projects and news are not fetched.
- Project documents additionally require clientPermissionVerified true.
- Studio access relies on Sanity user authentication and properly assigned roles.
- Do not put RFQ uploads, vendor information, internal SOPs, detailed machine models, production costs, or OTS™ confidential information in the public CMS.
- Branding and editorial documents belong in CMS; private forms and transactional data require a separate secure service.
- Required image credits, real project photography and consent must be verified before publishing.
- Data refresh is approximately 120 seconds; production webhooks/preview are future enhancements.

## Acceptance tests
- [ ] Login to live Studio and verify roles.
- [ ] Change accent color, publish, see live change without editing GitHub.
- [ ] Add an approved project with genuine media; check listing, case study and search.
- [ ] Add an approved article; check listing, article and search.
- [ ] Add an approved insight; check Insights, detail page and search.
- [ ] Verify unapproved records are invisible to visitors.
- [ ] Upload CMS-controlled hero image with alt text; confirm change in the homepage slider.
- [ ] Maintain prelaunch noindex until formal release.
- [ ] Build Arabic localization in a separate approved milestone.

## Environment
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

Never expose API write secrets using the NEXT_PUBLIC prefix.
