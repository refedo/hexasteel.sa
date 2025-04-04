import { Fragment, useState, useEffect } from 'react';
import { Dialog, Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

type SearchResult = {
  title: string;
  description: string;
  url: string;
  category: string;
};

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const searchItems = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        console.log('Searching for:', query);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        console.log('Search response status:', response.status);
        const data = await response.json();
        console.log('Search results:', data);
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchItems, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    router.push(result.url);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        title="Search (⌘K)"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>

      <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
        <Dialog onClose={setIsOpen} className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              as="div"
              className="mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
              onChange={(result: SearchResult) => handleSelect(result)}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Combobox.Input
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search across the website..."
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              {(results.length > 0 || isLoading) && (
                <Combobox.Options static className="max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-sm text-gray-500 text-center">
                      Searching...
                    </div>
                  ) : (
                    <ul className="p-2">
                      {results.map((result) => (
                        <Combobox.Option
                          key={result.url}
                          value={result}
                          className={({ active }) =>
                            `flex cursor-pointer select-none items-center rounded-md px-3 py-2 ${
                              active ? 'bg-primary-600 text-white' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ active }) => (
                            <>
                              <div className="flex-auto">
                                <p className={`text-sm font-medium ${active ? 'text-white' : 'text-gray-900'}`}>
                                  {result.title}
                                </p>
                                <p className={`text-sm ${active ? 'text-primary-100' : 'text-gray-500'}`}>
                                  {result.description}
                                </p>
                              </div>
                              <p className={`text-xs ${active ? 'text-primary-100' : 'text-gray-400'}`}>
                                {result.category}
                              </p>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </ul>
                  )}
                </Combobox.Options>
              )}

              {query && results.length === 0 && !isLoading && (
                <div className="p-6 text-center text-sm text-gray-500">
                  No results found for &quot;{query}&quot;
                </div>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
