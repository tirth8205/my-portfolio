// components/Header.tsx
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react"; // React import is good practice, though not always strictly necessary for JSX only
import { FaLinkedin, FaTwitter, FaGithub, FaMedium, FaEnvelope } from "react-icons/fa";
import { IconType } from "react-icons";
import { Social } from "../types";

type Props = {
  socials: Social[];
};

// Interface for react-icon props
interface IconProps {
  size?: number | string;
  className?: string;
}

export default function Header({ socials }: Props) {
  const order = ["LinkedIn", "X", "GitHub", "Medium"];

  const sortedSocials = [...socials].sort((a, b) => {
    const aIndex = order.indexOf(a.title);
    const bIndex = order.indexOf(b.title);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const iconMap: { [key: string]: IconType } = {
    LinkedIn: FaLinkedin,
    X: FaTwitter,
    Twitter: FaTwitter,
    GitHub: FaGithub,
    Medium: FaMedium,
  };

  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center space-x-3 sm:space-x-4"
      >
        {sortedSocials
          .filter((social) => social.url && !(social.url.includes("huggingface.co")))
          .map((social) => {
            const IconFromMap = iconMap[social.title];
            if (!IconFromMap) return null;

            const SpecificIconComponent = IconFromMap as React.FC<IconProps>;
            const ariaLabelText = `Follow Tirth Kanani on ${social.title}`;

            return (
              <a // External links are standard <a> tags
                key={social._id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabelText}
                className="text-gray-500 hover:text-gray-300 transition-colors"
                style={{
                  display: "inline-block", // Style for consistent icon sizing and alignment
                  width: "24px",
                  height: "24px",
                  lineHeight: "24px",
                  textAlign: "center",
                }}
              >
                <SpecificIconComponent size={24} />
              </a>
            );
          })}
      </motion.div>

      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center space-x-3" // Removed cursor-pointer if Link itself handles interaction
      >
        {/* Updated Link component usage */}
        <Link
          href="#contact"
          className="flex flex-row items-center text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Get in touch by email"
        >
          {/* Children of Link are now direct, Link component renders the <a> */}
          {React.createElement(FaEnvelope as React.FC<IconProps>, { size: 24 })}
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400 ml-2">
            Get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}