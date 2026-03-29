import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  category: string;
  completionDate: string;
  featured: boolean;
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        
        if (response.ok) {
          setProjects(data);
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter(project => project.id !== id));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete project');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again.');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });

      if (response.ok) {
        setProjects(
          projects.map(project =>
            project.id === id ? { ...project, featured: !featured } : project
          )
        );
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update project');
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Projects Admin - Hexa Steel</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-gray-800">Hexa Steel Admin</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/admin-bypass" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/admin-bypass/projects" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Projects
                  </Link>
                  <Link href="/admin-bypass/testimonials" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Testimonials
                  </Link>
                  <Link href="/admin-bypass/blog" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Blog
                  </Link>
                  <Link href="/admin-bypass/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Projects</h1>
              <Link href="/admin-bypass/projects/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add New Project
              </Link>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                {error && (
                  <div className="rounded-md bg-red-50 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                {loading ? (
                  <div className="text-center py-12">
                    <div className="spinner"></div>
                    <p className="mt-4 text-gray-500">Loading projects...</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-12 bg-white shadow rounded-lg">
                    <p className="text-gray-500">No projects found.</p>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {projects.map((project) => (
                        <li key={project.id}>
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                  {project.title}
                                </p>
                                {project.featured && (
                                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => toggleFeatured(project.id, project.featured)}
                                  className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                                    project.featured
                                      ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                  }`}
                                >
                                  {project.featured ? 'Unfeature' : 'Feature'}
                                </button>
                                <Link
                                  href={`/admin-bypass/projects/${project.id}`}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                >
                                  <PencilIcon className="h-4 w-4 mr-1" />
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(project.id)}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                                >
                                  <TrashIcon className="h-4 w-4 mr-1" />
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  {project.category}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  {project.client}
                                </p>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <p>
                                  {project.location} • Completed{' '}
                                  {format(new Date(project.completionDate), 'MMM yyyy')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
