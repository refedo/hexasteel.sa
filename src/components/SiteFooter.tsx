import Link from "next/link";
import {brand} from "@/content/site";
import {getPublicContact} from "@/lib/publicContact";
export async function SiteFooter(){const contact=await getPublicContact();
return <footer className="site-footer"><div className="shell footer-content">
  <div><strong>HEXA STEEL<sup className="trademark">®</sup></strong><p>Engineered with precision. Built for confidence.</p><p>Saudi Arabia · Structural Steel · PEB · Project Delivery</p><p><a href={contact.tel}>{contact.formatted}</a> {contact.whatsappEnabled&&<>· <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></>}</p></div>
  <div className="footer-links">
  <Link href="/products-services">Products &amp; Services</Link><Link href="/company">Company</Link><Link href="/company/about">Who We Are</Link><Link href="/company/approvals">Approvals</Link><Link href="/company/careers">Careers</Link><Link href="/services/supply-chain">Supply Chain</Link><Link href="/solutions/structural-steel">Structural Steel</Link><Link href="/solutions/peb">PEB</Link>
  <Link href="/project-delivery">Project Delivery</Link><Link href="/projects">Projects</Link>
  <Link href="/capabilities/machinery">Machinery</Link><Link href="/capabilities/coating">Coating</Link>
  <Link href="/capabilities/quality">Quality</Link><Link href="/company/operational-excellence">Operational Excellence</Link>
  <Link href="/knowledge">Knowledge Centre</Link><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link>
  <a href={brand.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </div>
  <small>© {new Date().getFullYear()} HEXA STEEL® · Saudi Arabia · V3 Pre-launch review</small>
  </div></footer>
}
