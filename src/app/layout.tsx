import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandTransitionNotice } from "@/components/BrandTransitionNotice";
import {ContactShortcuts} from "@/components/ContactShortcuts";
import {SiteMotion} from "@/components/SiteMotion";
import "./globals.css";
import {getAccentColor} from "@/lib/siteSettings";
import type {CSSProperties} from "react";
import {SiteStructuredData} from "@/components/SiteStructuredData";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hexasteel.sa"),
  title: { default: "HEXA STEEL® | Structural Steel & PEB Manufacturer Saudi Arabia", template: "%s | HEXA STEEL®" },
  description: "Hexa Steel® provides structural steel fabrication, pre-engineered buildings (PEB), C/Z purlins, laser cutting, steel detailing, project management and site delivery in Saudi Arabia.",
  keywords: ["Saudi steel fabrication","structural steel manufacturer Saudi Arabia","PEB Saudi Arabia","pre engineered buildings","steel structures Riyadh","industrial steel fabrication","C purlins","Z purlins","steel detailing","industrial project delivery"],
  openGraph:{type:"website",siteName:"HEXA Steel®",locale:"en_SA",title:"HEXA Steel® | Steel Fabrication & PEB",description:"Engineering, manufacturing and project delivery in Saudi Arabia.",url:"https://hexasteel.sa"},
  twitter:{card:"summary_large_image",title:"HEXA Steel® | Structural Steel & PEB"},
  robots: { index: true, follow: true, googleBot:{index:true,follow:true,"max-image-preview":"large"} },
  verification:{
   ...(process.env.GOOGLE_SITE_VERIFICATION?{google:process.env.GOOGLE_SITE_VERIFICATION}:{}),
   ...(process.env.BING_SITE_VERIFICATION?{other:{"msvalidate.01":process.env.BING_SITE_VERIFICATION}}:{})
  }
};
// Keep CMS-controlled visual settings fresh without disabling static rendering.
export const revalidate = 30;
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const accent=await getAccentColor();
  const themeStyle={"--signal":accent} as CSSProperties;
  return (
    <html lang="en">
      <head>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
// Default website analytics measurement enabled; advertising signals remain off.
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`}
        </Script>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N7QJSQTB');`}
        </Script>
      </head>
      <body style={themeStyle}>
        <SiteStructuredData/>
        <SiteHeader/>
        <BrandTransitionNotice/>
        <SiteMotion/>
        {children}
        <SiteFooter/>
        <ContactShortcuts/>
      </body>
    </html>
  );
}
