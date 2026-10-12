import Link from "next/link";
import { brand } from "@/content/site";
export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-content">
    <div><strong>HEXA STEEL®</strong><p>Engineering · Manufacturing · Project Delivery</p></div>
    <div className="footer-links"><Link href="/contact">Contact</Link><Link href="/request-quotation">Request a quotation</Link><Link href="/knowledge">Knowledge Centre</Link><a href={brand.linkedIn} rel="noopener noreferrer" target="_blank">LinkedIn ↗</a></div>
    <small>© {new Date().getFullYear()} Hexa Steel® · Saudi Arabia</small>
  </div></footer>;
}
