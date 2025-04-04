import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface SubCategory {
  name: string;
  href: string;
  description: string;
  image?: string;
}

interface CategoryOverviewProps {
  title: string;
  description: string;
  overview: string;
  features?: string[];
  subCategories: SubCategory[];
  mainImage?: string;
}

export default function CategoryOverview({
  title,
  description,
  overview,
  features = [],
  subCategories,
  mainImage = '/images/placeholder.jpg'
}: CategoryOverviewProps) {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {description}
          </p>
        </div>

        {/* Overview Section */}
        <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="relative">
            <div className="prose prose-indigo mx-auto text-gray-500 lg:max-w-none">
              <p className="text-lg">{overview}</p>
              {features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
                  <ul className="mt-4 space-y-4">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-primary-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700">{feature}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 relative lg:mt-0">
            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none">
              <div className="relative rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={mainImage}
                  alt={title}
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sub-categories Grid */}
        <div className="mt-24">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            Explore {title}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="relative block group"
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
                    <Image
                      src={category.image || '/images/placeholder.jpg'}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
