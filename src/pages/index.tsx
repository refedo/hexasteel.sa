import type { NextPage } from 'next';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import EliteClients from '../components/clients/EliteClients';

export default function Home() {
  return (
    <main>
      <Hero />
      <Timeline />
      <EliteClients />
    </main>
  );
}
