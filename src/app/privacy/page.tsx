import type {Metadata} from "next";
import Link from "next/link";
import {AnalyticsConsentSettings} from "@/components/AnalyticsConsent";
import {publicPageMetadata} from "@/lib/seo";

export const metadata:Metadata=publicPageMetadata("/privacy","Privacy & Analytics Choices","Information about optional website analytics, browser preferences, enquiries and contact channels at HEXA Steel®.");

export default function Privacy(){
 return <main>
  <section className="inner-hero"><div className="shell"><p className="eyebrow on-dark">HEXA STEEL® / WEBSITE PRIVACY</p><h1>Privacy & analytics.</h1><p>How this website uses analytics choices and handles information you choose to share with us.</p></div></section>
  <section className="section"><div className="shell article-body">
   <section><h2>Website analytics</h2><p>Our website uses Google Tag Manager (GTM) to manage measurement tools. We request that Google measurement storage remains denied unless you explicitly enable optional analytics in your privacy preferences. GTM can still make technical requests to Google; separately configured tags must respect the same consent choices.</p><p>Analytics, when enabled, can help us understand visits, traffic sources, pages viewed and website performance. Individual search queries from Google are reported in aggregate through Search Console, not linked to a named visitor.</p></section>
   <AnalyticsConsentSettings/>
   <section><h2>Necessary browser storage</h2><p>Some browser storage supports essential website preferences, including keeping track of dismissible website notices and your analytics consent choice. Optional analytics storage is distinct from these preferences.</p></section>
   <section><h2>Enquiries and third-party channels</h2><p>If you submit an enquiry or contact us by phone, email or WhatsApp, the information you choose to share can be used to respond to your request. Website forms and file uploads may not be available while their operational and security checks are completed. External communication providers may apply their own privacy terms.</p></section>
   <section><h2>Questions about your information</h2><p>For privacy enquiries, access or correction requests, contact our team using our <Link href="/contact" className="text-link">contact information</Link>. This page describes the public website; it does not grant access to the separate OTS™ business application.</p></section>
  </div></section>
 </main>;
}
