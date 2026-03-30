import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProjectFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      console.log('Initializing form with data:', initialData);
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        client: initialData.client || '',
        location: initialData.location || '',
        category: initialData.category || '',
        status: initialData.status || 'Planned',
        completionDate: initialData.completionDate || '',
        scope: Array.isArray(initialData.scope) ? initialData.scope : [],
        specifications: initialData.specifications || {},
        images: Array.isArray(initialData.images) ? initialData.images : [],
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Submitting project with data:', formData);
    console.log('Images being submitted:', formData.images);

    try {
      const url = isEditing 
        ? `/api/projects/${initialData.id}`
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

    setIsUploading(true);
    setUploadProgress(0);

    const uploadFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadFormData.append('images', files[i]);
    }

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const data = await response.json();
        console.log('Upload response:', data);
        
        const newImages = data.urls.map((url: string) => ({
          url: url,
          caption: ''
        }));
        
        console.log('New images to add:', newImages);
        
        setFormData(prev => {
          const updated = {
            ...prev,
            images: [...prev.images, ...newImages],
          };
          console.log('Updated form data with images:', updated);
          return updated;
        });

        // Reset upload state after a brief delay
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', response.status, errorData);
        alert(`Failed to upload images: ${errorData.error || 'Unknown error'}`);
        setIsUploading(false);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert(`Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsUploading(false);
      setUploadProgress(0);
    }

    // Reset file input
    e.target.value = '';
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
                <div className="space-y-1 text-center w-full">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className={`relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <span>{isUploading ? 'Uploading...' : 'Upload images'}</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  
                  {/* Upload Progress Bar */}
                  {isUploading && (
                    <div className="mt-4 w-full max-w-xs mx-auto">
                      <div className="bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{uploadProgress}%</p>
                    </div>
                  )}
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
          {isUploading && (
            <p className="mr-4 text-sm text-orange-600 self-center">
              ⚠️ Please wait for image upload to complete
            </p>
          )}
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className={`ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting || isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </div>
    </form>
  );
}
