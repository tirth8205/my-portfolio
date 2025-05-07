import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  const [imageSize, setImageSize] = useState({ width: 208, height: 208 });

  useEffect(() => {
    const updateImageSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setImageSize({ width: 160, height: 160 });
      } else if (width < 1024) {
        // Tablet
        setImageSize({ width: 256, height: 384 });
      } else {
        // Desktop and larger
        setImageSize({ width: 500, height: 600 });
      }
    };

    updateImageSize();
    window.addEventListener("resize", updateImageSize);
    return () => window.removeEventListener("resize", updateImageSize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-4 sm:px-6 md:px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-16 sm:top-20 md:top-24 uppercase tracking-[12px] sm:tracking-[16px] md:tracking-[20px] text-gray-500 text-lg sm:text-xl md:text-2xl">
        About
      </h3>

      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        className="mb-[-80px] sm:mb-[-96px] md:mb-0 flex-shrink-0 rounded-full object-cover md:rounded-lg"
        style={{
          width: imageSize.width,
          height: imageSize.height,
        }}
        src={urlFor(pageInfo?.profilePic).url()}
      />
      <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 px-0 md:px-10">
        <h4 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-darkGreen/50">little</span>{" "}
          background
        </h4>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-justify">
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}