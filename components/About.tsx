import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-2xl">
        About
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 pt-32 sm:pt-36 md:pt-28 pb-10">
        <motion.img
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          src={urlFor(pageInfo?.profilePic).url()}
          alt="Profile picture" 
          className="flex-shrink-0 rounded-full object-cover md:rounded-lg w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-96 xl:w-[500px] xl:h-[600px] mb-8 md:mb-0"
        />
        
        <div className="flex-grow md:ml-16 space-y-4 md:space-y-8 max-w-md lg:max-w-lg xl:max-w-xl">
          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left">
            Here is a{" "}
            <span className="underline decoration-darkGreen/50">little</span>{" "}
            background
          </h4>
          <p className="text-sm sm:text-base md:text-lg text-justify">
            {pageInfo?.backgroundInformation}
          </p>
        </div>
      </div>
    </div>
  );
}
