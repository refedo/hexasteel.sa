export function validSaudiIban(iban:string) {
  if (!/^SA\d{4}[A-Z0-9]{18}$/.test(iban)) return false;
  const digits = (iban.slice(4)+iban.slice(0,4)).replace(/[A-Z]/g,letter=>String(letter.charCodeAt(0)-55));
  return BigInt(digits)%BigInt(97)===BigInt(1);
}

export function getBankCheckoutConfig() {
  const {
    MARKETPLACE_BANK_CHECKOUT_ENABLED: enabled,
    MARKETPLACE_BANK_NAME: bank,
    MARKETPLACE_BANK_BENEFICIARY: beneficiary,
    MARKETPLACE_BANK_IBAN: rawIban,
    MARKETPLACE_FULFILLMENT_TERMS: fulfillment,
    MARKETPLACE_FINANCE_EMAIL: finance,
    MARKETPLACE_CLAMAV_SOCKET: scanner,
    CONTACT_RESEND_API_KEY: apiKey,
    CONTACT_RESEND_FROM_EMAIL: from,
    CONTACT_TURNSTILE_SITE_KEY: siteKey,
    CONTACT_TURNSTILE_SECRET_KEY: turnstileSecret,
  } = process.env;
  const iban = rawIban?.replace(/\s/g,"").toUpperCase() || "";
  if (enabled!=="true" || !bank?.trim() || !beneficiary?.trim() || !validSaudiIban(iban) ||
      !fulfillment?.trim() || !finance?.trim() || !scanner || !apiKey || !from || !siteKey || !turnstileSecret) return null;
  return {publicDetails:{bank,beneficiary,iban,fulfillment,siteKey},finance,scanner,apiKey,from,turnstileSecret};
}

export type BankCheckoutDetails = NonNullable<ReturnType<typeof getBankCheckoutConfig>>["publicDetails"];
