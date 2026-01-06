"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import IndonesiaMap from "@react-map/indonesia";
import INDONESIA_DATA from "@/data/Data_Indonesia";

// --- 1. Komponen Tooltip Terpisah (TSX) ---
const FloatingTooltip = ({
    hoveredProvince,
    mousePos,
    isTransitioning,
}: {
    hoveredProvince: string;
    mousePos: { x: number; y: number };
    isTransitioning: boolean;
}) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 20, y: 20 });

    useEffect(() => {
        if (tooltipRef.current) {
            const { clientWidth, clientHeight } = tooltipRef.current;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Logika anti-terpotong (Smart Positioning)
            const x =
                mousePos.x + clientWidth + 40 > screenWidth ? -(clientWidth + 20) : 20;
            const y =
                mousePos.y + clientHeight + 40 > screenHeight
                    ? -(clientHeight + 20)
                    : 20;

            setOffset({ x, y });
        }
    }, [mousePos, hoveredProvince]);

    return (
        <AnimatePresence>
            {hoveredProvince && !isTransitioning && (
                <motion.div
                    ref={tooltipRef}
                    key="tooltip"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: mousePos.x + offset.x,
                        y: mousePos.y + offset.y,
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        mass: 0.5,
                    }}
                    className="fixed z-[100] pointer-events-none top-0 left-0">
                    <div className="bg-zinc-950/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xl min-w-[260px] max-w-[300px]">
                        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600" />
                        <div className="p-5">
                            <header className="mb-4">
                                <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-400/80 font-bold block mb-0.5">
                                    Provinsi
                                </span>
                                <h2 className="text-white text-2xl font-black tracking-tighter uppercase leading-none">
                                    {hoveredProvince}
                                </h2>
                            </header>
                            <section className="space-y-3 border-t border-white/10 pt-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
                                        Budaya & Wisata
                                    </p>
                                    <p className="text-zinc-100 text-[15px] font-semibold leading-tight">
                                        {INDONESIA_DATA[hoveredProvince]?.tour ||
                                            "Eksplorasi Keindahan"}
                                    </p>
                                    <p className="text-[11px] text-emerald-400/90 italic mt-1 leading-snug">
                                        "
                                        {INDONESIA_DATA[hoveredProvince]?.tag ||
                                            "Kekayaan Nusantara yang tiada tara."}
                                        "
                                    </p>
                                </div>
                                <div className="flex">
                                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold tracking-tight uppercase">
                                        {INDONESIA_DATA[hoveredProvince]?.culture ||
                                            "Tradisi Lokal"}
                                    </span>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- 2. Komponen Cloud Overlay ---
const CloudOverlay = ({ isVisible }: { isVisible: boolean }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: i % 2 === 0 ? "-120%" : "120%",
                            y: `${Math.random() * 100}%`,
                            scale: 2 + Math.random() * 3,
                            opacity: 0,
                        }}
                        animate={{
                            x: i % 2 === 0 ? "120%" : "-120%",
                            opacity: [0, 0.8, 0.8, 0],
                        }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: i * 0.1 }}
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

// --- 3. Komponen Utama ---
export default function IslandMapPage() {
    const router = useRouter();
    const [hoveredProvince, setHoveredProvince] = useState<string>("");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [zoomState, setZoomState] = useState({ scale: 1, x: 0, y: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) =>
            setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleGlobalMouseMove);
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    }, []);

    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) return;
        const paths = container.querySelectorAll("path");
        const handleMouseEnter = (e: Event) => {
            if (isTransitioning) return;
            const id = (e.target as SVGPathElement).getAttribute("id");
            if (id) setHoveredProvince(id.split("-")[0]);
        };
        const handleMouseLeave = () => setHoveredProvince("");
        paths.forEach((path) => {
            path.addEventListener("mouseenter", handleMouseEnter);
            path.addEventListener("mouseleave", handleMouseLeave);
        });
        return () =>
            paths.forEach((path) => {
                path.removeEventListener("mouseenter", handleMouseEnter);
                path.removeEventListener("mouseleave", handleMouseLeave);
            });
    }, [isTransitioning]);

    const handleProvinceClick = (area: string) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const path = document.querySelector(
            `path[id^="${area}-"]`
        ) as SVGPathElement;
        if (path) {
            // Extract SVG path data
            const pathData = path.getAttribute('d');
            const bbox = path.getBBox();
            const svg = path.ownerSVGElement;

            // Store SVG data in sessionStorage for detail page
            if (pathData) {
                sessionStorage.setItem('selectedProvinceSVG', JSON.stringify({
                    name: area,
                    pathData: pathData,
                    bbox: {
                        x: bbox.x,
                        y: bbox.y,
                        width: bbox.width,
                        height: bbox.height
                    }
                }));
            }

            if (svg) {
                const vb = svg.viewBox.baseVal;
                setZoomState({
                    scale: 6,
                    x: (vb.width / 2 - (bbox.x + bbox.width / 2)) * 4,
                    y: (vb.height / 2 - (bbox.y + bbox.height / 2)) * 4,
                });
            }
        }
        setTimeout(
            () => router.push(`/pilih-pulau/${encodeURIComponent(area)}`),
            2200
        );
    };

    return (
        <motion.div className="min-h-screen bg-linear-to-br from-[#020607] via-[#051114] to-[#0a1f28] flex flex-col relative overflow-hidden">
            <CloudOverlay isVisible={isTransitioning} />

            {/* Tooltip dipanggil di sini */}
            <FloatingTooltip
                hoveredProvince={hoveredProvince}
                mousePos={mousePos}
                isTransitioning={isTransitioning}
            />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
        path[id^="Timor-Leste-"], path[id^="Sabah-"], path[id^="Sarawak-"], path[id^="Brunei Darussalam-"] { display: none !important; }
        path { transition: fill 0.3s ease; }
        path:hover { fill: #2dd4bf !important; filter: drop-shadow(0 0 12px rgba(45, 212, 191, 0.4)); }
      `,
                }}
            />

            <div className="absolute top-8 left-8 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest text-sm font-bold">
                        Kembali
                    </span>
                </Link>
            </div>

            <div className="z-10 w-full h-screen flex flex-col items-center pt-24 pb-8">
                <motion.div
                    ref={mapContainerRef}
                    className="relative w-full flex-1 flex items-center justify-center cursor-crosshair"
                    animate={{ scale: zoomState.scale, x: zoomState.x, y: zoomState.y }}
                    transition={{
                        duration: isTransitioning ? 2.5 : 1,
                        ease: "easeInOut",
                    }}>
                    <IndonesiaMap
                        type="select-single"
                        size={2000}
                        mapColor="#1a3a42"
                        strokeColor="#34d399"
                        strokeWidth={1}
                        disableHover={true}
                        onSelect={handleProvinceClick}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}
