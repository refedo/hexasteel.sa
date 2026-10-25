import Link from "next/link";
import {SiteNavigation} from "@/components/SiteNavigation";
import {SiteSearch} from "@/components/SiteSearch";
import {getHomeSettings} from "@/lib/cms";
export async function SiteHeader(){
 const settings=await getHomeSettings();
 return <header className="site-header"><div className="shell header-inner">
   <Link className="wordmark" href="/" aria-label="HEXA Steel homepage"><span className="wordmark-lockup"><span className="wordmark-text">HEXA STEEL</span><sup className="wordmark-reg">®</sup></span>{settings.headerTagline&&<small className="brand-tagline">{settings.headerTagline}</small>}</Link>
   <SiteNavigation/>
   <div className="header-right"><SiteSearch/><div className="header-actions"><Link className="header-cta" href="/request-quotation">Request RFQ</Link><a className="header-tracking" href="/track-project" aria-label="Track your project, coming soon">Track Your Project <span>Coming Soon</span></a></div></div>
 </div></header>;
}