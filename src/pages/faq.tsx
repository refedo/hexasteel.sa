import Head from 'next/head';
import Hero from '../components/common/Hero';
import FAQ from '../components/FAQ';

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ - Hexasteel</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about our steel structure solutions, manufacturing process, and services."
        />
      </Head>

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
