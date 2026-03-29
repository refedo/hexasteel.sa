import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/Layout';

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
}

interface User {
  id: string;
  name: string;
}

export default function BlogEdit() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'new';
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<BlogForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [''],
    image: '',
    featured: false
  });

  useEffect(() => {
    fetchUsers();
    if (id && id !== 'new') {
      fetchBlogPost();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      const data = await response.json();
      
      // Ensure data conforms to our BlogForm interface
      const blogData: BlogForm = {
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category || '',
        tags: Array.isArray(data.tags) ? data.tags : [''],
        image: data.image || '',
        featured: data.featured || false
      };
      
      setForm(blogData);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
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

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...form.tags];
    newTags[index] = value;
    setForm(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setForm(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    const newTags = form.tags.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, tags: newTags.length ? newTags : [''] }));
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    setForm(prev => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate slug if empty
    if (!form.slug && form.title) {
      generateSlug();
    }
    
    try {
      const response = await fetch(`/api/blog${isNew ? '' : '/' + id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Failed to save blog post:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              {isNew ? 'Create New Blog Post' : 'Edit Blog Post'}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {isNew
                ? 'Create a new blog post for your website.'
                : 'Update the details of an existing blog post.'}
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
                  Title
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

              <div className="sm:col-span-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={form.slug}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="ml-3 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Generate
                  </button>
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
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Featured Image URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={form.image || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <div className="mt-1">
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={2}
                    value={form.excerpt}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief summary of your blog post. This will be displayed in blog listings.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={10}
                    value={form.content}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                {form.tags.map((tag, index) => (
                  <div key={index} className="mt-1 flex items-center">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
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
                  onClick={addTag}
                  className="mt-2 inline-flex items-center rounded border border-transparent bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Tag
                </button>
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
                    Featured post
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-5 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/blog')}
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
