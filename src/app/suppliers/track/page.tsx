
import type {Metadata} from "next";
import Link from "next/link";
import {SupplierTracker} from "@/components/SupplierTracker";
export const dynamic = "force-dynamic";
export const metadata:Metadata={title:"Track Supplier Application | HEXA Steel®",description:"Securely check the review status of your HEXA Steel® supplier qualification application.",robots:{index:false,follow:false}};
export default function TrackSupplierPage(){
 const enabled=process.env.SUPPLIER_REGISTRATION_ENABLED==="true";
 const siteKey=process.env.NEXT_PUBLIC_SUPPLIER_TURNSTILE_SITE_KEY||"";
 return <main><section className="inner-hero"><div className="shell"><p className="eyebrow on-dark">SUPPLY CHAIN / APPLICATION STATUS</p><h1>Track your application.</h1><p>Use your supplier reference and registered email to request a one-time verification code.</p></div></section>
 <section className="section"><div className="shell supplier-tracker-layout"><div><p className="eyebrow">PRIVATE STATUS CHECK</p><h2>Your submission, transparently tracked.</h2><p>Our Supply Chain team may approve, decline or request additional qualifications. The registered contact can respond when further information is needed.</p><Link href="/become-a-supplier">Back to supplier registration</Link></div>
 {enabled&&siteKey?<SupplierTracker siteKey={siteKey}/>:<div className="form-shell"><h2>Tracking unavailable</h2><p>This service is awaiting secure activation.</p></div>}</div></section></main>;
}
