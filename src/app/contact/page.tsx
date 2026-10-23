import type {Metadata} from "next";
import {getPublicContact} from "@/lib/publicContact";
import {contactMailConfigured} from "@/lib/contactMail";
import {ContactEnquiryForm} from "@/components/ContactEnquiryForm";
import Link from "next/link";

export const dynamic="force-dynamic";
export const metadata:Metadata={alternates:{canonical:"https://hexasteel.sa/contact"},title:"Contact Hexa Steel®",description:"Contact Hexa Steel® in Saudi Arabia for structural steel, PEB, project management, steel fabrication and engineering services. Phone and WhatsApp."};
export default async function ContactPage(){
 const contact=await getPublicContact();
 const siteKey=process.env.CONTACT_TURNSTILE_SITE_KEY||"";
 const formActive=Boolean(siteKey&&process.env.CONTACT_TURNSTILE_SECRET_KEY&&contactMailConfigured());
 return <main>
  <section className="inner-hero"><div className="shell"><p className="eyebrow on-dark">CONTACT / HEXA STEEL®</p><h1>Let's make the next project happen.</h1><p>Discuss your structural steel project, industrial building, manufacturing requirements or engineering enquiry directly with our team.</p>
   <div className="contact-direct-actions"><a className="button signal" href={contact.tel}>Call {contact.formatted}</a>{contact.whatsappEnabled&&<a className="button outline" target="_blank" rel="noopener noreferrer" href={contact.whatsapp}>Chat with us on WhatsApp</a>}</div>
  </div></section>
  <section className="section"><div className="shell contact-layout">
   <div className="contact-detail-panel"><p className="eyebrow">DIRECT COMMUNICATION</p><h2>Speak with Hexa Steel®.</h2><p>Our commercial and technical teams coordinate structural steel, PEB, steel services and project-delivery enquiries.</p>
    <div className="contact-detail"><small>TELEPHONE</small><a href={contact.tel}>{contact.formatted}</a></div>
    {contact.whatsappEnabled&&<div className="contact-detail"><small>WHATSAPP</small><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Start WhatsApp conversation</a></div>}
    <div className="contact-detail"><small>EMAIL</small><a href="mailto:inquiries@hexasteel.sa">inquiries@hexasteel.sa</a></div>
    <div className="contact-detail"><small>CUSTOMER EXPERIENCE</small><Link href="/feedback">Share your feedback with our team</Link></div>
    <div className="contact-detail"><small>LOCATION</small><span>Riyadh, Saudi Arabia</span><a href="https://www.google.com/maps/search/?api=1&query=Hexa+Steel+Riyadh+Saudi+Arabia" target="_blank" rel="noopener noreferrer" className="contact-map-link">Find HEXA Steel® on Google Maps</a></div>
   </div>
   <div className="form-shell"><p className="eyebrow">GENERAL ENQUIRY</p><h2>How can we help?</h2>
    {formActive?<ContactEnquiryForm siteKey={siteKey}/>:<div className="hexa-feedback-pending"><strong>Online enquiries are temporarily unavailable.</strong><p>Please email <a href="mailto:inquiries@hexasteel.sa">inquiries@hexasteel.sa</a> or contact our team by phone or WhatsApp.</p></div>}
   </div>
  </div></section>
 </main>;
}
