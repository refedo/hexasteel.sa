import Link from 'next/link';
import { useRouter } from 'next/router';
import GlobalSearch from '../search/GlobalSearch';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-30 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/images/logo.png"
                alt="Hexa Steel"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className={`text-base font-medium ${
                router.pathname.startsWith('/products')
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Products
            </Link>
            <Link
              href="/knowledge"
              className={`text-base font-medium ${
                router.pathname.startsWith('/knowledge')
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Knowledge Center
            </Link>
            <Link
              href="/initiatives"
              className={`text-base font-medium ${
                router.pathname.startsWith('/initiatives')
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Initiatives
            </Link>
            <Link
              href="/careers"
              className={`text-base font-medium ${
                router.pathname.startsWith('/careers')
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Careers
            </Link>
          </nav>

          {/* Search and Contact */}
          <div className="flex items-center space-x-4">
            <GlobalSearch />
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
