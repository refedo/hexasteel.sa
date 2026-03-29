import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function ArticleCard({
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  slug,
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/knowledge/${slug}`}>
        <div className="relative h-48 sm:h-64">
          <Image
            src={image}
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
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
