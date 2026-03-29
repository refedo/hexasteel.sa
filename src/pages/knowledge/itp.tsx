import { NextPage } from 'next';
import Head from 'next/head';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

const inspectionPoints = [
  {
    phase: 'Material Reception',
    checks: [
      'Material certification verification',
      'Dimensional checks',
      'Visual inspection',
      'Material marking and traceability'
    ]
  },
  {
    phase: 'Fabrication',
    checks: [
      'Cutting accuracy',
      'Fit-up inspection',
      'Welding procedure qualification',
      'NDT testing requirements',
      'Surface preparation'
    ]
  },
  {
    phase: 'Assembly',
    checks: [
      'Component alignment',
      'Bolt torque verification',
      'Welding inspection',
      'Dimensional accuracy',
      'Surface treatment'
    ]
  },
  {
    phase: 'Final Inspection',
    checks: [
      'Final dimensional check',
      'Coating thickness measurement',
      'Documentation review',
      'Client inspection points'
    ]
  }
];

const ITPPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inspection and Test Plans (ITP) | Hexasteel</title>
        <meta 
          name="description" 
          content="Comprehensive inspection and test plans ensuring quality control throughout the steel fabrication process" 
        />
      </Head>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="inline-flex items-center space-x-2">
              <ClipboardDocumentCheckIcon className="h-8 w-8 text-primary-600" />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Inspection and Test Plans (ITP)
              </h1>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our comprehensive Inspection and Test Plans ensure rigorous quality control at every stage
              of the steel fabrication and erection process.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {inspectionPoints.map((phase) => (
                <div 
                  key={phase.phase}
                  className="rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {phase.phase}
                  </h2>
                  <ul className="space-y-3">
                    {phase.checks.map((check) => (
                      <li key={check} className="flex items-start">
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
                        <span className="text-gray-700">{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg bg-primary-50 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Our Quality Commitment
              </h2>
              <p className="text-gray-700">
                Every ITP is tailored to project specifications and includes hold points, witness points,
                and verification steps agreed upon with clients and third-party inspectors. Our ITPs comply
                with international standards including ISO 9001, AWS D1.1, and relevant ASTM specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ITPPage;
