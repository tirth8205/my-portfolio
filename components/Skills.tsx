import { motion } from "framer-motion";
import React, { useState } from "react";
import { Skill as SkillType } from "../typings";
import Skill from "./Skill";

type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const handleSkillClick = (skillId: string) => {
    setActiveSkillId((prev) => (prev === skillId ? null : skillId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-7xl px-4 sm:px-6 md:px-10 justify-center mx-auto items-center"
    >
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl">
        Skills
      </h3>

      <h3 className="absolute top-28 sm:top-32 md:top-36 uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 text-xs sm:text-sm">
        Hover over a skill for current proficiency
      </h3>

      {/* Mobile grid (3 columns) */}
      <div className="md:hidden w-full max-h-[60vh] overflow-y-auto mt-36 sm:mt-32">
        <div className="grid grid-cols-3 gap-4 sm:gap-5">
          {skills?.map((skill) => (
            <Skill
              key={skill._id}
              skill={skill}
              directionLeft={skills.indexOf(skill) >= skills.length / 2}
              isActive={activeSkillId === skill._id}
              onClick={() => handleSkillClick(skill._id)}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid (multiple columns) */}
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6 lg:gap-8 mt-32">
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
