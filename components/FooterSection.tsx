"use client";

import { motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiInstagram, SiGitter } from "react-icons/si";

export default function FooterSection() {
    const socialLinks = [
        {
            icon: SiGithub,
            href: "https://github.com",
            label: "GitHub",
        },
        {
            icon: SiLinkedin,
            href: "https://linkedin.com",
            label: "LinkedIn",
        },
        {
            icon: SiInstagram,
            href: "https://instagram.com",
            label: "Instagram",
        },
        {
            icon: SiGitter,
            href: "https://twitter.com",
            label: "Twitter",
        },
    ];

    return (
        <footer className="bg-zinc-950 border-t border-zinc-800">
            <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center gap-8"
                >
                    {/* Logo / Title */}
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-zinc-200">
                            Warisan Nusantara
                        </h1>
                        <p className="mt-2 text-zinc-500 text-sm md:text-base">
                            Melestarikan kekayaan budaya Indonesia dalam digital.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="group relative flex items-center justify-center p-3 sm:p-4 rounded-full bg-zinc-900 text-zinc-400 transition-colors hover:text-white hover:bg-zinc-800"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                        delay: index * 0.1
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <Icon className="text-xl sm:text-2xl" />

                                    {/* Tooltipish glow effect on hover */}
                                    <span className="absolute inset-0 rounded-full bg-zinc-700/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Copyright */}
                    <motion.div
                        className="pt-8 border-t border-zinc-900 w-full text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="text-xs text-zinc-600">
                            &copy; {new Date().getFullYear()} Warisan Nusantara. All rights reserved.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}