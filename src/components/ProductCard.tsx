import Image from 'next/image';
import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div className="aspect-square relative">
          <Image
            src={primaryImage?.url || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <button className="mt-3 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
