import type {Metadata} from "next";
import {PageHero} from "@/components/PageBlocks";
import {MarketplaceCart} from "@/components/MarketplaceCart";
import {getMarketplaceItems} from "@/lib/cms";
import {getPublicContact} from "@/lib/publicContact";

import {getBankCheckoutConfig} from "@/lib/marketplaceBank";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Marketplace — Steel Products & Services",
  alternates:{canonical:"https://hexasteel.sa/marketplace"},
  description: "Browse HEXA Steel® products and manufacturing services, including C and Z purlins, metal deck and insulated sandwich panels.",
};

export default async function MarketplacePage() {
  const bankCheckout = getBankCheckoutConfig()?.publicDetails;
  const [items, contact] = await Promise.all([getMarketplaceItems(Boolean(bankCheckout)).catch(()=>[]),getPublicContact()]);
  return <main>
    <PageHero eyebrow="COMMERCIAL / MARKETPLACE" title="Steel products and services"
      intro={bankCheckout ? "Browse available products and check out by bank transfer for priced items." : "Browse available products, compare published prices and put together a purchase enquiry."}/>
    <MarketplaceCart items={items} bankCheckout={bankCheckout} whatsappBase={contact.whatsappEnabled ? contact.whatsapp : undefined}/>
  </main>;
}
