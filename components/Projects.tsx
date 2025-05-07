import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Project } from "../typings";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  // Track current project index
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
  const scrollLeft = () => {
    if (scrollContainerRef.current && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      scrollContainerRef.current.scrollTo({ 
        left: newIndex * scrollContainerRef.current.clientWidth, 
        behavior: 'smooth' 
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current && currentIndex < (projects?.length || 0) - 1) {
      const newIndex = currentIndex + 1;
      scrollContainerRef.current.scrollTo({ 
        left: newIndex * scrollContainerRef.current.clientWidth, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      {/* Reduced Y-position title */}
      <h3 className="absolute top-12 md:top-16 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Projects
      </h3>

      <div className="relative w-full mt-16 md:mt-20">
        {/* Dynamic left arrow - with proper circular styling */}
        {currentIndex > 0 && (
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer bg-darkGreen shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-lightGreen transition-colors duration-200 hidden sm:flex z-30">
            <button onClick={scrollLeft} className="flex items-center justify-center w-full h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Dynamic right arrow - with proper circular styling */}
        {currentIndex < (projects?.length || 0) - 1 && (
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer bg-darkGreen shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-lightGreen transition-colors duration-200 hidden sm:flex z-30">
            <button onClick={scrollRight} className="flex items-center justify-center w-full h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80 pt-10"
        >
          {projects?.map((project, i) => (
            <div
              key={project._id}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-10 md:p-44 h-screen"
            >
              <motion.img
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="h-28 xl:h-80 md:h-72 object-contain"
                src={isValidImage(project?.image) 
                  ? urlFor(project.image).url() 
                  : "/placeholder-project.png"}
                alt={project?.title || "Project image"}
              />

              <div className="space-y-5 md:space-y-10 px-0 md:px-10 max-w-6xl">
                <h4 className="text-lg md:text-2xl lg:text-4xl font-semibold text-center">
                  <span className="underline decoration-darkGreen/50">
                    Project {i + 1}:
                  </span>{" "}
                  {project?.title}
                </h4>
                <div className="flex items-center space-x-2 justify-center">
                  {project?.technologies?.map((technology) => (
                    isValidImage(technology?.image) ? (
                      <img
                        key={technology._id}
                        className="h-10 w-10 rounded-full object-cover"
                        src={urlFor(technology.image).url()}
                        alt={technology.title || "Technology"}
                      />
                    ) : null
                  ))}
                </div>

                <p className="text-sm md:text-md lg:text-lg text-justify">
                  {project?.summary}
                </p>

                {project?.linkToBuild && (
                  <Link href={project.linkToBuild} target="_blank" rel="noopener noreferrer">
                    <p className="text-darkGreen text-sm md:text-md lg:text-lg text-center underline">
                      View on GitHub
                    </p>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full absolute top-[20%] md:top-[30%] bg-darkGreen/40 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
