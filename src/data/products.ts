export interface IProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  applications: string[];
  image: string;
  category: 'peb' | 'steel-structures' | 'structural' | 'roofing' | 'cladding' | 'accessories';
}

export const products: IProduct[] = [
  // PEB Section
  {
    id: 'single-span-peb',
    name: 'Single Span PEB',
    description: 'Optimized pre-engineered building solutions for single span applications, offering maximum usable space.',
    features: [
      'Clear spans up to 60 meters',
      'Optimized steel consumption',
      'Fast design and fabrication',
      'Flexible expansion options',
      'Cost-effective solution'
    ],
    applications: [
      'Warehouses',
      'Industrial facilities',
      'Storage buildings',
      'Manufacturing plants'
    ],
    image: '/images/products/single-span-peb.jpg',
    category: 'peb'
  },
  {
    id: 'multi-span-peb',
    name: 'Multi-Span PEB',
    description: 'Versatile pre-engineered building systems designed for large area coverage with interior columns.',
    features: [
      'Multiple bay configurations',
      'Integrated crane systems support',
      'Modular expansion capability',
      'Optimized column spacing',
      'Enhanced stability design'
    ],
    applications: [
      'Large industrial complexes',
      'Distribution centers',
      'Aircraft hangars',
      'Shopping centers'
    ],
    image: '/images/products/multi-span-peb.jpg',
    category: 'peb'
  },
  {
    id: 'mezzanine-peb',
    name: 'Mezzanine PEB Systems',
    description: 'Multi-level pre-engineered building solutions maximizing vertical space utilization.',
    features: [
      'Multiple floor options',
      'Integrated structural system',
      'Flexible space planning',
      'High load capacity',
      'Customizable configurations'
    ],
    applications: [
      'Office-warehouse combinations',
      'Industrial facilities',
      'Retail complexes',
      'Storage facilities'
    ],
    image: '/images/products/mezzanine-peb.jpg',
    category: 'peb'
  },
  // Steel Structures Section
  {
    id: 'industrial-buildings',
    name: 'Industrial Buildings',
    description: 'Custom-designed steel structures for industrial applications with specific operational requirements.',
    features: [
      'Heavy-duty structural design',
      'Crane runway integration',
      'Special equipment support',
      'Process-specific modifications',
      'Future expansion provisions'
    ],
    applications: [
      'Manufacturing facilities',
      'Process plants',
      'Heavy industry buildings',
      'Power plants'
    ],
    image: '/images/products/industrial-buildings.jpg',
    category: 'steel-structures'
  },
  {
    id: 'commercial-buildings',
    name: 'Commercial Buildings',
    description: 'Architecturally appealing steel structures designed for commercial and public use.',
    features: [
      'Aesthetic design integration',
      'Large open spaces',
      'Multiple story options',
      'Flexible interior layouts',
      'Modern facade systems'
    ],
    applications: [
      'Office buildings',
      'Shopping malls',
      'Exhibition centers',
      'Sports facilities'
    ],
    image: '/images/products/commercial-buildings.jpg',
    category: 'steel-structures'
  },
  {
    id: 'specialized-structures',
    name: 'Specialized Structures',
    description: 'Purpose-built steel structures for unique applications and specific industry requirements.',
    features: [
      'Application-specific design',
      'Special loading considerations',
      'Environmental adaptations',
      'Technical compliance',
      'Safety-first approach'
    ],
    applications: [
      'Oil & gas facilities',
      'Power stations',
      'Chemical plants',
      'Mining facilities'
    ],
    image: '/images/products/specialized-structures.jpg',
    category: 'steel-structures'
  },
  // Existing Products
  {
    id: 'built-up-sections',
    name: 'Built-up Sections',
    description: 'Custom-fabricated steel sections designed for optimal performance in large-span structures.',
    features: [
      'Custom dimensions and specifications',
      'High strength-to-weight ratio',
      'Optimized for specific load requirements',
      'Quality-controlled fabrication'
    ],
    applications: [
      'Industrial buildings',
      'Warehouses',
      'Commercial complexes',
      'Heavy industrial facilities'
    ],
    image: '/images/products/built-up-sections.jpg',
    category: 'structural'
  },
  {
    id: 'hot-rolled-sections',
    name: 'Hot Rolled Sections',
    description: 'Standard structural steel sections manufactured to international specifications.',
    features: [
      'Wide range of sizes',
      'Compliant with international standards',
      'Excellent load-bearing capacity',
      'Versatile applications'
    ],
    applications: [
      'Multi-story buildings',
      'Industrial structures',
      'Infrastructure projects',
      'Commercial buildings'
    ],
    image: '/images/products/hot-rolled-sections.jpg',
    category: 'structural'
  },
  {
    id: 'purlins-girts',
    name: 'Purlins & Girts',
    description: 'Cold-formed steel sections for roof and wall support systems.',
    features: [
      'Lightweight yet strong',
      'Easy installation',
      'Cost-effective',
      'Multiple sizes available'
    ],
    applications: [
      'Roof support systems',
      'Wall cladding support',
      'Industrial buildings',
      'Commercial structures'
    ],
    image: '/images/products/purlins.jpg',
    category: 'structural'
  }
];

export interface IService {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  icon: string;
}

export const services: IService[] = [
  {
    id: 'design-engineering',
    name: 'Design & Engineering',
    description: 'Comprehensive structural design and engineering services using advanced software tools.',
    benefits: [
      'Optimized structural solutions',
      'Cost-effective designs',
      'Compliance with international codes',
      'Detailed documentation'
    ],
    icon: 'PencilSquareIcon'
  },
  {
    id: 'fabrication',
    name: 'Fabrication',
    description: 'State-of-the-art fabrication facilities with advanced machinery and quality control.',
    benefits: [
      'High precision manufacturing',
      'Quality assurance at every step',
      'Efficient production timelines',
      'Custom fabrication capabilities'
    ],
    icon: 'WrenchScrewdriverIcon'
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'End-to-end project management with real-time tracking and reporting.',
    benefits: [
      'Dedicated project teams',
      'Transparent communication',
      'Schedule optimization',
      'Risk management'
    ],
    icon: 'ChartBarIcon'
  }
];
