import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skill as mySkill } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  skill: mySkill;
  directionLeft?: boolean;
  isActive: boolean;
  onClick: () => void;
};

export default function Skill({ skill, directionLeft, isActive, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Circle with Image and Percentage */}
      <motion.img
        initial={{ x: directionLeft ? -80 : 80, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="rounded-full border-2 border-darkGreen object-cover w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 filter group-hover:grayscale transition duration-300 ease-in-out"
        src={urlFor(skill?.image).url()}
        alt={skill.title}
      />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-black opacity-100">
            {skill.progress}%
          </p>
        </div>
      </div>

      {/* Animated Popup for Skill Name */}
      {(isHovered || isActive) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: directionLeft ? 10 : -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          exit={{ opacity: 0, scale: 0.8, y: directionLeft ? 10 : -10 }}
          className={`absolute left-1/2 transform -translate-x-1/2 z-10 ${
            directionLeft
              ? "top-full mt-1 sm:mt-2 md:mt-3"
              : "bottom-full mb-1 sm:mb-2 md:mb-3"
          }`}
        >
          <div className="bg-gradient-to-r from-darkGreen to-lightGreen text-white text-xs sm:text-sm md:text-base font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg shadow-darkGreen/50 border border-lightGreen/30">
            {skill.title}
          </div>
        </motion.div>
      )}
    </div>
  );
}