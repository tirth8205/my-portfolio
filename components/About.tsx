// components/About.tsx
import { motion } from "framer-motion";
import React from "react";
// import { urlFor } from "../sanity"; // No longer needed if SanityImage handles it
import { PageInfo } from "../typings";
import SanityImage from "./SanityImage"; // Import the SanityImage component

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-10 px-4"> {/* Added flex-col and padding top */}
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-2xl">
        About
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto md:space-x-10 lg:space-x-16"> {/* Added spacing for md screens */}
        {pageInfo?.profilePic && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            // The parent div for SanityImage needs relative positioning and dimensions for layout="fill"
            // Or, SanityImage can define its own dimensions if layout is "intrinsic", "fixed", or "responsive"
            className="relative flex-shrink-0 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-96 xl:w-[400px] xl:h-[500px] mb-8 md:mb-0" // Adjusted some sizes
          >
            <SanityImage
              asset={pageInfo.profilePic}
              alt="Profile picture"
              layout="fill" // Fills the dimensions of the motion.div
              objectFit="cover" // Ensures the image covers the area, might crop
              className="rounded-full md:rounded-lg" // Apply rounded styles here
              // This image is likely important but might not be LCP depending on scroll.
              // If it often loads first, consider `priority`, otherwise default lazy loading is fine.
            />
          </motion.div>
        )}
        
        <motion.div 
          initial={{ x: 200, opacity: 0 }} // Added animation for the text block
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }} // Added delay for staggered effect
          className="flex-grow space-y-4 md:space-y-6 max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left">
            Here is a{" "}
            <span className="underline decoration-darkGreen/50">little</span>{" "}
            background
          </h4>
          <p className="text-sm sm:text-base md:text-lg text-justify">
            {pageInfo?.backgroundInformation}
          </p>
        </motion.div>
      </div>
    </div>
  );
}