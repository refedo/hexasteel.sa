# HEXA Steel® V3.22 — Contact Form via SiteGround SMTP

Date: 22 October 2026
Source branch: `feature/v322-siteground-contact-enquiries`
Target branch: `rebuild/website-v3`
Baseline commit: `0964ff92eef09e778ac95198403dccdf815d483a`
Website: https://hexasteel.sa/contact

## Starting position / verified defect
- V3.21 PR #27 was approved and merged into `rebuild/website-v3`; its CI and DigitalOcean deployment passed at `0964ff92`.
- `POST /api/contact` rejected every request unless `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` were set. SiteGround mailbox operation **does not** provide those unrelated Resend environment variables.
- The original page still warned that submissions were disabled. The form had no verification/consent controls and redirected only to `?submitted=1`.
- R1 officially remains **68%**; R2 and R3 remain **0%**.

## Scope delivered in code
1. Use authenticated SMTP (Nodemailer), explicit TLS, hostname/certificate verification, bounded timeouts; accept only ports 465 or 587.
2. Deliver mail to fixed recipient `inquiries@hexasteel.sa`; authenticate and send from `SITEGROUND_SMTP_USER`; visitor email is Reply-To (prevents sender-domain spoofing).
3. Require same-site request origin, bounded form body, server validation, simple rate limiting, Turnstile server verification, and explicit data-use consent. Send only text, no unscanned attachments.
4. Display form only if SMTP and Turnstile configuration is present. Provide an email/telephone/WhatsApp fallback otherwise; preserve website identity.
5. Redirect accepted enquiries to `/contact/received`. Wording reflects acceptance by SMTP relay, not guaranteed inbox delivery.
6. Keep RFQ/feedback APIs independent; no CRM or R2 changes.

## Activation prerequisites (never place secrets in GitHub)
SiteGround > Email > Mail Configuration > Manual Settings: find the **actual outgoing SMTP hostname and TLS port**. Use an existing active `@hexasteel.sa` mailbox username and its **SMTP password**, or a dedicated SiteGround mailbox approved for submissions. Working webmail/inbound email **does not** prove that the DigitalOcean server can authenticate to SiteGround's outbound SMTP relay.

Configure Cloudflare Turnstile public site key and private secret for `hexasteel.sa`. Do not reuse the Google Analytics or Cloudflare API token in these fields.

On DigitalOcean, create `$HOME/hexasteel-v3/.env.contact` with owner-only permission `chmod 600`:
```sh
SITEGROUND_SMTP_HOST='ACTUAL_SITEGROUND_OUTGOING_HOST'
SITEGROUND_SMTP_PORT='465'
SITEGROUND_SMTP_USER='SITEGROUND_EMAIL_MAILBOX@hexasteel.sa'
SITEGROUND_SMTP_PASSWORD='THE_MAILBOX_PASSWORD'
TURNSTILE_SITE_KEY='PUBLIC_TURNSTILE_SITE_KEY'
TURNSTILE_SECRET_KEY='PRIVATE_TURNSTILE_SECRET_KEY'
```
Use shell-safe quoting for secrets, especially embedded apostrophes. Restrict file ownership to the existing deployment user; never print the file, commit it, attach it to CI, or paste the password into a chat. An existing deployment's Resend environment variables are unaffected.

The existing DigitalOcean deployment workflow is adjusted to check for the private file and load it into the PM2 process environment before switching releases. Production activation MUST NOT be approved until valid SMTP credentials and Turnstile keys exist; a 503 fallback is intentional if they are absent. The deployment path does not alter `main` or use a separate domain.

## Tests / acceptance gates
- Developed: feature branch source, tests, documentation, deployment configuration.
- Tested: CI TypeScript, build, Node tests, search tests; record actual check results at the final head rather than assuming success.
- Merge / deployed / operationally accepted: **NO** until explicit CEO approval and subsequent production verification.
- Before approval: confirm GitHub Actions checks green; configure DigitalOcean private file; check port connectivity from DO server to exact SiteGround SMTP host without printing secrets.
- After approval and deployment: browse `/contact`; submit a valid Turnstile enquiry using a real external address; confirm successful redirect and actual arrival in `inquiries@hexasteel.sa` with correct Reply-To, topic and body; send a safe negative test (invalid origin or invalid token) and confirm rejection; review SMTP errors/logs, inbox/spam and possible bounce signals.
- If SMTP/TLS/delivery fails: retain fallback, rollback through existing release symlink, and correct settings before acceptance.

## Non-goals / limitations
- SiteGround SMTP credentials are not accessible through the GitHub connector and have **not** been provisioned or tested against the actual provider.
- Per-process throttling is a best-effort guard, not a distributed limiter; Turnstile and infrastructure WAF are primary anti-bot controls. Production traffic monitoring and mail receipt verification are required.
- No database or durable outbox exists for general enquiries. SMTP acceptance is not durable CRM lead tracking.
- Deferred RFQ PR #12 and R2 OTS™ CRM remain unchanged.

## Exact stopping point
Feature branch and PR ready for CI/review; await runtime credentials and explicit CEO deployment authorization. Retest the public form at `hexasteel.sa` and confirm mail receipt before operational acceptance. Official R1 **68%** remains unchanged until management reassessment.
