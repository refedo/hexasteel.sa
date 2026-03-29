import { motion } from 'framer-motion';
import { 
  PencilSquareIcon, 
  WrenchScrewdriverIcon, 
  ChartBarIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { services } from '../../data/products';

const iconMap = {
  PencilSquareIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon
};

export default function ServiceList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        const Icon = iconMap[service.icon as keyof typeof iconMap];
        
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary-500" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {service.name}
            </h3>
            
            <p className="text-gray-600 mb-4">
              {service.description}
            </p>

            <div className="space-y-2">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
