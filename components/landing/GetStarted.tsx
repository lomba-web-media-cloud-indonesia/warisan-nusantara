"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function GetStarted() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[60vh] overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1620549146396-9024d914cd99?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                />
                <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative z-10 container mx-auto px-6 text-center">
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                    Ayo Jelajahi!
                </h2>
                <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                    Temukan keajaiban budaya, alam, dan sejarah Nusantara yang tak
                    ternilai harganya. Mulai perjalananmu sekarang.
                </p>

                <Link href={"/pilih-pulau"}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--secondary)] text-white font-bold text-lg uppercase tracking-wide overflow-hidden transition-colors border border-white">
                        <span>Mulai Sekarang</span>
                        <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }}>
                            <FiArrowRight />
                        </motion.span>
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
}
