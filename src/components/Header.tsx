// components/Header.tsx
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaMedium } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IconType } from "react-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Social } from "../types";
import DarkModeToggle from "./DarkModeToggle";

type Props = {
  socials: Social[];
};

// Interface for react-icon props
interface IconProps {
  size?: number | string;
  className?: string;
}

const navigationItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ socials }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <>
      <header className="sticky top-0 bg-lightBackground/80 dark:bg-darkBackground/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 p-5 flex items-center justify-between max-w-7xl mx-auto z-50">
        {/* Logo/Brand */}
        <motion.div
          initial={{ x: -500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex items-center space-x-4"
        >
          <Link href="#hero" className="text-2xl font-display font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TK
          </Link>
          
          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center space-x-3">
            {sortedSocials
              .filter((social) => social.url && !(social.url.includes("huggingface.co")))
              .map((social) => {
                const IconFromMap = iconMap[social.title];
                if (!IconFromMap) return null;

                const SpecificIconComponent = IconFromMap as React.FC<IconProps>;
                const ariaLabelText = `Follow Tirth Kanani on ${social.title}`;

                return (
                  <motion.a
                    key={social._id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabelText}
                    className="text-grayColor hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SpecificIconComponent size={20} />
                  </motion.a>
                );
              })}
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-grayColor hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side - Dark Mode Toggle + Mobile Menu */}
        <motion.div
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex items-center space-x-4"
        >
          <DarkModeToggle />
          
          {/* Contact Button (Desktop) */}
          <Link
            href="#contact"
            className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-lg transition-all duration-300"
          >
            <EnvelopeIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Contact</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-grayColor hover:text-primary transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden fixed top-20 left-0 right-0 bg-lightBackground/95 dark:bg-darkBackground/95 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 z-40"
        >
          <nav className="flex flex-col space-y-4 p-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-grayColor hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Social Icons */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200/20 dark:border-gray-700/20">
              {sortedSocials
                .filter((social) => social.url && !(social.url.includes("huggingface.co")))
                .map((social) => {
                  const IconFromMap = iconMap[social.title];
                  if (!IconFromMap) return null;

                  const SpecificIconComponent = IconFromMap as React.FC<IconProps>;
                  const ariaLabelText = `Follow Tirth Kanani on ${social.title}`;

                  return (
                    <a
                      key={social._id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabelText}
                      className="text-grayColor hover:text-primary transition-colors duration-300"
                    >
                      <SpecificIconComponent size={20} />
                    </a>
                  );
                })}
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}