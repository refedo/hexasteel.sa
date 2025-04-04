import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Tab } from '@headlessui/react';

interface ProductDetailsProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    technicalSpecs: Array<{
      name: string;
      value: string;
    }>;
    dimensions: {
      length: number;
      width: number;
      height: number;
      unit: string;
    };
    weight: {
      value: number;
      unit: string;
    };
    images: Array<{
      url: string;
      isPrimary: boolean;
    }>;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url
  );

  return (
    <>
      <Head>
        <title>{product.name} - Hexasteel</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedImage || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image) => (
                <button
                  key={image.url}
                  onClick={() => setSelectedImage(image.url)}
                  className={`aspect-square relative rounded-lg overflow-hidden ${
                    selectedImage === image.url ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>

            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-4">
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                      selected
                        ? 'bg-white text-primary shadow'
                        : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary'
                    }`
                  }
                >
                  Description
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                      selected
                        ? 'bg-white text-primary shadow'
                        : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary'
                    }`
                  }
                >
                  Technical Specs
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="text-gray-700">
                  <p>{product.description}</p>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="space-y-4">
                    {/* Dimensions */}
                    <div>
                      <h3 className="font-semibold mb-2">Dimensions</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Length</p>
                          <p>{product.dimensions.length} {product.dimensions.unit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Width</p>
                          <p>{product.dimensions.width} {product.dimensions.unit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Height</p>
                          <p>{product.dimensions.height} {product.dimensions.unit}</p>
                        </div>
                      </div>
                    </div>

                    {/* Weight */}
                    <div>
                      <h3 className="font-semibold mb-2">Weight</h3>
                      <p>{product.weight.value} {product.weight.unit}</p>
                    </div>

                    {/* Technical Specifications */}
                    <div>
                      <h3 className="font-semibold mb-2">Specifications</h3>
                      <div className="space-y-2">
                        {product.technicalSpecs.map((spec) => (
                          <div key={spec.name} className="grid grid-cols-2">
                            <p className="text-gray-500">{spec.name}</p>
                            <p>{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params?.slug}`
    );
    const product = await response.json();

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};
