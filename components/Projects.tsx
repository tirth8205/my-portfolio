// components/Projects.tsx
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, useCallback } from "react"; // Added useCallback
import Link from "next/link";
// urlFor might not be needed directly if SanityImage handles all images
// import { urlFor } from "../sanity"; 
import { Project } from "../typings";
import SanityImage from "./SanityImage"; // Import the SanityImage component

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isValidImage = (image: any) => {
    return image && (image.asset?._ref || image._ref);
  };

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.clientWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      // Only update if the index has actually changed
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  }, [currentIndex, setCurrentIndex]); // scrollContainerRef is stable

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]); // Now handleScroll is a dependency

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

      <div className="relative w-full flex flex-col items-center mt-28 sm:mt-32 md:mt-36">
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
          <div className="flex-grow"></div>
          {currentIndex < (projects?.length || 0) - 1 && (
            <button
              onClick={() => scrollTo(currentIndex + 1)}
              className="bg-darkGreen text-white p-3 rounded-full hover:bg-lightGreen transition-colors ml-auto"
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <div
          ref={scrollContainerRef}
          className="w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80"
        >
          {projects?.map((project, i) => (
            <div
              key={project._id}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-3 sm:space-y-5 items-center justify-center p-6 sm:p-10 md:p-16 h-screen"
            >
              <div className="relative h-28 sm:h-40 md:h-52 lg:h-60 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                {isValidImage(project?.image) ? (
                  <SanityImage
                    asset={project.image}
                    alt={project?.title || "Project image"}
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-5 px-0 sm:px-6 md:px-10 max-w-4xl text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                  <span className="underline decoration-darkGreen/50">
                    Project {i + 1}:
                  </span>{" "}
                  {project?.title}
                </h4>

                <div className="flex flex-wrap justify-center items-center gap-2 my-2">
                  {project?.technologies?.map((technology) => (
                    isValidImage(technology?.image) ? (
                      <div key={technology._id} className="h-6 w-6 sm:h-8 sm:w-8 relative"> {/* Parent for SanityImage with layout="fill" */}
                        <SanityImage
                          asset={technology.image}
                          alt={technology.title || "Technology"}
                          layout="fill" // Fills the h-6 w-6 or h-8 w-8 container
                          objectFit="cover" // Or "contain" based on icon style
                          className="rounded-full"
                          // No priority for these small, numerous icons
                        />
                      </div>
                    ) : null
                  ))}
                </div>

                <p className="text-xs sm:text-sm md:text-base text-justify max-h-24 sm:max-h-28 overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-darkGreen/60">
                  {project?.summary}
                </p>

                {project?.linkToBuild && (
                  <Link href={project.linkToBuild} target="_blank" rel="noopener noreferrer">
                    <p className="text-darkGreen text-xs sm:text-sm md:text-base underline hover:text-lightGreen">
                      View on GitHub
                    </p>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-4 md:hidden">
          {projects?.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-darkGreen' : 'bg-gray-400 hover:bg-gray-500'}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full absolute top-[30%] bg-darkGreen/10 left-0 h-[500px] -skew-y-12 z-0"></div>
    </motion.div>
  );
}