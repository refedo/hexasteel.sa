import { ProductCategory, Service } from '../types/products';

export const productCategories: ProductCategory[] = [
  {
    id: 'pre-engineered-buildings',
    title: 'Pre-Engineered Buildings',
    description: 'Custom-designed, pre-engineered metal building systems that offer cost-effective and efficient construction solutions.',
    features: [
      {
        name: 'Optimized Design',
        description: 'Computer-aided design ensures optimal material usage and structural efficiency'
      },
      {
        name: 'Quick Construction',
        description: 'Pre-fabricated components allow for faster erection and project completion'
      },
      {
        name: 'Flexibility',
        description: 'Easy to expand and modify to accommodate future growth'
      }
    ],
    applications: [
      'Industrial facilities',
      'Warehouses',
      'Commercial buildings',
      'Sports facilities'
    ],
    subcategories: [
      {
        id: 'single-span',
        name: 'Single Span Buildings',
        description: 'Clear span buildings up to 60 meters wide without intermediate columns.',
        features: [
          {
            name: 'Maximum Space Utilization',
            description: 'No internal columns means complete freedom in space planning'
          },
          {
            name: 'Economical Solution',
            description: 'Optimized design reduces material costs while maintaining structural integrity'
          }
        ],
        applications: [
          'Warehouses',
          'Manufacturing facilities',
          'Aircraft hangars',
          'Sports arenas'
        ]
      },
      {
        id: 'multi-span',
        name: 'Multi-Span Buildings',
        description: 'Efficient solution for large area coverage with interior columns.',
        features: [
          {
            name: 'Cost-Effective Coverage',
            description: 'Interior columns optimize material usage for large areas'
          },
          {
            name: 'Versatile Layout',
            description: 'Multiple bay configurations for various space requirements'
          }
        ],
        applications: [
          'Distribution centers',
          'Industrial complexes',
          'Shopping centers',
          'Storage facilities'
        ]
      }
    ]
  },
  {
    id: 'steel-structures',
    title: 'Steel Structures',
    description: 'Custom-engineered steel structures designed for specific industrial and commercial applications.',
    features: [
      {
        name: 'Custom Engineering',
        description: 'Tailored solutions for specific project requirements'
      },
      {
        name: 'High Durability',
        description: 'Built to withstand harsh environmental conditions'
      },
      {
        name: 'Quality Assurance',
        description: 'Rigorous quality control throughout fabrication'
      }
    ],
    applications: [
      'Industrial plants',
      'Power stations',
      'Process facilities',
      'Commercial complexes'
    ],
    subcategories: [
      {
        id: 'industrial-buildings',
        name: 'Industrial Buildings',
        description: 'Heavy-duty steel structures for industrial applications.',
        features: [
          {
            name: 'Heavy Load Capacity',
            description: 'Designed for industrial equipment and processes'
          },
          {
            name: 'Process Integration',
            description: 'Accommodates specialized industrial requirements'
          }
        ],
        applications: [
          'Manufacturing plants',
          'Processing facilities',
          'Heavy industry',
          'Chemical plants'
        ]
      },
      {
        id: 'commercial-structures',
        name: 'Commercial Structures',
        description: 'Architecturally designed steel structures for commercial use.',
        features: [
          {
            name: 'Aesthetic Design',
            description: 'Combines functionality with architectural appeal'
          },
          {
            name: 'Space Optimization',
            description: 'Flexible layouts for various commercial needs'
          }
        ],
        applications: [
          'Office buildings',
          'Shopping centers',
          'Hotels',
          'Entertainment venues'
        ]
      }
    ]
  }
];

export const services: Service[] = [
  {
    id: 'design-engineering',
    title: 'Design & Engineering',
    description: 'Comprehensive design and engineering services for steel structures',
    longDescription: 'Our design and engineering team utilizes advanced software and years of experience to deliver optimal structural solutions.',
    features: [
      {
        name: '3D Modeling',
        description: 'Advanced BIM and 3D modeling for precise visualization'
      },
      {
        name: 'Structural Analysis',
        description: 'Detailed analysis ensuring structural integrity and efficiency'
      },
      {
        name: 'Value Engineering',
        description: 'Cost optimization without compromising quality'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Detailed assessment of project requirements and constraints'
      },
      {
        step: 2,
        title: 'Conceptual Design',
        description: 'Development of initial design concepts and solutions'
      },
      {
        step: 3,
        title: 'Detailed Engineering',
        description: 'Comprehensive structural design and documentation'
      },
      {
        step: 4,
        title: 'Review and Optimization',
        description: 'Final review and refinement of design solutions'
      }
    ],
    benefits: [
      'Optimized structural efficiency',
      'Cost-effective solutions',
      'Faster project execution',
      'Compliance with international standards'
    ]
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'State-of-the-art manufacturing facilities for steel components',
    longDescription: 'Our manufacturing facility combines advanced technology with skilled craftsmanship to produce high-quality steel components.',
    features: [
      {
        name: 'Advanced Equipment',
        description: 'Modern machinery for precise fabrication'
      },
      {
        name: 'Quality Control',
        description: 'Rigorous quality checks at every stage'
      },
      {
        name: 'Custom Fabrication',
        description: 'Ability to handle specialized requirements'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Material Procurement',
        description: 'Sourcing high-quality materials from trusted suppliers'
      },
      {
        step: 2,
        title: 'Fabrication',
        description: 'Precision manufacturing of components'
      },
      {
        step: 3,
        title: 'Quality Inspection',
        description: 'Multi-stage quality control process'
      },
      {
        step: 4,
        title: 'Finishing',
        description: 'Surface treatment and final preparation'
      }
    ],
    benefits: [
      'High-quality products',
      'On-time delivery',
      'Custom solutions',
      'Cost-effective production'
    ]
  },
  {
    id: 'installation',
    title: 'Installation',
    description: 'Professional installation services for all our products',
    longDescription: 'Our experienced installation teams ensure proper erection and assembly of steel structures with focus on safety and quality.',
    features: [
      {
        name: 'Expert Teams',
        description: 'Highly trained and certified installation crews'
      },
      {
        name: 'Safety First',
        description: 'Strict adherence to safety protocols'
      },
      {
        name: 'Project Management',
        description: 'Efficient coordination and execution'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Site Preparation',
        description: 'Assessment and preparation of installation site'
      },
      {
        step: 2,
        title: 'Component Assembly',
        description: 'Systematic assembly of structural components'
      },
      {
        step: 3,
        title: 'Quality Checks',
        description: 'Regular inspections during installation'
      },
      {
        step: 4,
        title: 'Final Testing',
        description: 'Comprehensive testing of completed structure'
      }
    ],
    benefits: [
      'Professional execution',
      'Timely completion',
      'Safety compliance',
      'Quality assurance'
    ]
  }
];
