// components/Hero.tsx
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { PageInfo } from "../types";
import BackgroundCircles from "./BackgroundCircles";
import SanityImage from "./SanityImage";

type Props = { pageInfo: PageInfo };

export default function Hero({ pageInfo }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [text, count] = useTypewriter({
    words: [
      `Hi, the name's ${pageInfo?.name}`,
      "I like going on Treks 🏔️",
      "I_like_to_code.py",
      "And I'm addicted to ☕️",
    ],
    loop: true,
    delaySpeed: 2000,
    typeSpeed: 100,
    deleteSpeed: 50,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center overflow-hidden relative px-4 sm:px-6 lg:px-8">
      <BackgroundCircles />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-8 sm:right-16 w-24 sm:w-32 h-24 sm:h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-12 sm:right-20 w-12 sm:w-16 h-12 sm:h-16 bg-secondary/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Main Content Container */}
      <div className="z-20 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Profile Image with Enhanced Animation */}
        {pageInfo?.heroImage ? (
          <motion.div
            className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-20"></div>
            <div className="absolute inset-1 bg-lightBackground dark:bg-darkBackground rounded-full"></div>
            <div className="absolute inset-2">
              <SanityImage
                asset={pageInfo.heroImage}
                alt={pageInfo?.name || "Profile image"}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
                priority
                sizes="(max-width: 640px) 8rem, (max-width: 768px) 10rem, 12rem"
              />
            </div>
          </motion.div>
        ) : (
          <div className="relative rounded-full h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 bg-gray-300" />
        )}

        {/* Role Text */}
        <motion.h2
          className="text-sm uppercase text-grayColor tracking-[6px] md:tracking-[8px] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {pageInfo?.role}
        </motion.h2>
        
        {/* Typewriter Text */}
        <motion.div 
          className="min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-extrabold px-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isClient ? text : "Hi, the name's " + (pageInfo?.name || "")}
            </span>
            {isClient && <Cursor cursorColor="#7C3AED" />}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-grayColor max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          Passionate about AI, HCI, and building innovative solutions that make a difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <Link href="#projects">
            <motion.button 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
          </Link>
          <Link href="#contact">
            <motion.button 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}