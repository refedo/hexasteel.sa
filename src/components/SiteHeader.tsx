import Link from "next/link";
import {navigation} from "@/content/site";
export function SiteHeader(){
 return <header className="site-header"><div className="shell header-inner">
   <Link className="wordmark" href="/" aria-label="Hexa Steel home"><span>HEXA STEEL<sup>®</sup></span></Link>
   <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label,path])=><Link href={path} key={path}>{label}</Link>)}</nav>
   <div className="header-right"><Link className="header-cta" href="/request-quotation">Request RFQ ↗</Link><details className="mobile-menu"><summary aria-label="Open menu"><span/><span/><span/></summary><nav aria-label="Mobile navigation">{navigation.map(([label,path])=><Link href={path} key={path}>{label}</Link>)}<Link href="/capabilities/coating">Coating Services</Link><Link href="/capabilities/quality">Quality Control</Link><Link href="/company/operational-excellence">Operational Excellence</Link><Link href="/contact">Contact Us</Link></nav></details></div>
 </div></header>
}
