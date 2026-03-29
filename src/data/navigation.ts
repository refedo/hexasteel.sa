interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
  comingSoon?: boolean;
}

export const navigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
    children: [
      { name: 'Company Overview', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Manufacturing Facility', href: '/factory-capabilities'},
      { name: 'Certifications', href: '/certifications' },
      { name: 'Sustainability', href: '/sustainability' }
    ]
  },
  {
    name: 'Products',
    href: '/products',
    children: [
      {
        name: 'Pre-Engineered Buildings',
        href: '/products/peb',
        children: [
          { 
            name: 'Main Frames',
            href: '/products/peb/main-frames',
            children: [
              { name: 'Single Span', href: '/products/peb/main-frames/single-span' },
              { name: 'Multi Span', href: '/products/peb/main-frames/multi-span' },
              { name: 'Multi Gable', href: '/products/peb/main-frames/multi-gable' },
              { name: 'Lean-to', href: '/products/peb/main-frames/lean-to' },
              { name: 'Cantilever', href: '/products/peb/main-frames/cantilever' },
              { name: 'Arch Buildings', href: '/products/peb/main-frames/arch' },
            ]
          },
          { 
            name: 'Secondary Members',
            href: '/products/peb/secondary',
            children: [
              { name: 'Purlins & Girts', href: '/products/peb/secondary/purlins-girts' },
              { name: 'Crane Beams', href: '/products/peb/secondary/crane-beams' },
              { name: 'Mezzanine', href: '/products/peb/secondary/mezzanine' },
              { name: 'Fascia Systems', href: '/products/peb/secondary/fascia' },
            ]
          },
        ],
      },
      {
        name: 'Steel Structures',
        href: '/products/steel',
        children: [
          { 
            name: 'Infrastructure',
            href: '/products/steel/infrastructure',
            children: [
              { name: 'Airports', href: '/products/steel/infrastructure/airports' },
              { name: 'Stadiums', href: '/products/steel/infrastructure/stadiums' },
              { name: 'Bridges', href: '/products/steel/infrastructure/bridges' },
            ]
          },
          { 
            name: 'Commercial',
            href: '/products/steel/commercial',
            children: [
              { name: 'Multi-story Buildings', href: '/products/steel/commercial/multi-story' },
              { name: 'Shopping Centers', href: '/products/steel/commercial/shopping-centers' },
              { name: 'Office Buildings', href: '/products/steel/commercial/office' },
            ]
          },
          { 
            name: 'Industrial',
            href: '/products/steel/industrial',
            children: [
              { name: 'Warehouses', href: '/products/steel/industrial/warehouses' },
              { name: 'Manufacturing Facilities', href: '/products/steel/industrial/manufacturing' },
              { name: 'Process Plants', href: '/products/steel/industrial/process-plants' },
            ]
          },
        ],
      },
      {
        name: 'Tanks & Vessels & Piping',
        href: '/products/tanks-vessels',
      
      },
      {
        name: 'Services',
        href: '/services',
        children: [
          { name: 'Engineering', href: '/services/engineering' },
          { name: 'Manufacturing', href: '/services/manufacturing' },
          { name: 'Installation', href: '/services/installation' },
          { name: 'Maintenance', href: '/services/maintenance' }
        ]
      },
      {
        name: 'Modular Buildings',
        href: '/products/modular',
        comingSoon: true,
      },
    ]
  },
  {
    name: 'Projects',
    href: '/projects',
  },
  {
    name: 'Knowledge Center',
    href: '/knowledge',
    children: [
      { name: 'Technical Library', href: '/knowledge' },
      { name: 'FAQ', href: '/faq' }
    ]
  },
  {
    name: 'News',
    href: '/news',
    children: [
      { name: 'Latest News', href: '/news' },
      { name: 'Blog', href: '/blog' },
      { name: 'Initiatives', href: '/initiatives' },
    ]
  },
  {
    name: 'Careers',
    href: '/careers',
    children: [
      { name: 'Open Positions', href: '/careers' },
      { name: 'Life at Hexasteel', href: '/careers/life' },
      { name: 'Benefits', href: '/careers/benefits' },
    ]
  },
  {
    name: 'Contact',
    href: '/contact',
  }
];
