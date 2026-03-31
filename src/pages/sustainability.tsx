import Head from 'next/head';
import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import SustainabilityInitiatives from '../components/sustainability/SustainabilityInitiatives';
import SEO from '../components/common/SEO';

const stats = [
  { label: 'Carbon Reduction', value: '170+ tons', description: 'Annual CO2 emissions reduced' },
  { label: 'Renewable Energy', value: '30%', description: 'Power from renewable sources' },
  { label: 'Waste Reduction', value: '85%', description: 'Waste diverted from landfills' },
  { label: 'Water Saved', value: '45M', description: 'Gallons saved annually' },
];

export default function Sustainability() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Sustainability"
        description="Hexa Steel® leads Saudi Arabia's steel industry toward a greener future with solar power, zero-waste production, electrified fleet, and LEED-certified sustainable construction practices."
        canonical="/sustainability"
        keywords="Hexa Steel sustainability, green steel manufacturing, Saudi Arabia sustainable construction, ISO 14001, LEED certified, eco-friendly steel"
      />

      <Hero
        title="Sustainability"
        subtitle="Building a greener future through innovative and sustainable practices"
        background="bg-gradient-to-r from-green-800 to-green-900"
      />

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900"
            >
              Our Commitment to Sustainability
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-gray-600"
            >
              At Hexa Steel®, sustainability isn't just a goal—it's a core value that drives our operations, 
              innovations, and future vision. We're committed to reducing our environmental impact while 
              maintaining the highest standards of quality and efficiency in steel construction.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <SustainabilityInitiatives />

      {/* Call to Action */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Join Us in Building a Sustainable Future</h2>
            <p className="text-lg text-primary-100 mb-8">
              Partner with Hexa Steel® to make your next construction project environmentally responsible 
              without compromising on quality or efficiency.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
