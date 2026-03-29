import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/Layout';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  client: string;
  completionDate: string;
  category: string;
  scope: string[];
  specifications?: any;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  images?: { id: string; url: string; caption?: string }[];
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter(project => project.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your steel structure projects, including details, images, and specifications.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/projects/new"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-2" />
            Add Project
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Project Title
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Client
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Location
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {project.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.client}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.category}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
