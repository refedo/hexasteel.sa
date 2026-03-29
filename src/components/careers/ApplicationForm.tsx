import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ApplicationFormProps {
  isOpen: boolean;
  jobTitle: string;
  jobId: string;
  onClose: () => void;
}

export default function ApplicationForm({ isOpen, jobTitle, jobId, onClose }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    resume: null as File | null,
    coverLetter: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });
      formDataToSend.append('jobId', jobId);
      formDataToSend.append('jobTitle', jobTitle);

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        // Reset form after 3 seconds and close modal
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            experience: '',
            resume: null,
            coverLetter: '',
          });
          setSubmitSuccess(false);
          onClose();
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                {submitSuccess ? (
                  <div className="text-center">
                    <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">Application Submitted Successfully!</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Thank you for applying to Hexa Steel®. We will review your application and contact you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                      <div className="w-full">
                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                          Apply for {jobTitle}
                        </Dialog.Title>
                        <div className="flex items-center space-x-2 mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-base font-medium text-gray-500">Position ID:</span>
                          <span className="text-xl font-semibold text-primary-600">{jobId}</span>
                        </div>

                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800 font-medium">
                            <span className="font-bold">Important Notice:</span> Previous experience in the steel structure industry is mandatory for this position. Applications without relevant strong background in the field will not be considered.
                          </p>
                        </div>

                        {errorMessage && (
                          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{errorMessage}</p>
                          </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name *
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email *
                              </label>
                              <input
                                type="email"
                                id="email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                              Years of Experience *
                            </label>
                            <input
                              type="number"
                              id="experience"
                              required
                              min="0"
                              max="50"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                              value={formData.experience}
                              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                              Resume/CV (PDF) *
                            </label>
                            <input
                              type="file"
                              id="resume"
                              required
                              accept=".pdf"
                              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                              onChange={handleFileChange}
                            />
                          </div>

                          <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                              Cover Letter
                            </label>
                            <textarea
                              id="coverLetter"
                              rows={4}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                              value={formData.coverLetter}
                              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                            />
                          </div>

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus:ring-primary-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={onClose}
                              disabled={isSubmitting}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
