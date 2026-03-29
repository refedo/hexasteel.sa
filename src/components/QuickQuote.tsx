import { useState } from 'react';
import { motion } from 'framer-motion';

export function QuickQuote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'meters',
    },
    location: '',
    timeline: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectTypes = [
    'Industrial Building',
    'Commercial Building',
    'Warehouse',
    'Sports Facility',
    'Agricultural Building',
    'Custom Project',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/quick-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          dimensions: {
            length: '',
            width: '',
            height: '',
            unit: 'meters',
          },
          location: '',
          timeline: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quick-quote" className="py-24 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get a Quick Quote
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll provide you with a quick estimate for your steel structure project
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Project Location *
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Dimensions */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Dimensions
                </label>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder="Length"
                      value={formData.dimensions.length}
                      onChange={(e) => setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, length: e.target.value }
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Width"
                      value={formData.dimensions.width}
                      onChange={(e) => setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, width: e.target.value }
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Height"
                      value={formData.dimensions.height}
                      onChange={(e) => setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, height: e.target.value }
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.dimensions.unit}
                      onChange={(e) => setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, unit: e.target.value }
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="meters">Meters</option>
                      <option value="feet">Feet</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                  Project Timeline
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (1-2 months)</option>
                  <option value="soon">Soon (3-6 months)</option>
                  <option value="planning">Planning Stage (6+ months)</option>
                </select>
              </div>

              <div className="col-span-full">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Please provide any additional details about your project..."
                />
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
                Thank you! We've received your quote request and will get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                There was an error submitting your request. Please try again later.
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Get Quote'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
