import type {Metadata} from "next";
import Link from "next/link";
import {PageHero} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Project Tracking — Coming Soon",description:"A secure, invitation-only HEXA Steel® customer tracking experience is being prepared.",robots:{index:false,follow:true}};
export default function ProjectTracking(){
 return <main><PageHero eyebrow="CUSTOMER PROJECT ACCESS / COMING SOON" title="Track your project with us." intro="A controlled customer project-tracking experience is under development. Once launched, eligible customers will receive a private access token to view their authorized project progress through HEXA Steel® OTS™."/>
 <section className="section"><div className="shell hexa-track-panel"><div><p className="eyebrow">PRIVATE ACCESS / UNDER DEVELOPMENT</p><h2>Visibility, with access control.</h2><p>The future portal will show only information the customer is authorized to access. No project records, private tokens, login fields or customer data are available here yet.</p><p>Private access tokens will be generated and validated through OTS™; they must never be included in public page code or URLs.</p><Link className="button dark" href="/contact">Contact the Project Team</Link></div><div className="hexa-track-progress" aria-hidden="true"><span>ENGINEERING</span><span>PROCUREMENT</span><span>FABRICATION</span><span>DISPATCH</span></div></div></section></main>;
}
