# HEXA Steel® V3.16 — Project publishing diagnostic and editorial guidance

## Previous stopping point / current starting point
V3.15 CMS importer deployed to `hexasteel.sa` at application SHA `a181e0f0`; integration documentation head `3bbb268`. Official R1 remains 60.60% ≈ 61%; R2/R3 not started. RFQ/OTS CRM work is deferred.

## Reported problem and decisive evidence
The CEO changed and published the **Airport Infrastructure Steelwork** image/status in Sanity but the public Projects listing still showed an illustrative photo and **Status to confirm**. The homepage image editor was working.

A **read-only** GitHub Actions diagnostic queried the Sanity **published** perspective of project `ik7morln/production`, slug `airport-infrastructure-steel`. [Run 39073417376](https://github.com/refedo/hexasteel.sa/actions/runs/39073417376) showed:
- Publicly readable published record: **yes**
- `approvedForWeb`: **true**
- `identityClearedForWeb`: **false**
- `deliveryStatus`: **Completed**
- `coverImage.asset._ref` defined: **true**

**Confirmed root cause:** The public website GROQ project query intentionally requires **both** flags true. Its static fallback remains displayed if either flag is false. This is the correct confidentiality gate, not a generic Sanity connection failure. No credentials, restricted text or client data were disclosed by the diagnostic.

## Immediate resolution, without any deployment
An authorized HEXA editor must verify rights and client confidentiality, enable **Identity Cleared for Web**, and **Publish** the project. This makes the record eligible for the website's current query. Allow up to two minutes for current production cache refresh; then verify `/projects` and project details for photograph, delivery status and year. The assistant must **not** silently override the gate in code or enable the flag without authorization. This has not yet been performed or operationally verified.

## Optional V3.16 code enhancement (isolated feature branch)
- Place both separate release-approval toggles near the top of the project document.
- Clearly display **HIDDEN FROM WEBSITE** in Studio preview until both toggles are true.
- Refresh eligible project CMS content on a 30-second interval, querying Sanity origin instead of CDN, while preserving the existing privacy gate and keeping non-project cache behavior intact.
- Include automated tests and a read-only diagnostic workflow restricted to the feature branch.

**Working branch:** `feature/v316-project-cms-publishing`. **Integrated:** no. **Deployed:** no. **Operational acceptance:** not yet. The optional enhancement is **not necessary** to solve the current record issue.

## Next checkpoint
1. CEO/editor enables the privacy flag after verifying authorization and publishes the Airport Infrastructure record.
2. Verify live `/projects` displays the actual photograph, Completed status and year after normal cache propagation.
3. If desired, review optional UI/refresh PR and request separate explicit deployment approval.
4. Record publication evidence and final editor acceptance; do not claim new official completion until done.

**Progress:** R1 60.60% ≈ 61% unchanged, R2/R3 not started; `main` and current production remain untouched.
