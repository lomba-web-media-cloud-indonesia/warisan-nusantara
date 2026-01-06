"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import IndonesiaMap from "@react-map/indonesia";

// Cloud Component for transition
const CloudOverlay = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
                >
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: i % 2 === 0 ? '-120%' : '120%',
                                y: `${Math.random() * 100}%`,
                                scale: 2 + Math.random() * 3,
                                opacity: 0
                            }}
                            animate={{
                                x: i % 2 === 0 ? '120%' : '-120%',
                                opacity: [0, 0.8, 0.8, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                ease: "easeInOut",
                                delay: i * 0.1
                            }}
                            className="absolute w-[400px] h-[300px] bg-white/20 blur-[100px] rounded-full"
                        />
                    ))}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function IslandMapPage() {
    const router = useRouter();
    const [hoveredProvince, setHoveredProvince] = useState<string>("");
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [zoomState, setZoomState] = useState({ scale: 1, x: 0, y: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    // Track mouse position globally for the floating tooltip
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleGlobalMouseMove);
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    }, []);

    // Hijack events from the IndonesiaMap SVG paths
    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) return;

        // The library renders paths with IDs like "Bali-instanceId"
        const paths = container.querySelectorAll('path');

        const handleMouseEnter = (e: Event) => {
            if (isTransitioning) return;
            const target = e.target as SVGPathElement;
            const id = target.getAttribute('id');
            if (id) {
                // Extract province name (strip the instance ID suffix if present)
                const name = id.split('-')[0];
                setHoveredProvince(name);
            }
        };

        const handleMouseLeave = () => {
            setHoveredProvince("");
        };

        paths.forEach(path => {
            path.addEventListener('mouseenter', handleMouseEnter);
            path.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            paths.forEach(path => {
                path.removeEventListener('mouseenter', handleMouseEnter);
                path.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isTransitioning]);

    const handleProvinceClick = (area: string) => {
        if (isTransitioning) return;

        setSelectedProvince(area);
        setIsTransitioning(true);

        // Find the specific path to get its coordinates
        const path = document.querySelector(`path[id^="${area}-"]`) as SVGPathElement;
        if (path && mapContainerRef.current) {
            const bbox = path.getBBox();
            const svg = path.ownerSVGElement;
            if (svg) {
                // Calculate center of the province relative to SVG
                const centerX = bbox.x + bbox.width / 2;
                const centerY = bbox.y + bbox.height / 2;

                // Get SVG viewBox to map coordinates correctly
                const vb = svg.viewBox.baseVal;

                // Calculate translation to bring centerX/centerY to center of view
                // We normalize it based on viewBox
                const moveX = (vb.width / 2 - centerX) * 4; // Multiplier for scale
                const moveY = (vb.height / 2 - centerY) * 4;

                setZoomState({
                    scale: 6,
                    x: moveX,
                    y: moveY
                });
            }
        }

        // Trigger transition to next page after cloud animation
        setTimeout(() => {
            router.push(`/pilih-pulau/${encodeURIComponent(area)}`);
        }, 2200);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-linear-to-br from-[#020607] via-[#051114] to-[#0a1f28] flex flex-col relative overflow-hidden"
        >
            <CloudOverlay isVisible={isTransitioning} />

            <style dangerouslySetInnerHTML={{
                __html: `
                path[id^="Timor-Leste-"],
                path[id^="Sabah-"],
                path[id^="Sarawak-"],
                path[id^="Brunei Darussalam-"] {
                    display: none !important;
                }
                
                /* Stable Hover Color Bypass */
                path {
                    transition: fill 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                path:hover {
                    fill: #2dd4bf !important;
                    filter: drop-shadow(0 0 12px rgba(45, 212, 191, 0.4));
                }
            ` }} />

            {/* Back Button */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest text-sm font-bold">Kembali</span>
                </Link>
            </div>

            {/* Ambient Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="z-10 w-full h-screen flex flex-col items-center px-4 md:px-8 pt-24 pb-8">

                {/* Map Container */}
                <motion.div
                    ref={mapContainerRef}
                    className="relative w-full flex-1 flex items-center justify-center cursor-crosshair"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                        opacity: 1,
                        scale: zoomState.scale,
                        x: zoomState.x,
                        y: zoomState.y
                    }}
                    transition={{
                        duration: isTransitioning ? 2.5 : 1,
                        ease: isTransitioning ? "easeInOut" : "easeOut",
                        delay: isTransitioning ? 0 : 0.4
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <IndonesiaMap
                            type="select-single"
                            size={2000}
                            mapColor="#1a3a42"
                            strokeColor="#34d399"
                            strokeWidth={1}
                            disableHover={true} // Disable internal broken hover logic
                            onClick={handleProvinceClick}
                        />
                    </div>
                </motion.div>

                {/* Floating Tooltip */}
                <AnimatePresence>
                    {hoveredProvince && !isTransitioning && (
                        <motion.div
                            key="tooltip"
                            initial={{ opacity: 0, scale: 0.95, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 5 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="fixed z-100 pointer-events-none"
                            style={{
                                left: mousePos.x + 24,
                                top: mousePos.y + 24,
                            }}
                        >
                            <div className="bg-zinc-950/80 backdrop-blur-xl border border-emerald-500/30 px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.1)] flex flex-col items-center min-w-[140px]">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/80 font-bold mb-1">Wilayah</span>
                                <span className="text-white text-xl md:text-2xl font-black tracking-tighter uppercase tabular-nums">
                                    {hoveredProvince}
                                </span>
                                <div className="w-full h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent mt-2" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Guide */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 0 : 1 }}
                    transition={{ delay: 2 }}
                    className="mt-6 text-center text-zinc-500 text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-40"
                >
                    Klik wilayah untuk memulai penjelajahan
                </motion.div>

            </div>
        </motion.div>
    )
}