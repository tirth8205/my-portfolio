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
    // Checks if the image object exists and has a reference to an asset
    return image && (image.asset?._ref || image._ref);
  };

  // Prepare points for rendering, ensuring it's an array of non-empty strings
  const pointsToRender = Array.isArray(experience?.points)
    ? experience.points.filter(point => typeof point === 'string' && point.trim() !== '')
    : [];

  return (
    <article className="flex flex-col rounded-3xl items-center space-y-2 xs:space-y-3 md:space-y-4 flex-shrink-0 
                       w-[90vw] max-w-xs xs:max-w-sm sm:max-w-md md:w-[600px] xl:w-[700px] 
                       snap-center bg-gradient-to-tr from-white to-darkGreen/10 
                       p-4 xs:p-5 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      
      {/* Company Image - Displayed on XL screens and larger */}
      {isValidImage(experience?.companyImage) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-28 h-28 xl:w-36 xl:h-36 hidden xl:block mb-2" 
        >
          <SanityImage
            asset={experience.companyImage}
            alt={experience.company || "Company logo"}
            fill
            style={{ objectFit: "contain" }}
            className="rounded-md"
            sizes="(min-width: 1280px) 9rem, 0vw" 
          />
        </motion.div>
      )}

      {/* Main content area of the card */}
      <div className="w-full px-1 sm:px-2 md:px-4">
        <div className="md:flex md:justify-between items-start">
          {/* Left side: Job title, company, dates, tech stack */}
          <div className="md:flex-1">
            <div className="md:flex md:items-center md:justify-between">
              <h4 className="text-lg md:text-2xl font-light text-black">
                {experience?.jobTitle || "Job Title"}
              </h4>
              {/* Dates - hidden on mobile, shown on md+ */}
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

            {/* Dates - shown on mobile, hidden on md+ */}
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
                  <div key={technology._id} className="relative h-7 w-7 sm:h-8 sm:w-8"> 
                    <SanityImage
                      asset={technology.image}
                      alt={technology.title || "Technology"}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                      sizes="(max-width: 639px) 1.75rem, 2rem" 
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Company Image - Displayed on MD screens, hidden on XL */}
          {isValidImage(experience?.companyImage) && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative w-20 h-20 md:w-24 md:h-24 hidden md:block xl:hidden ml-0 md:ml-4 mt-2 md:mt-0 flex-shrink-0"
            >
              <SanityImage
                asset={experience.companyImage}
                alt={experience.company || "Company logo"}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-md"
                sizes="(min-width: 768px) and (max-width: 1279px) 6rem, 0vw"
              />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Bullet points for responsibilities/achievements */}
      {pointsToRender.length > 0 && (
        <div className="w-full px-1 sm:px-2 md:px-4 max-h-[150px] xs:max-h-[170px] md:max-h-[180px] overflow-hidden mt-2 md:mt-3">
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
