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
