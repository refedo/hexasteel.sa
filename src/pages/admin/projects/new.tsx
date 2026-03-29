import { NextPage } from 'next';
import Head from 'next/head';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminLayout from '@/components/admin/Layout';

const NewProject: NextPage = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Add New Project - Admin Dashboard</title>
      </Head>
      
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Project</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <ProjectForm />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProject;
