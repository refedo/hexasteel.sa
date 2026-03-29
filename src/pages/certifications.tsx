import Head from 'next/head';
import Hero from '../components/common/Hero';
import CertificationsGrid from '../components/certifications/CertificationsGrid';

export default function Certifications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Our Certifications - Hexa Steel®</title>
        <meta 
          name="description" 
          content="Discover Hexa Steel's comprehensive range of industry certifications, including ISO 9001, ISO 14001, ISO 45001, CSWIP, AWS CWI, ASCI, and LEED certifications." 
        />
      </Head>

      <Hero
        title="Our Certifications"
        subtitle="Industry-leading certifications demonstrating our commitment to quality, safety, and sustainable practices"
        background="bg-gradient-to-r from-gray-800 to-gray-900"
      />

      <CertificationsGrid />
    </div>
  );
}
