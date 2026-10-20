import type {Metadata} from "next";
import Script from "next/script";
import Link from "next/link";
import {PageHero} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Customer Feedback",description:"Share your project, quality or service experience with HEXA Steel®."};
export default function FeedbackPage(){
 const siteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY||"";
 const active=Boolean(siteKey&&process.env.TURNSTILE_SECRET_KEY&&process.env.RESEND_API_KEY&&process.env.CONTACT_FROM_EMAIL);
 return <main>
  <PageHero eyebrow="CUSTOMER EXPERIENCE / FEEDBACK" title="Your feedback strengthens our work." intro="Tell us about your HEXA Steel® experience. We review constructive feedback on service, quality, communication and project delivery."/>
  <section className="section"><div className="shell hexa-feedback-layout">
   <aside className="hexa-feedback-aside"><p className="eyebrow">SCIENCE · QUALITY · TRUST</p><h2>We listen. We improve.</h2><p>Your feedback helps our team prioritize practical improvements. Reports are sent privately to our customer feedback team. They are not published as testimonials.</p><p>For immediate assistance, use our <Link href="/contact" className="text-link">direct contact channels</Link>.</p></aside>
   <div className="hexa-feedback-form">
    <h2>Share your experience</h2>
    <p className="hexa-feedback-help">Fields marked * are required. Do not submit commercially sensitive project information or confidential documents.</p>
    {active?<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
    <form action="/api/feedback" method="post" className="form-grid">
     <div className="field"><label htmlFor="feedback-name">Name *</label><input id="feedback-name" name="fullName" maxLength={120} required autoComplete="name"/></div>
     <div className="field"><label htmlFor="feedback-email">Email *</label><input id="feedback-email" name="email" type="email" required maxLength={250} autoComplete="email"/></div>
     <div className="field"><label htmlFor="feedback-company">Company (optional)</label><input id="feedback-company" name="organization" maxLength={160}/></div>
     <div className="field"><label htmlFor="feedback-category">Feedback category *</label><select id="feedback-category" name="category" required defaultValue=""><option value="" disabled>Choose a category</option><option>Project Delivery</option><option>Product Quality</option><option>Communication</option><option>Service Experience</option><option>Other</option></select></div>
     <div className="field full"><label htmlFor="feedback-rating">Overall experience *</label><select id="feedback-rating" name="rating" required defaultValue=""><option value="" disabled>Select a rating</option>{[5,4,3,2,1].map(x=><option key={x} value={x}>{x} — {x===5?"Excellent":x===4?"Good":x===3?"Acceptable":x===2?"Needs improvement":"Unsatisfactory"}</option>)}</select></div>
     <div className="field full"><label htmlFor="feedback-message">Your feedback *</label><textarea id="feedback-message" name="message" required minLength={20} maxLength={3000} placeholder="What went well, and what could HEXA Steel® improve?"/></div>
     <div className="field full" hidden aria-hidden="true"><label htmlFor="feedback-website">Website</label><input id="feedback-website" name="website" tabIndex={-1} autoComplete="off"/></div>
     <div className="field full"><label className="hexa-feedback-consent"><input name="privacyConsent" type="checkbox" value="yes" required/> I agree that HEXA Steel® may process the information I provide to review and respond to my feedback. Read the <Link href="/privacy">Privacy Policy</Link>.</label></div>
     <div className="field full"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" aria-label="Bot verification"/></div>
     <div className="field full"><button type="submit" className="button dark">Submit Feedback</button><p className="form-note">Submitted feedback is sent to customer.feedback@hexasteel.sa and is not published publicly.</p></div>
    </form></>:<div className="hexa-feedback-pending"><strong>Secure online submissions are being activated.</strong><p>Please send your feedback to <a href="mailto:customer.feedback@hexasteel.sa">customer.feedback@hexasteel.sa</a> while we complete email and anti-spam verification.</p></div>}
   </div>
  </div></section>
 </main>;
}
