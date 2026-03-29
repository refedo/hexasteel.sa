import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  featured: boolean;
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });

      if (response.ok) {
        setProducts(
          products.map(product =>
            product.id === id ? { ...product, featured: !featured } : product
          )
        );
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Products Admin - Hexa Steel</title>
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
                  <Link href="/admin-bypass/projects" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Projects
                  </Link>
                  <Link href="/admin-bypass/testimonials" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Testimonials
                  </Link>
                  <Link href="/admin-bypass/blog" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Blog
                  </Link>
                  <Link href="/admin-bypass/products" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Products</h1>
              <Link href="/admin-bypass/products/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add New Product
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
                    <p className="mt-4 text-gray-500">Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12 bg-white shadow rounded-lg">
                    <p className="text-gray-500">No products found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="relative h-48 w-full">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gray-200">
                              <p className="text-gray-500">No image</p>
                            </div>
                          )}
                          {product.featured && (
                            <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="px-4 py-4">
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                          <div className="mt-4 flex justify-between">
                            <button
                              onClick={() => toggleFeatured(product.id, product.featured)}
                              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                                product.featured
                                  ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                              }`}
                            >
                              {product.featured ? 'Unfeature' : 'Feature'}
                            </button>
                            <div className="flex space-x-2">
                              <Link
                                href={`/admin-bypass/products/${product.id}`}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                              >
                                <PencilIcon className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                              >
                                <TrashIcon className="h-4 w-4 mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
