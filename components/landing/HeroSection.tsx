"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRef, useState, useCallback, useEffect } from "react";
import BuildWith from "@/components/landing/BuildWith";
import GetStarted from "@/components/landing/GetStarted";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
}

interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
  name?: string;
  role?: string;
}

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

export const SmoothScrollHero = () => {
  return (
    <div className="bg-[var(--background)]">
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}>
        {/* <Nav /> */}
        <Hero />
        <BuildWithSection />
        <GetStarted />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <h1 className="text-sm font-extrabold text-[#acacac]">
        WARISAN NUSANTARA
      </h1>
      <button
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-zinc-400">
        LAUNCH SCHEDULE <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full">
      <CenterImage />

      <ParallaxImages />

      <div
        className="
  absolute bottom-0 left-0 right-0 h-96
  bg-gradient-to-b
  from-[color-mix(in_oklab,var(--background),transparent_100%)]
  to-[var(--background)]
"
      />
    </div>
  );
};

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}: ShinyTextProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        // Forward animation: 0 -> 100
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        // Delay at end
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        // Reverse animation: 100 -> 0
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        // Delay at start
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsedRef.current % cycleDuration;

      if (cycleTime < animationDuration) {
        // Animation phase: 0 -> 100
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        // Delay phase - hold at end (shine off-screen)
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });

  useEffect(() => {
    directionRef.current = direction === "left" ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  // Transform: p=0 -> 150% (shine off right), p=100 -> -50% (shine off left)
  const backgroundPosition = useTransform(
    progress,
    (p) => `${150 - p * 2}% center`
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <motion.h1
      className={`shiny-text ${className} text-extrabold`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {text}
    </motion.h1>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1697012320549-b298627a85ef?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <ShinyText
        text="WARISAN NUSANTARA"
        className="text-4xl font-black tracking-widest uppercase"
      />
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/asset/images/ken-jaya.jpg"
        alt="Ken Jayakusuma"
        start={-200}
        end={200}
        className="w-1/3"
        name="Ken Jayakusuma"
        role="Lead Project"
      />
      <ParallaxImg
        src="/asset/images/mario.jpeg"
        alt="I Kadek Mario Prayoga"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
        name="I Kadek Mario Prayoga"
        role="Web Developer"
      />
      <ParallaxImg
        src="/asset/images/wisnu.jpeg"
        alt="I Made Wisnu Pradnya Yoga"
        start={-200}
        end={200}
        className="ml-auto w-[250px]"
        name="I Made Wisnu Pradnya Yoga"
        role="Asset Designer"
      />
      <ParallaxImg
        src="/asset/images/riyasa.jpeg"
        alt="I Kadek Riyasa"
        start={0}
        end={-500}
        className="ml-24 w-[250px]"
        name="I Kadek Riyasa"
        role="Asset Designer"
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
  name,
  role,
}: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      style={{ transform, opacity }}
      className={`${className} relative z-50 overflow-hidden rounded-xl bg-zinc-900`}
      whileHover="hover">
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        variants={{
          hover: {
            scale: 1.1,
          },
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/70 opacity-0"
        variants={{
          hover: {
            opacity: 1,
          },
        }}
        transition={{ duration: 0.3 }}>
        <motion.p
          className="text-xl font-bold text-white text-center px-4"
          variants={{
            hover: { y: 0, opacity: 1 },
          }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}>
          {name}
        </motion.p>
        <motion.p
          className="text-sm font-medium text-zinc-300"
          variants={{
            hover: { y: 0, opacity: 1 },
          }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}>
          {role}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const BuildWithSection = () => {
  const BuildItems = [
    { link: "https://nextjs.org", text: "Next.js", logo: <SiNextdotjs /> },
    { link: "https://react.dev", text: "React", logo: <SiReact /> },
    {
      link: "https://tailwindcss.com",
      text: "Tailwind",
      logo: <SiTailwindcss />,
    },
    {
      link: "https://www.framer.com/motion/",
      text: "Framer Motion",
      logo: <SiFramer />,
    },
    {
      link: "https://www.typescriptlang.org/",
      text: "TypeScript",
      logo: <SiTypescript />,
    },
    { link: "https://vercel.com", text: "Vercel", logo: <SiVercel /> },
  ];

  return (
    <section className="bg-[var(--background)] pt-96">
      <div className="mx-auto max-w-5xl px-4 mb-20">
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-4xl font-black uppercase text-[var(--foreground)]">
          Build With
        </motion.h1>
      </div>
      <div className="relative w-full h-screen">
        <BuildWith items={BuildItems} />
      </div>
    </section>
  );
};
