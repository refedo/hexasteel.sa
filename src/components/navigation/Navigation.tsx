import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../Logo';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import GlobalSearch from '../search/GlobalSearch';
import { navigation } from '@/data/navigation';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSubMenu = (menuName: string) => {
    setOpenSubMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Logo variant="light" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1 mx-8">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    <>
                      <div className="flex items-center">
                        <Link 
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-100 hover:text-blue-300 transition-colors duration-150"
                        >
                          {item.name}
                        </Link>
                        <button className="p-2 text-gray-100 hover:text-blue-300 transition-colors duration-150">
                          <ChevronDownIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150">
                        <div className="bg-gray-900 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            {item.children.map((child) => (
                              <div key={child.name} className="relative group/child">
                                {child.comingSoon ? (
                                  <div className="px-4 py-2 text-sm text-gray-400 flex items-center justify-between">
                                    {child.name}
                                    <span className="bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full text-xs">
                                      Soon
                                    </span>
                                  </div>
                                ) : (
                                  <div className="relative">
                                    <Link
                                      href={child.href}
                                      className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-800 hover:text-blue-300"
                                    >
                                      <span className="flex items-center justify-between">
                                        {child.name}
                                        {child.children && (
                                          <ChevronRightIcon className="ml-2 h-4 w-4" />
                                        )}
                                      </span>
                                    </Link>

                                    {child.children && (
                                      <div className="absolute left-full top-0 ml-1 w-56 opacity-0 invisible group-hover/child:opacity-100 group-hover/child:visible transition duration-150">
                                        <div className="bg-gray-900 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                          <div className="py-1">
                                            {child.children.map((subChild) => (
                                              <div key={subChild.name} className="relative group/grandchild">
                                                <Link
                                                  href={subChild.href}
                                                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-800 hover:text-blue-300"
                                                >
                                                  {subChild.name}
                                                </Link>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-gray-100 hover:text-blue-300 transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Search Component */}
            <div className="flex items-center ml-4">
              <GlobalSearch />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-100 hover:text-blue-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleSubMenu(item.name)}
                        className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                        <ChevronDownIcon
                          className={`ml-2 h-5 w-5 transition-transform ${
                            openSubMenus.includes(item.name) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openSubMenus.includes(item.name) && (
                        <div className="pl-4">
                          {item.children.map((child) => (
                            <div key={child.name}>
                              {child.comingSoon ? (
                                <div className="px-3 py-2 text-base text-gray-500">
                                  {child.name} (Coming Soon)
                                </div>
                              ) : (
                                <Link
                                  href={child.href}
                                  className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                                >
                                  {child.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
