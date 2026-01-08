"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTransition } from "@/context/TransitionContext";
import { useEffect, useState } from "react";

// Helper to generate image paths
// Helper to generate image paths - User requested ONLY image 42.png

export default function CloudTransition() {
  const { isTransitioning } = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const [clouds, setClouds] = useState<
    {
      id: number;
      src: string;
      top: string;
      left: string;
      scale: number;
      duration: number;
      delay: number;
      initialX: string;
    }[]
  >([]);

  useEffect(() => {
    if (isTransitioning) {
      // Wrap in setTimeout to avoid synchronous state update in effect (cascading renders)
      const timer = setTimeout(() => {
        setIsVisible(true);
        setClouds(
          [...Array(50)].map((_, i) => {
            const isLeft = i % 2 === 0;
            return {
              id: i,
              src: "/asset/images/pagetransition/image 42.png",
              top: `${Math.random() * 160 - 30}%`,
              left: isLeft
                ? `${Math.random() * 90 - 20}%`
                : `${Math.random() * 90 + 20}%`,
              scale: 2 + Math.random() * 2.5,
              duration: 0.8 + Math.random() * 0.4,
              delay: Math.random() * 0.15,
              initialX: isLeft ? "-100vw" : "100vw",
            };
          })
        );
      }, 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (!isVisible && !isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{
            x: cloud.initialX,
            opacity: 0,
          }}
          animate={{
            x: isTransitioning ? "0%" : cloud.initialX,
            opacity: 1,
          }}
          transition={{
            duration: cloud.duration,
            ease: [0.22, 1, 0.36, 1],
            delay: cloud.delay,
          }}
          className="absolute w-[600px] h-[400px]"
          style={{
            top: cloud.top,
            left: cloud.left,
            scale: cloud.scale,
          }}>
          <Image
            src={cloud.src}
            alt="cloud"
            fill
            className="object-contain opacity-100 drop-shadow-2xl"
          />
        </motion.div>
      ))}
    </div>
  );
}
