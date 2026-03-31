import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { BriefcaseIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import ApplicationForm from '@/components/careers/ApplicationForm';
import SEO from '@/components/common/SEO';

interface Job {
  id: string;
  title: string;
  quantity: number;
  experience: string;
  department: string;
}

const jobs: Job[] = [
  {
    id: 'JOB2409-0010',
    title: 'Steel Structure QC Engineer',
    quantity: 1,
    experience: '4-5',
    department: 'Quality Control'
  },
  {
    id: 'JOB2411-0023',
    title: 'Steel Structure QC Inspector',
    quantity: 1,
    experience: '6-8',
    department: 'Quality Control'
  },
  {
    id: 'JOB2412-0029',
    title: 'Steel Structure Senior Production Engineer',
    quantity: 1,
    experience: '8-10',
    department: 'Production'
  },
  {
    id: 'JOB2409-0009',
    title: 'Sales Engineer',
    quantity: 2,
    experience: '4-5',
    department: 'Sales'
  },
  {
    id: 'JOB2411-0020',
    title: 'Document Controller',
    quantity: 1,
    experience: '6',
    department: 'Administration'
  },
  {
    id: 'JOB2411-0025',
    title: 'Office Boy',
    quantity: 1,
    experience: '5',
    department: 'Administration'
  },
  {
    id: 'JOB2409-0015',
    title: 'Store Keeper',
    quantity: 1,
    experience: '5',
    department: 'Warehouse'
  },
  {
    id: 'JOB2411-0021',
    title: 'Safety Officer',
    quantity: 1,
    experience: '4-5',
    department: 'HSE'
  },
  {
    id: 'JOB2411-0026',
    title: 'Project Manager',
    quantity: 1,
    experience: '10',
    department: 'Project Management'
  },
  {
    id: 'JOB2411-0022',
    title: 'Maintenance Technician',
    quantity: 1,
    experience: '8',
    department: 'Maintenance'
  },
  {
    id: 'JOB2411-0024',
    title: 'Forklift Driver',
    quantity: 1,
    experience: '3-5',
    department: 'Warehouse'
  },
  {
    id: 'JOB2409-0013',
    title: 'Steel Structure Fabricator',
    quantity: 5,
    experience: '10',
    department: 'Production'
  },
  {
    id: 'JOB2411-0019',
    title: 'Steel Structure Welder',
    quantity: 5,
    experience: '10',
    department: 'Production'
  }
];

const departments = Array.from(new Set(jobs.map(job => job.department))).sort();

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplicationFormOpen(true);
  };

  return (
    <>
      <SEO
        title="Careers - Join Our Team"
        description="Build your career with Hexa Steel®. Explore exciting job openings in steel construction, engineering, project management, quality control, and more in Saudi Arabia."
        canonical="/careers"
        keywords="Hexa Steel careers, steel construction jobs, engineering jobs Saudi Arabia, PEB jobs, steel fabrication careers"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Join Our Team
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Build your career with Hexa Steel® and be part of a team that's shaping the future of steel construction in Saudi Arabia.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                Current Opportunities
              </p>
            </div>
            <dl className="mt-10 text-center sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Open Positions
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-primary-600">
                  {jobs.reduce((acc, job) => acc + job.quantity, 0)}
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Departments
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-primary-600">
                  {departments.length}
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                  Locations
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-primary-600">
                  2
                </dd>
              </div>
            </dl>
          </div>

          {/* Filters */}
          <div className="mt-16 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Department
              </label>
              <select
                id="department"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Positions
              </label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Search by position or job ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.department}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {job.id}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <UserGroupIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <span>Positions: {job.quantity}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <span>Experience: {job.experience} years</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleApply(job)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <BriefcaseIcon className="h-5 w-5 mr-2" />
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No positions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Application Form Modal */}
      {selectedJob && (
        <ApplicationForm
          isOpen={isApplicationFormOpen}
          jobTitle={selectedJob.title}
          jobId={selectedJob.id}
          onClose={() => {
            setIsApplicationFormOpen(false);
            setSelectedJob(null);
          }}
        />
      )}
    </>
  );
}
