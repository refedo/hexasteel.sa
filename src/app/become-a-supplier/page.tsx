import type { Metadata } from "next";

const supplierFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdAqh24b5rSYPo3Z8xoFNq5pzWRJheEEOIxh31EqFjdK-Z8mA/viewform?hl=en";
export const metadata: Metadata = {
  alternates:{canonical:"https://hexasteel.sa/become-a-supplier"},
  title: "Become a Supplier | HEXA Steel®",
  description: "Register your manufacturing, steel products, materials or industrial services with HEXA Steel®. Learn how to register and submit your supplier application.",
};

const steps = [
  { number: "01", title: "Register your company", detail: "Provide your company registration details and primary business contact." },
  { number: "02", title: "Define your offering", detail: "Select your categories and describe your products or services, Saudi coverage and typical lead time." },
  { number: "03", title: "List relevant qualifications", detail: "Include relevant certifications or comparable work, if available." },
  { number: "04", title: "Submit for review", detail: "Our Supply Chain team may contact you when your offering matches a procurement need." },
] as const;

export default function BecomeASupplierPage() {
  return <main className="supplier-page">
    <section className="inner-hero supplier-hero" aria-labelledby="supplier-title">
      <div className="shell supplier-hero-grid">
        <div>
          <p className="eyebrow on-dark">SUPPLY CHAIN / SUPPLIER REGISTRATION</p>
          <h1 id="supplier-title">Become a HEXA Steel® supplier.</h1>
          <p>Help us source dependable steel products, industrial materials and specialist services. Introduce your business and its capabilities to our Supply Chain team through a controlled qualification process.</p>
          <div className="supplier-hero-actions">
            <a href={supplierFormUrl} className="button supplier-hero-button">Start supplier registration</a>
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
            <h3>Prepare your company details</h3>
            <p>Have your company registration number and business contact details ready. We may request supporting documents during qualification.</p>
            <p>Please omit personal identification, bank details and confidential documents.</p>
          </div>
        </aside>
        <div className="supplier-application-column">
          <div className="form-shell supplier-unavailable">
            <p className="eyebrow">SUPPLIER REGISTRATION</p>
            <h2>Register your business.</h2>
            <p>Complete one Google Forms submission per registered company.</p>
            <a className="button dark" href={supplierFormUrl}>Open supplier registration form</a>
          </div>
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
