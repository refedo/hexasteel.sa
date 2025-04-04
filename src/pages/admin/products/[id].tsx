import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/Layout';
import ImageUpload from '../../../components/admin/ImageUpload';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ProductImage {
  url: string;
  isPrimary: boolean;
  title?: string;
  description?: string;
}

interface ProductForm {
  name: string;
  category: string;
  description: string;
  features: string[];
  applications: string[];
  status: string;
  specifications?: {
    dimensions?: {
      length: number;
      width: number;
      height: number;
      unit: string;
    };
    weight?: {
      value: number;
      unit: string;
    };
  };
  images: ProductImage[];
}

const categories = [
  { id: 'peb', name: 'Pre-Engineered Buildings' },
  { id: 'steel-structures', name: 'Steel Structures' },
  { id: 'structural', name: 'Structural Components' },
  { id: 'roofing', name: 'Roofing Systems' },
  { id: 'cladding', name: 'Cladding Solutions' },
  { id: 'accessories', name: 'Accessories' }
];

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'new';

  const [form, setForm] = useState<ProductForm>({
    name: '',
    category: '',
    description: '',
    features: [''],
    applications: [''],
    status: 'draft',
    images: []
  });

  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew && id) {
      fetchProduct();
    }
  }, [id, isNew]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/products${isNew ? '' : '/' + id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setForm(prev => ({
          ...prev,
          images: [...prev.images, {
            url,
            isPrimary: prev.images.length === 0,
            title: file.name
          }]
        }));
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSetPrimaryImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }))
    }));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {isNew ? 'Add New Product' : 'Edit Product'}
            </h1>

            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Features and Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Features</h2>
                {form.features.map((feature, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...form.features];
                        newFeatures[index] = e.target.value;
                        setForm({ ...form, features: newFeatures });
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = form.features.filter((_, i) => i !== index);
                        setForm({ ...form, features: newFeatures });
                      }}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, features: [...form.features, ''] })}
                  className="mt-2 text-sm text-primary-600 hover:text-primary-900"
                >
                  + Add Feature
                </button>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Applications</h2>
                {form.applications.map((application, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={application}
                      onChange={(e) => {
                        const newApplications = [...form.applications];
                        newApplications[index] = e.target.value;
                        setForm({ ...form, applications: newApplications });
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newApplications = form.applications.filter((_, i) => i !== index);
                        setForm({ ...form, applications: newApplications });
                      }}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, applications: [...form.applications, ''] })}
                  className="mt-2 text-sm text-primary-600 hover:text-primary-900"
                >
                  + Add Application
                </button>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Product Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {form.images.map((image, index) => (
                  <div key={index} className="relative">
                    <ImageUpload
                      currentImage={image.url}
                      onUpload={(file) => handleImageUpload(file)}
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryImage(index)}
                        className={`text-sm ${image.isPrimary ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                      >
                        {image.isPrimary ? 'Primary Image' : 'Set as Primary'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
                <div>
                  <ImageUpload
                    onUpload={handleImageUpload}
                    label="Add Image"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isNew ? 'Create Product' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
