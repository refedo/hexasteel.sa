interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  subcategory: string;
  tags: string[];
  lastUpdated: string;
  hexaSteelContribution?: string;
}

export const articles: Article[] = [
  // Materials & Grades
  {
    id: 'steel-grades-structural',
    title: 'Understanding Structural Steel Grades',
    description: 'Comprehensive guide to structural steel grades used in pre-engineered buildings',
    content: `
      # Structural Steel Grades in Pre-Engineered Buildings

      ## Overview
      Structural steel grades are standardized classifications that define the physical and chemical properties of steel. In pre-engineered buildings, selecting the right steel grade is crucial for ensuring structural integrity and longevity.

      ## Common Steel Grades
      - ASTM A36: Standard carbon structural steel
      - ASTM A572 Grade 50: High-strength low-alloy steel
      - ASTM A992: Commonly used for wide-flange shapes

      ## Hexa Steel®'s Material Selection
      Our structural members are primarily manufactured using ASTM A572 Grade 50 steel, offering:
      - Higher yield strength (50 ksi minimum)
      - Excellent weldability
      - Superior durability
      - Cost-effectiveness

      ## Applications
      Different grades are used for various components:
      1. Main Frames: ASTM A572 Grade 50
      2. Secondary Members: ASTM A36
      3. Connection Plates: ASTM A36
    `,
    category: 'materials_and_grades',
    subcategory: 'Steel Grades',
    tags: ['steel', 'structural', 'grades', 'ASTM'],
    lastUpdated: '2025-01-30',
    hexaSteelContribution: 'Hexa Steel® exclusively uses ASTM A572 Grade 50 steel for main structural members, ensuring optimal strength-to-weight ratios and cost-effectiveness.'
  },

  // Building Components
  {
    id: 'purlin-design-optimization',
    title: 'Purlin Design and Optimization',
    description: 'Technical guide to purlin design, selection, and optimization in pre-engineered buildings',
    content: `
      # Purlin Design and Optimization

      ## Introduction
      Purlins are horizontal structural members that support roof panels and transfer loads to the main frame. Proper purlin design is essential for structural efficiency and economy.

      ## Design Considerations
      1. Load Types:
         - Dead loads
         - Live loads
         - Wind uplift
         - Snow loads
      
      2. Section Properties:
         - Z-sections
         - C-sections
         - Custom profiles

      ## Hexa Steel®'s Purlin System
      Our innovative purlin system features:
      - Optimized Z-sections with lip stiffeners
      - Proprietary overlap system
      - Pre-punched holes for easy installation
      - Galvanized coating for durability

      ## Installation Guidelines
      1. Proper alignment
      2. Overlap connections
      3. Bracing requirements
      4. Fastening specifications
    `,
    category: 'building_components',
    subcategory: 'Purlins',
    tags: ['purlins', 'structural', 'roof-system', 'design'],
    lastUpdated: '2025-01-30',
    hexaSteelContribution: 'Hexa Steel® has developed a proprietary purlin overlap system that reduces installation time by 40% while maintaining structural integrity.'
  },

  // Building Types
  {
    id: 'multi-span-advantages',
    title: 'Multi-Span Building Solutions',
    description: 'Comprehensive analysis of multi-span pre-engineered building systems',
    content: `
      # Multi-Span Building Solutions

      ## Overview
      Multi-span buildings offer economical solutions for large clear areas with intermediate supports. These structures are ideal for manufacturing facilities, warehouses, and logistics centers.

      ## Advantages
      1. Economic Benefits:
         - Reduced column sizes
         - Optimized material usage
         - Lower foundation costs
      
      2. Design Flexibility:
         - Variable bay spacing
         - Multiple crane systems
         - Diverse roof configurations

      ## Hexa Steel®'s Multi-Span System
      Our system features:
      - Optimized frame design
      - Integrated crane support
      - Flexible expansion options
      - Enhanced stability systems

      ## Applications
      - Manufacturing facilities
      - Warehouses
      - Aircraft hangars
      - Sports facilities
    `,
    category: 'building_types',
    subcategory: 'Multi-span',
    tags: ['multi-span', 'industrial', 'design', 'construction'],
    lastUpdated: '2025-01-30',
    hexaSteelContribution: 'Hexa Steel® has pioneered an innovative multi-span system that allows for future expansion without compromising structural integrity.'
  },

  // Technical Specifications
  {
    id: 'connection-design',
    title: 'Advanced Connection Design',
    description: 'Detailed guide to structural connections in pre-engineered buildings',
    content: `
      # Advanced Connection Design

      ## Introduction
      Structural connections are critical components that ensure load transfer and structural integrity. Proper connection design is essential for safety and efficiency.

      ## Connection Types
      1. Moment Connections:
         - End-plate connections
         - T-stub connections
         - Extended end-plate
      
      2. Shear Connections:
         - Single plate
         - Double angle
         - Seated connections

      ## Hexa Steel®'s Connection System
      Our proprietary connections feature:
      - Pre-engineered solutions
      - Optimized bolt patterns
      - Enhanced constructability
      - Quality control measures

      ## Design Considerations
      - Load paths
      - Fabrication efficiency
      - Field installation
      - Quality control
    `,
    category: 'technical_specifications',
    subcategory: 'Connection Details',
    tags: ['connections', 'structural', 'design', 'engineering'],
    lastUpdated: '2025-01-30',
    hexaSteelContribution: 'Hexa Steel® has developed standardized connection details that reduce design time by 60% while maintaining full compliance with international standards.'
  },

  // Engineering Software
  {
    id: 'bim-integration',
    title: 'BIM Integration in Steel Design',
    description: 'Guide to Building Information Modeling integration in pre-engineered building design',
    content: `
      # BIM Integration in Steel Design

      ## Overview
      Building Information Modeling (BIM) revolutionizes the design and construction process of pre-engineered buildings through enhanced coordination and visualization.

      ## Key Benefits
      1. Design Phase:
         - 3D visualization
         - Clash detection
         - Quantity takeoff
         - Cost estimation
      
      2. Construction Phase:
         - Shop drawing generation
         - Construction sequencing
         - Site coordination
         - As-built documentation

      ## Hexa Steel®'s BIM Implementation
      Our BIM workflow includes:
      - Custom Revit families
      - Automated shop drawings
      - Cloud collaboration
      - Mobile access

      ## Integration Features
      - Real-time collaboration
      - Version control
      - Change management
      - Documentation
    `,
    category: 'engineering_software',
    subcategory: 'BIM Integration',
    tags: ['BIM', 'software', 'design', 'technology'],
    lastUpdated: '2025-01-30',
    hexaSteelContribution: 'Hexa Steel® has developed custom Revit families and automation tools that streamline the BIM workflow for pre-engineered buildings.'
  }
];
