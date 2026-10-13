import type {Metadata} from "next";
import Link from "next/link";
import {QuotationRequestForm} from "@/components/QuotationRequestForm";
import {getPublicContact} from "@/lib/publicContact";
import {rfqFileScanningAvailable} from "@/lib/rfqSecurity";
import {rfqStoreConfigured} from "@/lib/rfqStore";
export const metadata:Metadata={
 title:"Request a Quotation — Steel Services & PEB",
 description:"Request Hexa Steel® quotation for laser cutting, C/Z purlins, structural steel, PEB, fabrication and industrial steel components. Send your requirements and drawings.",
 robots:{index:true,follow:true},
};
type Props={searchParams:Promise<{service?:string}>};
export default async function QuotationPage({searchParams}:Props){
 const query=await searchParams;
 const contact=await getPublicContact();
 const enabled=process.env.RFQ_SUBMISSIONS_ENABLED==="true"&&rfqStoreConfigured()&&
  Boolean(process.env.RESEND_API_KEY&&process.env.CONTACT_FROM_EMAIL&&(process.env.RFQ_TO_EMAIL||process.env.CONTACT_TO_EMAIL));
 return <main>
   <section className="inner-hero rfq-hero"><div className="shell">
    <p className="eyebrow on-dark">COMMERCIAL / SERVICE REQUEST</p>
    <h1>Request a quotation.</h1>
    <p>Select a service and submit project requirements to our commercial team.</p>
    <div className="rfq-hero-meta"><span>01 · Select service</span><span>02 · Describe your requirements</span><span>{enabled?"03 · Get an RFQ reference":"03 · Send via WhatsApp"}</span></div><a className="rfq-hero-whatsapp" target="_blank" rel="noopener noreferrer" href={contact.whatsapp+"?text="+encodeURIComponent("Hello Hexa Steel®, I would like to request a quotation"+(typeof query.service==="string"?" for "+query.service:"")+".")}>Start on WhatsApp</a>
   </div></section>
   <section className="section rfq-section"><div className="shell rfq-layout">
    <div className="rfq-service-intro"><p className="eyebrow">FROM ENQUIRY TO EXECUTION</p>
     <h2>Steel projects<br/><span>start here.</span></h2>
     <p>Our commercial team reviews technical requirements and coordinates estimation with engineering, manufacturing, procurement and project delivery.</p>
     <div className="rfq-help-steps"><div><b>01</b><span>Choose a service</span></div><div><b>02</b><span>Describe scope and attach files</span></div><div><b>03</b><span>{enabled?"Get your RFQ reference":"Send your enquiry via WhatsApp"}</span></div></div>
     <p className="rfq-assurance">A formal estimation or quotation follows our technical and commercial review; the submission reference is not itself a price or contractual offer.</p>
     <Link className="text-link" href="/capabilities/machinery">Explore manufacturing services</Link>
    </div>
    <QuotationRequestForm initialService={typeof query.service==="string"?query.service:""} whatsappBase={contact.whatsapp} enabled={enabled} uploadsEnabled={enabled&&rfqFileScanningAvailable()}/>
   </div></section>
 </main>;
}
