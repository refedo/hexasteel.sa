import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

// Sample blog post data - Replace with actual data from your API/database
const blogPosts = {
  'future-of-steel-construction': {
    title: 'The Future of Steel Construction: Trends and Innovations',
    content: `
      <p>The steel construction industry is undergoing a significant transformation, driven by technological advancements and changing market demands. In this article, we'll explore the latest trends and innovations that are shaping the future of steel construction.</p>

      <h2>1. Digital Transformation</h2>
      <p>Building Information Modeling (BIM) and digital twin technology are revolutionizing how we design, construct, and maintain steel structures. These tools enable better collaboration, reduced errors, and improved project outcomes.</p>

      <h2>2. Sustainable Practices</h2>
      <p>Sustainability is no longer optional in construction. The industry is moving towards more eco-friendly practices, including:</p>
      <ul>
        <li>Recycled steel usage</li>
        <li>Energy-efficient manufacturing</li>
        <li>Waste reduction techniques</li>
      </ul>

      <h2>3. Advanced Materials</h2>
      <p>New steel alloys and composites are being developed to offer improved strength, durability, and performance while reducing weight and environmental impact.</p>
    `,
    coverImage: '/images/blog/steel-future.jpg',
    author: {
      name: 'Dr. Ahmed Al-Rashid',
      role: 'Chief Engineer',
      image: '/images/team/ahmed.jpg',
    },
    publishDate: 'Jan 30, 2025',
    readTime: '5 min read',
    category: 'Industry Trends',
  },
  'sustainable-steel-construction': {
    title: 'Sustainable Steel: Building for a Greener Tomorrow',
    content: `
      <p>Sustainability in steel construction is becoming increasingly important as the industry focuses on reducing its environmental impact while maintaining structural integrity and efficiency.</p>

      <h2>Key Sustainability Practices</h2>
      <p>Modern steel construction incorporates various sustainable practices:</p>
      <ul>
        <li>Use of recycled materials</li>
        <li>Energy-efficient manufacturing processes</li>
        <li>Optimized design for minimal waste</li>
      </ul>

      <h2>Benefits of Sustainable Steel</h2>
      <p>Implementing sustainable practices in steel construction offers numerous advantages:</p>
      <ul>
        <li>Reduced environmental impact</li>
        <li>Lower operating costs</li>
        <li>Enhanced building performance</li>
        <li>Improved corporate responsibility</li>
      </ul>
    `,
    coverImage: '/images/blog/sustainable-steel.jpg',
    author: {
      name: 'Sarah Johnson',
      role: 'Sustainability Expert',
      image: '/images/team/sarah.jpg',
    },
    publishDate: 'Jan 28, 2025',
    readTime: '4 min read',
    category: 'Sustainability',
  },
};

interface BlogPostProps {
  post: {
    title: string;
    content: string;
    coverImage: string;
    author: {
      name: string;
      role: string;
      image: string;
    };
    publishDate: string;
    readTime: string;
    category: string;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <>
      <Head>
        <title>{post.title} - Hexasteel Blog</title>
        <meta
          name="description"
          content={post.content.substring(0, 160)}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center text-white mb-6 hover:text-primary-300 transition-colors duration-200"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Back to Blog
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm opacity-80">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      <span>{post.publishDate}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(blogPosts).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
