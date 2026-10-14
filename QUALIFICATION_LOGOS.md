# HEXA Steel® — Public qualification logos (V3.12)

Eleven real organizations appear on the **company-reported** qualifications page.
V3.12 adds a curated image for each, with a source reference in
`src/content/qualificationLogos.ts`; images are **not fabricated**.
CMS-approved Sanity images supersede the initial sourced entries.

| Organization | Source of brand artwork | Editorial/rights note |
| --- | --- | --- |
| Saudi Aramco | Wikimedia Commons / Saudi Aramco attribution | The official [Aramco media terms](https://www.aramco.com/en/news-media/resources-for-journalists) restrict logo use to approved third parties under their agreement; verify Hexa's right to display before production |
| Maaden | Wikimedia Commons, historical company report logo | Confirm current identity before production |
| National Water Company (NWC) | National Water Company official website logo source | Commons notes CC BY-SA 4.0, attribution and identity confirmation required |
| Qiddiya | Qiddiya-owned Scene7 official brand image | Distinguish Qiddiya City brand from earlier Qiddiya Investment Company marks |
| New Murabba | New Murabba official logo asset published via Oracle Cloud brand image | Confirm official brand version and usage rights |
| MODON | Official Saudi MODON exhibitor artwork published via Swapcard | Correct Saudi MODON bilingual mark; confirm publication rights before production |
| Water Transmission Company (WTCO) | Saudi Ministry of Environment, Water and Agriculture official partners page | Check image endpoint availability |
| Red Sea Global | Red Sea Global's own corporate media logo asset | Verify brand currentness |
| Alfanar | Alfanar corporate mark mirrored by Seeklogo | Commons CC BY-SA 4.0; source attribution required |
| Saudi Electricity Company (SEC) | Saudi Electricity Company brand image from Saudipedia | Verify brand currentness |
| SEVEN Entertainment | Seeklogo listing for SEVEN Saudi Entertainment Ventures | Confirm current mark, reproduction rights and image availability |

## Publishing and verification

- The CEO requested organization logos for the public approvals page. This branch prepares all eleven for explicit executive release review; **production remains unchanged until deployment authorization**.
- A logo does not establish supplier registration, manufacturer approval, or project award. Continue displaying company-reported relationship/scope beside each logo.
- Before approval to deploy: visually check the actual files in a browser and validate use rights, particularly Saudi Aramco, and source/attribution obligations. We cannot independently authenticate private approval certificates.
- A CMS-published logo requires `approvedForWeb`, `verifiedScope`, `logoUseAuthorized` and a Sanity image; approved uploads replace curated sources.
- Re-host all approved masters in Sanity after rights/source verification to eliminate remote-link breakage. The curated image URLs are remote references (mostly canonical image CDN URLs), and **render checks do not establish remote-link uptime**.
- If any source is invalid or usage is not approved, withdraw that candidate and publish the corresponding text-only qualification until the correct artwork is cleared.
