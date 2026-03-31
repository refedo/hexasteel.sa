import Head from 'next/head';
import Hero from '../components/common/Hero';
import CertificationsGrid from '../components/certifications/CertificationsGrid';
import SEO from '../components/common/SEO';

export default function Certifications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Our Certifications"
        description="Hexa Steel® holds industry-leading certifications including ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, CSWIP, AWS CWI, ASCI, and LEED — demonstrating our unwavering commitment to quality, safety, and sustainability."
        canonical="/certifications"
        keywords="ISO 9001, ISO 14001, ISO 45001, CSWIP, AWS CWI, LEED, steel certifications, quality management, Saudi Arabia"
      />

      <Hero
        title="Our Certifications"
        subtitle="Industry-leading certifications demonstrating our commitment to quality, safety, and sustainable practices"
        background="bg-gradient-to-r from-gray-800 to-gray-900"
      />

      <CertificationsGrid />
    </div>
  );
}
