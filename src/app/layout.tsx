import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";
import {getAccentColor} from "@/lib/siteSettings";
import type {CSSProperties} from "react";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hexasteel.sa"),
  title: { default: "HEXA STEEL® | Engineered with Precision", template: "%s | HEXA STEEL®" },
  description: "Structural Steel, PEB, advanced manufacturing, project management and site execution in Saudi Arabia.",
  robots: { index: false, follow: false } // staging: switch on only after content approval
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const accent=await getAccentColor();
  const themeStyle={"--signal":accent} as CSSProperties;
  return <html lang="en"><body style={themeStyle}><SiteHeader/>{children}<SiteFooter/></body></html>;
}
