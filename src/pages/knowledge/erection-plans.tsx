import { NextPage } from 'next';
import Head from 'next/head';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

const erectionPhases = [
  {
    title: 'Pre-erection Planning',
    items: [
      'Site survey and preparation',
      'Equipment and resource planning',
      'Temporary bracing requirements',
      'Lifting plan development',
      'Safety protocol establishment'
    ]
  },
  {
    title: 'Foundation Interface',
    items: [
      'Anchor bolt layout verification',
      'Base plate elevation check',
      'Grouting specifications',
      'Foundation-structure interface details'
    ]
  },
  {
    title: 'Main Frame Erection',
    items: [
      'Column installation sequence',
      'Rafter/beam placement methodology',
      'Temporary support requirements',
      'Connection torque specifications',
      'Alignment and leveling procedures'
    ]
  },
  {
    title: 'Secondary Elements',
    items: [
      'Purlin and girt installation',
      'Bracing system implementation',
      'Cladding support system',
      'Integration of building systems'
    ]
  }
];

const ErectionPlansPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Erection Plans | Hexasteel</title>
        <meta 
          name="description" 
          content="Detailed steel structure erection plans and assembly sequences" 
        />
      </Head>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="inline-flex items-center space-x-2">
              <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Erection Plans
              </h1>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our detailed erection plans ensure safe and efficient assembly of steel structures,
              providing step-by-step guidance for successful project execution.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {erectionPhases.map((phase) => (
                <div 
                  key={phase.title}
                  className="rounded-lg bg-gray-50 p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {phase.title}
                  </h2>
                  <ul className="space-y-3">
                    {phase.items.map((item) => (
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg bg-primary-50 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Professional Erection Documentation
              </h2>
              <p className="text-gray-700 mb-4">
                Our erection plans include detailed drawings, 3D visualizations, and comprehensive
                documentation to guide the construction team through every phase of the project.
                Each plan is developed by experienced structural engineers and reviewed for safety
                and efficiency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Plan Components</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Detailed assembly sequences</li>
                    <li>• Equipment specifications</li>
                    <li>• Critical lift plans</li>
                    <li>• Safety requirements</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Quality Assurance</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Engineer review and approval</li>
                    <li>• Compliance verification</li>
                    <li>• Regular plan updates</li>
                    <li>• Progress monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErectionPlansPage;
