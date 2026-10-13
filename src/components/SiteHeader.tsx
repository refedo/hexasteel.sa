import Link from "next/link";
import {navigation} from "@/content/site";
import {SiteSearch} from "@/components/SiteSearch";
import {getHomeSettings} from "@/lib/cms";
export async function SiteHeader(){const settings=await getHomeSettings();
 return <header className="site-header"><div className="shell header-inner">
  <Link className="wordmark" href="/" aria-label="HEXA Steel homepage"><span>HEXA STEEL<sup>®</sup>{settings.headerTagline&&<small className="brand-tagline">{settings.headerTagline}</small>}</span></Link>
  <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item=>
   <div key={item.href} className="nav-node">
    {"children" in item && item.children ? <details className="nav-dropdown">
      <summary>{item.label}<span aria-hidden="true">⌄</span></summary>
      <div className="nav-submenu" aria-label={item.label+" sections"}><Link href={item.href}>Overview <span aria-hidden="true">↗</span></Link>{item.children.map(child=><Link key={child.href} href={child.href}>{child.label}<span aria-hidden="true">↗</span></Link>)}</div>
     </details>:<Link className="nav-direct" href={item.href}>{item.label}</Link>}
   </div>)}</nav>
  <div className="header-right"><SiteSearch/><Link className="header-cta" href="/request-quotation">Request RFQ ↗</Link>
   <details className="mobile-menu"><summary aria-label="Open menu"><span/><span/><span/></summary>
    <nav aria-label="Mobile navigation">{navigation.map(item=><div className="mobile-nav-node" key={item.href}>
      {"children" in item && item.children ? <details><summary>{item.label}<span aria-hidden="true">+</span></summary><div className="mobile-nav-children"><Link href={item.href}>Overview</Link>{item.children.map(sub=><Link href={sub.href} key={sub.href}>{sub.label}</Link>)}</div></details> : <Link href={item.href}>{item.label}</Link>}
     </div>)}
     <Link href="/contact">Contact Us</Link><Link href="/search">Search Website</Link>
    </nav></details>
  </div></div></header>;
}
