import { useState } from 'react';
import { useRouter } from 'next/router';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProjectFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    client: '',
    location: '',
    category: '',
    status: 'Planned',
    completionDate: '',
    scope: [],
    specifications: {},
    images: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing 
        ? `/api/projects/${initialData._id}`
        : '/api/projects';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/projects');
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        if (errorData.fields) {
          const fieldErrors = Object.entries(errorData.fields)
            .map(([field, message]) => `${field}: ${message}`)
            .join('\n');
          throw new Error(`Validation errors:\n${fieldErrors}`);
        } else {
          throw new Error(errorData.details || errorData.error || 'Failed to save project');
        }
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert(`Failed to save project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const formData = new FormData();
    for (let i = 0; i <files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newImages = data.urls.map((url: string) => ({
          url: url,
          caption: ''
        }));
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isEditing ? 'Edit Project' : 'New Project'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the project details below.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
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
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
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
                  value={formData.client}
                  onChange={e => setFormData({ ...formData, client: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
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
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Industrial Buildings">Industrial Buildings</option>
                  <option value="Commercial Buildings">Commercial Buildings</option>
                  <option value="Warehouses">Warehouses</option>
                  <option value="Sports Facilities">Sports Facilities</option>
                  <option value="Agricultural Buildings">Agricultural Buildings</option>
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
                  value={formData.completionDate ? new Date(formData.completionDate).toISOString().split('T')[0] : ''}
                  onChange={e => setFormData({ ...formData, completionDate: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Project Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                    >
                      <span>Upload images</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              {/* Image Preview */}
              {formData.images && formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {formData.images.map((image: { url: string; caption: string }, index: number) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                        <img
                          src={image.url}
                          alt={`Project image ${index + 1}`}
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                      <input
                        type="text"
                        placeholder="Add caption"
                        value={image.caption}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[index] = { ...image, caption: e.target.value };
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}
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
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </div>
    </form>
  );
}
