import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon, 
  BuildingOfficeIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const documents = [
  {
    title: 'Method Statements',
    description: 'Detailed procedures for steel structure fabrication and erection processes',
    icon: DocumentTextIcon,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    href: '/knowledge/method-statements'
  },
  {
    title: 'Inspection and Test Plans (ITP)',
    description: 'Comprehensive quality control checkpoints and testing procedures',
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    href: '/knowledge/itp'
  },
  {
    title: 'Erection Plans',
    description: 'Detailed assembly and installation sequences for steel structures',
    icon: BuildingOfficeIcon,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    href: '/knowledge/erection-plans'
  },
  {
    title: 'Quality Control Plans',
    description: 'Systematic approaches to ensure highest quality standards',
    icon: DocumentChartBarIcon,
    color: 'bg-amber-100',
    iconColor: 'text-amber-600',
    href: '/knowledge/qc-plans'
  },
  {
    title: 'Safety Plans',
    description: 'Comprehensive safety protocols and risk mitigation strategies',
    icon: ShieldCheckIcon,
    color: 'bg-red-100',
    iconColor: 'text-red-600',
    href: '/knowledge/safety-plans'
  }
];

export default function DocumentationShowcase() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Professional Documentation
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Comprehensive documentation ensuring quality, safety, and efficiency in every project
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={doc.href}
                className="block group relative rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-lg ${doc.color}`}>
                  <doc.icon className={`h-6 w-6 ${doc.iconColor}`} aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {doc.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary-600">
                  Learn more
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-600">
            Need custom documentation? 
            <Link href="/contact" className="ml-2 text-primary-600 hover:text-primary-700 font-medium">
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
