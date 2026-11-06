import {NextResponse} from "next/server";
import {getMarketplaceItems} from "@/lib/cms";
import {formatMarketplacePrice} from "@/content/marketplace";
import {getBankCheckoutConfig} from "@/lib/marketplaceBank";
import {checkoutTotals,maxSlipBytes,type CheckoutLine} from "@/lib/marketplaceTotals";
import {readBoundedMultipart,trustedIntakeOrigin} from "@/lib/intakeBoundary";
import {scanPrivateUpload} from "@/lib/careerSecurity";

export const runtime = "nodejs";

function reply(payload:object,status:number) {
  return NextResponse.json(payload,{status,headers:{"Cache-Control":"no-store"}});
}
function fail(error:string,status:number) {
  return reply({error},status);
}
function field(form:FormData,name:string,max:number) {
  const value = form.get(name);
  return typeof value==="string" && value.length<=max ? value.trim().replace(/[\u0000-\u001f\u007f]/g," ") : "";
}
function parseLines(value:string): CheckoutLine[] {
  try {
    const parsed:unknown = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.every(line=>line && typeof line.slug==="string" && typeof line.quantity==="number")) return parsed;
  } catch { /* Invalid input is rejected below. */ }
  return [];
}
function slipExtension(bytes:Buffer) {
  if (bytes.subarray(0,5).toString("ascii")==="%PDF-") return "pdf";
  if (bytes.subarray(0,3).toString("hex")==="ffd8ff") return "jpg";
  if (bytes.subarray(0,8).toString("hex")==="89504e470d0a1a0a") return "png";
  return null;
}

export async function POST(request:Request) {
  if (!trustedIntakeOrigin(request)) return fail("Submission origin not accepted.",403);
  const config = getBankCheckoutConfig();
  if (!config) return fail("Bank transfer checkout is temporarily unavailable.",503);
  const form = await readBoundedMultipart(request,maxSlipBytes+100_000);
  if (!form) return fail("Invalid upload. Attach one PDF, JPG or PNG up to 5 MB.",413);

  const reference = field(form,"reference",39);
  const name = field(form,"name",120);
  const company = field(form,"company",160);
  const email = field(form,"email",180);
  const specifications = field(form,"specifications",1500);
  const token = field(form,"cf-turnstile-response",2048);
  const lines = parseLines(field(form,"lines",6000));
  const expectedTotal = field(form,"total",18);
  const slips = form.getAll("slip");
  const slip = slips[0];
  if (!/^HX-[a-f0-9]{32}$/.test(reference) || !name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !specifications || !token || !lines.length || !/^\d+$/.test(expectedTotal) || form.get("consent")!=="yes" ||
      slips.length!==1 || !(slip instanceof File) || slip.size<8 || slip.size>maxSlipBytes) {
    return fail("Check the required details and attach one transfer slip up to 5 MB.",400);
  }

  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
      method:"POST",body:new URLSearchParams({secret:config.turnstileSecret,response:token}),
      signal:AbortSignal.timeout(8000),cache:"no-store",
    });
    if (!verification.ok) return fail("Verification is temporarily unavailable. Please retry.",502);
    const challenge = await verification.json() as {success?:boolean;hostname?:string;action?:string};
    if (!challenge.success || !["hexasteel.sa","www.hexasteel.sa"].includes(challenge.hostname || "") ||
        challenge.action!=="marketplace_transfer") return fail("Complete the verification and try again.",403);

    const totals = checkoutTotals(lines,await getMarketplaceItems(true));
    if (!totals || totals.total!==Number(expectedTotal)) {
      return fail("Cart pricing or availability changed. If you already transferred funds, contact HEXA Steel® and quote your transfer reference.",409);
    }
    const bytes = Buffer.from(await slip.arrayBuffer());
    const extension = slipExtension(bytes);
    if (!extension) return fail("Attach a valid PDF, JPG or PNG transfer slip.",400);
    if (!await scanPrivateUpload(bytes,config.scanner)) {
      return fail("The slip could not be cleared for upload. Retry or contact HEXA Steel® with your reference.",422);
    }

    const body = [
      "BANK TRANSFER — PENDING FINANCE VERIFICATION",`Reference: ${reference}`,`Buyer: ${name}`,
      `Company: ${company}`,`Email: ${email}`,"",
      ...totals.lines.map(({item,quantity,amount})=>`${item.title} · ${quantity} ${item.unit} · ${formatMarketplacePrice(amount)}`),
      "",`Subtotal: ${formatMarketplacePrice(totals.subtotal)}`,`VAT: ${formatMarketplacePrice(totals.vat)}`,
      `Expected transfer: ${formatMarketplacePrice(totals.total)}`,`Fulfillment: ${config.publicDetails.fulfillment}`,
      `Specifications: ${specifications}`,"","Reconcile this slip with cleared funds before releasing the order.",
    ].join("\n");
    const response = await fetch("https://api.resend.com/emails",{
      method:"POST",cache:"no-store",signal:AbortSignal.timeout(10000),
      headers:{Authorization:"Bearer "+config.apiKey,"Content-Type":"application/json","Idempotency-Key":reference},
      body:JSON.stringify({from:config.from,to:[config.finance],reply_to:email,
        subject:`HEXA Steel® | Transfer slip | ${reference}`,text:body,
        attachments:[{filename:`${reference}.${extension}`,content:bytes.toString("base64")}]}),
    });
    if (!response.ok) return fail("Receipt delivery could not be confirmed. Retry or contact HEXA Steel® with your reference.",502);
    return reply({reference,status:"pending_payment_verification"},201);
  } catch {
    return fail("The transfer slip could not be confirmed. Retry or contact HEXA Steel® with your reference.",502);
  }
}
