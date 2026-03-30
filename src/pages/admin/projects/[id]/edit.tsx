import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminLayout from '@/components/admin/Layout';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface EditProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    client: string;
    location: string;
    category: string;
    status: string;
    completionDate: string;
    scope: string[];
    specifications: Record<string, string>;
    images: Array<{ url: string; caption: string; }>;
  };
}

const EditProject: NextPage<EditProjectProps> = ({ project }) => {
  return (
    <AdminLayout>
      <Head>
        <title>Edit Project - Admin Dashboard</title>
      </Head>
      
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Project</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <ProjectForm initialData={project} isEditing={true} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Check authentication
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    const project = await prisma.project.findUnique({
      where: { id: context.params?.id as string },
      include: { images: true }
    });

    if (!project) {
      return {
        notFound: true,
      };
    }

    // Serialize for Next.js
    const serializedProject = JSON.parse(JSON.stringify(project));
    
    console.log('Project data being sent to edit page:', {
      id: serializedProject.id,
      title: serializedProject.title,
      imagesCount: serializedProject.images?.length || 0,
      images: serializedProject.images
    });
    
    return {
      props: {
        project: {
          ...serializedProject,
          completionDate: new Date(serializedProject.completionDate).toISOString().split('T')[0],
        },
      },
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return {
      notFound: true,
    };
  }
};

export default EditProject;
