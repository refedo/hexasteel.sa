import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { teamMembers } from '@/data/team';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';
import { PhotoIcon } from '@heroicons/react/24/outline';

const TeamPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Our Team | Hexasteel</title>
        <meta name="description" content="Meet the experienced team behind Hexasteel's success in steel building construction." />
      </Head>

      <Layout>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Team</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Meet the dedicated professionals who make Hexasteel a leader in steel building construction.
              </p>
            </div>
            <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {teamMembers.map((member) => (
                <li key={member.id} className="flex flex-col items-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-100 mb-6">
                    {member.image ? (
                      <Image
                        className="object-cover"
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 192px, 192px"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <PhotoIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
                      </div>
                    )}
                    {member.linkedinUrl && (
                      <Link
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <FaLinkedin className="w-4 h-4 text-blue-600" />
                      </Link>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{member.name}</h3>
                    <p className="text-base leading-7 text-blue-600">{member.position}</p>
                    <p className="mt-4 text-base leading-7 text-gray-600 max-w-xs mx-auto text-justify">{member.bio}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TeamPage;
