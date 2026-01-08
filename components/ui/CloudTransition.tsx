"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTransition } from "@/context/TransitionContext";
import { useEffect, useState } from "react";

// Helper to generate image paths
// Helper to generate image paths - User requested ONLY image 42.png
const leftClouds = Array(24).fill("image 42.png");
const rightClouds = Array(24).fill("image 42.png");

export default function CloudTransition() {
    const { isTransitioning } = useTransition();
    const [isVisible, setIsVisible] = useState(false);

    // Keep the component mounted locally during the transition
    useEffect(() => {
        if (isTransitioning) {
            setIsVisible(true);
        } else {
            // slight delay to allow exit animation to finish before unmounting/hiding if needed
            const timer = setTimeout(() => setIsVisible(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    if (!isVisible && !isTransitioning) return null;

    // Use the arrays directly (they are already dense enough)
    const denseLeftClouds = [...leftClouds, ...leftClouds];
    const denseRightClouds = [...rightClouds, ...rightClouds];

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col md:flex-row">
            {/* Left Curtain */}
            <motion.div
                className="relative w-full md:w-1/2 h-1/2 md:h-full"
            >
                {denseLeftClouds.map((img, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{
                            x: isTransitioning ? "0%" : "-100%",
                            opacity: 1
                        }}
                        transition={{
                            duration: 1 + Math.random() * 0.8,
                            delay: (i % 8) * 0.05,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{
                            // Distribute vertically with some randomness, ensuring overlap
                            top: `${(i / denseLeftClouds.length) * 130 - 15}%`,
                            // Layer them horizontally to create thickness
                            left: `${(i % 6) * 60 - 80}px`,
                            width: '180%',
                            height: 'auto',
                            zIndex: i
                        }}
                    >
                        <Image
                            src={`/asset/images/pagetransition/${img}`}
                            alt="cloud"
                            width={800}
                            height={600}
                            className={`object-contain ${i % 2 === 0 ? 'scale-125' : 'scale-150'}`}
                            priority
                        />
                    </motion.div>
                ))}
            </motion.div>


            {/* Right Curtain */}
            <motion.div
                className="relative w-full md:w-1/2 h-1/2 md:h-full"
            >
                {denseRightClouds.map((img, i) => (
                    <motion.div
                        key={i}
                        className="absolute right-0"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{
                            x: isTransitioning ? "0%" : "100%",
                            opacity: 1
                        }}
                        transition={{
                            duration: 1 + Math.random() * 0.8,
                            delay: (i % 8) * 0.05,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{
                            top: `${(i / denseRightClouds.length) * 130 - 15}%`,
                            right: `${(i % 6) * 60 - 80}px`,
                            width: '180%',
                            height: 'auto',
                            zIndex: i
                        }}
                    >
                        <Image
                            src={`/asset/images/pagetransition/${img}`}
                            alt="cloud"
                            width={800}
                            height={600}
                            className={`object-contain ${i % 2 === 0 ? 'scale-125' : 'scale-150'}`}
                            priority
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
