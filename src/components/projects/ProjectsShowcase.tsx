import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  images: Array<{
    url: string;
    caption: string;
  }>;
}

const categories = [
  'All',
  'Industrial Buildings',
  'Commercial Buildings',
  'Warehouses',
  'Sports Facilities',
  'Agricultural Buildings'
];

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        // Make sure we're using the projects array from the response
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
          <p className="text-lg text-gray-600">Discover our latest construction projects</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center text-gray-600">
            No projects found in this category.
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={item}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
