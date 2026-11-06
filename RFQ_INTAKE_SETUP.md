# HEXA Steel® — RFQ Intake V3.10

## Customer workflow
- Machinery page `Request this service` links to `/request-quotation?service=<approved-code>`.
- Preserves the chosen service and asks only for contact, company, rough quantity, delivery date and scope. Optional PDF, DWG, DXF, DOCX or XLSX attachments, capped to 2 files / 5 MB each / 8 MB total.
- Displays a direct WhatsApp link to +966 59 171 6020, with selected-service context, irrespective of email setup.
- After secure email delivery **acceptance**, generates a server-side `HX-RFQ-YYYYMMDD-XXXXXXXXXXXX` identifier, sends a single email to the customer with Sales BCC, includes permitted drawings as attachments, and shows the reference in-page. This is an *RFQ receipt*, not a commercial quotation/estimation number.
- No CRM tracking/dashboard or persistent searchable ticket database is claimed in this release.

## Server configuration
On the **DigitalOcean** host, configure environment variables for the PM2 app process using your team's usual secure secret store:
- `RESEND_API_KEY`: server-only Resend credential.
- `CONTACT_FROM_EMAIL`: from address on a verified sending domain.
- `RFQ_TO_EMAIL`: dedicated **private** Steel Sales / Estimating inbox (e.g. estimations@yourdomain). Falls back to `CONTACT_TO_EMAIL`.
- `NEXT_PUBLIC_SITE_URL=https://hexasteel.sa`: used for Origin validation.
Never put secrets into Sanity, GitHub commits, or client-side `NEXT_PUBLIC_` variables.

If a credential is missing, the site shows a WhatsApp request route and does **not** advertise a working upload form or fabricate a reference.

## Security posture
- All uploads are processed by the Node.js API route; file sizes and signatures are checked and total multipart request size is bounded.
- Explicit consent, a honeypot, origin validation, a basic in-process throttle, and a file extension/signature allowlist are provided.
- Uploaded files are **not stored** in the public Sanity dataset, public assets, static folders, or URL query parameters.
- Before large-volume production use, add a managed anti-bot service, **virus/malware scanning for CAD and office documents**, distributed rate limiting, a private durable CRM datastore and monitored mail bounces/failures.
- The single-email approach provides a customer acknowledgement and Sales BCC when accepted by the provider. Resend API acceptance is not guaranteed delivery and does not itself constitute a durable sales queue.
- Sensitive customer documents should be limited to authorised project data.

## Acceptance tests before activating
1. Verify all service CTAs preselect their respective machinery services.
2. Use a test sales recipient and verified domain. Submit an RFQ with PDF and DWG; confirm Sales receives BCC attachments, and the customer receives the receipt with the **same reference**.
3. Verify malformed files, too many/large files, invalid service IDs, missing consent, spam traps and invalid origins are rejected.
4. Verify no customer details/attachment metadata leak into Sanity, search indexes, URLs or application logs.
5. Verify WhatsApp prefilled service routing on iPhone and Android.
6. Run Next.js build/TypeScript checks; deploy only after older queued workflow is resolved.

## Future V3.11 — Private CRM / RFQ workflow
Persist a record to a **private** managed database before returning successful submission, with authenticated, expiring upload URLs. Add a sales queue and milestones:
Received → Technical Review → Clarification → Estimating → Quoted → Won / Lost.
Connect to OTS™ or a supported CRM after process ownership and data protection are agreed. **Do not expose request status or files publicly using guessable sequential references.**
