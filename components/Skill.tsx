// components/Skill.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skill as MySkill } from "../typings"; // Renamed to avoid conflict with component name
// import { urlFor } from "../sanity"; // No longer needed if SanityImage handles it
import SanityImage from "./SanityImage"; // Import SanityImage

type Props = {
  skill: MySkill;
  directionLeft?: boolean;
  isActive: boolean;
  onClick: () => void;
};

export default function Skill({ skill, directionLeft, isActive, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // Define consistent sizes for the skill icons
  const iconSizeClasses = "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20";
  // Numeric sizes for SanityImage width/height props (using the largest for quality, next/image will handle srcset)
  const lgIconSize = 80; // Corresponds to lg:w-20, lg:h-20 (20 * 4 = 80px)

  return (
    <div
      className="group relative flex flex-col items-center cursor-pointer" // Added flex-col items-center for better popup positioning
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ x: directionLeft ? -70 : 70, opacity: 0 }} // Increased x offset slightly for effect
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }} // Slightly faster duration
        className={`relative ${iconSizeClasses}`} // Apply size classes to the motion div for layout="fill" to work
      >
        {skill?.image && (
          <SanityImage
            asset={skill.image}
            alt={skill.title || "Skill icon"}
            layout="fill" // Fill the parent motion.div
            objectFit="cover" // Or "contain" if preferred
            className="rounded-full border-2 border-darkGreen filter group-hover:grayscale transition duration-300 ease-in-out"
            // For fixed size if preferred over layout="fill":
            // width={lgIconSize}
            // height={lgIconSize}
            // layout="intrinsic" // or "fixed"
          />
        )}
      </motion.div>
      
      {/* Proficiency Percentage Overlay */}
      <div 
        className={`absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white 
                    ${iconSizeClasses} rounded-full z-0 flex items-center justify-center`}
      >
        <p className="text-xs sm:text-sm md:text-base font-bold text-black opacity-100">
          {skill.progress}%
        </p>
      </div>

      {/* Skill Name Popup */}
      {(isHovered || isActive) && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.9 }} // Slight initial y offset and scale
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          // Positioning the popup below the icon by default
          // Adjust 'top-full mt-2' or 'bottom-full mb-2' based on directionLeft or other logic if needed
          className="absolute z-20 top-full mt-2" 
        >
          <div className="bg-gradient-to-r from-darkGreen to-lightGreen text-white text-xs sm:text-sm px-2.5 py-1.5 rounded-md shadow-lg whitespace-nowrap">
            {skill.title}
          </div>
        </motion.div>
      )}
    </div>
  );
}