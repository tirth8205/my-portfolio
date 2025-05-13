import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaMedium, FaEnvelope } from "react-icons/fa";
import { IconType } from "react-icons";
import { Social } from "../typings";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Props) {
  // Define the desired order of social platforms
  const order = ["LinkedIn", "X", "GitHub", "Medium"];

  // Sort socials based on the defined order
  const sortedSocials = [...socials].sort((a, b) => {
    const aIndex = order.indexOf(a.title);
    const bIndex = order.indexOf(b.title);
    return aIndex - bIndex;
  });

  // Map social titles to their corresponding icons with proper typing
  const iconMap: { [key: string]: IconType } = {
    LinkedIn: FaLinkedin,
    X: FaTwitter,
    GitHub: FaGithub,
    Medium: FaMedium,
  };

  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center space-x-3 sm:space-x-4"
      >
        {/* Social icons */}
        {sortedSocials
          .filter((social) => !(social.url?.includes("huggingface.co")))
          .map((social) => {
            const IconComponent: IconType | undefined = iconMap[social.title];
            if (!IconComponent) return null;

            // Explicitly render as a React component
            const Icon = IconComponent as React.ComponentType<{ size?: number }>;

            return (
              <a
                key={social._id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors"
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "24px",
                  lineHeight: "24px",
                  textAlign: "center",
                }}
              >
                <Icon size={24} />
              </a>
            );
          })}
      </motion.div>

      <motion.div
        initial={{
          x: 500,
          opacity: 0.5,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center space-x-3"
      >
        <a
          href="#contact"
          className="text-gray-500 hover:text-gray-300 transition-colors"
          style={{
            display: "inline-block",
            width: "24px",
            height: "24px",
            lineHeight: "24px",
            textAlign: "center",
          }}
        >
          {React.createElement(FaEnvelope as React.ComponentType<{ size?: number }>, { size: 24 })}
        </a>
        <Link href="#contact">
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}