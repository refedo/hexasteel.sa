import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { products } from '../../data/products';

const categories = [
  { id: 'peb', name: 'Pre-Engineered Buildings' },
  { id: 'steel-structures', name: 'Steel Structures' },
  { id: 'structural', name: 'Structural Components' },
  { id: 'roofing', name: 'Roofing Systems' },
  { id: 'cladding', name: 'Cladding Solutions' },
  { id: 'accessories', name: 'Accessories' }
];

export default function ProductList() {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex flex-wrap justify-center space-x-2 mb-12">
          {categories.map((category) => (
            <Tab
              key={category.id}
              className={({ selected }) =>
                `px-6 py-3 text-sm font-medium rounded-lg focus:outline-none transition-colors duration-200 ${
                  selected
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {categories.map((category) => (
            <Tab.Panel key={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products
                  .filter(product => product.category === category.id)
                  .map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {product.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                          <div className="space-y-2">
                            {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Applications</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.applications.map((application, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                              >
                                {application}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
