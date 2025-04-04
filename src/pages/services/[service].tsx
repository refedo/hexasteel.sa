import { GetStaticPaths, GetStaticProps } from 'next';
import { services } from '@/data/product-details';
import ProductLayout from '@/components/products/ProductLayout';
import { motion } from 'framer-motion';

interface Props {
  service: string;
  data: any;
}

export default function ServicePage({ service, data }: Props) {
  if (!data) return null;

  return (
    <ProductLayout
      title={data.title}
      description={data.longDescription}
      breadcrumbs={[{ name: data.title, href: `/services/${data.id}` }]}
    >
      <div className="space-y-12">
        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.map((feature: any, index: number) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Process</h2>
          <div className="space-y-8">
            {data.process.map((step: any, index: number) => (
              <div key={index} className="relative flex items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                  {step.step}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
                {index < data.process.length - 1 && (
                  <div className="absolute top-12 left-6 h-full w-px bg-primary-100" />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Benefits</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.benefits.map((benefit: string, index: number) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-100 text-primary-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <span className="ml-3 text-gray-900">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </ProductLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = services.map((service) => ({
    params: { service: service.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const service = services.find((s) => s.id === params?.service);

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service: service.title,
      data: service,
    },
  };
};
