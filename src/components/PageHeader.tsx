import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-gray-900/90 to-gray-800/90" />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-200">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
