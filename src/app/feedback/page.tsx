import type {Metadata} from "next";
import {CustomerFeedbackForm} from "@/components/CustomerFeedbackForm";
import Link from "next/link";
import {PageHero} from "@/components/PageBlocks";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Customer Feedback",description:"Share your project, quality or service experience with HEXA Steel®."};
export default function FeedbackPage(){
 const siteKey=process.env.TURNSTILE_SITE_KEY||"";
 const active=Boolean(siteKey&&process.env.TURNSTILE_SECRET_KEY&&process.env.RESEND_API_KEY&&process.env.CONTACT_FROM_EMAIL);
 return <main>
  <PageHero eyebrow="CUSTOMER EXPERIENCE / FEEDBACK" title="Your feedback strengthens our work." intro="Tell us about your HEXA Steel® experience. We review constructive feedback on service, quality, communication and project delivery."/>
  <section className="section"><div className="shell hexa-feedback-layout">
   <aside className="hexa-feedback-aside"><p className="eyebrow">SCIENCE · QUALITY · TRUST</p><h2>We listen. We improve.</h2><p>Your feedback helps our team prioritize practical improvements. Reports are sent privately to our customer feedback team. They are not published as testimonials.</p><p>For immediate assistance, use our <Link href="/contact" className="text-link">direct contact channels</Link>.</p></aside>
   <div className="hexa-feedback-form">
    <h2>Share your experience</h2>
    <p className="hexa-feedback-help">Fields marked * are required. Do not submit commercially sensitive project information or confidential documents.</p>
    {active?<CustomerFeedbackForm siteKey={siteKey}/>:<div className="hexa-feedback-pending"><strong>Secure online submissions are being activated.</strong><p>Please send your feedback to <a href="mailto:customer.feedback@hexasteel.sa">customer.feedback@hexasteel.sa</a> while we complete email and anti-spam verification.</p></div>}
   </div>
  </div></section>
 </main>;
}
