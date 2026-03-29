import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/Layout';

interface TestimonialForm {
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  avatar?: string;
  featured: boolean;
  projectId?: string;
}

interface Project {
  id: string;
  title: string;
}

export default function TestimonialEdit() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'new';
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<TestimonialForm>({
    name: '',
    company: '',
    position: '',
    content: '',
    rating: 5,
    avatar: '',
    featured: false,
    projectId: '',
  });

  useEffect(() => {
    fetchProjects();
    if (id && id !== 'new') {
      fetchTestimonial();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchTestimonial = async () => {
    try {
      const response = await fetch(`/api/testimonials/${id}`);
      const data = await response.json();
      
      // Ensure data conforms to our TestimonialForm interface
      const testimonialData: TestimonialForm = {
        name: data.name || '',
        company: data.company || '',
        position: data.position || '',
        content: data.content || '',
        rating: data.rating || 5,
        avatar: data.avatar || '',
        featured: data.featured || false,
        projectId: data.projectReference?.id || '',
      };
      
      setForm(testimonialData);
    } catch (error) {
      console.error('Failed to fetch testimonial:', error);
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

  const handleRatingChange = (rating: number) => {
    setForm(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/testimonials${isNew ? '' : '/' + id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push('/admin/testimonials');
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              {isNew ? 'Add New Testimonial' : 'Edit Testimonial'}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {isNew
                ? 'Create a new client testimonial for your projects.'
                : 'Update the details of an existing testimonial.'}
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
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Client Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    value={form.position}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
                  Related Project
                </label>
                <div className="mt-1">
                  <select
                    id="projectId"
                    name="projectId"
                    value={form.projectId || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">None</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Testimonial Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    value={form.content}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                  Avatar URL (optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="avatar"
                    id="avatar"
                    value={form.avatar || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="mt-1 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={`h-6 w-6 ${
                        star <= form.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
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
                    Featured testimonial
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-5 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/testimonials')}
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
