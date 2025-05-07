import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="flex drop-shadow-xl flex-col rounded-3xl items-center space-y-0 flex-shrink-0 w-[90%] xs:w-72 md:w-[600px] xl:w-[700px] snap-center bg-[#FFFFFF] bg-gradient-to-tr from-white to-darkGreen/20 p-4 xs:p-5 md:p-10 hover:opacity-100 opacity-100 cursor-pointer transition-opacity duration-200">
      {experience?.companyImage ? (
        <motion.img
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="md:invisible xl:visible md:h-0 w-28 h-28 md:w-0 xl:w-[150px] xl:h-[150px] mb-2 object-contain object-center"
          src={urlFor(experience.companyImage).url()}
          alt=""
        />
      ) : null}
      <div className="w-full px-0 md:px-10">
        <div className="md:flex md:justify-between items-center">
          <div className="md:flex-1">
            {/* Title and date container - rearranged for desktop */}
            <div className="md:flex md:items-center md:justify-between">
              <h4 className="text-lg md:text-3xl font-light text-black">
                {experience?.jobTitle}
              </h4>
              
              {/* Date - positioned normally on mobile, next to title on desktop */}
              <p className="hidden md:block uppercase text-gray-500 text-sm md:text-lg md:ml-4">
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
            </div>
            
            <p className="font-bold text-md md:text-2xl mt-1 text-lightGreen">
              {experience?.company}
            </p>
            
            {/* Date for mobile only */}
            <p className="md:hidden uppercase py-2 text-gray-500 text-sm">
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
            
            {/* Fixed skills icons with flex-wrap */}
            <div className="flex flex-wrap gap-2 my-2">
              {experience?.technologies.map((technology) => (
                <img
                  key={technology._id}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                  src={technology?.image ? urlFor(technology.image).url() : ""}
                  alt=""
                />
              ))}
            </div>
          </div>
          {experience?.companyImage ? (
            <motion.img
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="invisible md:visible xl:invisible xl:h-0 xl:w-0 h-0 w-0 md:h-28 md:w-28 mb-0 object-contain object-center"
              src={urlFor(experience.companyImage).url()}
              alt=""
            />
          ) : null}
        </div>
      </div>
      <div className="w-full px-0 md:px-10 max-h-[200px] xs:max-h-[250px] md:max-h-[300px] overflow-hidden">
        <ul className="list-disc text-black space-y-2 pr-5 text-justify ml-0 text-sm md:text-lg pl-5 h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-darkGreen/80">
          {(experience?.points ?? []).map((point, i) => (
            <li key={i} className="mb-2">{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
