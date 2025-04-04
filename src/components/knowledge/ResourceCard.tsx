import { motion } from 'framer-motion';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface ResourceCardProps {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
}

export default function ResourceCard({
  title,
  description,
  fileType,
  fileSize,
  downloadUrl,
}: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{fileType}</span>
            <span>{fileSize}</span>
          </div>
        </div>
        <a
          href={downloadUrl}
          download
          className="flex items-center justify-center w-12 h-12 bg-primary-50 rounded-full text-primary-500 hover:bg-primary-100 transition-colors duration-200"
        >
          <DocumentArrowDownIcon className="w-6 h-6" />
        </a>
      </div>
    </motion.div>
  );
}
