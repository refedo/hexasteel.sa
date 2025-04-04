import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  _id: string;
  clientName: string;
  companyName: string;
  position: string;
  content: string;
  rating: number;
  clientImage?: string;
  companyLogo?: string;
  industry?: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?status=approved&featured=true');
      const data = await response.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear what our clients say about their experience working with us
          </p>
        </div>

        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentIndex}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
                <svg
                  className="h-8 w-8 text-blue-600 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Content */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-6">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center">
                {testimonials[currentIndex].clientImage ? (
                  <img
                    src={testimonials[currentIndex].clientImage}
                    alt={testimonials[currentIndex].clientName}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold text-lg">
                      {testimonials[currentIndex].clientName[0]}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[currentIndex].clientName}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].position} at {testimonials[currentIndex].companyName}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No testimonials available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
