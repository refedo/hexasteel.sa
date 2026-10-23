import type { Metadata } from "next";
import Link from "next/link";
import { SupplierRegistrationForm } from "@/components/SupplierRegistrationForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  alternates:{canonical:"https://hexasteel.sa/become-a-supplier"},
  title: "Become a Supplier | HEXA Steel®",
  description: "Register your manufacturing, steel products, materials or industrial services with HEXA Steel®. Learn the qualification process and submit a secure supplier application.",
};

const steps = [
  { number: "01", title: "Register your company", detail: "Provide your legal identity, license and primary contact." },
  { number: "02", title: "Define your offering", detail: "List products by category and manufacturing origin, or describe your services." },
  { number: "03", title: "Attach qualifications", detail: "Provide relevant PDF registration, catalogue and certification documents." },
  { number: "04", title: "Follow the review", detail: "Use your reference and verified email to track review decisions." },
] as const;

export default function BecomeASupplierPage() {
  const enabled = process.env.SUPPLIER_REGISTRATION_ENABLED === "true";
  const siteKey = process.env.SUPPLIER_TURNSTILE_SITE_KEY || process.env.CONTACT_TURNSTILE_SITE_KEY || "";

  return <main className="supplier-page">
    <section className="inner-hero supplier-hero" aria-labelledby="supplier-title">
      <div className="shell supplier-hero-grid">
        <div>
          <p className="eyebrow on-dark">SUPPLY CHAIN / SUPPLIER REGISTRATION</p>
          <h1 id="supplier-title">Become a HEXA Steel® supplier.</h1>
          <p>Help us source dependable steel products, industrial materials and specialist services. Introduce your business and its capabilities to our Supply Chain team through a controlled qualification process.</p>
          <div className="supplier-hero-actions">
            <a href="#supplier-application" className="button supplier-hero-button">{enabled && siteKey ? "Start supplier registration" : "View registration requirements"}</a>
            <Link href="/suppliers/track" className="supplier-hero-link">Track an existing application</Link>
          </div>
        </div>
        <aside className="supplier-hero-panel" aria-label="Supplier qualification principles">
          <p className="supplier-panel-kicker">HEXA STEEL® / SUPPLY CHAIN</p>
          <h2>Qualified partnerships. Reliable delivery.</h2>
          <p>We review capability, product or service scope, traceability and supporting documentation against project and procurement needs.</p>
          <span>Engineering-led evaluation · Controlled records · Documented review</span>
        </aside>
      </div>
    </section>

    <section className="section supplier-content" id="supplier-application" aria-labelledby="supplier-register-heading">
      <div className="shell supplier-intro">
        <aside className="supplier-guidance">
          <p className="eyebrow">HOW TO APPLY</p>
          <h2 id="supplier-register-heading">A clear route to supplier qualification.</h2>
          <p>Applications are welcomed from manufacturers, distributors, authorized agents, service providers and specialist subcontractors. HEXA Steel® reviews submissions based on business requirements; registration does not guarantee approval, purchase orders or commercial engagement.</p>
          <ol className="supplier-steps">
            {steps.map(step => <li key={step.number}>
              <span className="supplier-step-number">{step.number}</span>
              <span><strong>{step.title}</strong><small>{step.detail}</small></span>
            </li>)}
          </ol>
          <div className="supplier-document-note">
            <h3>Prepare your documents</h3>
            <p>Have your commercial registration or business license, company profile or catalogue, and any relevant qualifications available as PDF files.</p>
            <p>Attach 1–3 PDF documents, up to 2 MB each. Please do not include personal identification documents or bank statements.</p>
          </div>
        </aside>
        <div className="supplier-application-column">
          {enabled && siteKey
            ? <SupplierRegistrationForm siteKey={siteKey} />
            : <div className="form-shell supplier-unavailable" role="status">
                <p className="eyebrow">REGISTRATION OPENING SOON</p>
                <h2>Supplier registration is being prepared.</h2>
                <p>Our secure submission and qualification system is undergoing final integration checks. Please contact our team while the online application service is being activated.</p>
                <Link className="button dark" href="/contact">Contact HEXA Steel®</Link>
              </div>}
        </div>
      </div>
    </section>

    <section className="section supplier-qualifications" aria-labelledby="supplier-standards-heading">
      <div className="shell">
        <div className="supplier-qualifications-intro">
          <p className="eyebrow">SUPPLIER QUALIFICATION</p>
          <h2 id="supplier-standards-heading">What we evaluate.</h2>
          <p>Review criteria depend on the type of supplier and the proposed scope. Supporting evidence should accurately represent your capabilities.</p>
        </div>
        <div className="supplier-qualification-grid">
          <article><span>01</span><h3>Company credentials</h3><p>Business registration, relevant licenses and a reliable point of contact.</p></article>
          <article><span>02</span><h3>Technical capability</h3><p>Products, specifications, material origins or specialist service coverage.</p></article>
          <article><span>03</span><h3>Quality and compliance</h3><p>Relevant certificates, processes and traceability where applicable.</p></article>
          <article><span>04</span><h3>Delivery readiness</h3><p>Supply capacity, logistics reach and ability to meet project requirements.</p></article>
        </div>
      </div>
    </section>
  </main>;
}
