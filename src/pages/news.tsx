import Head from 'next/head';
import Hero from '../components/common/Hero';
import NewsGrid from '../components/news/NewsGrid';
import SEO from '../components/common/SEO';

export default function NewsPage() {
  return (
    <>
      <SEO
        title="News & Updates"
        description="Stay updated with Hexa Steel®'s latest news, industry exhibitions, company achievements, new project completions, and strategic initiatives in Saudi Arabia's steel construction sector."
        canonical="/news"
        keywords="Hexa Steel news, steel industry news, Saudi Arabia construction news, steel exhibitions, company updates"
      />

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
