import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Project } from "../typings";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Helper function to check if image is valid
  const isValidImage = (image: any) => {
    return image && image.asset && image._type === "image";
  };
  
  // Update current index when scrolling
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.clientWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(newIndex);
    }
  };
  
  // Set up scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Navigation functions
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
      className="h-screen relative flex flex-col text-left max-w-full justify-evenly mx-auto items-center z-0 overflow-hidden"
    >
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex flex-col items-center mt-16 sm:mt-20 md:mt-24">
        {/* Navigation arrows - desktop only */}
        <div className="absolute z-30 top-1/2 transform -translate-y-1/2 w-full px-4 justify-between hidden md:flex">
          {currentIndex > 0 && (
            <button 
              onClick={() => scrollTo(currentIndex - 1)}
              className="bg-darkGreen text-white p-3 rounded-full hover:bg-lightGreen transition-colors"
              aria-label="Previous project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {currentIndex < (projects?.length || 0) - 1 && (
            <button 
              onClick={() => scrollTo(currentIndex + 1)}
              className="bg-darkGreen text-white p-3 rounded-full hover:bg-lightGreen transition-colors"
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Main carousel */}
        <div 
          ref={scrollContainerRef}
          className="w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80"
        >
          {projects?.map((project, i) => (
            <div
              key={project._id}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-3 sm:space-y-5 items-center justify-center p-6 sm:p-10 md:p-20 h-screen"
            >
              <motion.img
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="h-28 sm:h-40 md:h-60 lg:h-72 object-contain"
                src={isValidImage(project?.image) 
                  ? urlFor(project.image).url() 
                  : "/placeholder-project.png"}
                alt={project?.title || "Project image"}
              />

              <div className="space-y-4 sm:space-y-6 md:space-y-8 px-0 sm:px-6 md:px-10 max-w-6xl">
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-center">
                  <span className="underline decoration-darkGreen/50">
                    Project {i + 1}:
                  </span>{" "}
                  {project?.title}
                </h4>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {project?.technologies?.map((technology) => (
                    isValidImage(technology?.image) ? (
                      <img
                        key={technology._id}
                        className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full object-cover"
                        src={urlFor(technology.image).url()}
                        alt={technology.title || "Technology"}
                      />
                    ) : null
                  ))}
                </div>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-justify">
                  {project?.summary}
                </p>

                {project?.linkToBuild && (
                  <Link href={project.linkToBuild} target="_blank" rel="noopener noreferrer">
                    <p className="text-darkGreen text-xs sm:text-sm md:text-base underline text-center">
                      View on GitHub
                    </p>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Dot indicators for mobile */}
        <div className="flex justify-center space-x-2 mt-4 md:hidden">
          {projects?.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-darkGreen' : 'bg-gray-400'}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Background skewed div */}
      <div className="w-full absolute top-[30%] bg-darkGreen/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
