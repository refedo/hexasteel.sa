import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/common/Hero';
import BlogCard from '../../components/blog/BlogCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SEO from '../../components/common/SEO';

// Sample blog data - Replace with actual data from your API/database
const blogPosts = [
  {
    title: 'The Future of Steel Construction: Trends and Innovations',
    excerpt: 'Explore the latest trends and technological innovations shaping the future of steel construction industry.',
    slug: 'future-of-steel-construction',
    coverImage: '/images/blog/steel-future.jpg',
    author: {
      name: 'Dr. Ahmed Al-Rashid',
      role: 'Chief Engineer',
    },
    publishDate: 'Jan 30, 2025',
    readTime: '5 min read',
    category: 'Industry Trends',
  },
  {
    title: 'Sustainable Steel: Building for a Greener Tomorrow',
    excerpt: 'Learn how sustainable steel construction practices are contributing to environmental conservation.',
    slug: 'sustainable-steel-construction',
    coverImage: '/images/blog/sustainable-steel.jpg',
    author: {
      name: 'Sarah Johnson',
      role: 'Sustainability Expert',
    },
    publishDate: 'Jan 28, 2025',
    readTime: '4 min read',
    category: 'Sustainability',
  },
  {
    title: 'Pre-Engineered Buildings: A Complete Guide',
    excerpt: 'Everything you need to know about pre-engineered buildings and their advantages.',
    slug: 'pre-engineered-buildings-guide',
    coverImage: '/images/blog/peb-guide.jpg',
    author: {
      name: 'Mohammed Al-Qahtani',
      role: 'Project Manager',
    },
    publishDate: 'Jan 25, 2025',
    readTime: '7 min read',
    category: 'Technical Guide',
  },
];

const categories = [
  'All',
  'Industry Trends',
  'Technical Guide',
  'Sustainability',
  'Case Studies',
  'Company News',
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Blog & Insights"
        description="Explore Hexa Steel®'s blog for the latest insights, industry trends, innovations, and news from the steel construction and pre-engineered building sector in Saudi Arabia."
        canonical="/blog"
        keywords="steel construction blog, PEB insights, steel industry news, Saudi Arabia construction, Hexa Steel articles"
      />
      <Head>
      </Head>

      <main>
        <Hero
          title="Our Blog"
          subtitle="Stay updated with the latest insights, trends, and news from the steel construction industry."
        />

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
