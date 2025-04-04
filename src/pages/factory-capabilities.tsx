import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { productionLines } from '../data/factoryCapabilities';
import MachineDetails from '../components/factory/MachineDetails';
import Hero from '../components/common/Hero';
import type { IMachine } from '../data/factoryCapabilities';
import { 
  CogIcon, 
  ChartBarIcon, 
  ClockIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

export default function FactoryCapabilities() {
  const [selectedLine, setSelectedLine] = useState(productionLines[0]);
  const [selectedMachine, setSelectedMachine] = useState<IMachine | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Factory Capabilities - HexaSteel</title>
        <meta 
          name="description" 
          content="Explore HexaSteel's state-of-the-art manufacturing facilities and machinery capabilities." 
        />
      </Head>

      {/* Hero Section */}
      <Hero
        title="Factory Capabilities"
        subtitle="Our state-of-the-art manufacturing facility is equipped with the latest technology to deliver high-quality steel building components with precision and efficiency."
      />

      {/* Overview Stats */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <CogIcon className="w-8 h-8 text-primary-500" />
                <h3 className="text-lg font-semibold ml-3">Production Lines</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-gray-600">Specialized manufacturing lines</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <ChartBarIcon className="w-8 h-8 text-primary-500" />
                <h3 className="text-lg font-semibold ml-3">Daily Capacity</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">330</p>
              <p className="text-gray-600">Tons per day</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <ClockIcon className="w-8 h-8 text-primary-500" />
                <h3 className="text-lg font-semibold ml-3">Operating Hours</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">24/7</p>
              <p className="text-gray-600">Continuous operation</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <CheckBadgeIcon className="w-8 h-8 text-primary-500" />
                <h3 className="text-lg font-semibold ml-3">Quality Certifications</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">5+</p>
              <p className="text-gray-600">International standards</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Production Lines */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tab.Group onChange={(index) => setSelectedLine(productionLines[index])}>
            <Tab.List className="flex space-x-4 border-b border-gray-200 mb-8">
              {productionLines.map((line) => (
                <Tab
                  key={line.id}
                  className={({ selected }) =>
                    `px-6 py-3 text-sm font-medium rounded-t-lg focus:outline-none transition-colors duration-200 ${
                      selected
                        ? 'bg-white text-primary-600 border-t border-l border-r border-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    }`
                  }
                >
                  {line.name}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {productionLines.map((line) => (
                <Tab.Panel key={line.id}>
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{line.name}</h2>
                        <p className="text-gray-600 mb-6">{line.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Processes</h3>
                            <ul className="space-y-2">
                              {line.processes.map((process) => (
                                <li key={process} className="flex items-center text-gray-600">
                                  <CheckBadgeIcon className="w-5 h-5 text-primary-500 mr-2" />
                                  {process}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                            <ul className="space-y-2">
                              {line.certifications.map((cert) => (
                                <li key={cert} className="flex items-center text-gray-600">
                                  <CheckBadgeIcon className="w-5 h-5 text-primary-500 mr-2" />
                                  {cert}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-primary-50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-primary-900 mb-2">Daily Production Capacity</h3>
                          <p className="text-primary-700 text-2xl font-bold">{line.dailyCapacity}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Equipment</h3>
                        <div className="space-y-6">
                          {line.machines.map((machine) => (
                            <div 
                              key={machine.id} 
                              className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
                              onClick={() => setSelectedMachine(machine)}
                            >
                              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                <Image
                                  src={machine.image}
                                  alt={machine.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-between">
                                {machine.name}
                                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-primary-500" />
                              </h4>
                              <p className="text-gray-600 text-sm mb-4">{machine.description}</p>
                              <div className="space-y-2">
                                <p className="text-sm"><span className="font-medium">Model:</span> {machine.model}</p>
                                <p className="text-sm"><span className="font-medium">Max Capacity:</span> {machine.maxCapacity}</p>
                                <p className="text-sm"><span className="font-medium">Year:</span> {machine.yearInstalled}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      {/* Machine Details Modal */}
      {selectedMachine && (
        <MachineDetails
          machine={selectedMachine}
          isOpen={!!selectedMachine}
          onClose={() => setSelectedMachine(null)}
        />
      )}
    </div>
  );
}
