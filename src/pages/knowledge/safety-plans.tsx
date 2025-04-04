import { NextPage } from 'next';
import Head from 'next/head';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const safetyElements = [
  {
    title: 'Risk Assessment',
    items: [
      'Hazard identification',
      'Risk evaluation methods',
      'Control measures',
      'Emergency procedures',
      'Regular safety audits'
    ]
  },
  {
    title: 'Personal Protection',
    items: [
      'PPE requirements',
      'Safety equipment specifications',
      'Training requirements',
      'Compliance monitoring',
      'Equipment maintenance'
    ]
  },
  {
    title: 'Site Safety',
    items: [
      'Access control',
      'Traffic management',
      'Working at heights',
      'Lifting operations',
      'Fire prevention'
    ]
  },
  {
    title: 'Emergency Response',
    items: [
      'Emergency contacts',
      'Evacuation procedures',
      'First aid provisions',
      'Incident reporting',
      'Emergency drills'
    ]
  }
];

const SafetyPlansPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Safety Plans | Hexasteel</title>
        <meta 
          name="description" 
          content="Comprehensive safety plans and protocols for steel construction projects" 
        />
      </Head>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="inline-flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Safety Plans
              </h1>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our comprehensive safety plans ensure the well-being of all personnel and compliance
              with international safety standards.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {safetyElements.map((element) => (
                <div 
                  key={element.title}
                  className="rounded-lg bg-gray-50 p-8 hover:shadow-lg transition-shadow duration-300"
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

            <div className="mt-12">
              <div className="rounded-lg bg-primary-50 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Safety Commitment
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Standards Compliance</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• OSHA regulations</li>
                      <li>• ISO 45001:2018</li>
                      <li>• Local safety codes</li>
                      <li>• Industry best practices</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Safety Culture</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Regular safety meetings</li>
                      <li>• Continuous training</li>
                      <li>• Employee engagement</li>
                      <li>• Proactive risk management</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Safety Performance Monitoring
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-sm text-gray-600">Safety Compliance</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Safety Monitoring</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
                    <div className="text-sm text-gray-600">Lost Time Incidents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SafetyPlansPage;
