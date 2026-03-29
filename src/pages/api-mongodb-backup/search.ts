import { NextApiRequest, NextApiResponse } from 'next';
import { articles } from '@/data/knowledgeCenter/articles';
import { initiatives } from '@/data/initiatives';
import { productionLines } from '@/data/factoryCapabilities';

// Convert article content to searchable items
const articleItems = articles.map(article => ({
  title: article.title,
  description: article.description,
  content: article.content,
  url: `/knowledge/${article.id}`,
  category: 'Knowledge Center',
  subcategory: article.subcategory,
  tags: article.tags
}));

// Convert initiative content to searchable items
const initiativeItems = initiatives.map(initiative => ({
  title: initiative.title,
  description: initiative.description,
  content: `${initiative.highlights.join(' ')} ${initiative.goals.join(' ')}`,
  url: `/initiatives#${initiative.id}`,
  category: 'Initiatives',
  subcategory: initiative.category,
  tags: ['initiatives', initiative.category]
}));

// Convert factory capabilities to searchable items
const factoryItems = productionLines.map(line => ({
  title: line.name,
  description: line.description,
  content: `${line.processes.join(' ')} ${line.certifications.join(' ')} ${line.machines.map(m => 
    `${m.name} ${m.description} ${m.capabilities.join(' ')}`).join(' ')}`,
  url: `/factory-capabilities#${line.id}`,
  category: 'Factory Capabilities',
  subcategory: 'Production Lines',
  tags: ['factory', 'production', 'capabilities']
}));

// News articles data
const newsArticles = [
  {
    id: 'psf-participation-2024',
    title: 'Hexa Steel® Participates in Private Sector Forum (PSF) 2024',
    description: 'Hexa Steel® showcases commitment to Vision 2030 at Private Sector Forum 2024',
    content: `
      Hexa Steel® proudly participated in the Private Sector Forum (PSF) 2024, a prestigious two-day event held on February 12-13 that brought together key players in Saudi Arabia's private sector to discuss and showcase their contributions to Vision 2030.

      The forum served as a vital platform for dialogue between the private sector and government entities, focusing on enhancing the role of private businesses in achieving the Kingdom's economic diversification goals. Hexa Steel®'s participation highlighted our commitment to supporting Saudi Arabia's industrial development and economic transformation.

      During the forum, Hexa Steel® showcased:
      - Our advanced steel manufacturing capabilities and their role in supporting local content initiatives
      - Innovative building solutions that align with Saudi Arabia's construction sector development
      - Sustainable manufacturing practices and environmental commitments
      - Employment and training programs supporting Saudi talent development

      The event provided valuable opportunities to:
      - Connect with industry leaders and decision-makers
      - Explore potential partnerships and collaborations
      - Share insights on industry best practices
      - Discuss future development opportunities in the Kingdom

      Our participation in PSF 2024 reinforces Hexa Steel®'s position as a key contributor to Saudi Arabia's industrial sector. We remain committed to supporting the Kingdom's economic transformation through our innovative steel solutions and sustainable practices.
    `,
    url: '/news/psf-participation-2024',
    category: 'News',
    subcategory: 'Events',
    tags: ['vision 2030', 'psf', 'events', 'saudi arabia', 'private sector']
  },
  {
    id: 'saudi-build-2024',
    title: 'Hexasteel Showcases Innovation at Saudi Build 2024',
    description: 'Hexasteel demonstrates latest steel building solutions at Saudi Build 2024 exhibition',
    content: `
      Hexasteel, a leading manufacturer of steel building solutions, showcased its latest innovations at Saudi Build 2024, the Kingdom's largest construction exhibition. The event, which took place at the Riyadh International Convention & Exhibition Center, provided an excellent platform for industry leaders to demonstrate their latest products and technologies.
      
      Our booth featured interactive displays of our advanced steel building systems, including:
      - Pre-engineered Building Systems
      - Sustainable Construction Solutions
      - Smart Building Technologies
      - Energy-efficient Building Components
      
      The exhibition allowed us to connect with industry professionals, showcase our commitment to innovation, and demonstrate how our solutions are contributing to Saudi Arabia's construction sector development.
    `,
    url: '/news/saudi-build-2024',
    category: 'News',
    subcategory: 'Exhibition',
    tags: ['exhibition', 'saudi build', 'innovation', 'construction']
  }
];

// Convert news articles to searchable items
const newsItems = newsArticles.map(article => ({
  title: article.title,
  description: article.description,
  content: article.content,
  url: article.url,
  category: article.category,
  subcategory: article.subcategory,
  tags: article.tags
}));

// Static page content
const staticContent = [
  {
    title: 'About Hexa Steel®',
    description: 'Building the future with innovative steel solutions and uncompromising quality since 1998.',
    content: `
      Since our establishment in 1998, Hexa Steel® has been at the forefront of steel construction innovation in Saudi Arabia. We've grown from a small local operation to a leading regional provider of steel construction solutions.

      Our state-of-the-art facility, spanning over 50,000 square meters, is equipped with the latest technology in steel fabrication and manufacturing. This enables us to deliver projects of any scale with precision and efficiency.

      We take pride in our contribution to Saudi Arabia's development, having participated in numerous landmark projects across the kingdom. Our commitment to quality and innovation has earned us the trust of major clients in both public and private sectors.

      Our Mission:
      To deliver innovative and sustainable steel construction solutions that exceed client expectations, while maintaining the highest standards of quality, safety, and environmental responsibility.

      Our Vision:
      To be the leading steel construction company in the Middle East, recognized for excellence in innovation, quality, and customer service, while contributing to the region's sustainable development.
    `,
    url: '/about',
    category: 'Company',
    subcategory: 'About Us',
    tags: ['about', 'company', 'mission', 'vision', 'history', 'facility', 'saudi arabia']
  },
  // Knowledge Center
  {
    title: 'Materials and Grades',
    description: 'Comprehensive guide to steel materials and grades used in construction.',
    url: '/knowledge/materials-and-grades',
    category: 'Knowledge Center',
    tags: ['materials', 'grades', 'steel']
  },
  {
    title: 'Technical Specifications',
    description: 'Detailed technical specifications for steel building components and systems.',
    url: '/knowledge/technical-specifications',
    category: 'Knowledge Center',
    tags: ['technical', 'specifications', 'components']
  },
  {
    title: 'Engineering Software Guides',
    description: 'Guides for using engineering software in steel structure design and analysis.',
    url: '/knowledge/software-guides',
    category: 'Knowledge Center',
    tags: ['software', 'engineering', 'design']
  },
  {
    title: 'Building Components Guide',
    description: 'Learn about Purlins, Girts, Eave Struts, Rafters, and Joists in steel construction.',
    url: '/knowledge/building-components',
    category: 'Knowledge Center',
    tags: ['building', 'components', 'steel']
  },
  {
    title: 'Building Types and Parameters',
    description: 'Understanding different steel building types: Single Span, Multi-span, Multi-gable, Lean-to, and Cantilever.',
    url: '/knowledge/building-types',
    category: 'Knowledge Center',
    tags: ['building', 'types', 'parameters']
  },
  
  // Jobs
  {
    title: 'Steel Structure QC Engineer',
    description: 'Quality Control Engineer position with 4-5 years of experience in steel structures.',
    url: '/careers#JOB2409-0010',
    category: 'Careers',
    tags: ['jobs', 'engineering', 'quality control']
  },
  {
    title: 'Steel Structure QC Inspector',
    description: 'Quality Control Inspector position with 6-8 years of experience in steel structures.',
    url: '/careers#JOB2411-0023',
    category: 'Careers',
    tags: ['jobs', 'inspection', 'quality control']
  },
  {
    title: 'Steel Structure Senior Production Engineer',
    description: 'Senior Production Engineer position with 8-10 years of experience in steel structures.',
    url: '/careers#JOB2412-0029',
    category: 'Careers',
    tags: ['jobs', 'production', 'engineering']
  },
  {
    title: 'Steel Structure Fabricator',
    description: 'Fabricator position with 10 years of experience in steel structures.',
    url: '/careers#JOB2409-0013',
    category: 'Careers',
    tags: ['jobs', 'fabrication', 'steel']
  },
  
  // Products
  {
    title: 'Pre-Engineered Steel Buildings',
    description: 'Custom-designed steel buildings for industrial, commercial, and agricultural use.',
    url: '/products/pre-engineered-buildings',
    category: 'Products',
    tags: ['products', 'steel', 'buildings']
  },
  {
    title: 'Steel Structure Components',
    description: 'High-quality steel components including columns, beams, and connections.',
    url: '/products/components',
    category: 'Products',
    tags: ['products', 'steel', 'components']
  },
  {
    title: 'Structural Systems',
    description: 'Complete structural systems for various building applications.',
    url: '/products/structural-systems',
    category: 'Products',
    tags: ['products', 'structural', 'systems']
  },
  
  // Initiatives
  {
    title: 'Hexa Academy',
    description: 'Professional development and training programs for steel construction.',
    url: '/initiatives/hexa-academy',
    category: 'Initiatives',
    tags: ['initiatives', 'academy', 'training']
  },
  {
    title: 'Sustainability Initiative',
    description: 'Our commitment to sustainable steel construction practices.',
    url: '/initiatives/sustainability',
    category: 'Initiatives',
    tags: ['initiatives', 'sustainability', 'steel']
  },

  // Additional Pages
  {
    title: 'Contact Us',
    description: 'Get in touch with our team for inquiries, support, or business opportunities.',
    url: '/contact',
    category: 'Company',
    tags: ['contact', 'support', 'inquiries']
  },
  {
    title: 'Factory Capabilities',
    description: 'Explore our state-of-the-art manufacturing facilities and production capabilities.',
    url: '/factory-capabilities',
    category: 'Company',
    tags: ['factory', 'capabilities', 'manufacturing']
  },
  {
    title: 'FAQ',
    description: 'Frequently asked questions about our products, services, and steel construction.',
    url: '/faq',
    category: 'Support',
    tags: ['faq', 'help', 'support']
  },
  {
    title: 'News',
    description: 'Latest updates, announcements, and news from Hexa Steel®.',
    url: '/news',
    category: 'News',
    tags: ['news', 'updates', 'announcements']
  },
  {
    title: 'PSF Participation 2024',
    description: 'Hexa Steel® participation in the PSF Exhibition 2024.',
    url: '/news/psf-participation-2024',
    category: 'News',
    tags: ['news', 'psf', 'exhibition']
  },
  {
    title: 'Blog',
    description: 'Industry insights, technical articles, and updates from our experts.',
    url: '/blog',
    category: 'Blog',
    tags: ['blog', 'insights', 'articles']
  },
  {
    title: 'Projects',
    description: 'Showcase of our completed and ongoing steel construction projects.',
    url: '/projects',
    category: 'Projects',
    tags: ['projects', 'steel', 'construction']
  },
  {
    title: 'Products Overview',
    description: 'Complete range of our steel construction products and solutions.',
    url: '/products',
    category: 'Products',
    tags: ['products', 'overview', 'steel']
  },
  {
    title: 'Careers at Hexa Steel®',
    description: 'Join our team of steel construction professionals. View current job openings and opportunities.',
    url: '/careers',
    category: 'Careers',
    tags: ['careers', 'jobs', 'steel']
  },
  {
    title: 'Initiatives Overview',
    description: 'Our initiatives for industry development, sustainability, and community engagement.',
    url: '/initiatives',
    category: 'Initiatives',
    tags: ['initiatives', 'overview', 'sustainability']
  },
  {
    title: 'Knowledge Center',
    description: 'Technical resources, guides, and documentation for steel construction.',
    url: '/knowledge',
    category: 'Knowledge Center',
    tags: ['knowledge', 'center', 'steel']
  }
];

// Combine all searchable content
const searchableContent = [
  ...articleItems,
  ...initiativeItems,
  ...factoryItems,
  ...newsItems,
  ...staticContent
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q: query } = req.query;
  console.log('Received search query:', query);

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Split search terms and search for any match
    const searchTerms = query.toLowerCase().split(/\s+/);
    console.log('Search terms:', searchTerms);

    const results = searchableContent.filter(item => {
      const searchText = `
        ${item.title} 
        ${item.description} 
        ${item.content || ''} 
        ${item.tags?.join(' ') || ''} 
        ${item.category} 
        ${item.subcategory || ''}
      `.toLowerCase();

      return searchTerms.some(term => searchText.includes(term));
    });

    console.log(`Found ${results.length} results`);

    // Sort results by relevance
    results.sort((a, b) => {
      const aText = `${a.title} ${a.description}`.toLowerCase();
      const bText = `${b.title} ${b.description}`.toLowerCase();

      // Count matches in title and description
      const aMatches = searchTerms.filter(term => aText.includes(term)).length;
      const bMatches = searchTerms.filter(term => bText.includes(term)).length;

      // If match counts differ, sort by count
      if (aMatches !== bMatches) {
        return bMatches - aMatches;
      }

      // If match counts are equal, prioritize title matches
      const aTitleMatches = searchTerms.filter(term => a.title.toLowerCase().includes(term)).length;
      const bTitleMatches = searchTerms.filter(term => b.title.toLowerCase().includes(term)).length;

      return bTitleMatches - aTitleMatches;
    });

    // Format results for display
    const formattedResults = results.map(({ title, description, url, category }) => ({
      title,
      description,
      url,
      category
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error performing search' });
  }
}
