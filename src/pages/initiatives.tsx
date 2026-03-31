import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import { initiatives } from '../data/initiatives';
import {
  ChartBarIcon,
  AcademicCapIcon,
  LightBulbIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

const categories = [
  { id: 'all', name: 'All Initiatives', icon: LightBulbIcon },
  { id: 'innovation', name: 'Innovation & Excellence', icon: ChartBarIcon },
  { id: 'sustainability', name: 'Sustainability', icon: BuildingLibraryIcon },
  { id: 'education', name: 'Education', icon: AcademicCapIcon },
  { id: 'partnership', name: 'Partnerships', icon: BuildingLibraryIcon },
];

export default function Initiatives() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredInitiatives = initiatives.filter(
    initiative => selectedCategory === 'all' || initiative.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Our Initiatives"
        description="Hexa Steel® drives innovation in Saudi Arabia through lean manufacturing, 5S excellence, sustainable production, electrified logistics, the Hexa Steel Academy, and the PIF Accelerated Manufacturing Program."
        canonical="/initiatives"
        keywords="Hexa Steel initiatives, lean manufacturing, 5S, sustainability, PIF AMP, Hexa Academy, Saudi Arabia steel"
      />

      <Hero
        title="Our Initiatives"
        subtitle="Driving innovation and sustainability in the steel industry through strategic initiatives and partnerships"
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <Tab.Group onChange={(index) => setSelectedCategory(categories[index].id)}>
            <Tab.List className="flex flex-wrap justify-center space-x-4 mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Tab
                    key={category.id}
                    className={({ selected }) =>
                      `inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200 ${
                        selected
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {category.name}
                  </Tab>
                );
              })}
            </Tab.List>
          </Tab.Group>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {initiative.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {initiative.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary-500 mr-2">•</span>
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {initiative.impact.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-lg p-4 text-center"
                      >
                        <div className="text-xl font-bold text-primary-600">
                          {item.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.metric}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Partners (if any) */}
                  {initiative.partners && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Partners
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {initiative.partners.map((partner, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-50 text-primary-700"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
