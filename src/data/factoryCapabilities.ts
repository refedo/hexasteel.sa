export interface IMachine {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  capabilities: string[];
  specifications: {
    [key: string]: string;
  };
  image: string;
  description: string;
  maxCapacity: string;
  yearInstalled: string;
}

export interface IProductionLine {
  id: string;
  name: string;
  description: string;
  dailyCapacity: string;
  machines: IMachine[];
  processes: string[];
  certifications: string[];
}

export const productionLines: IProductionLine[] = [
  {
    id: 'built-up-section',
    name: 'Built-up Section Production Line',
    description: 'Advanced production line for manufacturing built-up sections, including columns, rafters, and crane beams.',
    dailyCapacity: '100 tons per day',
    processes: [
      'CNC Plasma Cutting',
      'Automatic Welding',
      'Shot Blasting',
      'Painting'
    ],
    certifications: [
      'ISO 9001:2015',
      'AWS D1.1',
      'EN 1090-2'
    ],
    machines: [
      {
        id: 'plasma-cutting',
        name: 'CNC Plasma Cutting Machine',
        manufacturer: 'Hypertherm',
        model: 'HPR400XD',
        capabilities: [
          'Plate thickness up to 50mm',
          'Cutting width up to 3000mm',
          'High precision cutting with minimal bevel',
          'Automatic nesting optimization'
        ],
        specifications: {
          'Cutting Speed': 'Up to 12m/min',
          'Positioning Accuracy': '±0.1mm',
          'Maximum Plate Size': '3000mm x 12000mm',
          'Power Source': '400A'
        },
        image: '/images/machinery/plasma-cutting.jpg',
        description: 'State-of-the-art CNC plasma cutting system with high-definition capability for precise cutting of steel plates.',
        maxCapacity: '200 cuts per shift',
        yearInstalled: '2024'
      },
      {
        id: 'welding-line',
        name: 'Automatic Welding Line',
        manufacturer: 'Lincoln Electric',
        model: 'Power Wave S500',
        capabilities: [
          'Submerged arc welding',
          'Multi-wire welding system',
          'Automatic seam tracking',
          'Real-time weld monitoring'
        ],
        specifications: {
          'Welding Current': '500A',
          'Duty Cycle': '100% at 400A',
          'Wire Feed Speed': '1.3-20.3 m/min',
          'Weld Thickness': 'Up to 40mm'
        },
        image: '/images/machinery/welding-line.jpg',
        description: 'Advanced automatic welding system for continuous production of built-up sections with consistent weld quality.',
        maxCapacity: '80 meters per hour',
        yearInstalled: '2024'
      }
    ]
  },
  {
    id: 'cold-formed',
    name: 'Cold-Formed Section Production Line',
    description: 'High-speed production line for manufacturing purlins, girts, and other secondary members.',
    dailyCapacity: '150 tons per day',
    processes: [
      'Coil Slitting',
      'Roll Forming',
      'Punching',
      'Length Cutting'
    ],
    certifications: [
      'ISO 9001:2015',
      'CE Marking',
      'ASTM Compliance'
    ],
    machines: [
      {
        id: 'roll-forming',
        name: 'Roll Forming Machine',
        manufacturer: 'Samco',
        model: 'PRO-150',
        capabilities: [
          'Z-purlin formation',
          'C-channel formation',
          'Sigma section formation',
          'Automatic length control'
        ],
        specifications: {
          'Material Thickness': '1.5-4.0mm',
          'Line Speed': 'Up to 30m/min',
          'Width Range': '100-400mm',
          'Material': 'Pre-galvanized steel'
        },
        image: '/images/machinery/roll-forming.jpg',
        description: 'High-speed roll forming line with quick-change tooling system for various section profiles.',
        maxCapacity: '2000 meters per shift',
        yearInstalled: '2023'
      },
      {
        id: 'cnc-punching',
        name: 'CNC Punching System',
        manufacturer: 'Voortman',
        model: 'V550',
        capabilities: [
          'Automatic hole punching',
          'Slotting',
          'Web perforation',
          'Marking system'
        ],
        specifications: {
          'Punching Force': '50 tons',
          'Maximum Thickness': '8mm',
          'Processing Speed': 'Up to 60 hits/min',
          'Position Accuracy': '±0.5mm'
        },
        image: '/images/machinery/cnc-punching.jpg',
        description: 'Integrated CNC punching system for high-speed processing of cold-formed sections.',
        maxCapacity: '1500 holes per hour',
        yearInstalled: '2023'
      }
    ]
  },
  {
    id: 'plate-processing',
    name: 'Plate Processing Line',
    description: 'Comprehensive plate processing facility for base plates, end plates, and connection elements.',
    dailyCapacity: '80 tons per day',
    processes: [
      'CNC Cutting',
      'Drilling',
      'Milling',
      'Surface Treatment'
    ],
    certifications: [
      'ISO 9001:2015',
      'EN 1090-1',
      'AWS Certification'
    ],
    machines: [
      {
        id: 'drilling-line',
        name: 'CNC Drilling Line',
        manufacturer: 'Ficep',
        model: 'Endeavour',
        capabilities: [
          'Multi-spindle drilling',
          'Tapping',
          'Countersinking',
          'Marking system'
        ],
        specifications: {
          'Drilling Capacity': 'Up to 40mm',
          'Spindle Speed': '3000 RPM',
          'Maximum Plate Width': '2500mm',
          'Tool Change Time': '15 seconds'
        },
        image: '/images/machinery/drilling-line.jpg',
        description: 'High-speed drilling line with automatic tool changing system for efficient plate processing.',
        maxCapacity: '3000 holes per shift',
        yearInstalled: '2024'
      }
    ]
  }
];
