import type {Metadata} from "next";
import {getPublicContact} from "@/lib/publicContact";
import Link from "next/link";
export const metadata:Metadata={title:"Contact Hexa Steel®",description:"Contact Hexa Steel® in Saudi Arabia for structural steel, PEB, project management, steel fabrication and engineering services. Phone and WhatsApp."};
export default async function ContactPage(){
 const contact=await getPublicContact();
 return <main>
  <section className="inner-hero"><div className="shell"><p className="eyebrow on-dark">CONTACT / HEXA STEEL®</p><h1>Let's make the next project happen.</h1><p>Discuss your structural steel project, industrial building, manufacturing requirements or engineering enquiry directly with our team.</p>
   <div className="contact-direct-actions"><a className="button signal" href={contact.tel}>Call {contact.formatted}</a>{contact.whatsappEnabled&&<a className="button outline" target="_blank" rel="noopener noreferrer" href={contact.whatsapp}>Chat with us on WhatsApp</a>}</div>
  </div></section>
  <section className="section"><div className="shell contact-layout">
   <div className="contact-detail-panel"><p className="eyebrow">DIRECT COMMUNICATION</p><h2>Speak with Hexa Steel®.</h2><p>Our commercial and technical teams coordinate structural steel, PEB, steel services and project-delivery enquiries.</p>
    <div className="contact-detail"><small>TELEPHONE</small><a href={contact.tel}>{contact.formatted}</a></div>
    {contact.whatsappEnabled&&<div className="contact-detail"><small>WHATSAPP</small><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Start WhatsApp conversation</a></div>}
    <div className="contact-detail"><small>CUSTOMER EXPERIENCE</small><Link href="/feedback">Share your feedback with our team</Link></div>
    <div className="contact-detail"><small>LOCATION</small><span>Riyadh, Saudi Arabia</span><a href="https://www.google.com/maps/search/?api=1&query=Hexa+Steel+Riyadh+Saudi+Arabia" target="_blank" rel="noopener noreferrer" className="contact-map-link">Find HEXA Steel® on Google Maps</a></div>
   </div>
   <div className="form-shell"><p className="eyebrow">GENERAL ENQUIRY</p><h2>How can we help?</h2>
    <form action="/api/contact" method="post" className="form-grid"><div className="field"><label htmlFor="fullName">Full name *</label><input id="fullName" name="fullName" required maxLength={120}/></div><div className="field"><label htmlFor="email">Work email *</label><input id="email" name="email" type="email" required maxLength={250}/></div><div className="field"><label htmlFor="organization">Company</label><input id="organization" name="organization" maxLength={160}/></div><div className="field"><label htmlFor="topic">Enquiry type *</label><select id="topic" name="topic" required defaultValue=""><option value="" disabled>Select a category</option><option>Structural Steel</option><option>Pre-Engineered Buildings</option><option>Project Management</option><option>Steel Services</option><option>Vendor Registration</option><option>General Enquiry</option></select></div><div className="field full"><label htmlFor="message">Message *</label><textarea id="message" name="message" required minLength={10} maxLength={5000}/></div><div style={{display:"none"}} aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div><div className="field full"><button className="button dark" type="submit">Submit enquiry</button><p className="form-note">The enquiry form will be activated after transactional email verification and security checks. For immediate assistance, contact us by phone or WhatsApp.</p></div></form>
   </div>
  </div></section>
 </main>;
}
