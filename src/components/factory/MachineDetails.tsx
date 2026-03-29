import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IMachine } from '../../data/factoryCapabilities';

interface MachineDetailsProps {
  machine: IMachine;
  isOpen: boolean;
  onClose: () => void;
}

export default function MachineDetails({ machine, isOpen, onClose }: MachineDetailsProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="rounded-lg p-2 hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={machine.image}
                      alt={machine.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    {machine.name}
                  </Dialog.Title>

                  <p className="text-gray-600 mb-6">{machine.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Technical Specifications
                      </h4>
                      <dl className="space-y-3">
                        {Object.entries(machine.specifications).map(([key, value]) => (
                          <div key={key}>
                            <dt className="text-sm font-medium text-gray-500">{key}</dt>
                            <dd className="text-sm text-gray-900">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Capabilities
                      </h4>
                      <ul className="space-y-2">
                        {machine.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <span className="text-primary-500 mr-2">•</span>
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Maximum Capacity
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {machine.maxCapacity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Installation Year
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {machine.yearInstalled}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                    <p>Manufacturer: {machine.manufacturer}</p>
                    <p>Model: {machine.model}</p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
