export interface Initiative {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'sustainability' | 'innovation' | 'education' | 'partnership';
  highlights: string[];
  goals: string[];
  impact: {
    metric: string;
    value: string;
  }[];
  partners?: string[];
}

export const initiatives: Initiative[] = [
  {
    id: 'lean-manufacturing',
    title: 'Lean Manufacturing Excellence',
    description: 'Implementation of lean manufacturing principles to optimize production processes, reduce waste, and enhance value delivery to customers.',
    image: '/images/initiatives/lean-manufacturing.jpg',
    category: 'innovation',
    highlights: [
      'Just-in-Time (JIT) production system',
      'Value Stream Mapping',
      'Continuous Flow Manufacturing',
      'Pull System Implementation',
      'Total Productive Maintenance (TPM)'
    ],
    goals: [
      'Reduce production lead time by 60%',
      'Minimize work-in-progress inventory',
      'Achieve zero defects in production',
      'Implement standardized work procedures'
    ],
    impact: [
      { metric: 'Lead Time Reduction', value: '45% improvement' },
      { metric: 'Inventory Turnover', value: '30% increase' },
      { metric: 'Quality Improvement', value: '99.9% first-pass yield' }
    ]
  },
  {
    id: '5s-program',
    title: '5S Workplace Organization',
    description: 'Comprehensive implementation of 5S methodology (Sort, Set in Order, Shine, Standardize, Sustain) to create and maintain an organized, efficient, and safe workplace.',
    image: '/images/initiatives/5s-program.jpg',
    category: 'innovation',
    highlights: [
      'Workplace organization system',
      'Visual management tools',
      'Standard operating procedures',
      'Regular audits and scoring',
      'Employee engagement programs'
    ],
    goals: [
      'Achieve 90%+ 5S audit scores',
      'Reduce workplace accidents by 80%',
      'Improve workspace efficiency by 40%',
      'Establish visual workplace standards'
    ],
    impact: [
      { metric: 'Safety Incidents', value: '75% reduction' },
      { metric: 'Workspace Efficiency', value: '35% improvement' },
      { metric: '5S Audit Score', value: '92% average' }
    ]
  },
  {
    id: 'sustainability',
    title: 'Sustainable Manufacturing',
    description: 'Leading the steel industry towards a greener future with sustainable manufacturing practices and renewable energy integration.',
    image: '/images/initiatives/sustainability.jpg',
    category: 'sustainability',
    highlights: [
      'Solar-powered manufacturing facilities',
      'Zero-waste production processes',
      'Recycled steel utilization',
      'Energy-efficient equipment',
      'Water conservation systems'
    ],
    goals: [
      'Reduce carbon footprint by 50% by 2030',
      'Achieve 100% renewable energy usage',
      'Implement closed-loop recycling system',
      'Zero landfill waste by 2025'
    ],
    impact: [
      { metric: 'CO2 Reduction', value: '45,000 tons annually' },
      { metric: 'Recycled Steel', value: '80% of raw materials' },
      { metric: 'Water Saved', value: '1.2M gallons annually' }
    ]
  },
  {
    id: 'electrified-fleet',
    title: 'Electrified Transportation',
    description: 'Transitioning to an all-electric vehicle fleet for logistics and transportation, reducing our environmental impact while maintaining efficiency.',
    image: '/images/initiatives/electric-fleet.jpg',
    category: 'sustainability',
    highlights: [
      'Electric delivery trucks',
      'On-site charging infrastructure',
      'Smart route optimization',
      'Zero-emission logistics',
      'Employee EV incentive program'
    ],
    goals: [
      'Complete fleet electrification by 2026',
      'Install charging stations at all facilities',
      'Reduce transportation emissions by 90%',
      'Implement smart logistics system'
    ],
    impact: [
      { metric: 'Emission Reduction', value: '500 tons CO2 annually' },
      { metric: 'Fuel Cost Savings', value: '60% reduction' },
      { metric: 'Fleet Coverage', value: '100% electric by 2026' }
    ]
  },
  {
    id: 'hexa-academy',
    title: 'Hexa Steel Academy',
    description: 'Empowering the next generation of steel industry professionals through comprehensive training and development programs.',
    image: '/images/initiatives/academy.jpg',
    category: 'education',
    highlights: [
      'Technical skills development',
      'Industry certification programs',
      'Hands-on training facilities',
      'Expert-led workshops',
      'Career development support'
    ],
    goals: [
      'Train 500+ professionals annually',
      'Achieve 90% employment rate',
      'Expand program offerings',
      'Establish industry partnerships'
    ],
    impact: [
      { metric: 'Graduates Placed', value: '450+ annually' },
      { metric: 'Training Hours', value: '10,000+ delivered' },
      { metric: 'Industry Partners', value: '25+ companies' }
    ]
  },
  {
    id: 'pif-amp',
    title: 'PIF Accelerated Manufacturing Program',
    description: 'Proud participant in the prestigious PIF AMP initiative, demonstrating our commitment to advancing Saudi Arabia\'s manufacturing capabilities.',
    image: '/images/initiatives/pif-amp.jpg',
    category: 'partnership',
    highlights: [
      'Advanced manufacturing technologies',
      'Industry 4.0 implementation',
      'Supply chain optimization',
      'Quality excellence program',
      'Innovation hub development'
    ],
    goals: [
      'Increase production efficiency by 40%',
      'Expand export capabilities',
      'Enhance automation systems',
      'Develop local talent pipeline'
    ],
    impact: [
      { metric: 'Productivity Increase', value: '35% improvement' },
      { metric: 'Local Content', value: '70% achievement' },
      { metric: 'Job Creation', value: '200+ new positions' }
    ],
    partners: [
      'Public Investment Fund',
      'Ministry of Industry',
      'Saudi Industrial Development Fund',
      'National Industrial Development Center'
    ]
  }
];
