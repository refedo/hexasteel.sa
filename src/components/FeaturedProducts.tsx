import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  images: Array<{
    url: string;
    isPrimary: boolean;
  }>;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products?featured=true&limit=4');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 aspect-square rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <ProductGrid products={products} />
    </div>
  );
}
