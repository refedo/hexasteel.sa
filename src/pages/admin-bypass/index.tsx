import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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

export default function AdminBypassDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    clients: 0,
    blogPosts: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate stats for now
        setStats({
          projects: 12,
          clients: 8,
          blogPosts: 24,
          testimonials: 15,
        });
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
    <>
      <Head>
        <title>Admin Dashboard - Hexa Steel</title>
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
                  <Link href="/admin-bypass" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
                  <Link href="/admin-bypass/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
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
                <div className="mt-8 bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                    <div className="mt-4">
                      <p className="text-gray-500">No recent activity to display.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
