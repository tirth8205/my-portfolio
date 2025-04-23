import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { Social } from "../typings";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Props) {
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
        className="flex flex-row items-center"
      >
        {/* Social icons */}
        {socials
          .filter((social) => !(social.url?.includes("huggingface.co"))) // Exclude Hugging Face with safeguard
          .map((social) => {
            // Parse the URL and check the host against a whitelist
            let network;
            try {
              const url = new URL(social.url);
              const host = url.hostname.toLowerCase();
              const allowedHosts = ["x.com", "twitter.com"];
              // Check if the host exactly matches or is a subdomain of an allowed host
              const isAllowed = allowedHosts.some(
                (allowedHost) =>
                  host === allowedHost ||
                  host.endsWith(`.${allowedHost}`)
              );
              network = isAllowed ? "twitter" : undefined;
            } catch (error) {
              // If URL parsing fails, default to undefined
              network = undefined;
            }

            return (
              <SocialIcon
                key={social._id}
                url={social.url}
                network={network}
                fgColor="gray"
                bgColor="transparent"
                className="hover:opacity-80 transition-opacity"
              />
            );
          })}
      </motion.div>

      <Link href="#contact">
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
          className="flex flex-row items-center text-gray-300 cursor-pointer"
        >
          <SocialIcon
            className="cursor-pointer"
            network="email"
            fgColor="grey"
            bgColor="transparent"
          />
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get in touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}