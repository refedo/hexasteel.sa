# HEXA Steel® V3.17 — Complete project galleries and branded image display

**Date:** 18 October 2026  
**Previous verified release:** V3.15 application commit `a181e0f0` and documentation head `3bbb268` on `rebuild/website-v3`.  
**Feature:** `feature/v317-project-gallery-watermark`, based on `3bbb2685920c707d4fb3bb6fce30d359f7ef8743`, no change to the integration branch or production.  
**Official progress:** R1 60.60% (≈61%) unchanged until approved/operationally accepted. R2 and R3 not started.

## Problem and resolution
The project detail template displayed only `photos[]`; the separately managed `coverImage` was absent. The approved Sanity project record can have an uploaded cover before any gallery assets. Public site visibility depends on both `approvedForWeb` and `identityClearedForWeb`, and these safeguards remain mandatory.

**Developed on this branch:**
- Detail pages show the approved cover first and then every approved gallery image, removing duplicates and unsafe URLs, including when only a cover exists.
- Responsive featured cover and gallery with meaningful captions, image count and accessible alternative descriptions.
- Reusable HEXA STEEL® typographic wordmark watermark, matching the site's existing header identity, on Sanity-uploaded project cover/gallery images and project listing covers.
- Externally sourced illustrative photography continues to be visibly labelled and is not branded as HEXA-owned imagery.
- Source assets in Sanity are **not altered or permanently watermarked**: these are web-display overlays; downloaded original image URLs remain unmodified. A persistent rasterized/export watermark would require a separate approved asset-derivative workflow.
- Regression tests for cover inclusion, deduplication, watermark conditions and Sanity approval gates.

## Publication and permission prerequisites
The October 18 diagnostic for `airport-infrastructure-steel` (PR #19) found a published cover and `approvedForWeb=true`, but `identityClearedForWeb=false`. **No photos for that record may be surfaced until an authorized editor verifies image/identity permission and publishes the clearance.** If images still don't show afterward, confirm the record has gallery items, then assess Next.js cache, API and asset accessibility; do not bypass the gates.

## Release handover
- **Planned versus developed:** All requested image-gallery and browser-display watermark functionality added. No customer data, CRM, RFQ, approvals, homepage or SEO behavior modified.
- **Branch/PR:** `feature/v317-project-gallery-watermark`; PR to target only `rebuild/website-v3`.
- **Tests:** Automated tests, TypeScript and production build must pass on feature PR before approval. Production verification and actual device/editor acceptance pending.
- **Merged / Deployed:** No / No. **Operational acceptance:** Pending.
- **Blocks:** Cleared public image rights + both published flags; if a project has no actual approved assets, do not invent photographs.
- **Next:** Review PR CI, authorize integration/deployment if satisfactory, verify live project gallery, cover-first order, all approved photos, overlay on uploaded files (not illustrations), mobile responsive layout and CMS updates. Retain rollback capability. Never merge to main.
