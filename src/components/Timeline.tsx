import { motion } from 'framer-motion';

const timelineSteps = [
  {
    title: 'Consultation & Design',
    description: 'Initial consultation to understand project requirements, followed by conceptual design development using advanced 3D modeling software.',
    icon: '💡',
  },
  {
    title: 'Engineering & Analysis',
    description: 'Detailed structural calculations and analysis to optimize design efficiency while ensuring full compliance with international standards.',
    icon: '📐',
  },
  {
    title: 'Detailing & Shop Drawings',
    description: 'Creation of comprehensive shop drawings and connection details using latest CAD technology for precise fabrication planning.',
    icon: '✏️',
  },
  {
    title: 'Sourcing & Procurement',
    description: 'Strategic sourcing of premium steel materials and components from certified suppliers, ensuring quality and cost-effectiveness.',
    icon: '🏭',
  },
  {
    title: 'Production & Fabrication',
    description: 'Precision manufacturing using advanced CNC machinery for cutting, drilling, and welding, maintaining tight tolerances and quality.',
    icon: '⚙️',
  },
  {
    title: 'Coating & Finishing',
    description: 'Application of high-performance protective coatings and surface treatments to ensure long-term durability and corrosion resistance.',
    icon: '🎨',
  },
  {
    title: 'Quality Assurance & Control',
    description: 'Comprehensive quality checks including NDT testing, dimensional verification, and coating thickness measurements to meet project specifications.',
    icon: '✓',
  },
  {
    title: 'Delivery & Installation',
    description: 'Safe transportation and professional installation by certified teams, ensuring precise assembly and timely project completion.',
    icon: '🏗️',
  }
];

export default function Timeline() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Operation Workflow
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Excellence and precision in every phase of steel construction
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary-200 transform -translate-x-1/2" />

          {/* Timeline items */}
          <div className="relative">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`mb-16 flex ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2" />
                <div className="w-12 h-12 absolute left-1/2 -ml-6 rounded-full bg-primary-500 shadow-lg flex items-center justify-center transform transition-transform hover:scale-110">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="w-1/2 px-8">
                  <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
