import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Certification {
  id: string;
  name: string;
  category: string;
  description: string;
  validUntil: string;
  icon: string;
  benefits: string[];
  order: number;
  active: boolean;
}

const emptyForm = {
  name: '',
  category: 'Quality Management',
  description: '',
  validUntil: '',
  icon: '',
  benefits: [] as string[],
  order: 0,
  active: true,
};

export default function CertificationsAdmin() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState(emptyForm);
  const [benefitsText, setBenefitsText] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
    else if (status === 'authenticated') fetchItems();
  }, [status]);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/certifications');
      if (res.ok) setItems(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...formData, benefits: benefitsText.split('\n').filter(b => b.trim()) };
    const url = editing ? `/api/certifications/${editing.id}` : '/api/certifications';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      fetchItems();
      resetForm();
      setMessage(editing ? 'Certification updated' : 'Certification added');
    }
  };

  const handleEdit = (item: Certification) => {
    setEditing(item);
    setFormData({ name: item.name, category: item.category, description: item.description, validUntil: item.validUntil, icon: item.icon, benefits: item.benefits, order: item.order, active: item.active });
    setBenefitsText(item.benefits.join('\n'));
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
    if (res.ok) fetchItems();
  };

  const handleSeed = async () => {
    if (!confirm('Seed certifications from site data? Existing entries are skipped.')) return;
    setSeeding(true);
    const res = await fetch('/api/certifications/seed', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      setMessage(`Seeded ${data.added} certification(s). ${data.skipped} already existed.`);
      fetchItems();
    } else {
      setMessage('Failed to seed certifications');
    }
    setSeeding(false);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setBenefitsText('');
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
            <p className="text-gray-600">Manage certifications displayed on the Certifications page</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSeed} disabled={seeding} className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 text-sm">
              {seeding ? 'Seeding...' : 'Seed from Site Data'}
            </button>
            <button onClick={() => setShowForm(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Certification
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded-lg ${message.includes('added') || message.includes('updated') || message.includes('Seeded') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Certification' : 'Add Certification'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category *</label>
                  <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                  <input type="text" placeholder="e.g. 2026 or Ongoing" value={formData.validUntil} onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon (emoji)</label>
                  <input type="text" placeholder="e.g. 🏅" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Order</label>
                  <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div className="flex items-center mt-6">
                  <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="h-4 w-4 text-blue-600 rounded" />
                  <label className="ml-2 text-sm text-gray-900">Active (visible on site)</label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description *</label>
                  <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Benefits (one per line)</label>
                  <textarea rows={4} value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)} placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 ? (
            <div className="col-span-3 bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No certifications yet.{' '}
              <button onClick={handleSeed} className="text-blue-600 hover:underline">Seed from site data</button>{' '}
              or add manually.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 p-1"><PencilIcon className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon className="h-4 w-4" /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Valid: {item.validUntil || 'N/A'}</span>
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{item.active ? 'Active' : 'Hidden'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
