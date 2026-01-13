// components/Projects.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Project } from "../types";
import SanityImage from "./SanityImage";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper to check for valid Sanity image asset reference
  const isValidImage = (image: any) => {
    return image && (image.asset?._ref || image._ref);
  };

  // Handler for scroll events to update the current project index
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.clientWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(newIndex);
      // Hide swipe hint after first scroll
      if (showSwipeHint) setShowSwipeHint(false);
    }
  }, [showSwipeHint]);

  // Effect to add and remove scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Function to scroll to a specific project index
  const scrollTo = useCallback((index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < (projects?.length || 0)) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  }, [projects?.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        scrollTo(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < (projects?.length || 0) - 1) {
        scrollTo(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, projects?.length, scrollTo]);

  // Hide swipe hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen relative flex flex-col items-center text-left max-w-full mx-auto z-0 overflow-hidden 
                 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6" // Overall section padding
    >
      {/* Section Title */}
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24
                     uppercase tracking-[6px] sm:tracking-[8px]
                     text-gray-500 text-lg sm:text-xl md:text-2xl">
        Projects
      </h3>

      {/* Container for the carousel system */}
      <div className="relative w-full flex-1 flex flex-col items-center overflow-hidden mt-2 sm:mt-4">

        {/* Desktop Navigation Arrows */}
        <div className="absolute z-30 top-1/2 transform -translate-y-1/2 w-full px-4 justify-between hidden md:flex">
          {currentIndex > 0 && (
            <button onClick={() => scrollTo(currentIndex - 1)} className="bg-primary text-white p-3 rounded-full hover:bg-secondary transition-colors" aria-label="Previous project">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div className="flex-grow"></div> {/* Spacer */}
          {currentIndex < (projects?.length || 0) - 1 && (
            <button onClick={() => scrollTo(currentIndex + 1)} className="bg-primary text-white p-3 rounded-full hover:bg-secondary transition-colors ml-auto" aria-label="Next project">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>

        {/* Carousel Viewport */}
        <div
          ref={scrollContainerRef}
          className="w-full h-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 
                     scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80"
        >
          {projects?.map((project, i) => (
            // Individual Project Slide
            <div
              key={project._id}
              className="w-full h-full flex-shrink-0 snap-center flex flex-col items-center 
                         p-4 pt-6 sm:p-5 sm:pt-6 md:p-6 md:pt-8 box-border" // Use w-full, padding adjusted
            >
              {/* Project Image Container */}
              <div className="relative h-24 sm:h-28 md:h-36 lg:h-40 xl:h-44 
                              w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 
                              mx-auto flex-shrink-0 mb-2 sm:mb-3 md:mb-4">
                {isValidImage(project?.image) ? (
                  <SanityImage
                    asset={project.image}
                    alt={project?.title || "Project image"}
                    fill // Use boolean 'fill' prop
                    style={{ objectFit: "contain" }} // Use 'style' prop for objectFit
                    // Add 'sizes' prop for responsive images to optimize loading
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 500px, 500px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center text-gray-500">No image</div>
                )}
              </div>

              {/* Text Content Container */}
              <div className="flex flex-col items-center flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center overflow-hidden px-1 sm:px-2">
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold flex-shrink-0 mb-1 sm:mb-1.5 md:mb-2">
                  <span className="underline decoration-primary/50">Project {i + 1}:</span> {project?.title}
                </h4>

                {/* Technology Icons */}
                <div className="flex flex-wrap justify-center items-center gap-2 my-2 md:my-3 flex-shrink-0">
                  {project?.technologies?.map((technology) => (
                    isValidImage(technology?.image) ? (
                      // Container for each tech icon
                      <div key={technology._id} className="h-8 w-8 md:h-10 md:w-10 relative">
                        <SanityImage
                          asset={technology.image}
                          alt={technology.title || "Technology"}
                          fill // Use boolean 'fill' prop
                          style={{ objectFit: "cover" }} // Use 'style' prop for objectFit
                          className="rounded-full"
                        />
                      </div>
                    ) : null
                  ))}
                </div>

                {/* Project Summary */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-justify 
                              flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-primary/60 
                              w-full my-1 sm:my-1.5 md:my-2 lg:my-3 leading-relaxed">
                  {project?.summary}
                </p>

                {/* Link to Build/GitHub */}
                {project?.linkToBuild && (
                  <div className="mt-auto pt-1 sm:pt-2 md:pt-3 flex-shrink-0"> {/* Pushes link to bottom */}
                    <Link href={project.linkToBuild} target="_blank" rel="noopener noreferrer">
                      <p className="text-primary text-xs sm:text-sm md:text-base underline hover:text-secondary transition-colors duration-200">View on GitHub</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <AnimatePresence>
          {showSwipeHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-12 left-0 right-0 flex justify-center md:hidden z-20"
            >
              <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <motion.span
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-sm text-primary font-medium"
                >
                  ← Swipe to explore →
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Dot Indicators */}
        <div className="absolute bottom-1 sm:bottom-2 flex justify-center space-x-2 md:hidden z-20">
          {projects?.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-gray-400 hover:bg-gray-500'}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Background Skewed Div */}
      <div className="w-full absolute top-[35%] sm:top-[40%] bg-primary/10 left-0 h-[500px] -skew-y-12 z-0"></div>
    </motion.div>
  );
}
