import { motion } from 'framer-motion';
import {
  BeakerIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  LightBulbIcon,
  SparklesIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const values = [
  {
    title: 'Innovation',
    description: 'Continuously pushing boundaries in steel construction technology and design.',
    icon: LightBulbIcon,
  },
  {
    title: 'Quality',
    description: 'Maintaining the highest standards in materials and workmanship.',
    icon: SparklesIcon,
  },
  {
    title: 'Safety',
    description: 'Prioritizing safety in every aspect of our operations.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Expertise',
    description: 'Leveraging decades of experience in steel construction.',
    icon: BeakerIcon,
  },
  {
    title: 'Customer Focus',
    description: 'Dedicated to exceeding client expectations and delivering value.',
    icon: HeartIcon,
  },
  {
    title: 'Teamwork',
    description: 'Fostering collaboration and mutual respect among our team.',
    icon: UserGroupIcon,
  },
];

export default function Values() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide us in delivering excellence in steel construction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <value.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
