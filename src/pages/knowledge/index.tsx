import Head from 'next/head';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ArticleList from '../../components/knowledge/ArticleList';
import DocumentationShowcase from '../../components/knowledge/DocumentationShowcase';
import StructureShowcase from '../../components/knowledge/StructureShowcase';
import ComponentsShowcase from '../../components/knowledge/ComponentsShowcase';

const categories = [
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Professional documentation and quality control procedures.',
    subcategories: ['Method Statements', 'ITP', 'Erection Plans', 'QC Plans', 'Safety Plans']
  },
  {
    id: 'materials_and_grades',
    name: 'Materials & Grades',
    description: 'Comprehensive information about steel grades, specifications, and material properties.',
    subcategories: ['Steel Grades', 'Coating Types', 'Material Properties']
  },
  {
    id: 'building_components',
    name: 'Building Components',
    description: 'Detailed technical information about various building components and their applications.',
    subcategories: ['Purlins', 'Girts', 'Eave Struts', 'Rafters', 'Joists', 'Columns', 'Bracing']
  },
  {
    id: 'building_types',
    name: 'Building Types',
    description: 'Learn about different types of pre-engineered building configurations.',
    subcategories: ['Single Span', 'Multi-span', 'Multi-gable', 'Lean-to', 'Cantilever']
  },
  {
    id: 'technical_specifications',
    name: 'Technical Specifications',
    description: 'Engineering specifications, load calculations, and technical standards.',
    subcategories: ['Design Standards', 'Load Calculations', 'Connection Details']
  },
  {
    id: 'engineering_software',
    name: 'Engineering Software',
    description: 'Guides and resources for engineering software used in steel building design.',
    subcategories: ['Design Software', 'Analysis Tools', 'BIM Integration']
  }
];

export default function KnowledgeCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Knowledge Center - HexaSteel</title>
        <meta name="description" content="Technical documentation and resources for steel building components, specifications, and engineering." />
      </Head>

      {/* Hero Section */}
      <div className="bg-primary-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Knowledge Center</h1>
          <p className="text-primary-100 text-lg mb-8">
            Comprehensive technical documentation for steel building systems, materials, and engineering specifications.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl relative">
            <input
              type="text"
              placeholder="Search technical documentation..."
              className="w-full px-4 py-3 rounded-lg pl-12 bg-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tab.Group onChange={(index) => {
          setSelectedCategory(categories[index]);
          setSelectedSubcategory('all');
        }}>
          <Tab.List className="flex space-x-4 border-b border-gray-200">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                    selected
                      ? 'bg-white text-primary-600 border-t border-l border-r border-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {/* Documentation Panel */}
            <Tab.Panel>
              <DocumentationShowcase />
            </Tab.Panel>

            {/* Other Panels */}
            {categories.slice(1).map((category) => (
              <Tab.Panel key={category.id}>
                <div className="mt-8">
                  {/* Subcategory Filter */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedSubcategory === 'all'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All
                    </button>
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => setSelectedSubcategory(subcategory)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                          selectedSubcategory === subcategory
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>

                  {/* Show appropriate showcase based on category */}
                  {category.id === 'building_types' ? (
                    <StructureShowcase />
                  ) : category.id === 'building_components' ? (
                    <ComponentsShowcase />
                  ) : (
                    <ArticleList 
                      category={category.id} 
                      subcategory={selectedSubcategory} 
                    />
                  )}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
