// components/Skill.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skill as MySkill } from "../typings"; // Type for the skill object
import SanityImage from "./SanityImage"; // Import the updated SanityImage component

type Props = {
  skill: MySkill; // The skill data object
  directionLeft?: boolean; // For entry animation direction
  isActive: boolean; // To keep the skill name popup visible on click
  onClick: () => void; // Handler for clicking the skill
};

export default function Skill({ skill, directionLeft, isActive, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover for popup

  // Tailwind classes for consistent icon sizing across breakpoints
  const iconSizeClasses = "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20";

  // Corresponding pixel values for the 'sizes' prop of SanityImage
  // These should match the Tailwind classes:
  // w-12 = 3rem = 48px
  // sm:w-14 = 3.5rem = 56px
  // md:w-16 = 4rem = 64px
  // lg:w-20 = 5rem = 80px
  const imageSizesAttribute = `(max-width: 639px) 3rem, (max-width: 767px) 3.5rem, (max-width: 1023px) 4rem, 5rem`;

  return (
    <div
      className="group relative flex flex-col items-center cursor-pointer" // Main container for the skill item
      onClick={onClick} // Handle click event
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
    >
      {/* Motion div for entry animation and as a sized container for the image */}
      <motion.div
        initial={{ x: directionLeft ? -60 : 60, opacity: 0 }} // Initial animation state
        whileInView={{ opacity: 1, x: 0 }} // Animate into view
        transition={{ duration: 0.7 }} // Animation duration
        className={`relative ${iconSizeClasses}`} // Apply size classes to this container
      >
        {skill?.image && ( // Conditionally render image if it exists
          <SanityImage
            asset={skill.image}
            alt={skill.title || "Skill icon"}
            fill // Use boolean 'fill' prop to make image fill the parent motion.div
            style={{ objectFit: "cover" }} // Use 'style' prop for objectFit
            className="rounded-full border-2 border-darkGreen filter group-hover:grayscale transition duration-300 ease-in-out" // Image styling
            sizes={imageSizesAttribute} // Provide 'sizes' for responsive optimization
            // These icons are generally not LCP elements, so priority is default (false)
          />
        )}
      </motion.div>
      
      {/* Overlay for Proficiency Percentage, appears on hover */}
      <div 
        className={`absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white 
                    ${iconSizeClasses} rounded-full z-0 flex items-center justify-center`} // Matches icon size
      >
        <p className="text-xs sm:text-sm md:text-base font-bold text-black opacity-100">
          {skill.progress}%
        </p>
      </div>

      {/* Popup for Skill Name, appears on hover or if isActive (clicked) */}
      {(isHovered || isActive) && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }} // Initial animation state for popup
          animate={{ opacity: 1, y: 0, scale: 1 }} // Animate to visible state
          exit={{ opacity: 0, y: 5, scale: 0.9 }} // Optional exit animation
          transition={{ duration: 0.25 }} // Popup animation duration
          className="absolute z-20 top-full mt-2.5" // Positioning below the icon
        >
          <div className="bg-gradient-to-r from-darkGreen to-lightGreen text-white 
                          text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap"> {/* Styling for the popup */}
            {skill.title}
          </div>
        </motion.div>
      )}
    </div>
  );
}
