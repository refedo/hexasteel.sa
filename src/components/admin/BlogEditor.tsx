import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface BlogEditorProps {
  initialData?: any;
  isEditing?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'link', 'image', 'video',
];

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    coverImage: '',
    status: 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing 
        ? `/api/blog/${initialData._id}`
        : '/api/blog';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        throw new Error('Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          coverImage: data.url,
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create engaging content for your readers.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
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
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <div className="mt-1">
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows={3}
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description for the blog post.
              </p>
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
                  <option value="Industry News">Industry News</option>
                  <option value="Technology">Technology</option>
                  <option value="Case Studies">Case Studies</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sustainability">Sustainability</option>
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
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="mt-1">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={content => setFormData({ ...formData, content })}
                  modules={modules}
                  formats={formats}
                  className="h-96"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="tags"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Press Enter to add tags"
                  onKeyDown={handleTagInput}
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
                    >
                      <span className="sr-only">Remove {tag}</span>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  {formData.coverImage ? (
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="mx-auto h-32 w-auto object-cover"
                    />
                  ) : (
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="coverImage"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="coverImage"
                          name="coverImage"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  )}
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
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </div>
    </form>
  );
}
