import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProductFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: '',
    description: '',
    technicalSpecs: [],
    features: [],
    applications: [],
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'mm',
    },
    weight: {
      value: '',
      unit: 'kg',
    },
    materials: [],
    certifications: [],
    images: [],
    documents: [],
    customizationOptions: [],
    leadTime: '',
    minimumOrderQuantity: 1,
    status: 'active',
    featured: false,
    seoMeta: {
      title: '',
      description: '',
      keywords: [],
    },
  });

  const categories = [
    'Structural Steel',
    'Metal Buildings',
    'Steel Decking',
    'Roofing Systems',
    'Wall Panels',
    'Accessories',
    'Custom Solutions',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing 
        ? `/api/products/${initialData._id}`
        : '/api/products';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          images: [
            ...prev.images,
            ...data.urls.map((url: string) => ({
              url,
              alt: '',
              isPrimary: prev.images.length === 0,
            })),
          ],
        }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isEditing ? 'Edit Product' : 'New Product'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the product details below. All fields marked with * are required.
            </p>
          </div>

          {/* Basic Information */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Dimensions */}
            <div className="sm:col-span-6">
              <h4 className="text-sm font-medium text-gray-900">Dimensions *</h4>
              <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                    Length
                  </label>
                  <input
                    type="number"
                    name="length"
                    id="length"
                    value={formData.dimensions.length}
                    onChange={e => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, length: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                    Width
                  </label>
                  <input
                    type="number"
                    name="width"
                    id="width"
                    value={formData.dimensions.width}
                    onChange={e => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, width: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height
                  </label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    value={formData.dimensions.height}
                    onChange={e => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, height: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.dimensions.unit}
                    onChange={e => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, unit: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="inch">inch</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="sm:col-span-3">
              <h4 className="text-sm font-medium text-gray-900">Weight *</h4>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Value
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={formData.weight.value}
                    onChange={e => setFormData({
                      ...formData,
                      weight: { ...formData.weight, value: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="weightUnit" className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <select
                    id="weightUnit"
                    name="weightUnit"
                    value={formData.weight.unit}
                    onChange={e => setFormData({
                      ...formData,
                      weight: { ...formData.weight, unit: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status and Featured */}
            <div className="sm:col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="discontinued">Discontinued</option>
                    <option value="coming-soon">Coming Soon</option>
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Feature this product
                  </label>
                </div>
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
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>
    </form>
  );
}
