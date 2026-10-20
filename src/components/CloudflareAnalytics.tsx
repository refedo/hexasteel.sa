"use client";
import Script from "next/script";
import {usePathname} from "next/navigation";

/**
 * Explicit MANUAL fallback for Cloudflare Web Analytics only.
 * Prefer Cloudflare's automatic, hostname-scoped injection for proxied sites.
 * Never load a second beacon when the Cloudflare proxy already injects one.
 */
export function CloudflareAnalytics({token}:{token:string}){
 const pathname=usePathname();
 if(pathname.startsWith("/studio"))return null;
 return <Script id="cloudflare-web-analytics"
   src="https://static.cloudflareinsights.com/beacon.min.js"
   strategy="afterInteractive"
   type="module"
   data-cf-beacon={JSON.stringify({token})}
 />;
}
