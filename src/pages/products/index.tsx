import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/products/ServicesGrid';

const categories = [
  {
    title: 'Pre-Engineered Buildings',
    description: 'Complete PEB solutions including primary members, secondary members, and sheeting systems.',
    href: '/products/peb',
    subcategories: [
      { name: 'Primary Members', href: '/products/peb/primary-members' },
      { name: 'Secondary Members', href: '/products/peb/secondary-members' },
      { name: 'Sheeting Systems', href: '/products/peb/sheeting' },
      { name: 'Additional Systems', href: '/products/peb/additional-systems' }
    ]
  },
  {
    title: 'Steel Structures',
    description: 'Comprehensive steel solutions for various building types and applications.',
    href: '/products/steel-structures',
    subcategories: [
      { name: 'Industrial Buildings', href: '/products/steel-structures/industrial' },
      { name: 'Commercial Buildings', href: '/products/steel-structures/commercial' },
      { name: 'High-Rise Buildings', href: '/products/steel-structures/high-rise' },
      { name: 'Applications Overview', href: '/products/steel-structures/applications' }
    ]
  },
  {
    title: 'Secondary Items',
    description: 'Essential secondary steel components and safety features.',
    href: '/products/secondary-items',
    subcategories: [
      { name: 'Gratings & Catwalks', href: '/products/secondary-items/gratings-catwalks' },
      { name: 'Handrails & Guards', href: '/products/secondary-items/handrails' },
      { name: 'Shear Studs & Deck', href: '/products/secondary-items/studs-deck' }
    ]
  },
  {
    title: 'Tanks & Vessels',
    description: 'Custom-designed storage solutions and pressure vessels.',
    href: '/products/tanks-vessels',
    subcategories: [
      { name: 'Storage Tanks', href: '/products/tanks-vessels/storage-tanks' },
      { name: 'Pressure Vessels', href: '/products/tanks-vessels/pressure-vessels' },
      { name: 'Custom Fabrication', href: '/products/tanks-vessels/custom-fabrication' }
    ]
  },
  {
    title: 'Piping Systems',
    description: 'Comprehensive piping solutions for various industrial applications.',
    href: '/products/piping',
    subcategories: [
      { name: 'Industrial Piping', href: '/products/piping/industrial' },
      { name: 'Process Piping', href: '/products/piping/process' },
      { name: 'Utility Piping', href: '/products/piping/utility' }
    ]
  },
  {
    title: 'Surface Treatment',
    description: 'Professional surface treatment and protection services.',
    href: '/products/surface-treatment',
    subcategories: [
      { name: 'Painting', href: '/products/surface-treatment/painting' },
      { name: 'Sand Blasting', href: '/products/surface-treatment/sand-blasting' },
      { name: 'Fire-Proofing', href: '/products/surface-treatment/fire-proofing' },
      { name: 'Galvanization', href: '/products/surface-treatment/galvanization' }
    ]
  }
];

const services = [
  {
    title: 'Design & Engineering',
    description: 'Complete structural design and engineering services using advanced software and experienced professionals.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    title: 'Manufacturing',
    description: 'State-of-the-art manufacturing facility with precision equipment and quality control processes.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Installation',
    description: 'Professional installation teams with extensive experience in PEB and steel structure assembly.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Project Management',
    description: 'Comprehensive project management from inception to completion with dedicated project managers.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Technical Support',
    description: 'Expert technical support and consultation for all your steel structure needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'Consultation',
    description: 'Expert consultation for steel structure solutions, including feasibility studies and technical advice.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
];

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>Products & Services - Hexasteel</title>
        <meta name="description" content="Explore our comprehensive range of steel structure solutions and services." />
      </Head>

      <Hero
        title="Products & Services"
        subtitle="Comprehensive Steel Structure Solutions"
        backgroundImage="/images/products-hero.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600">
            Explore our wide range of steel structure solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-200"
            >
              <Link href={category.href} className="block">
                <div className="relative h-64">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="p-8 text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{category.title}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>

              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      href={sub.href}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <span>{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Comprehensive solutions for your steel structure needs
          </p>
          <ServicesGrid services={services} />
        </div>
      </div>
    </>
  );
}
