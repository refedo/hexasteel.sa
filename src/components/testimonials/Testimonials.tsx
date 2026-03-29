import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    quote: 'Hexa Steel\'s commitment to quality and timely delivery has been exceptional. Their pre-engineered building solutions have significantly improved our project timelines.',
    author: 'Mohammed Al-Saud',
    position: 'Project Director',
    company: 'Saudi Construction Co.',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The expertise and professionalism demonstrated by the Hexa Steel team are unmatched. They have consistently delivered high-quality steel structures that meet our exact specifications.',
    author: 'Ahmed Al-Rashid',
    position: 'Chief Engineer',
    company: 'Gulf Development Group',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Working with Hexa Steel has been a game-changer for our infrastructure projects. Their innovative solutions and attention to detail are remarkable.',
    author: 'Fahad Al-Omar',
    position: 'Operations Manager',
    company: 'Arabian Industrial Solutions',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-xl p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonials[currentIndex].author}</h3>
                  <p className="text-gray-600">{testimonials[currentIndex].position} at {testimonials[currentIndex].company}</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg mb-6">"{testimonials[currentIndex].quote}"</p>
              
              <div className="flex items-center space-x-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
