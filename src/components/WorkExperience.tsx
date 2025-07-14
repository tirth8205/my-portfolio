import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../types";
import ExperienceCard from "./ExperienceCard";

type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen relative flex flex-col text-center md:text-left max-w-full justify-center mx-auto items-center overflow-hidden py-16 sm:py-20 md:py-24"
    >
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-2xl">
        Experience
      </h3>

      <div className="w-full mt-16 sm:mt-20 md:mt-24 lg:mt-28 flex space-x-3 sm:space-x-4 md:space-x-5 overflow-x-scroll p-4 sm:p-6 md:p-8 lg:p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80">
        {experiences
          ?.slice()
          .sort(
            (a, b) =>
              new Date(b.dateStarted).getTime() -
              new Date(a.dateStarted).getTime()
          )
          .map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
      </div>
    </motion.div>
  );
}
