import { motion } from "framer-motion";
import React, { useState } from "react";
import { Skill as SkillType } from "../typings";
import Skill from "./Skill";

type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const handleSkillClick = (skillId: string) => {
    // Toggle the active skill: if the same skill is clicked again, hide the popup; otherwise, show the new skill's popup
    setActiveSkillId((prev) => (prev === skillId ? null : skillId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] md:max-w-[1200px] lg:max-w-[1400px] px-2 xs:px-4 sm:px-6 md:px-8 lg:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-16 xs:top-18 sm:top-20 md:top-24 uppercase tracking-[12px] xs:tracking-[14px] sm:tracking-[16px] md:tracking-[20px] text-gray-500 text-lg xs:text-lg sm:text-xl md:text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-28 xs:top-30 sm:top-32 md:top-36 uppercase tracking-[2px] xs:tracking-[3px] text-gray-500 text-xs xs:text-sm sm:text-sm md:text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 xs:gap-3 sm:gap-4 md:gap-5 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide snap-x snap-mandatory">
        {skills?.slice(0, skills.length / 2).map((skill) => (
          <Skill
            key={skill._id}
            skill={skill}
            isActive={activeSkillId === skill._id}
            onClick={() => handleSkillClick(skill._id)}
          />
        ))}

        {skills?.slice(skills.length / 2, skills.length).map((skill) => (
          <Skill
            key={skill._id}
            skill={skill}
            directionLeft
            isActive={activeSkillId === skill._id}
            onClick={() => handleSkillClick(skill._id)}
          />
        ))}
      </div>
    </motion.div>
  );
}