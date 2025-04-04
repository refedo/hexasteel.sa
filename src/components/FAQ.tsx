import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What types of steel structures do you manufacture?',
    answer: 'We manufacture a wide range of steel structures including industrial buildings, warehouses, commercial complexes, steel bridges, high-rise buildings, and custom steel solutions. Our capabilities extend to both standard and specialized designs to meet specific project requirements.'
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary depending on the scope and complexity of the work. Typically, small to medium projects take 2-3 months from design to completion, while larger projects may take 4-6 months. We provide detailed timelines during the initial consultation phase.'
  },
  {
    question: 'Do you provide installation services?',
    answer: 'Yes, we offer comprehensive installation services with our experienced team of professionals. We handle everything from site preparation to final assembly, ensuring proper installation and adherence to safety standards.'
  },
  {
    question: 'What quality standards do you follow?',
    answer: 'We adhere to international quality standards including ISO 9001:2015 and follow strict quality control procedures. All our steel structures are manufactured using high-grade materials and undergo rigorous testing to ensure durability and safety.'
  },
  {
    question: 'Can you handle custom design requirements?',
    answer: 'Absolutely! We specialize in custom steel structure solutions. Our engineering team works closely with clients to understand their specific needs and develops tailored designs that meet both functional requirements and aesthetic preferences.'
  },
  {
    question: 'What warranty do you offer on your structures?',
    answer: 'We provide a standard 10-year warranty on structural integrity and a 5-year warranty on fabrication quality. Additional warranty options are available based on project specifications and requirements.'
  },
  {
    question: 'Do you provide maintenance services?',
    answer: 'Yes, we offer comprehensive maintenance services including regular inspections, repairs, and preventive maintenance programs. Our maintenance team ensures your steel structure remains in optimal condition throughout its lifecycle.'
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full py-6 text-left flex justify-between items-start focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-6 flex-shrink-0"
        >
          <ChevronDownIcon className="h-6 w-6 text-primary-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our steel structure solutions and services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg"
          >
            <div className="divide-y divide-gray-200 px-6">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </motion.div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="btn-primary"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
