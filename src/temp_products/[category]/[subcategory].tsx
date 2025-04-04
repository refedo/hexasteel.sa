import { GetStaticPaths, GetStaticProps } from 'next';
import { productCategories } from '@/data/product-details';
import ProductLayout from '@/components/products/ProductLayout';
import { motion } from 'framer-motion';

interface Props {
  category: string;
  subcategory: string;
  data: any;
}

export default function SubcategoryPage({ category, subcategory, data }: Props) {
  if (!data) return null;

  return (
    <ProductLayout
      title={data.name}
      description={data.description}
      breadcrumbs={[
        { name: category, href: `/products/${category}` },
        { name: data.name, href: `/products/${category}/${subcategory}` },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Features</h2>
          <div className="space-y-6">
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

        {/* Applications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.applications.map((application: string, index: number) => (
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
                <span className="ml-3 text-gray-900">{application}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </ProductLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = productCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      params: {
        category: category.id,
        subcategory: subcategory.id,
      },
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = productCategories.find((cat) => cat.id === params?.category);
  const subcategory = category?.subcategories.find(
    (sub) => sub.id === params?.subcategory
  );

  if (!category || !subcategory) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: category.title,
      subcategory: subcategory.id,
      data: subcategory,
    },
  };
};
