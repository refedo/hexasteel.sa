import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { connectToDatabase } from '@/lib/mongodb';
import { format } from 'date-fns';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  DocumentDownloadIcon
} from '@heroicons/react/24/outline';

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  experience: string;
  resumePath: string;
  coverLetter: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  createdAt: string;
}

interface Props {
  applications: Application[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Add authentication check here
  const { db } = await connectToDatabase();
  
  const applications = await db
    .collection('jobApplications')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return {
    props: {
      applications: JSON.parse(JSON.stringify(applications))
    }
  };
};

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  reviewed: 'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

export default function Applications({ applications }: Props) {
  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.status === statusFilter));
    }
  }, [statusFilter, applications]);

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/careers/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicationId, status: newStatus }),
      });

      if (response.ok) {
        // Refresh the page to get updated data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Job Applications - Hexa Steel® Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all job applications received through the careers page.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 mb-8">
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Applications</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Applications List */}
          <div className="mt-8 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Applicant
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Position
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Applied On
                        </th>
                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredApplications.map((application) => (
                        <tr key={application._id}>
                          <td className="whitespace-nowrap px-3 py-4">
                            <div className="flex flex-col">
                              <div className="font-medium text-gray-900">
                                {application.firstName} {application.lastName}
                              </div>
                              <div className="text-gray-500">{application.email}</div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4">
                            <div className="flex flex-col">
                              <div className="text-gray-900">{application.jobTitle}</div>
                              <div className="text-gray-500">{application.jobId}</div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[application.status]}`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            {format(new Date(application.createdAt), 'MMM d, yyyy')}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => updateApplicationStatus(application._id, 'shortlisted')}
                                className="text-green-600 hover:text-green-900"
                              >
                                <CheckCircleIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(application._id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                              {application.resumePath && (
                                <a
                                  href={application.resumePath}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  <DocumentDownloadIcon className="h-5 w-5" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
