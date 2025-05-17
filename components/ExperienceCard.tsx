// components/ExperienceCard.tsx
import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../typings";
import SanityImage from "./SanityImage"; // Import the updated SanityImage component

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  // Helper function to format dates
  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A"; // Return N/A if date string is missing
    try {
      const date = new Date(dateString);
      // Check if the parsed date is valid
      if (isNaN(date.getTime())) return "Invalid Date"; 
      const month = date.toLocaleDateString("en-US", { month: "short" }); // e.g., "Jan"
      const year = date.getFullYear();
      return `${month} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Date Error"; // Return an error message if formatting fails
    }
  };

  // Helper function to check if a Sanity image asset is valid
  const isValidImage = (image: any) => {
    return image && (image.asset?._ref || image._ref); // Check for the asset reference
  };

  // Process points for rendering: ensure it's an array of non-empty strings
  const pointsToRender = Array.isArray(experience?.points)
    ? experience.points.filter(point => typeof point === 'string' && point.trim() !== '')
    : [];

  return (
    <article className="flex flex-col rounded-3xl items-center space-y-2 xs:space-y-3 md:space-y-4 flex-shrink-0 
                       w-[90vw] max-w-xs xs:max-w-sm sm:max-w-md md:w-[600px] xl:w-[700px] 
                       snap-center bg-gradient-to-tr from-white to-darkGreen/10 
                       p-4 xs:p-5 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
      
      {/* Company Image - XL and larger screens */}
      {isValidImage(experience?.companyImage) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          // This div is the container for SanityImage, providing relative positioning and dimensions
          className="relative w-28 h-28 xl:w-36 xl:h-36 hidden xl:block mb-2" 
        >
          <SanityImage
            asset={experience.companyImage}
            alt={experience.company || "Company logo"}
            fill // Use the boolean 'fill' prop
            style={{ objectFit: "contain" }} // Use 'style' prop for objectFit
            className="rounded-md" // Styling for the image itself
            // No priority for these, default lazy loading is fine
          />
        </motion.div>
      )}

      {/* Main content area of the card */}
      <div className="w-full px-2 md:px-6">
        <div className="md:flex md:justify-between items-start">
          {/* Left side: Job title, company, dates, technologies */}
          <div className="md:flex-1">
            <div className="md:flex md:items-center md:justify-between">
              <h4 className="text-lg md:text-2xl font-light text-black">
                {experience?.jobTitle || "Job Title"}
              </h4>
              {/* Date range for medium and larger screens */}
              <p className="hidden md:block uppercase text-gray-500 text-xs md:text-sm md:ml-4 whitespace-nowrap">
                {formatDate(experience?.dateStarted)} -{" "}
                {experience.isCurrentlyWorkingHere
                  ? "Present"
                  : formatDate(experience?.dateEnded)}
              </p>
            </div>

            <p className="font-bold text-md md:text-xl mt-1 text-lightGreen">
              {experience?.company || "Company Name"}
            </p>

            {/* Date range for smaller screens */}
            <p className="md:hidden uppercase py-1 text-gray-500 text-xs">
              {formatDate(experience?.dateStarted)} -{" "}
              {experience.isCurrentlyWorkingHere
                ? "Present"
                : formatDate(experience?.dateEnded)}
            </p>

            {/* Technology Icons */}
            <div className="flex flex-wrap gap-2 my-2 md:my-3">
              {experience?.technologies?.map((technology) =>
                isValidImage(technology?.image) ? (
                  // Container for each technology icon, providing relative positioning and dimensions
                  <div key={technology._id} className="relative h-7 w-7 sm:h-8 sm:w-8"> 
                    <SanityImage
                      asset={technology.image}
                      alt={technology.title || "Technology"}
                      fill // Use boolean 'fill' prop
                      style={{ objectFit: "cover" }} // Use 'style' prop for objectFit
                      className="rounded-full" // Assuming tech icons are circular
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Company Image - MD screens (hidden on XL and SM) */}
          {isValidImage(experience?.companyImage) && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              // This div is the container for SanityImage for medium screens
              className="relative w-20 h-20 md:w-24 md:h-24 hidden md:block xl:hidden ml-0 md:ml-4 mt-2 md:mt-0 flex-shrink-0"
            >
              <SanityImage
                asset={experience.companyImage}
                alt={experience.company || "Company logo"}
                fill // Use boolean 'fill' prop
                style={{ objectFit: "contain" }} // Use 'style' prop for objectFit
                className="rounded-md"
              />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Points / Responsibilities section */}
      {pointsToRender.length > 0 && (
        <div className="w-full px-1 sm:px-2 md:px-4 max-h-[150px] xs:max-h-[180px] md:max-h-[200px] overflow-hidden mt-2 md:mt-3">
          <ul className="list-disc text-black space-y-1.5 text-justify text-xs sm:text-sm md:text-base 
                         pl-5 h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-darkGreen/70">
            {pointsToRender.map((point, i) => (
              <li key={i} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
