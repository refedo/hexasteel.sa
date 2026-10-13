import Link from "next/link";
import {NextStudio} from "next-sanity/studio";
import config from "../../../../sanity.config";
import type {Metadata} from "next";
export const metadata:Metadata={title:"HEXA Content Studio",robots:{index:false,follow:false}};
export default function StudioPage(){
 if(!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID){
  return <main className="studio-not-ready"><div className="shell"><p className="eyebrow">CONTENT MANAGEMENT</p><h1>HEXA Content Studio</h1><p>The editorial workspace is ready for its Sanity project connection. Content editors will sign in with a Sanity account, and publishing permissions must be assigned before launch.</p><p>This configuration step does not affect the current website.</p><Link className="button dark" href="/">Return to website ↗</Link></div></main>;
 }
 return <NextStudio config={config}/>;
}
