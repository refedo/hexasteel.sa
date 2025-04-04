import Image from 'next/image';
import { motion } from 'framer-motion';

interface StructureImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const structureImages: StructureImage[] = [
  {
    src: '/images/structures/single-span.jpg',
    alt: 'Single Span Building',
    title: 'Single Span Building',
    description: 'Efficient design for maximum clear interior space'
  },
  {
    src: '/images/structures/multi-span.jpg',
    alt: 'Multi-span Building',
    title: 'Multi-span Building',
    description: 'Ideal for large industrial and commercial applications'
  },
  {
    src: '/images/structures/multi-gable.jpg',
    alt: 'Multi-gable Building',
    title: 'Multi-gable Building',
    description: 'Versatile solution for complex space requirements'
  },
  {
    src: '/images/structures/lean-to.jpg',
    alt: 'Lean-to Structure',
    title: 'Lean-to Structure',
    description: 'Perfect for additions and expansions'
  },
  {
    src: '/images/structures/cantilever.jpg',
    alt: 'Cantilever Structure',
    title: 'Cantilever Structure',
    description: 'Advanced design for special architectural requirements'
  }
];

const StructureShowcase = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Steel Structure Types
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our range of steel building solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {structureImages.map((image, index) => (
            <motion.div
              key={image.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600">
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

export default StructureShowcase;
