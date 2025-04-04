import { NextPage } from 'next';
import Head from 'next/head';
import { DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const features = [
  'Detailed step-by-step procedures',
  'Equipment and tools specifications',
  'Material handling guidelines',
  'Quality control checkpoints',
  'Safety considerations',
  'Reference standards and codes'
];

const MethodStatementsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Method Statements | Hexasteel</title>
        <meta 
          name="description" 
          content="Comprehensive method statements for steel structure fabrication and erection processes" 
        />
      </Head>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="inline-flex items-center space-x-2">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Method Statements
              </h1>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our method statements provide detailed procedures for steel structure fabrication and erection processes,
              ensuring consistent quality and safe execution across all projects.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold leading-7 text-gray-900">
                  Key Components
                </h2>
                <div className="mt-4 space-y-4">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold leading-7 text-gray-900">
                  Why Our Method Statements Matter
                </h2>
                <p className="mt-4 text-gray-700">
                  Our method statements are developed by experienced engineers and reviewed by quality control experts.
                  They incorporate industry best practices, local regulations, and international standards to ensure:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li>• Consistent quality across all project phases</li>
                  <li>• Clear communication between project stakeholders</li>
                  <li>• Efficient resource utilization</li>
                  <li>• Risk mitigation and safety compliance</li>
                  <li>• Traceable and auditable processes</li>
                </ul>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default MethodStatementsPage;
