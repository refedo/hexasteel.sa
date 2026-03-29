import { motion } from 'framer-motion';

const stats = [
  { label: 'Years of Experience', value: '25+' },
  { label: 'Completed Projects', value: '1000+' },
  { label: 'Professional Team', value: '150+' },
  { label: 'Countries Served', value: '10+' },
];

export default function Stats() {
  return (
    <div className="bg-primary-500 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
