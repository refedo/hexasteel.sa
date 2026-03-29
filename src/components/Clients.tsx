import { motion } from 'framer-motion';

interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
}

export default function Clients() {
  // Sample client data - replace with actual data from your API
  const clients: Client[] = [
    {
      id: '1',
      name: 'Industrial Corp',
      logo: '/images/clients/client1.png',
      industry: 'Manufacturing'
    },
    {
      id: '2',
      name: 'Build Tech',
      logo: '/images/clients/client2.png',
      industry: 'Construction'
    },
    {
      id: '3',
      name: 'Global Logistics',
      logo: '/images/clients/client3.png',
      industry: 'Logistics'
    },
    {
      id: '4',
      name: 'Agri Solutions',
      logo: '/images/clients/client4.png',
      industry: 'Agriculture'
    },
    {
      id: '5',
      name: 'Retail Giant',
      logo: '/images/clients/client5.png',
      industry: 'Retail'
    },
    {
      id: '6',
      name: 'Sport Centers',
      logo: '/images/clients/client6.png',
      industry: 'Sports'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Elite Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by industry leaders across various sectors
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 p-4 bg-gray-50 rounded-lg flex items-center justify-center mb-4 hover:shadow-lg transition-shadow">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-gray-900 font-medium text-center">
                {client.name}
              </h3>
              <p className="text-gray-500 text-sm text-center">
                {client.industry}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Expert Team</div>
          </div>
        </div>
      </div>
    </section>
  );
}
