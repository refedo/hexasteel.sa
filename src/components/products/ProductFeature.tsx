import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductFeatureProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function ProductFeature({
  title,
  description,
  features,
  image,
  imageAlt,
  reverse = false,
}: ProductFeatureProps) {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-8">{description}</p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <svg
                    className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0"
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
                  <span className="ml-3 text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
