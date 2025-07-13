// components/Skills.tsx
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react"; // Added useEffect for window width
import { Skill as SkillType } from "../types";
import Skill from "./Skill";

type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [columns, setColumns] = useState(3); // State for number of columns

  const handleSkillClick = (skillId: string) => {
    setActiveSkillId((prev) => (prev === skillId ? null : skillId));
  };

  // Update column count on window resize for directionLeft logic
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) { // lg
        setColumns(6);
      } else if (window.innerWidth >= 768) { // md
        setColumns(4);
      } else { // sm and xs
        setColumns(3);
      }
    };

    window.addEventListener('resize', updateColumns);
    updateColumns(); // Initial call

    return () => window.removeEventListener('resize', updateColumns);
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left max-w-7xl px-4 sm:px-6 md:px-10 justify-center mx-auto items-center"
    >
      <h3 className="absolute left-0 right-0 mx-auto text-center top-16 sm:top-20 md:top-24 uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl">
        Skills
      </h3>

      <h3 className="absolute top-28 sm:top-32 md:top-36 uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 text-xs sm:text-sm">
        Hover over a skill for current proficiency
      </h3>

      {/* Combined responsive grid */}
      <div className="w-full max-h-[70vh] md:max-h-none overflow-y-auto md:overflow-y-visible mt-40 sm:mt-44 md:mt-48">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {skills?.map((skill, index) => (
            <Skill
              key={skill._id}
              skill={skill}
              // Adjust directionLeft based on index and current number of columns
              // This makes items in the "second half" of a row (or conceptual row for wrapping) point left
              directionLeft={ (index % columns) >= Math.floor(columns / 2) }
              isActive={activeSkillId === skill._id}
              onClick={() => handleSkillClick(skill._id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}