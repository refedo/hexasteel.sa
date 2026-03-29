import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface TestimonialFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function TestimonialForm({ initialData, isEditing = false }: TestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(initialData || {
    clientName: '',
    companyName: '',
    position: '',
    content: '',
    rating: 5,
    projectReference: '',
    industry: '',
    location: '',
    status: 'pending',
    featured: false,
  });

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing 
        ? `/api/testimonials/${initialData.id}`
        : '/api/testimonials';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/testimonials');
      } else {
        throw new Error('Failed to save testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'clientImage' | 'companyLogo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          [type]: data.url,
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isEditing ? 'Edit Testimonial' : 'New Testimonial'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a client testimonial to showcase your work and build trust.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="clientName"
                  id="clientName"
                  value={formData.clientName}
                  onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
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
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="industry"
                  id="industry"
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
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
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="mt-1 flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    {star <= formData.rating ? (
                      <StarIcon className="h-6 w-6 text-yellow-400" />
                    ) : (
                      <StarOutlineIcon className="h-6 w-6 text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="projectReference" className="block text-sm font-medium text-gray-700">
                Related Project
              </label>
              <div className="mt-1">
                <select
                  id="projectReference"
                  name="projectReference"
                  value={formData.projectReference}
                  onChange={e => setFormData({ ...formData, projectReference: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a project</option>
                  {projects.map((project: any) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
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
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex items-center">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Feature this testimonial
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Testimonial' : 'Create Testimonial'}
          </button>
        </div>
      </div>
    </form>
  );
}
