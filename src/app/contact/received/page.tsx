import Link from "next/link";
export const metadata={title:"Enquiry Submitted | HEXA Steel®",robots:{index:false,follow:false}};
export default function ContactReceived(){
 return <main className="section"><div className="shell">
  <p className="eyebrow">CONTACT / HEXA STEEL®</p>
  <h1>Thank you for contacting HEXA Steel®.</h1>
  <p>Your enquiry has been accepted by our email service for delivery to our commercial team. We will review your message and respond using the email address you supplied.</p>
  <Link className="button dark" href="/">Return to HEXA Steel®</Link>
 </div></main>;
}
