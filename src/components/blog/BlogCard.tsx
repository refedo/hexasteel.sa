import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  coverImage,
  author,
  publishDate,
  readTime,
  category,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/blog/${slug}`}>
        <div className="relative h-48 sm:h-64">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-500 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{author.name}</p>
                <p className="text-xs text-gray-500">{author.role}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
