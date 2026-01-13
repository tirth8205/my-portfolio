'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export default function ProgressIndicator() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Find active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );

      const currentSection = sectionElements.find(element => {
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="relative">
        {/* Vertical Progress Line */}
        <div className="w-0.5 h-80 bg-slate-200 dark:bg-slate-700 rounded-full relative">
          {/* Progress Fill */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent rounded-full"
            style={{ height: `${scrollProgress}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${scrollProgress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          
        </div>
      </div>
    </div>
  );
}