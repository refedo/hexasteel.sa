import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: Array<{
    url: string;
    isPrimary: boolean;
  }>;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
