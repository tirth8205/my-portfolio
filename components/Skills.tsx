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
      className="h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[90%] sm:max-w-[95%] md:max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-32 md:top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
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