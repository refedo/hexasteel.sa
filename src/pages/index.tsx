import type { NextPage } from 'next';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import EliteClients from '../components/clients/EliteClients';
import SEO, { organizationJsonLd, localBusinessJsonLd } from '../components/common/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Hexa Steel® - Leading Steel Structure Manufacturer in Saudi Arabia"
        description="Hexa Steel® is Saudi Arabia's premier manufacturer of pre-engineered buildings, industrial steel structures, and comprehensive steel solutions. Quality, innovation, and excellence since 1998."
        canonical="/"
        keywords="steel structures, pre-engineered buildings, PEB, Saudi Arabia, steel manufacturer, industrial buildings, Hexa Steel"
        ogType="website"
        jsonLd={[organizationJsonLd(), localBusinessJsonLd()]}
      />
      <main>
        <Hero />
        <Timeline />
        <EliteClients />
      </main>
    </>
  );
}
