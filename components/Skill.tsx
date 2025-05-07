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
      className="group relative flex cursor-pointer items-center justify-center"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        initial={{ x: directionLeft ? -50 : 50, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="rounded-full border-2 border-darkGreen object-cover w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 filter group-hover:grayscale transition duration-300 ease-in-out"
        src={urlFor(skill?.image).url()}
        alt={skill.title}
      />
      
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-black opacity-100">
            {skill.progress}%
          </p>
        </div>
      </div>

      {/* Skill name popup */}
      {(isHovered || isActive) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute z-20 ${
            directionLeft ? "bottom-full mb-1" : "top-full mt-1"
          } left-1/2 transform -translate-x-1/2`}
        >
          <div className="bg-gradient-to-r from-darkGreen to-lightGreen text-white text-xs sm:text-sm px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
            {skill.title}
          </div>
        </motion.div>
      )}
    </div>
  );
}
