import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ProjectDetailsProps {
  project: {
    id: string;
    title: string;
    description: string;
    location: string;
    client: string;
    completionDate: string;
    category: string;
    status?: string;
    images: Array<{
      url: string;
      caption: string;
    }>;
  };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(project.images[0]?.url);

  return (
    <>
      <Head>
        <title>{project.title} - Hexasteel Projects</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              {project.status === 'Completed' && (
                <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  <CheckCircleIcon className="h-4 w-4" />
                  Completed
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{new Date(project.completionDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
              <div className="relative aspect-video">
                <Image
                  src={selectedImage || project.images[0]?.url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {project.images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="grid grid-cols-6 gap-4">
                    {project.images.map((image) => (
                      <button
                        key={image.url}
                        onClick={() => setSelectedImage(image.url)}
                        className={`relative aspect-video rounded-lg overflow-hidden ${
                          selectedImage === image.url
                            ? 'ring-2 ring-primary-500'
                            : 'hover:opacity-80'
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={image.caption || project.title}
                          fill
                          sizes="(max-width: 768px) 16vw, 10vw"
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
                  <p className="text-gray-600 whitespace-pre-line">{project.description}</p>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Category</dt>
                      <dd className="mt-1 text-lg text-gray-900">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Client</dt>
                      <dd className="mt-1 text-lg text-gray-900">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-lg text-gray-900">{project.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Completion Date</dt>
                      <dd className="mt-1 text-lg text-gray-900">
                        {new Date(project.completionDate).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-12 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/contact'}
                  className="btn-primary"
                >
                  Start Your Project
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4500'}/api/projects/${params?.id}`
    );
    const project = await response.json();

    if (!project || project.error) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return {
      notFound: true,
    };
  }
};
