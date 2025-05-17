// components/ExperienceCard.tsx
import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../typings";
import SanityImage from "./SanityImage"; // Import SanityImage

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const year = date.getFullYear();
      return `${month} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Date Error";
    }
  };

  const isValidImage = (image: any) => {
    return image && (image.asset?._ref || image._ref);
  };

  // Assuming experience.points is already an array of strings from Sanity
  const pointsToRender = Array.isArray(experience?.points) 
    ? experience.points.filter(point => typeof point === 'string' && point.trim() !== '') 
    : [];

  return (
    <article className="flex flex-col rounded-3xl items-center space-y-2 xs:space-y-3 md:space-y-4 flex-shrink-0 w-[90vw] max-w-xs xs:max-w-sm sm:max-w-md md:w-[600px] xl:w-[700px] snap-center bg-gradient-to-tr from-white to-darkGreen/10 p-4 xs:p-5 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
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
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </motion.div>
      )}

      <div className="w-full px-2 md:px-6">
        <div className="md:flex md:justify-between items-start">
          <div className="md:flex-1">
            <div className="md:flex md:items-center md:justify-between">
              <h4 className="text-lg md:text-2xl font-light text-black">
                {experience?.jobTitle || "Job Title"}
              </h4>
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

            <p className="md:hidden uppercase py-1 text-gray-500 text-xs">
              {formatDate(experience?.dateStarted)} -{" "}
              {experience.isCurrentlyWorkingHere
                ? "Present"
                : formatDate(experience?.dateEnded)}
            </p>

            <div className="flex flex-wrap gap-2 my-2 md:my-3">
              {experience?.technologies?.map((technology) =>
                isValidImage(technology?.image) ? (
                  <div key={technology._id} className="relative h-7 w-7 sm:h-8 sm:w-8">
                    <SanityImage
                      asset={technology.image}
                      alt={technology.title || "Technology"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>

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
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </motion.div>
          )}
        </div>
      </div>
      
      {pointsToRender.length > 0 && (
        <div className="w-full px-1 sm:px-2 md:px-4 max-h-[150px] xs:max-h-[180px] md:max-h-[200px] overflow-hidden mt-2 md:mt-3">
          {/* Added pl-5 (padding-left) to ul for bullet points to appear correctly */}
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