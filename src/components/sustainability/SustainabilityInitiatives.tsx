import { motion } from 'framer-motion';

const initiatives = [
  {
    id: 'paperless',
    title: 'Paperless Organization',
    description: 'Achieved 90% paperless operations through comprehensive digital transformation, reducing our environmental impact and improving efficiency.',
    icon: '🌱',
    stats: [
      { label: 'Paper Reduction', value: '90%' },
      { label: 'Trees Saved Annually', value: '500+' },
      { label: 'CO2 Reduction', value: '25 tons' }
    ],
    features: [
      'Digital document management',
      'E-signature implementation',
      'Cloud-based collaboration',
      'Automated workflows',
      'Mobile-first solutions'
    ]
  },
  {
    id: 'electric-fleet',
    title: 'Electrified Transportation',
    description: 'Transitioning to an electric vehicle fleet and installing charging infrastructure to reduce our carbon footprint in logistics and operations.',
    icon: '⚡',
    stats: [
      { label: 'EV Fleet Adoption', value: '60%' },
      { label: 'CO2 Reduction', value: '45 tons' },
      { label: 'Charging Stations', value: '15+' }
    ],
    features: [
      'Electric delivery vehicles',
      'On-site charging stations',
      'Smart route optimization',
      'Renewable energy integration',
      'Employee EV incentives'
    ]
  },
  {
    id: 'leed',
    title: 'LEED Certification Leadership',
    description: 'Leading the steel industry in sustainable building practices with LEED certification and green building initiatives.',
    icon: '🏢',
    stats: [
      { label: 'Energy Efficiency', value: '40%' },
      { label: 'Water Conservation', value: '35%' },
      { label: 'Waste Reduction', value: '50%' }
    ],
    features: [
      'Energy-efficient facilities',
      'Water conservation systems',
      'Sustainable materials',
      'Waste management',
      'Green building design'
    ]
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Integration',
    description: 'Implementing solar power systems and renewable energy solutions across our facilities to reduce reliance on fossil fuels.',
    icon: '☀️',
    stats: [
      { label: 'Solar Power Usage', value: '30%' },
      { label: 'CO2 Reduction', value: '100 tons' },
      { label: 'Energy Savings', value: '45%' }
    ],
    features: [
      'Solar panel installations',
      'Energy storage systems',
      'Smart grid integration',
      'Energy monitoring',
      'Renewable certificates'
    ]
  },
  {
    id: 'waste-reduction',
    title: 'Zero Waste Initiative',
    description: 'Comprehensive waste reduction program targeting zero waste to landfill through recycling, reuse, and responsible disposal practices.',
    icon: '♻️',
    stats: [
      { label: 'Waste Reduction', value: '85%' },
      { label: 'Materials Recycled', value: '95%' },
      { label: 'Landfill Diversion', value: '90%' }
    ],
    features: [
      'Material recycling programs',
      'Waste sorting systems',
      'Circular economy practices',
      'Supplier partnerships',
      'Employee training'
    ]
  }
];

export default function SustainabilityInitiatives() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div>
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{initiative.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{initiative.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{initiative.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {initiative.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {initiative.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="mr-2 text-primary-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
