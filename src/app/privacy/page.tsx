import Link from "next/link";
import {PageHero} from "@/components/PageBlocks";
import {publicPageMetadata} from "@/lib/seo";

const description = "How HEXA Steel® handles personal data from website visits, enquiries and job applications.";

export const metadata = publicPageMetadata("/privacy", "Privacy Policy", description);

export default function PrivacyPage() {
  return (
    <main>
      <PageHero eyebrow="HEXA STEEL® / PRIVACY" title="Privacy Policy" intro={description}/>
      <div className="section">
        <article className="shell article-body">
          <section>
            <h2>Who this policy covers</h2>
            <p>HEXA Steel® in Riyadh, Saudi Arabia, is responsible for the personal data described here. This policy covers visits to hexasteel.sa and the information you provide through the website or its linked job application form.</p>
          </section>
          <section>
            <h2>Enquiries, quotations and supplier submissions</h2>
            <p>When you contact us, request a quotation, send feedback or submit supplier information, we may receive your name, contact details, company information, message and any documents you choose to share. We use this information to route and respond to requests, evaluate commercial opportunities or supplier qualifications, and follow up where needed.</p>
            <p>Our supplier registration page directs applicants to Google Forms. Google hosts the form and processes the company and business contact information submitted through it. HEXA Steel® uses that information to assess supplier qualifications and follow up on procurement needs.</p>
            <p>Where a form marks a field as required, we need that information to handle the request. Leaving it blank can prevent submission or limit our ability to respond.</p>
          </section>
          <section>
            <h2>Job applications</h2>
            <p>Our Careers page directs applicants to Google Forms. Google hosts the form and processes information submitted through it. HEXA Steel® uses the application details you provide to assess your suitability for a role and contact you about recruitment. These details can include your contact information, qualifications, work history and any CV or supporting material you submit.</p>
          </section>
          <section>
            <h2>Website analytics and security</h2>
            <p>We use Google Tag Manager and Google Analytics to understand how visitors reach and use the site. Analytics can use cookies and collect information such as pages viewed, referring sites, browser and device details, and approximate location. Technical information may also be processed to operate the site, detect abuse and protect forms from spam. You can manage cookies through your browser settings.</p>
          </section>
          <section>
            <h2>Access and service providers</h2>
            <p>Staff who handle your enquiry, submission or application may need access to the information you provide. Service providers help us host the site, deliver messages, secure forms, measure website usage and receive job applications. We may also disclose information when required by law.</p>
            <p>Some providers may process or access information outside Saudi Arabia. Transfers are subject to the applicable requirements of Saudi Arabia’s Personal Data Protection Law.</p>
          </section>
          <section>
            <h2>How long we keep information</h2>
            <p>Retention depends on the type of record, the reason it was collected, and any legal or contractual obligations that apply. These factors can differ for enquiries, supplier records and job applications.</p>
          </section>
          <section>
            <h2>Your privacy rights</h2>
            <p>Under Saudi Arabia’s Personal Data Protection Law, you can ask to be informed about how we process your data, request access and a copy, ask us to correct or update it, and request its destruction where applicable. If processing relies on your consent, you can withdraw that consent. You can contact us through our <Link className="underline" href="/contact">Contact page</Link> and identify your message as a privacy request. You may also lodge a complaint with the Saudi Data &amp; AI Authority.</p>
          </section>
        </article>
      </div>
    </main>
  );
}
