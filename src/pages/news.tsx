import Head from 'next/head';
import Hero from '../components/common/Hero';
import NewsGrid from '../components/news/NewsGrid';

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>News - Hexa Steel®</title>
        <meta
          name="description"
          content="Stay updated with Hexa Steel®'s latest news, exhibition participations, and company initiatives."
        />
      </Head>

      <div>
        <Hero
          title="Company News"
          subtitle="Stay updated with our latest exhibitions, initiatives, and achievements"
        />

        <div className="container mx-auto px-4 py-16">
          <NewsGrid />
        </div>
      </div>
    </>
  );
}
