// components/Hero.tsx
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { PageInfo } from "../typings";
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
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      {isClient && pageInfo?.heroImage ? (
        <div className="relative h-40 w-40 mx-auto">
          <SanityImage
            asset={pageInfo.heroImage}
            alt={pageInfo?.name || "Profile image"}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            priority
          />
        </div>
      ) : (
        <div className="relative rounded-full h-40 w-40 mx-auto bg-gray-300 animate-pulse" />
      )}

      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#68B2A0" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}