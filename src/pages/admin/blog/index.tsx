import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/Layout';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  status: 'draft' | 'published';
  publishedAt: string;
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setPosts(posts.map(post => 
          post._id === id ? { ...post, status: newStatus } : post
        ));
      }
    } catch (error) {
      console.error('Failed to update post status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Blog Posts</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your blog posts, including drafts and published content.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/blog/new"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-2" />
            New Post
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
                      Title
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Author
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Published Date
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-gray-500">{post.excerpt}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {post.author}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {post.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <button
                          onClick={() => handleStatusToggle(post._id, post.status)}
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.status}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link
                          href={`/blog/${post._id}`}
                          className="text-gray-600 hover:text-gray-900 mr-4"
                          target="_blank"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => router.push(`/admin/blog/${post._id}/edit`)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
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
