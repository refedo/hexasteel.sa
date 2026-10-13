# HEXA Steel® V3 — Sanity CMS Field Connection Audit

Audit: 13 October 2026. Sanity project \`ik7morln\` dataset \`production\`. This is a public website content store. It must never contain confidential clients, production recipes, prices or personal HR records.

## Connection matrix

| Document & field | Website behavior | State |
|---|---|---|
| siteSettings.accentColor | Root CSS \`--signal\`; 30-second cache | CONNECTED / tested |
| siteSettings.headerTagline | Optional header tagline | CONNECTED / pending editorial test |
| siteSettings.heroHeadline | Homepage hero copy | CONNECTED |
| siteSettings.heroDescription | Homepage hero body | CONNECTED |
| siteSettings.marketPositioning | Corporate market statement | CONNECTED / publication claim subject to management |
| siteSettings.heroSlides | Live homepage image slider and alt text | CONNECTED |
| siteSettings.trustIndicators | Homepage proof row, only individually approved items | CONNECTED / pending first edit |
| siteSettings.ambition | Previous statement retained as legacy hidden field | DEPRECATED / intentionally not read |
| siteSettings.contactNotificationEmail | Not used to send email; secure form infrastructure not ready | NOT CONNECTED / intentionally hidden |
| project.publicTitle / publicSlug / publicSummary | Anonymized public case-study title, URL and description | CONNECTED / new public-safe fields |
| project.sector, quantityDisplay, completionYear, deliveryStatus | Portfolio filtering, badges, project facts | CONNECTED |
| project.coverImage | Case-study list visual | CONNECTED |
| project.approvedForWeb, identityClearedForWeb | Both required before public appearance | CONNECTED |
| project.scope, photos | Supplemental fields for future rich case studies | NOT DISPLAYED YET |
| project.legacy client, title, slug, summary | Removed from public query and new editor fields; historical raw data might still exist | DO NOT USE — PRIVACY |
| knowledgeArticle.title, slug, category, intro, sections | Index and full article detail | CONNECTED |
| knowledgeArticle.approvedForWeb | Mandatory publication gate | CONNECTED |
| knowledgeArticle.coverImage, seoDescription | Schema present; editorial display/meta not complete | NOT DISPLAYED YET |
| companyUpdate.title, slug, category, displayDate, summary, sections | Insights index and full detail | CONNECTED |
| companyUpdate.approvedForWeb | Mandatory publication gate | CONNECTED |
| companyUpdate.coverImage, seoDescription | Schema present; event gallery and metadata not complete | NOT DISPLAYED YET |
| publicQualification.name, detail | Company approvals listing when validated | CONNECTED |
| publicQualification.verifiedScope, approvedForWeb | Both required before listing | CONNECTED |
| publicQualification.category | Saved but not yet separately displayed | PARTIAL |
| page, initiative, credential, capabilityService, teamProfile, testimonial | Schemas; most content does not yet drive a corresponding public page | NOT FULLY CONNECTED |

## Confidentiality requirements (HIGH PRIORITY)

- Company management has requested removing **all customer and client names** from public project references. The public site, detail pages, metadata and global-search index now use anonymous titles and slugs.
- Sanity Free includes public datasets. **Hiding a field on the website or Studio form does not remove it from the public Sanity document API.**
- Only create new project documents with public-safe fields. If legacy documents in Sanity include confidential \`client\` fields, remove/migrate them. No private client database should be kept in this public dataset.
- New project publication additionally requires \`approvedForWeb\` and \`identityClearedForWeb\` and the query reads only \`publicTitle\`, \`publicSlug\`, and \`publicSummary\`.
- No verified logos are published on the qualifications page by default. Confirm official scope/status before recording a verification flag.

## Next CMS milestones

1. Verify publishing, editing and removing a live anonymous project through Sanity, with correct public status badge and approved photography.
2. Add media rendering and SEO metadata for Sanity-driven Knowledge Centre and Insights articles.
3. Define an editorial workflow for testimonials, people profiles and recruiting.
4. Build secure contact/RFQ forms on the server (do not use a public CMS dataset for customer-uploaded files).
5. Reconcile all remaining schemas with actual website routes and retire unused schema types.

**Audit conclusion:** The CMS is genuinely connected, but **not every available schema/field is wired to the website**. The matrix above distinguishes operational features from future placeholders, so the executive dashboard is not overstated.
