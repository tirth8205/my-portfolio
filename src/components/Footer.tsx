// components/Footer.tsx
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaMedium } from "react-icons/fa";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/tirthkanani/", label: "LinkedIn" },
        { icon: FaGithub, href: "https://github.com/tirth8205", label: "GitHub" },
        { icon: FaTwitter, href: "https://twitter.com/tirthkanani", label: "Twitter" },
        { icon: FaMedium, href: "https://medium.com/@tirthkanani", label: "Medium" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-gradient-to-t from-violet-900/20 to-transparent dark:from-violet-900/30 py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Back to Top Button */}
                <motion.button
                    onClick={scrollToTop}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary 
                     p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Back to top"
                >
                    <ArrowUpIcon className="w-5 h-5 text-white" />
                </motion.button>

                <div className="flex flex-col items-center space-y-6 pt-8">
                    {/* Logo/Brand */}
                    <Link
                        href="#hero"
                        className="text-2xl font-display font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    >
                        Tirth Kanani
                    </Link>

                    {/* Social Links */}
                    <div className="flex items-center space-x-6">
                        {socialLinks.map((social) => {
                            const IconComponent = social.icon as React.ComponentType<{ size: number }>;
                            return (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow on ${social.label}`}
                                    className="text-grayColor hover:text-primary transition-colors duration-300"
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <IconComponent size={22} />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((link) => (
                            <Link
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-grayColor hover:text-primary transition-colors duration-300"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-grayColor/30 to-transparent" />

                    {/* Copyright */}
                    <div className="text-center text-sm text-grayColor">
                        <p>© {currentYear} Tirth Kanani. All rights reserved.</p>
                        <p className="mt-1 text-xs opacity-70">
                            Built with Next.js, Tailwind CSS & ❤️
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
