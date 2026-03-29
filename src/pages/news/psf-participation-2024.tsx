import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function PSFParticipation() {
  const article = {
    title: 'Hexa Steel® Participates in Private Sector Forum (PSF) 2024',
    date: '2024-02-13',
    category: 'Event',
    imageUrl: 'https://placehold.co/1200x600/e4e4e7/27272a?text=PSF+2024',
    author: 'Hexa Steel® Media Team',
    content: `
      <p class="lead">Hexa Steel® proudly participated in the Private Sector Forum (PSF) 2024, a prestigious two-day event held on February 12-13 that brought together key players in Saudi Arabia's private sector to discuss and showcase their contributions to Vision 2030.</p>

      <h2>Event Highlights</h2>
      <p>The forum served as a vital platform for dialogue between the private sector and government entities, focusing on enhancing the role of private businesses in achieving the Kingdom's economic diversification goals. Hexa Steel®'s participation highlighted our commitment to supporting Saudi Arabia's industrial development and economic transformation.</p>

      <h2>Our Contribution</h2>
      <p>During the forum, Hexa Steel® showcased:</p>
      <ul>
        <li>Our advanced steel manufacturing capabilities and their role in supporting local content initiatives</li>
        <li>Innovative building solutions that align with Saudi Arabia's construction sector development</li>
        <li>Sustainable manufacturing practices and environmental commitments</li>
        <li>Employment and training programs supporting Saudi talent development</li>
      </ul>

      <h2>Networking and Partnerships</h2>
      <p>The event provided valuable opportunities to:</p>
      <ul>
        <li>Connect with industry leaders and decision-makers</li>
        <li>Explore potential partnerships and collaborations</li>
        <li>Share insights on industry best practices</li>
        <li>Discuss future development opportunities in the Kingdom</li>
      </ul>

      <h2>Looking Forward</h2>
      <p>Our participation in PSF 2024 reinforces Hexa Steel®'s position as a key contributor to Saudi Arabia's industrial sector. We remain committed to supporting the Kingdom's economic transformation through our innovative steel solutions and sustainable practices.</p>

      <blockquote>
        <p>"The Private Sector Forum provided an excellent platform to showcase Hexa Steel®'s commitment to Saudi Vision 2030 and our role in developing the Kingdom's industrial capabilities. We are proud to be part of this transformative journey."</p>
        <footer>- Hexa Steel® Leadership Team</footer>
      </blockquote>
    `
  };

  return (
    <>
      <Head>
        <title>{article.title} - Hexa Steel® News</title>
        <meta
          name="description"
          content="Hexa Steel® showcases its contribution to Saudi Vision 2030 and industrial development at the prestigious Private Sector Forum in Riyadh."
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
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.author}</span>
          </div>

          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </>
  );
}
