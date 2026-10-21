import nodemailer from "nodemailer";

const destination = "inquiries@hexasteel.sa";

export function contactMailConfigured(): boolean {
  const port = Number(process.env.SITEGROUND_SMTP_PORT || "465");
  return Boolean(
    process.env.SITEGROUND_SMTP_HOST &&
    process.env.SITEGROUND_SMTP_USER &&
    process.env.SITEGROUND_SMTP_PASSWORD &&
    [465, 587].includes(port)
  );
}

export async function sendContactEnquiry(input: {
  fullName: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
}): Promise<void> {
  if (!contactMailConfigured()) throw new Error("Contact SMTP is not configured.");

  const host = process.env.SITEGROUND_SMTP_HOST!;
  const port = Number(process.env.SITEGROUND_SMTP_PORT || "465");
  const user = process.env.SITEGROUND_SMTP_USER!;
  const password = process.env.SITEGROUND_SMTP_PASSWORD!;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass: password },
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const receipt = await transporter.sendMail({
    from: { name: "HEXA Steel® Website", address: user },
    to: destination,
    replyTo: { name: input.fullName, address: input.email },
    subject: "HEXA Steel® website enquiry — " + input.topic,
    text: [
      "New website enquiry — HEXA Steel®",
      "",
      "Name: " + input.fullName,
      "Email: " + input.email,
      "Company: " + (input.organization || "Not provided"),
      "Topic: " + input.topic,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });

  // SMTP acceptance is not proof of inbox placement. Refuse success if the relay rejected our recipient.
  if (!receipt.accepted.some(value => (typeof value === "string" ? value : value.address).toLowerCase() === destination)) {
    throw new Error("SMTP relay did not accept the enquiry recipient.");
  }
}
