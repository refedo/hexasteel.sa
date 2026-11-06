import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Project Tracking — Coming Soon",robots:{index:false,follow:false}};
export default function TrackProjectPage(){
 return <main className="section"><div className="shell" style={{maxWidth:800}}>
  <p className="eyebrow">CUSTOMER SERVICES / COMING SOON</p>
  <h1>Track Your Project</h1>
  <p>HEXA Steel® customers will soon be able to securely monitor their project progress using private access tokens, from engineering and design through fabrication, coating, delivery and erection.</p>
  <p>Project tracking is not yet available. Private tokens will be issued only after the secure customer service is launched.</p>
  <Link className="button dark" href="/contact">Contact Our Team</Link>
 </div></main>;
}
