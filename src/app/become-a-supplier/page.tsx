
import type { Metadata } from "next";
import Link from "next/link";
import { SupplierRegistrationForm } from "@/components/SupplierRegistrationForm";

export const metadata: Metadata = {
  title: "Become a Supplier | HEXA Steel®",
  description: "Apply to supply steel products, industrial materials, engineering and other services to HEXA Steel®. Secure registration and qualification.",
};
export default function BecomeASupplierPage() {
  const enabled = process.env.SUPPLIER_REGISTRATION_ENABLED === "true";
  const siteKey = process.env.NEXT_PUBLIC_SUPPLIER_TURNSTILE_SITE_KEY || "";
  return <main>
    <section className="inner-hero"><div className="shell">
      <p className="eyebrow on-dark">SUPPLY CHAIN / SUPPLIER RELATIONSHIPS</p>
      <h1>Become a HEXA Steel® supplier.</h1>
      <p>Register your products or professional services for evaluation by our Supply Chain team. Applications are reviewed against the relevant technical, quality and commercial requirements.</p>
    </div></section>
    <section className="section"><div className="shell supplier-intro">
      <div><p className="eyebrow">SUPPLIER REGISTRATION</p><h2>Build a qualified supply relationship.</h2>
        <p>We welcome manufacturers, distributors, engineering specialists and industrial service providers. Provide your company information, proposed scope and supporting documents. Submission does not guarantee qualification or purchase orders.</p>
        <div className="supplier-steps"><span>01 · Register your company</span><span>02 · Identify products or services</span><span>03 · Submit qualifications</span><span>04 · Track review status</span></div>
        <p><Link href="/suppliers/track">Already applied? Track your application</Link></p>
      </div>
      {enabled && siteKey ? <SupplierRegistrationForm siteKey={siteKey} /> :
        <div className="form-shell"><p className="eyebrow">REGISTRATION OPENING SOON</p><h2>Supplier registration</h2><p>The application portal is undergoing secure integration testing. Please contact our Supply Chain team through the <Link href="/contact">contact page</Link> in the meantime.</p></div>}
    </div></section>
  </main>;
}
