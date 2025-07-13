// components/Projects.tsx
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Project } from "../types";
import SanityImage from "./SanityImage"; // Ensure this is the updated SanityImage component

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  }, [currentIndex, setCurrentIndex]); // Dependencies for useCallback

  // Effect to add and remove scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]); // Dependency for useEffect

  // Function to scroll to a specific project index
  const scrollTo = (index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < (projects?.length || 0)) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex flex-col items-center text-left max-w-full mx-auto z-0 overflow-hidden 
                 pt-32 sm:pt-36 md:pt-40 pb-8 sm:pb-10 md:pb-12 px-4" // Overall section padding
    >
      {/* Section Title */}
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 
                     uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] 
                     text-gray-500 text-base sm:text-lg md:text-2xl">
        Projects
      </h3>

      {/* Container for the carousel system */}
      <div className="relative w-full flex-1 flex flex-col items-center overflow-hidden mt-2 sm:mt-4">
        
        {/* Desktop Navigation Arrows */}
        <div className="absolute z-30 top-1/2 transform -translate-y-1/2 w-full px-4 justify-between hidden md:flex">
          {currentIndex > 0 && (
            <button onClick={() => scrollTo(currentIndex - 1)} className="bg-darkGreen text-white p-3 rounded-full hover:bg-lightGreen transition-colors" aria-label="Previous project">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div className="flex-grow"></div> {/* Spacer */}
          {currentIndex < (projects?.length || 0) - 1 && (
            <button onClick={() => scrollTo(currentIndex + 1)} className="bg-darkGreen text-white p-3 rounded-full hover:bg-lightGreen transition-colors ml-auto" aria-label="Next project">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>

        {/* Carousel Viewport */}
        <div
          ref={scrollContainerRef}
          className="w-full h-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 
                     scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80"
        >
          {projects?.map((project, i) => (
            // Individual Project Slide
            <div
              key={project._id}
              className="w-full h-full flex-shrink-0 snap-center flex flex-col items-center 
                         p-4 pt-6 sm:p-5 sm:pt-6 md:p-6 md:pt-8 box-border" // Use w-full, padding adjusted
            >
              {/* Project Image Container */}
              <div className="relative h-28 sm:h-32 md:h-40 lg:h-44 
                              w-full max-w-xs sm:max-w-sm md:max-w-[460px] lg:max-w-[500px] 
                              mx-auto flex-shrink-0 mb-2 md:mb-3">
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
              <div className="flex flex-col items-center flex-1 w-full max-w-xl lg:max-w-2xl text-center overflow-hidden px-1">
                <h4 className="text-md sm:text-lg md:text-xl font-semibold flex-shrink-0 mb-1 sm:mb-1.5">
                  <span className="underline decoration-darkGreen/50">Project {i + 1}:</span> {project?.title}
                </h4>

                {/* Technology Icons */}
                <div className="flex flex-wrap justify-center items-center gap-1.5 my-1 sm:my-1.5 md:my-2 flex-shrink-0">
                  {project?.technologies?.map((technology) => (
                    isValidImage(technology?.image) ? (
                      // Container for each tech icon
                      <div key={technology._id} className="h-5 w-5 sm:h-6 sm:w-6 relative">
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
                <p className="text-xs sm:text-sm md:text-base text-justify 
                              flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-darkGreen/60 
                              w-full my-1 sm:my-1.5 md:my-2">
                  {project?.summary}
                </p>

                {/* Link to Build/GitHub */}
                {project?.linkToBuild && (
                  <div className="mt-auto pt-1 sm:pt-2 flex-shrink-0"> {/* Pushes link to bottom */}
                    <Link href={project.linkToBuild} target="_blank" rel="noopener noreferrer">
                      <p className="text-darkGreen text-xs sm:text-sm underline hover:text-lightGreen">View on GitHub</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="absolute bottom-1 sm:bottom-2 flex justify-center space-x-2 md:hidden z-20">
          {projects?.map((_, index) => (
            <button 
              key={index} 
              onClick={() => scrollTo(index)} 
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-darkGreen' : 'bg-gray-400 hover:bg-gray-500'}`} 
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Background Skewed Div */}
      <div className="w-full absolute top-[35%] sm:top-[40%] bg-darkGreen/10 left-0 h-[500px] -skew-y-12 z-0"></div>
    </motion.div>
  );
}
