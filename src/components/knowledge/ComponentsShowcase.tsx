import Image from 'next/image';
import { motion } from 'framer-motion';

interface ComponentImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const componentImages: ComponentImage[] = [
  {
    src: '/images/structures/purlins.jpg',
    alt: 'Steel Purlins',
    title: 'Purlins',
    description: 'Horizontal structural members supporting roof panels'
  },
  {
    src: '/images/structures/girts.jpg',
    alt: 'Steel Girts',
    title: 'Girts',
    description: 'Wall supports for exterior cladding'
  },
  {
    src: '/images/structures/eave-struts.jpg',
    alt: 'Eave Struts',
    title: 'Eave Struts',
    description: 'Specialized members at roof-wall intersection'
  },
  {
    src: '/images/structures/rafters.jpg',
    alt: 'Steel Rafters',
    title: 'Rafters',
    description: 'Main roof support members'
  },
  {
    src: '/images/structures/joists.jpg',
    alt: 'Steel Joists',
    title: 'Joists',
    description: 'Secondary structural members for floor and roof support'
  }
];

const ComponentsShowcase = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Building Components
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Essential elements of steel building construction
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {componentImages.map((image, index) => (
            <motion.div
              key={image.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComponentsShowcase;
