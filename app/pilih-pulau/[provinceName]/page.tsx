"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiInfo, FiCompass, FiMap } from "react-icons/fi";
import { useEffect, useState } from "react";
import INDONESIA_DATA from "@/data/Data_Indonesia";
import { touristSpots } from "@/data/LocTourism";

export default function PulauDetailPage() {
  const params = useParams();
  const provinceName = decodeURIComponent(params.provinceName as string);

  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [viewBox, setViewBox] = useState<string>("0 0 500 500");
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

  const provinceData = INDONESIA_DATA[provinceName];

  useEffect(() => {
    const fileName = provinceData?.svgName || provinceName;

    const tryPaths = [
      `/asset/pulau/${fileName}.svg`,
      `/asset/pulau/${fileName.toLowerCase()}.svg`,
    ];

    const loadSVG = async () => {
      for (const path of tryPaths) {
        try {
          const res = await fetch(path);
          if (res.ok) {
            const data = await res.text();
            const viewBoxMatch = data.match(/viewBox="([^"]+)"/);
            if (viewBoxMatch) setViewBox(viewBoxMatch[1]);

            const cleanContent = data
              .replace(/<svg[^>]*>/, "")
              .replace(/<\/svg>/, "");

            setSvgContent(cleanContent);
            return;
          }
        } catch (err) {
          console.warn(`Gagal memuat dari ${path}:`, err);
        }
      }
      console.error("Semua percobaan load SVG gagal untuk:", provinceName);
    };

    loadSVG();
  }, [provinceName, provinceData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#020607] text-white flex flex-col relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Header */}
      <header className="z-20 px-8 py-8 flex justify-between items-center relative">
        <Link
          href="/pilih-pulau"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">
            Kembali ke Peta
          </span>
        </Link>

        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">
            Wilayah Terpilih
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            {provinceName}
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 z-10">
        {/* Visual Section - SVG Map */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center relative w-full h-[600px] md:h-[800px] max-w-5xl">
          {/* Decorative Ring */}
          <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-emerald-500/10 rounded-full pointer-events-none z-0" />

          {svgContent ? (
            <svg
              viewBox={viewBox}
              className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.4)] z-10">
              {/* Render SVG Province Shape */}
              <g
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />

              {/* Gradient Definitions untuk Glow Effect */}
              <defs>
                <radialGradient id="spotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="spotGlowHover" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Render Tourist Spot Markers */}
              {touristSpots[provinceName]?.map((spot, index) => (
                <g
                  key={index}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredSpot(spot.name)}
                  onMouseLeave={() => setHoveredSpot(null)}>
                  {/* Invisible Hit Area untuk hover yang lebih mudah */}
                  <circle cx={spot.x} cy={spot.y} r={20} fill="transparent" />

                  {/* Outer Glow Circle */}
                  <motion.circle
                    cx={spot.x}
                    cy={spot.y}
                    r={hoveredSpot === spot.name ? 18 : 15}
                    fill={
                      hoveredSpot === spot.name
                        ? "url(#spotGlowHover)"
                        : "url(#spotGlow)"
                    }
                    opacity={hoveredSpot === spot.name ? 0.9 : 0.7}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Middle Ring */}
                  <motion.circle
                    cx={spot.x}
                    cy={spot.y}
                    r={hoveredSpot === spot.name ? 8 : 6}
                    fill="#fbbf24"
                    opacity={0.8}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Inner Core Point */}
                  <motion.circle
                    cx={spot.x}
                    cy={spot.y}
                    r={hoveredSpot === spot.name ? 4 : 3}
                    fill="#ffffff"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Tooltip Label on Hover */}
                  {hoveredSpot === spot.name && (
                    <motion.g
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}>
                      <text
                        x={spot.x}
                        y={spot.y - 25}
                        textAnchor="middle"
                        fill="#fbbf24"
                        fontSize="20"
                        fontWeight="bold"
                        className="pointer-events-none select-none"
                        style={{
                          textShadow: "0 0 8px black, 0 0 4px black",
                          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))",
                        }}>
                        {spot.name}
                      </text>
                    </motion.g>
                  )}
                </g>
              ))}
            </svg>
          ) : (
            <div className="text-zinc-500 animate-pulse">Memuat Peta...</div>
          )}
        </motion.div>
      </main>
    </motion.div>
  );
}
