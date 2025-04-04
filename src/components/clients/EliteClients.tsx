import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  {
    name: 'Saudi Aramco',
    description: 'National petroleum and natural gas company',
    logo: '/clients/aramco.png'
  },
  {
    name: 'SABIC',
    description: 'Global leader in diversified chemicals',
    logo: '/clients/sabic.png'
  },
  {
    name: 'Saudi Electricity Company',
    description: 'National electricity service provider',
    logo: '/clients/sec.png'
  },
  {
    name: 'Royal Commission for Jubail & Yanbu',
    description: 'Industrial cities development authority',
    logo: '/clients/rcjy.png'
  },
  {
    name: "Ma'aden",
    description: 'Saudi Arabian Mining Company',
    logo: '/clients/maaden.png'
  },
  {
    name: 'Ministry of Defense',
    description: 'National defense authority',
    logo: '/clients/mod.png'
  },
];

export default function EliteClients() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Elite Clients</h2>
          <p className="text-lg text-gray-600">Trusted by industry leaders across Saudi Arabia</p>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 relative">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 128px, 128px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">
                        {client.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{client.name}</h3>
                <p className="text-gray-600 text-center">{client.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-primary-500 mb-2">264+</div>
            <div className="text-gray-600">Completed Projects</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-500 mb-2">13+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-500 mb-2">28+</div>
            <div className="text-gray-600">Elite Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-500 mb-2">4</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
