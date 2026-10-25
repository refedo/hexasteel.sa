# V3.18 — Industry-classified projects and Warehouses filter
Date: 20 October 2026
Branch: feature/v318-industry-project-portfolio
Baseline: rebuild/website-v3 at 36c70534f3304ad41b30f4525bd4af37c2fee75d, after PR #23
Target: rebuild/website-v3, never main

## Previous stopping point / verified starting point
PR #23 (R1-G02 analytics-consent/privacy) merged at 36c70534 and CI plus DigitalOcean deployment workflows completed successfully. Deployed R1-G01 SEO/GTM and V3.17 project gallery/watermark are preserved. Draft PR #12 RFQ durability and draft PR #19 optional project publishing UX remain independent.

## Requested / developed on isolated feature branch
- 22 separately named public project candidates from management, grouped using two *independent* facets: industry and project type. Multiple values allowed for both.
- 8 Warehouse-tagged items across industries (7 in the primary warehouse list plus Plastic Factory); Jax District 3 is both Entertainment and Utilities. Entertainment includes separate SEVEN Riyadh Exit 10 and Jizan entries.
- Exact vocabulary: Structural Steel rather than SS and Pre-Engineered Building (PEB) where supplied. Unknown steel systems, tonnages, years and status have not been invented.
- Visitor project-type chips (Warehouses, Factories, Hotels, Entertainment, Logistics Hubs), separate Industry dropdown, text search and filtered-results count, with existing visual style and accessible pressed/focus states.
- Existing Sanity project schema extended with optional industry/type/system fields, preserving the old sector/service category and previously entered projects.
- Existing authenticated Studio content import action now adds the 22 missing records as unpublished, editable drafts. Uses createIfNotExists and checks slugs, preserving existing edits. Editors may create further project documents directly in /studio.
- Published projects read the new facets through existing approved CMS adapter, display them on cards and detail pages and include them in website search; the cover/gallery watermark behavior remains unchanged.
- No RFQ, OTS, main, deployment workflow or production changes.

## Publication rights and editorial operations
Management-provided customer and project names are NOT assumed to be cleared for public use. No drafts are auto-published. Each record needs manual technical/scope verification, image rights verification, client identity clearance, and the existing TWO flags approvedForWeb=true and identityClearedForWeb=true, followed by an authorized Sanity Publish action. Missing images remain clearly labelled as illustrative when fallback photos are used. Existing website published records are unaffected.

## Stage gates and release progress
- Developed: code committed to feature branch; CI evidence recorded on PR.
- Tested: project-manifest/filter/gates regression added; CI TypeScript/Node suite/production build and browser QA require confirmation.
- Integrated: NO. Need explicit CEO authorization to integrate into rebuild/website-v3.
- Deployed: NO. Only the approved integration push may deploy to https://hexasteel.sa.
- Operationally accepted: NO. Studio importer and authorized named-project publishing, warehouse results and mobile/gallery checks still need live acceptance.
- Official management completion unchanged: R1 65%, R2 0%, R3 0%. No combined programme figure.

## Exact stopping point / next
Review feature PR, verify GitHub CI. On separate explicit approval, integrate only into rebuild/website-v3 and use existing DigitalOcean direct production release. Verify hexasteel.sa/projects filters and site health. Authorized editor uses /studio > Import Current Website Content > Import existing website content; review 22 new project drafts, verify rights and facts, upload approved galleries, approve and publish individually. Confirm warehouse and industry counts only after these records are public. Rollback to previous release if live health checks fail.
