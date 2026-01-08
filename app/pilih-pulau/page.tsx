"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import IndonesiaMap from "@react-map/indonesia";
import INDONESIA_DATA from "@/data/Data_Indonesia";
import { useTransition } from "@/context/TransitionContext";

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
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [windowDims, setWindowDims] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1920,
    h: typeof window !== "undefined" ? window.innerHeight : 1080,
  }));

  // Re-calculate window dimensions only on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDims({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use ResizeObserver for tooltip dimensions - this is asynchronous and avoids cascading render warnings
  useEffect(() => {
    if (!tooltipRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setDims({
          w: entries[0].target.clientWidth,
          h: entries[0].target.clientHeight,
        });
      }
    });
    observer.observe(tooltipRef.current);
    return () => observer.disconnect();
  }, [hoveredProvince]);

  // Derived values for positioning
  const offsetX = mousePos.x + dims.w + 40 > windowDims.w ? -(dims.w + 20) : 20;
  const offsetY = mousePos.y + dims.h + 40 > windowDims.h ? -(dims.h + 20) : 20;

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
            x: mousePos.x + offsetX,
            y: mousePos.y + offsetY,
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
                    &quot;
                    {INDONESIA_DATA[hoveredProvince]?.tag ||
                      "Kekayaan Nusantara yang tiada tara."}
                    &quot;
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

// --- 3. Komponen Utama ---
export default function IslandMapPage() {
  const router = useRouter();
  const { triggerTransition } = useTransition();
  // State implementation
  const [hoveredProvince, setHoveredProvince] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoomState, setZoomState] = useState({ scale: 1, x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (isTransitioning) return;

      // Identify province from SVG path under cursor
      const target = e.target as Element;
      if (target && target.tagName === "path") {
        const id = target.id;
        if (id && id.includes("-")) {
          const province = id.split("-")[0];
          setHoveredProvince(province);
        }
      } else {
        setHoveredProvince("");
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTransitioning]);

  const handleProvinceClick = (area: string | null) => {
    if (isTransitioning || !area) return;
    setIsTransitioning(true);
    const path = document.querySelector(
      `path[id^="${area}-"]`
    ) as SVGPathElement;

    if (path) {
      // ... existing SVG data extraction code ...
      // Extract SVG path data
      const pathData = path.getAttribute("d");
      const bbox = path.getBBox();
      const svg = path.ownerSVGElement;

      // Store SVG data in sessionStorage for detail page
      if (pathData) {
        sessionStorage.setItem(
          "selectedProvinceSVG",
          JSON.stringify({
            name: area,
            pathData: pathData,
            bbox: {
              x: bbox.x,
              y: bbox.y,
              width: bbox.width,
              height: bbox.height,
            },
          })
        );
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

    // Use triggerTransition instead of router.push with delay
    // Note: local setIsTransitioning controls zoom, triggerTransition controls clouds.
    // We can sync them or just fire triggerTransition.
    // Since triggerTransition takes 1.5s to close clouds, we can fire it nearby.

    setTimeout(() => {
      triggerTransition(`/pilih-pulau/${encodeURIComponent(area)}`);
    }, 1000); // Wait for zoom to start before triggering clouds
  };

  return (
    <motion.div className="min-h-screen bg-linear-to-br from-[#020607] via-[#051114] to-[#0a1f28] flex flex-col relative overflow-hidden">
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

      {/* Container with overflow for scrolling/panning on mobile */}
      <div className="z-10 w-full h-screen flex flex-col items-start md:items-center pt-24 pb-8 overflow-auto touch-pan-x touch-pan-y no-scrollbar">
        {/* Wrapper with fixed minimum width to ensure map is "large" and pannable */}
        <motion.div
          ref={mapContainerRef}
          className="relative min-w-[200vw] md:min-w-0 w-full flex-1 flex items-center justify-center cursor-crosshair"
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
