import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/Layout';

interface ProjectForm {
  title: string;
  description: string;
  location: string;
  client: string;
  completionDate: string;
  category: string;
  scope: string[];
  specifications: any;
  status: string;
  featured: boolean;
  images: string[];
}

export default function ProjectEdit() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'new';
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    location: '',
    client: '',
    completionDate: '',
    category: '',
    scope: [''],
    specifications: {},
    status: 'Planned',
    featured: false,
    images: []
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchProject();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      
      // Ensure data conforms to our ProjectForm interface
      const projectData: ProjectForm = {
        title: data.title || '',
        description: data.description || '',
        location: data.location || '',
        client: data.client || '',
        completionDate: data.completionDate ? new Date(data.completionDate).toISOString().split('T')[0] : '',
        category: data.category || '',
        scope: Array.isArray(data.scope) ? data.scope : [''],
        specifications: data.specifications || {},
        status: data.status || 'Planned',
        featured: data.featured || false,
        images: Array.isArray(data.images) ? data.images.map(img => img.url) : []
      };
      
      setForm(projectData);
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleScopeChange = (index: number, value: string) => {
    const newScope = [...form.scope];
    newScope[index] = value;
    setForm(prev => ({ ...prev, scope: newScope }));
  };

  const addScopeItem = () => {
    setForm(prev => ({ ...prev, scope: [...prev.scope, ''] }));
  };

  const removeScopeItem = (index: number) => {
    const newScope = form.scope.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, scope: newScope.length ? newScope : [''] }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, images: [...prev.images, value] }));
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the data for submission
    const formattedData = {
      ...form,
      completionDate: new Date(form.completionDate).toISOString(),
      // Convert image URLs to image objects for API
      images: form.images.map(url => ({ url }))
    };
    
    try {
      const response = await fetch(`/api/projects${isNew ? '' : '/' + id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              {isNew ? 'Add New Project' : 'Edit Project'}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {isNew
                ? 'Create a new steel structure project.'
                : 'Update the details of an existing project.'}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="client"
                    id="client"
                    value={form.client}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
                  Completion Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="completionDate"
                    id="completionDate"
                    value={form.completionDate}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Project Scope</label>
                {form.scope.map((item, index) => (
                  <div key={index} className="mt-1 flex items-center">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleScopeChange(index, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeScopeItem(index)}
                      className="ml-2 inline-flex items-center rounded border border-transparent bg-red-100 p-1 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addScopeItem}
                  className="mt-2 inline-flex items-center rounded border border-transparent bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Scope Item
                </button>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <div className="mt-1">
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    onChange={handleImageChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {form.images.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100">
                        <img src={url} alt="" className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl opacity-0 group-hover:opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Featured project
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-5 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/projects')}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isNew ? 'Create' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
