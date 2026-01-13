'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Product Manager',
    company: 'Tech Innovators',
    content: "Working with Tirth was an absolute pleasure. His expertise in machine learning and attention to detail helped us deliver a groundbreaking AI solution that exceeded our expectations.",
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'CTO',
    company: 'DataFlow Solutions',
    content: "Tirth's ability to bridge the gap between complex AI concepts and practical implementation is remarkable. He delivered high-quality code and excellent documentation.",
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Lead Developer',
    company: 'Innovation Labs',
    content: "His passion for open-source contributions and collaborative approach made our project successful. Tirth brings both technical excellence and great communication skills.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen relative flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-16 sm:py-20 md:py-24"
    >
      {/* Section Title */}
      <motion.h3 
        className="text-2xl md:text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        What People Say
      </motion.h3>
      
      <motion.p 
        className="text-grayColor text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Here&apos;s what colleagues and clients have to say about working with me
      </motion.p>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            {/* Rating Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 italic text-sm sm:text-base">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <span className="text-white font-bold text-base sm:text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-darkBlack dark:text-white text-sm sm:text-base">
                  {testimonial.name}
                </p>
                <p className="text-xs sm:text-sm text-grayColor">
                  {testimonial.position} at {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-8 sm:mt-12 md:mt-16 text-center"
      >
        <p className="text-grayColor mb-4 sm:mb-6 text-sm sm:text-base">
          Ready to work together? Let&apos;s create something amazing!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Get In Touch
        </motion.button>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </motion.div>
  );
}