import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="flex drop-shadow-xl flex-col rounded-3xl items-center flex-shrink-0 w-[90%] xs:w-72 md:w-[600px] xl:w-[700px] snap-center bg-[#FFFFFF] bg-gradient-to-tr from-white to-darkGreen/20 p-4 xs:p-5 md:p-10 hover:opacity-100 opacity-100 cursor-pointer transition-opacity duration-200">
      {/* Card Header with Company Logo and Job Info */}
      <div className="w-full flex flex-col xl:flex-row items-center xl:items-start gap-3 mb-2 md:mb-4">
        {/* Company Logo - Responsive Visibility */}
        {experience?.companyImage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-shrink-0 xl:mr-4"
          >
            <img
              className="w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 object-contain"
              src={urlFor(experience.companyImage).url()}
              alt={experience.company}
            />
          </motion.div>
        )}
        
        {/* Job Details */}
        <div className="flex flex-col items-center xl:items-start flex-grow">
          <h4 className="text-lg md:text-2xl xl:text-3xl font-light text-black text-center xl:text-left">
            {experience?.jobTitle}
          </h4>
          
          <p className="font-bold text-md md:text-xl xl:text-2xl mt-1 text-lightGreen text-center xl:text-left">
            {experience?.company}
          </p>
          
          <p className="uppercase mt-2 text-gray-500 text-sm md:text-base xl:text-lg text-center xl:text-left">
            {new Date(experience?.dateStarted).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })} -{" "}
            {experience.isCurrentlyWorkingHere
              ? "Present"
              : new Date(experience?.dateEnded).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap justify-center xl:justify-start gap-2 my-3">
            {experience?.technologies.map((technology) => (
              <img
                key={technology._id}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border border-gray-200"
                src={technology?.image ? urlFor(technology.image).url() : ""}
                alt={technology.title || ""}
                title={technology.title || ""}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Points/Description */}
      <div className="w-full mt-1 md:mt-2">
        <ul className="list-disc text-black space-y-2 text-justify text-sm md:text-base pl-5 pr-2 overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-darkGreen/80 max-h-[180px] xs:max-h-[200px] md:max-h-[250px]">
          {(experience?.points ?? []).map((point, i) => (
            <li key={i} className="mb-1">{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
