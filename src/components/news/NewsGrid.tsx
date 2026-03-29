import Image from 'next/image';
import Link from 'next/link';

// Sample news data - replace with actual data from your CMS or API
const newsItems = [
  {
    id: 1,
    title: 'Hexa Steel® Participates in Private Sector Forum (PSF) 2024',
    excerpt: 'Hexa Steel® showcases its contribution to Saudi Vision 2030 and industrial development at the prestigious Private Sector Forum in Riyadh, engaging with key industry leaders and decision-makers.',
    date: '2024-02-13',
    category: 'Event',
    imageUrl: 'https://placehold.co/1200x600/e4e4e7/27272a?text=PSF+2024',
    slug: 'psf-participation-2024',
    featured: true
  },
  {
    id: 2,
    title: 'Hexa Steel® Showcases Innovation at Saudi Build 2024',
    excerpt: 'Highlighting our latest steel building solutions and sustainable construction practices at the region\'s largest construction exhibition.',
    date: '2024-03-15',
    category: 'Exhibition',
    imageUrl: 'https://placehold.co/600x400/e4e4e7/27272a?text=Exhibition',
    slug: 'hexasteel-at-saudi-build-2024'
  },
  {
    id: 3,
    title: 'Sustainability Initiative: Zero Waste Manufacturing',
    excerpt: 'Our commitment to environmental responsibility through innovative waste reduction practices in steel manufacturing.',
    date: '2024-02-28',
    category: 'Initiative',
    imageUrl: 'https://placehold.co/600x400/e4e4e7/27272a?text=Initiative',
    slug: 'zero-waste-manufacturing-initiative'
  },
  {
    id: 4,
    title: 'New Factory Equipment Enhances Production Capacity',
    excerpt: 'State-of-the-art machinery installation boosts our manufacturing capabilities and efficiency.',
    date: '2024-02-10',
    category: 'Company Update',
    imageUrl: 'https://placehold.co/600x400/e4e4e7/27272a?text=Update',
    slug: 'new-factory-equipment-2024'
  }
];

export default function NewsGrid() {
  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <div className="space-y-12">
      {/* Featured News */}
      {featuredNews && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest News</h2>
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Link href={`/news/${featuredNews.slug}`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-96">
                  <Image
                    src={featuredNews.imageUrl}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full">
                      {featuredNews.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <time className="text-sm text-gray-500" dateTime={featuredNews.date}>
                    {new Date(featuredNews.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {featuredNews.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-600">
                    {featuredNews.excerpt}
                  </p>
                  <div className="mt-6">
                    <span className="text-primary-600 font-semibold hover:text-primary-700">
                      Read full story →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        </div>
      )}

      {/* Regular News Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">More News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/news/${item.slug}`}>
                <div className="relative h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-semibold text-white bg-primary-600 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <time className="text-sm text-gray-500" dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="mt-4">
                    <span className="text-primary-600 font-medium hover:text-primary-700">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
