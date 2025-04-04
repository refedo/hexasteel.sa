import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { designTools } from '../../data/designCapabilities';

export default function DesignCapabilities() {
  const categories = [
    { id: 'engineering', name: 'Engineering Software' },
    { id: 'inhouse', name: 'In-House Systems' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Design & Management Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of engineering software and custom-built management systems 
            ensures precision, efficiency, and transparency throughout your project.
          </p>
        </div>

        <Tab.Group>
          <Tab.List className="flex justify-center space-x-4 mb-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {designTools
                    .filter(tool => tool.category === category.id)
                    .map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <div className="relative h-48">
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {tool.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {tool.description}
                          </p>
                          <div className="space-y-2">
                            {tool.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Integration Highlight */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Seamless Integration for Maximum Efficiency
            </h3>
            <p className="text-lg opacity-90">
              Our engineering software and in-house systems work together seamlessly, 
              creating a unified workflow from design to fabrication. This integration 
              ensures accuracy, reduces errors, and provides real-time visibility into 
              your project's progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
