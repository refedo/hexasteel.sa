import { NextPage } from 'next';
import Head from 'next/head';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';

const qcElements = [
  {
    title: 'Quality Control Procedures',
    items: [
      'Material verification and traceability',
      'Welding procedure specifications (WPS)',
      'Non-destructive testing (NDT)',
      'Dimensional control',
      'Surface preparation and coating'
    ]
  },
  {
    title: 'Documentation Control',
    items: [
      'Material certificates',
      'Inspection reports',
      'Test results',
      'Non-conformance reports',
      'Corrective action records'
    ]
  },
  {
    title: 'Quality Assurance',
    items: [
      'Internal quality audits',
      'External certification maintenance',
      'Staff qualification verification',
      'Equipment calibration records',
      'Process improvement tracking'
    ]
  }
];

const standards = [
  'ISO 9001:2015 Quality Management System',
  'AWS D1.1 Structural Welding Code - Steel',
  'AISC 360 Specification for Structural Steel Buildings',
  'ASTM International Standards',
  'EN 1090 Execution of Steel Structures'
];

const QCPlansPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quality Control Plans | Hexasteel</title>
        <meta 
          name="description" 
          content="Comprehensive quality control plans ensuring excellence in steel fabrication and construction" 
        />
      </Head>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="inline-flex items-center space-x-2">
              <DocumentChartBarIcon className="h-8 w-8 text-primary-600" />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Quality Control Plans
              </h1>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our comprehensive quality control plans ensure consistent excellence across all projects,
              from material procurement to final installation.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {qcElements.map((element) => (
                <div 
                  key={element.title}
                  className="rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {element.title}
                  </h2>
                  <ul className="space-y-3">
                    {element.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-primary-600 mt-0.5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-lg bg-primary-50 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  International Standards Compliance
                </h2>
                <ul className="space-y-3">
                  {standards.map((standard) => (
                    <li key={standard} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-primary-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-700">{standard}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-gray-50 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quality Management Process
                </h2>
                <p className="text-gray-700 mb-4">
                  Our quality control process follows a systematic approach to ensure consistent
                  quality across all projects:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Planning and requirement review</li>
                  <li>Resource allocation and training</li>
                  <li>Process control implementation</li>
                  <li>Inspection and testing</li>
                  <li>Documentation and reporting</li>
                  <li>Continuous improvement</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QCPlansPage;
