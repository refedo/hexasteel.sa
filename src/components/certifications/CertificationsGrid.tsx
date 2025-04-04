import { motion } from 'framer-motion';

const certifications = [
  {
    id: 'iso9001',
    name: 'ISO 9001:2015',
    category: 'Quality Management',
    description: 'International standard for Quality Management Systems (QMS), demonstrating our commitment to consistent quality and customer satisfaction.',
    validUntil: '2026',
    icon: '🏅',
    benefits: [
      'Standardized quality processes',
      'Enhanced customer satisfaction',
      'Continuous improvement culture',
      'Risk-based thinking approach'
    ]
  },
  {
    id: 'iso14001',
    name: 'ISO 14001:2015',
    category: 'Environmental Management',
    description: 'Certification for Environmental Management System (EMS), showcasing our dedication to environmental responsibility and sustainability.',
    validUntil: '2026',
    icon: '🌿',
    benefits: [
      'Environmental impact reduction',
      'Resource efficiency',
      'Regulatory compliance',
      'Sustainable practices'
    ]
  },
  {
    id: 'iso45001',
    name: 'ISO 45001:2018',
    category: 'Occupational Health & Safety',
    description: 'International standard for Occupational Health and Safety Management Systems, ensuring a safe and healthy workplace.',
    validUntil: '2026',
    icon: '⚕️',
    benefits: [
      'Workplace safety enhancement',
      'Risk prevention',
      'Employee wellbeing',
      'Legal compliance'
    ]
  },
  {
    id: 'cswip',
    name: 'CSWIP',
    category: 'Welding Inspection',
    description: 'Certification Scheme for Welding Inspection Personnel, validating our expertise in welding inspection and quality control.',
    validUntil: 'Ongoing',
    icon: '⚡',
    benefits: [
      'Expert welding inspection',
      'Quality assurance',
      'International recognition',
      'Technical expertise'
    ]
  },
  {
    id: 'cwi',
    name: 'AWS CWI',
    category: 'Welding Inspection',
    description: 'Certified Welding Inspector certification from the American Welding Society, demonstrating our welding inspection capabilities.',
    validUntil: 'Ongoing',
    icon: '🔍',
    benefits: [
      'Comprehensive inspection skills',
      'Code compliance expertise',
      'Quality control assurance',
      'Industry recognition'
    ]
  },
  {
    id: 'asci',
    name: 'ASCI',
    category: 'Steel Construction',
    description: 'American Steel Construction Institute certification, validating our expertise in steel construction and fabrication.',
    validUntil: 'Ongoing',
    icon: '🏗️',
    benefits: [
      'Steel construction expertise',
      'Industry best practices',
      'Technical competency',
      'Quality standards'
    ]
  },
  {
    id: 'leed',
    name: 'LEED',
    category: 'Sustainable Building',
    description: 'Leadership in Energy and Environmental Design certification, demonstrating our commitment to sustainable construction practices.',
    validUntil: 'Ongoing',
    icon: '🌱',
    benefits: [
      'Sustainable practices',
      'Energy efficiency',
      'Environmental responsibility',
      'Green building expertise'
    ]
  }
];

export default function CertificationsGrid() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Certifications
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Industry-leading certifications demonstrating our commitment to quality, safety, and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{cert.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-500">{cert.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{cert.description}</p>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Valid Until:</span>
                    <span className="font-semibold text-primary-600">{cert.validUntil}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {cert.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-gray-600 text-sm">
                          <span className="mr-2 text-primary-500">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
