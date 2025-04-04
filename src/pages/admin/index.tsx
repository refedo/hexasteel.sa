import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/Layout';
import {
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  projects: number;
  clients: number;
  blogPosts: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    clients: 0,
    blogPosts: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      name: 'Total Projects',
      value: stats.projects,
      icon: BuildingOfficeIcon,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Active Clients',
      value: stats.clients,
      icon: UserGroupIcon,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Blog Posts',
      value: stats.blogPosts,
      icon: DocumentTextIcon,
      change: '+12.30%',
      changeType: 'positive',
    },
    {
      name: 'Testimonials',
      value: stats.testimonials,
      icon: ChartBarIcon,
      change: '+10.04%',
      changeType: 'positive',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{card.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {card.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            {/* Add recent activity content here */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
