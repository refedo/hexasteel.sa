import Link from "next/link";
import { navigation } from "@/content/site";
export function SiteHeader() {
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" className="wordmark" aria-label="Hexa Steel home"><span className="brand-mark" aria-hidden="true">///</span> HEXA STEEL<sup>®</sup></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([name,href])=><Link key={name} href={href}>{name}</Link>)}</nav>
    <div className="header-right"><Link className="header-cta" href="/contact">Contact us ↗</Link><details className="mobile-menu"><summary aria-label="Toggle navigation"><span/><span/><span/></summary><nav aria-label="Mobile navigation">{navigation.map(([name,href])=><Link href={href} key={name}>{name}</Link>)}<Link href="/contact">Contact us</Link><Link href="/request-quotation">Request quotation</Link></nav></details></div>
  </div></header>;
}
