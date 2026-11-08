# HEXA Steel® V3.21 — Sanity-Managed Google Analytics & GTM

Date: 21 October 2026
Working branch: `feature/v321-ga4-default-measurement`
Target integration branch: `rebuild/website-v3` (never `main`).
Verified baseline: `adfe5abd53a3b9fb0827e539ed65245dadc24683`.

## Previous stopping point / current starting point
V3.20 PR #26 was CEO-approved, merged into the integration branch, tested and deployed to https://hexasteel.sa at `adfe5ab`. Its DigitalOcean deployment #39510401814 and CI runs #39510401837 / #39510408970 succeeded. The existing Google Tag Manager (GTM) container `GTM-N7QJSQTB` was present but website Google Consent Mode initialized `analytics_storage:denied`. No public Privacy page or analytics Accept/Reject controls remain per explicit owner instruction. The official R1 completion estimate from the previous milestone was 68%.

## Requested and developed
- Enable automatic Google Analytics 4 website measurement with `analytics_storage:'granted'` from the shared root layout. Advertising storage, user-data and personalization consent remain denied. The website has no analytics consent banner.
- Preserve the existing GTM implementation; **never disable GTM or insert a second GA4 tag by default**.
- Add a dedicated **Website Analytics** singleton to `/studio`, showing validated **Google Tag Manager Container ID** and **Google Analytics 4 Measurement ID**. Initial defaults `GTM-N7QJSQTB` and `G-JG2HQGQ2P3` are preserved. This is a public ID configuration, NOT an arbitrary JavaScript editor, token store or API-key form.
- Read published settings through the existing Sanity project/dataset, with a 30-second cache revalidation and strict runtime validation. During Sanity outages, continue serving the established default GTM/GA4 IDs.
- Dynamically pass the selected GTM container ID to the single GTM loader; publish the GA4 Measurement ID as the data-layer variable `hexa_ga4_measurement_id` *before* GTM starts. When GTM is the GA4 owner (default), an existing Google tag in the GTM container must use this data-layer variable to make future GA4 ID changes take effect.
- Optional advanced mode `Directly from this website`: only enabled with an explicit CMS checkbox confirming the GTM GA4 Google tag has been disabled. This loads GA4 directly with the CMS Measurement ID without changing the GTM container; using both GA4 loaders would create duplicate measurement.
- Preserve all V3.20 design, Sanity project workflows, feedback form, contact links, and the deferred Privacy-page decision.

## Required one-time GTM configuration
If a GA4 Google tag is already published in `GTM-N7QJSQTB`, check its Google tag ID field. For the **GTM-managed** mode, create a GTM Data Layer Variable with Name `hexa_ga4_measurement_id`, then use that variable as the Google tag ID, test in Tag Assistant, and publish the GTM container ONCE. Thereafter website-only ID changes can be made in Sanity > Website Analytics > GA4 Measurement ID > Publish, with no GitHub code change. This setup step is not verifiable through GitHub and should not be represented as completed. Alternatively, keep the existing static GTM ID, in which case changing the ID in Sanity *will not yet change the destination of GA4 events*. **Do not activate Direct mode while GTM also sends GA4 page views.**

## Release stage gates
- Developed: website loader, Sanity schema/structure, server validation, regression tests, release documentation.
- Tested: CI TypeScript, Node regression suite, Next.js build and search test must be confirmed on final PR head; no direct live browser/GTM access in this branch.
- Integrated: NO; CEO approval required.
- Deployed: NO; do not push integration branch until explicitly approved.
- Operationally accepted: NO; test published Studio values, GTM variable wiring, GA4 Realtime first_visit/page_view event reception and no duplicate page views after deployment. Check applicable Saudi PDPL privacy requirements before public operation of cookie-based tracking.
- Official R1 working estimate 68% remains unchanged; R2 0%, R3 0%; no blended programme metric.

## Exact stopping point and next recommended task
Review tests and PR, obtain approval to integrate only to `rebuild/website-v3`; deploy via existing DigitalOcean workflow; verify HTTPS health and GTM loaded with the Sanity ID; configure/verify GTM Data Layer Variable one time and inspect GA4 Realtime. Keep `main` untouched and preserve rollback.
