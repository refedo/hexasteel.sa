export interface ISoftwareTool {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: 'engineering' | 'inhouse';
}

export const designTools: ISoftwareTool[] = [
  // Engineering Software
  {
    id: 'tekla',
    name: 'Tekla Structures',
    description: 'Advanced BIM software for detailed structural design and fabrication, enabling precise 3D modeling and documentation of steel structures.',
    features: [
      '3D structural modeling and detailing',
      'Automated shop drawing generation',
      'Material quantity takeoff',
      'Fabrication information management',
      'Clash detection and coordination',
      'Integration with production systems'
    ],
    image: '/images/software/tekla.jpg',
    category: 'engineering'
  },
  {
    id: 'sap',
    name: 'SAP2000',
    description: 'Industry-leading structural analysis and design software for evaluating complex structural systems.',
    features: [
      'Advanced structural analysis',
      'Load combination generation',
      'Seismic analysis capabilities',
      'Code-based design checks',
      'Dynamic analysis',
      'Foundation design optimization'
    ],
    image: '/images/software/sap.jpg',
    category: 'engineering'
  },
  {
    id: 'etabs',
    name: 'ETABS',
    description: 'Specialized software for the analysis and design of building structures, particularly effective for multi-story buildings.',
    features: [
      'Building-specific modeling tools',
      'Wind and seismic load analysis',
      'Floor system design',
      'Lateral system analysis',
      'P-Delta analysis',
      'Performance-based design'
    ],
    image: '/images/software/etabs.jpg',
    category: 'engineering'
  },
  // In-house Systems
  {
    id: 'ots',
    name: 'Operations Tracking System',
    description: 'Custom-built system for real-time monitoring and management of project operations, providing transparency and efficiency.',
    features: [
      'Real-time project status tracking',
      'Automated milestone notifications',
      'Client portal for progress monitoring',
      'Document management system',
      'Quality control checkpoints',
      'Delivery schedule optimization'
    ],
    image: '/images/software/ots.jpg',
    category: 'inhouse'
  },
  {
    id: 'pts',
    name: 'Production Tracking System',
    description: 'Proprietary system for monitoring and optimizing manufacturing processes, ensuring quality and timely delivery.',
    features: [
      'Real-time production monitoring',
      'Quality control integration',
      'Material usage tracking',
      'Production schedule optimization',
      'Automated reporting',
      'Machine performance analytics'
    ],
    image: '/images/software/pts.jpg',
    category: 'inhouse'
  }
];
