import {getContactFormSettings} from "@/lib/contactFormSettings";
import Link from "next/link";
export const metadata={title:"Enquiry Submitted | HEXA Steel®",robots:{index:false,follow:false}};
export default async function ContactReceived(){
 const settings=await getContactFormSettings();
 return <main className="section"><div className="shell">
  <p className="eyebrow">CONTACT / HEXA STEEL®</p>
  <h1>{settings.successTitle}</h1>
  <p>{settings.successMessage}</p>
  <Link className="button dark" href="/">Return to HEXA Steel®</Link>
 </div></main>;
}
