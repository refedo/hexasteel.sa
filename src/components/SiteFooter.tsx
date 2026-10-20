import Link from "next/link";
import {brand} from "@/content/site";
import {getPublicContact} from "@/lib/publicContact";
export async function SiteFooter(){
 const contact=await getPublicContact();
 const groups=[
  {title:"Company",links:[["About HEXA Steel®","/company/about"],["Projects","/projects"],["Approvals & Qualifications","/company/approvals"],["Join Our Team","/company/careers"],["Contact Us","/contact"]]},
  {title:"Products & Services",links:[["Steel Structure","/solutions/structural-steel"],["Pre-Engineered Buildings","/solutions/peb"],["Manufacturing Services","/capabilities/machinery"],["Engineering & Detailing","/services/design-detailing"],["Project Delivery","/project-delivery"]]},
  {title:"Knowledge & More",links:[["Knowledge Centre","/knowledge"],["Technical Insights","/insights"],["Operational Excellence","/company/operational-excellence"],["Track Your Project — Coming Soon","/project-tracking"],["Customer Feedback","/feedback"]]}
 ] as const;
 return <footer className="site-footer" aria-label="HEXA Steel site footer">
  <div className="shell hexa-footer-grid">
   <section className="hexa-footer-brand">
    <Link href="/" className="hexa-footer-mark">HEXA STEEL<sup>®</sup></Link>
    <p>Engineering intelligence. Precision manufacturing. Controlled steel project delivery.</p>
    <p>Steel Structure · PEB · Industrial Fabrication</p>
    <div className="hexa-footer-social">
     <a href={brand.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="HEXA Steel LinkedIn profile">in <span className="sr-only">LinkedIn</span></a>
     {contact.whatsappEnabled&&<a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with HEXA Steel on WhatsApp">WA <span className="sr-only">WhatsApp</span></a>}
    </div>
   </section>
   {groups.map(group=><nav className="hexa-footer-column" key={group.title} aria-label={group.title}>
    <h2>{group.title}</h2><ul>{group.links.map(([label,href])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul>
   </nav>)}
   <section className="hexa-footer-contact">
    <h2>Contact Information</h2>
    <p><strong>Location</strong><span>Riyadh, Saudi Arabia</span></p>
    <p><strong>Telephone</strong><a href={contact.tel}>{contact.formatted}</a></p>
    {contact.whatsappEnabled&&<p><strong>WhatsApp</strong><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Start a conversation</a></p>}
    <p><strong>Customer Feedback</strong><a href="mailto:customer.feedback@hexasteel.sa">customer.feedback@hexasteel.sa</a></p>
    <a className="hexa-footer-location" href="https://www.google.com/maps/search/?api=1&query=HEXA+Steel+Riyadh+Saudi+Arabia" target="_blank" rel="noopener noreferrer"><span className="hexa-map-pin" aria-hidden="true">⌾</span><span>HEXA Steel® · Riyadh<small>View on Google Maps ↗</small></span></a>
   </section>
  </div>
  <div className="shell hexa-footer-bottom"><span>© {new Date().getFullYear()} HEXA Steel® · Saudi Arabia. All rights reserved.</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/contact">Contact</Link></div></div>
 </footer>;
}
