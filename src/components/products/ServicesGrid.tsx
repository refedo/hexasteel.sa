import { motion } from 'framer-motion';
import Link from 'next/link';
import { Service } from '@/types/products';
import dynamic from 'next/dynamic';

// Lazy load the ServiceIcon component
const ServiceIcon = dynamic(() => import('./ServiceIcon'), {
  loading: () => <div className="w-8 h-8 bg-gray-200 rounded-full" />
});

interface ServicesGridProps {
  services: Service[];
}

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={itemVariants}
          className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 ${
            service.id === 'project-tracking' ? 'bg-gradient-to-br from-primary-50 to-white border border-primary-100' : ''
          }`}
        >
          <Link href={`/services/${service.id}`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className={service.id === 'project-tracking' ? 'text-primary-600' : 'text-primary-500'}>
                  <ServiceIcon serviceId={service.id} />
                </span>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    {service.id === 'project-tracking' && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-200 text-primary-900">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className={`${service.id === 'project-tracking' ? 'text-gray-700' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
