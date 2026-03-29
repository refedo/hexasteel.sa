import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  title?: string;
  description?: string;
  showFeatures?: boolean;
}

export default function Hero({ 
  title = "Building Tomorrow's Steel Structures Today",
  description = "Leading the way in innovative steel construction solutions with unmatched quality and precision",
  showFeatures = true 
}: HeroProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-gray-900/90 to-gray-800/90" />
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 sm:py-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title.includes("Steel") ? (
              <>
                Building Tomorrow's
                <span className="text-primary-500"> Steel Structures</span> Today
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        {showFeatures && (
          <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary-500/10">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Expert Engineering',
    description: 'State-of-the-art design and engineering solutions for complex steel structures.',
    icon: function EngineeringIcon(props: any) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      );
    },
  },
  {
    title: 'Quality Manufacturing',
    description: 'Premium steel products manufactured with precision and attention to detail.',
    icon: function QualityIcon(props: any) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    },
  },
  {
    title: 'On-Time Delivery',
    description: 'Efficient project management ensuring timely delivery of every project.',
    icon: function DeliveryIcon(props: any) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    },
  },
];
