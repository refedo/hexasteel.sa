import Head from 'next/head';
import Hero from '../components/common/Hero';
import FAQ from '../components/FAQ';
import SEO from '../components/common/SEO';

export default function FAQPage() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Get answers to common questions about Hexa Steel®'s steel structure solutions, project timelines, installation services, quality standards, warranties, and maintenance programs."
        canonical="/faq"
        keywords="FAQ, steel structure questions, PEB FAQ, Hexa Steel questions, steel construction FAQ"
      />

      <main>
        <Hero
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our steel structure solutions, manufacturing process, and services."
        />
        <FAQ />
      </main>
    </>
  );
}
