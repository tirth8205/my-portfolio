// components/About.tsx
import { motion } from "framer-motion";
import React from "react";
import { PageInfo } from "../typings";
import SanityImage from "./SanityImage"; // Import the updated SanityImage component

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
                   pt-28 sm:pt-32 md:pt-36 pb-10 px-4"> {/* Overall section padding and layout */}
      
      {/* Section Title */}
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 
                     uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] 
                     text-gray-500 text-base sm:text-lg md:text-2xl">
        About
      </h3>
      
      {/* Content Container: Image and Text */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto 
                     md:space-x-10 lg:space-x-16">
        
        {/* Profile Picture Section */}
        {pageInfo?.profilePic && ( // Conditionally render if profilePic exists
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            // This motion.div acts as the sized, relative container for SanityImage
            className="relative flex-shrink-0 
                       w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-96 xl:w-[400px] xl:h-[500px] 
                       mb-8 md:mb-0" 
          >
            <SanityImage
              asset={pageInfo.profilePic}
              alt="Profile picture"
              fill // Use the boolean 'fill' prop
              style={{ objectFit: "cover" }} // Use 'style' prop for objectFit
              className="rounded-full md:rounded-lg" // Styling for the image itself
              // The 'sizes' prop helps next/image request appropriately sized images.
              // These values should reflect the display width of the image at different breakpoints.
              // Example: (max-width: 639px) is for screens smaller than sm (w-48 = 12rem = 192px)
              // (max-width: 767px) is for screens smaller than md (sm:w-60 = 15rem = 240px)
              // (max-width: 1279px) is for screens smaller than xl (md:w-72 = 18rem = 288px)
              // Default for xl and larger (xl:w-[400px])
              sizes="(max-width: 639px) 12rem, (max-width: 767px) 15rem, (max-width: 1279px) 18rem, 400px"
              // This image might be above the fold depending on the device. 
              // Consider adding `priority` if it's often an LCP candidate on some views.
              // priority={false} // Default, can be omitted. Set to true if LCP.
            />
          </motion.div>
        )}
        
        {/* Background Information Text Section */}
        <motion.div 
          initial={{ x: 200, opacity: 0 }} // Animation for the text block
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }} // Staggered animation
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
