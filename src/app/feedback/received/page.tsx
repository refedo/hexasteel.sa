import Link from "next/link";
export const metadata={title:"Feedback Received",robots:{index:false,follow:false}};
export default function Received(){return <main className="section"><div className="shell"><p className="eyebrow">CUSTOMER FEEDBACK</p><h1>Thank you for your feedback.</h1><p>Your submission was received by the email delivery service. Our team will review it.</p><Link className="button dark" href="/">Return to HEXA Steel®</Link></div></main>;}
