import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/Layout';
import { PlusIcon, StarIcon } from '@heroicons/react/24/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Testimonial {
  _id: string;
  clientName: string;
  companyName: string;
  position: string;
  content: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: string;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTestimonials();
  }, [filter]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`/api/testimonials?status=${filter}`);
      const data = await response.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Failed to update testimonial status:', error);
    }
  };

  const handleFeaturedToggle = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTestimonials(testimonials.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage client testimonials and reviews for your steel structure projects.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/testimonials/new"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-2" />
            Add Testimonial
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex space-x-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Testimonials</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <li key={testimonial._id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {testimonial.featured && (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 mr-2">
                            Featured
                          </span>
                        )}
                        <p className="truncate text-sm font-medium text-blue-600">
                          {testimonial.clientName}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                          testimonial.status === 'approved' ? 'bg-green-100 text-green-800' :
                          testimonial.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {testimonial.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <p className="text-sm text-gray-600">{testimonial.companyName}</p>
                        <span className="mx-2 text-gray-500">•</span>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                      <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-end space-x-4">
                      {testimonial.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(testimonial._id, 'approved')}
                            className="text-green-600 hover:text-green-900 text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(testimonial._id, 'rejected')}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleFeaturedToggle(testimonial._id, testimonial.featured)}
                        className="text-yellow-600 hover:text-yellow-900 text-sm font-medium"
                      >
                        {testimonial.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <Link
                        href={`/admin/testimonials/${testimonial._id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
