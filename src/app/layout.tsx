import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { corporateStructuredData } from "@/lib/structuredData";
import {ContactShortcuts} from "@/components/ContactShortcuts";
import "./globals.css";
import {getAccentColor} from "@/lib/siteSettings";
import type {CSSProperties} from "react";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hexasteel.sa"),
  title: { default: "HEXA STEEL® | Structural Steel & PEB Manufacturer Saudi Arabia", template: "%s | HEXA STEEL®" },
  description: "Hexa Steel® provides structural steel fabrication, pre-engineered buildings (PEB), C/Z purlins, laser cutting, steel detailing, project management and site delivery in Saudi Arabia.",
  keywords: ["Saudi steel fabrication","structural steel manufacturer Saudi Arabia","PEB Saudi Arabia","pre engineered buildings","steel structures Riyadh","industrial steel fabrication","C purlins","Z purlins","steel detailing","industrial project delivery"],
  openGraph:{type:"website",siteName:"HEXA Steel®",locale:"en_SA",title:"HEXA Steel® | Steel Fabrication & PEB",description:"Engineering, manufacturing and project delivery in Saudi Arabia.",url:"https://hexasteel.sa"},
  twitter:{card:"summary_large_image",title:"HEXA Steel® | Structural Steel & PEB"},
  robots: { index: true, follow: true, googleBot:{index:true,follow:true,"max-image-preview":"large"} }
};
// Keep CMS-controlled visual settings fresh without disabling static rendering.
export const revalidate = 30;
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const accent=await getAccentColor();
  const themeStyle={"--signal":accent} as CSSProperties;
  return <html lang="en"><body style={themeStyle}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(corporateStructuredData).replace(/</g,"\\u003c")}}/><SiteHeader/>{children}<SiteFooter/><ContactShortcuts/><ConsentAnalytics/></body></html>;
}
