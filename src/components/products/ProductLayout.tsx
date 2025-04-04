import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ProductLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  breadcrumbs: Array<{
    name: string;
    href: string;
  }>;
}

export default function ProductLayout({ title, description, children, breadcrumbs }: ProductLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link
                href="/products"
                className="text-primary-600 hover:text-primary-700 flex items-center"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Products
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={item.name} className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link
                  href={item.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            {description}
          </motion.p>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
