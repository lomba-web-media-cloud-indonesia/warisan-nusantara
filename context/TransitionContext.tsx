"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type TransitionContextType = {
    isTransitioning: boolean;
    triggerTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const triggerTransition = (href: string) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Wait for "close" animation to finish (approx 1s-1.5s), then navigate
        setTimeout(() => {
            router.push(href);

            // Wait a bit for page to load/render, then start "open" animation
            // We rely on the component to detect location change or we can just set a timeout
            // Simulating a "loading" delay + animation time
            setTimeout(() => {
                setIsTransitioning(false);
            }, 800);

        }, 1500); // Duration for clouds to fully close
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("useTransition must be used within a TransitionProvider");
    }
    return context;
};
