import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// This would normally come from your CMS or API
const newsArticle = {
  title: 'Hexasteel Showcases Innovation at Saudi Build 2024',
  content: `
    <p>Hexasteel, a leading manufacturer of steel building solutions, showcased its latest innovations at Saudi Build 2024, the Kingdom's largest construction exhibition. The event, which took place at the Riyadh International Convention & Exhibition Center, provided an excellent platform for industry leaders to demonstrate their latest products and technologies.</p>
    
    <p>Our booth featured interactive displays of our advanced steel building systems, including:</p>
    <ul>
      <li>Pre-engineered Building Systems</li>
      <li>Sustainable Construction Solutions</li>
      <li>Smart Building Technologies</li>
      <li>Energy-efficient Building Components</li>
    </ul>
    
    <p>The exhibition allowed us to connect with industry professionals, showcase our commitment to innovation, and demonstrate how our solutions are contributing to Saudi Arabia's construction sector development.</p>
  `,
  date: '2024-03-15',
  category: 'Exhibition',
  imageUrl: 'https://placehold.co/1200x600/e4e4e7/27272a?text=Exhibition',
  author: 'Hexasteel Media Team'
};

export default function NewsArticle() {
  const router = useRouter();
  const { slug } = router.query;

  // In production, fetch the article based on the slug
  // For now, we'll use our sample article

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{newsArticle.title} - Hexasteel News</title>
        <meta
          name="description"
          content={newsArticle.content.substring(0, 160)}
        />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/news"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          ← Back to News
        </Link>

        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={newsArticle.imageUrl}
            alt={newsArticle.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {newsArticle.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <time dateTime={newsArticle.date}>
              {new Date(newsArticle.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{newsArticle.category}</span>
            <span>•</span>
            <span>{newsArticle.author}</span>
          </div>

          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: newsArticle.content }}
          />
        </div>
      </article>
    </>
  );
}

// In production, implement getStaticProps and getStaticPaths to pre-render news articles
