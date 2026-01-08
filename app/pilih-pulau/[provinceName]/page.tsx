"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiInfo, FiCompass, FiMap } from "react-icons/fi";
import { useEffect, useState } from "react";
import INDONESIA_DATA from "@/data/Data_Indonesia";
import { touristSpots } from "@/data/LocTourism";
import { useChat } from "@/context/ChatContext";
import { useTransition } from "@/context/TransitionContext";

interface ProvinceSVGData {
  name: string;
  pathData: string;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface ProvinceInfo {
  tag?: string;
  tour?: string;
  culture?: string;
  [key: string]: any;
}

export default function PulauDetailPage() {
  const params = useParams();
  const provinceName = decodeURIComponent(params.provinceName as string);
  const { openChat } = useChat();
  const { triggerTransition } = useTransition();

  const [svgData, setSvgData] = useState<ProvinceSVGData | null>(null);
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

  const provinceData = (INDONESIA_DATA as Record<string, ProvinceInfo>)[
    provinceName
  ];

  useEffect(() => {
    // 1. Daftar Provinsi yang WAJIB ambil dari public/asset/pulau
    const specialProvinces = [
      "Nusa Tenggara Timur",
      "Nusa Tenggara Barat",
      "Sulawesi Tenggara",
      "Kepulauan Riau",
      "Bali",
      "Jakarta",
    ];

    const isSpecial = specialProvinces.some((p) =>
      provinceName.toLowerCase().includes(p.toLowerCase())
    );

    const loadSpecialSVG = async () => {
      try {
        let fileName = provinceName;
        if (provinceName === "Jakarta Raya") fileName = "Jakarta";
        else if (provinceName === "Nusa Tenggara Barat") fileName = "NTB";
        else if (provinceName === "Nusa Tenggara Timur") fileName = "NTT";
        else if (provinceName === "Sulawesi Tenggara") fileName = "s-tenggara";
        else if (provinceName === "Kepulauan Riau") fileName = "kep_riau";
        else if (provinceName === "Bali") fileName = "Bali";
        console.log("Load:", `/asset/pulau/${fileName}.svg`);

        const res = await fetch(`/asset/pulau/${fileName}.svg`);
        if (res.ok) {
          const svgText = await res.text();

          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, "image/svg+xml");

          const svgElement = doc.querySelector("svg");
          if (!svgElement) throw new Error("No SVG element found");

          // Extract viewBox
          const viewBoxAttr = svgElement.getAttribute("viewBox");
          const vbValues = viewBoxAttr
            ? viewBoxAttr.split(" ").map(Number)
            : [0, 0, 500, 500];

          // Extract ALL paths (for archipelagos)
          const paths = Array.from(doc.querySelectorAll("path"));
          const combinedPathData = paths
            .map((p) => p.getAttribute("d"))
            .filter(Boolean)
            .join(" ");

          if (combinedPathData) {
            setSvgData({
              name: provinceName,
              pathData: combinedPathData,
              bbox: {
                x: vbValues[0],
                y: vbValues[1],
                width: vbValues[2],
                height: vbValues[3],
              },
            });
          }
        } else {
          console.error("Failed to fetch SVG:", res.status, res.statusText);
        }
      } catch (err) {
        console.error("Gagal load special SVG:", err);
      }
    };

    // 2. LOGIKA HYBRID
    if (isSpecial) {
      console.log("Mode: Fetch dari Public Asset");
      loadSpecialSVG();
    } else {
      console.log("Mode: Ambil dari Session Storage");
      const storedData = sessionStorage.getItem("selectedProvinceSVG");
      if (storedData) {
        try {
          const parsed: ProvinceSVGData = JSON.parse(storedData);
          setSvgData(parsed);
        } catch (e) {
          console.error("Error parsing storage:", e);
        }
      }
    }
  }, [provinceName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#020607] text-white flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Header */}
      <header className="z-10 px-8 py-8 flex justify-between items-center">
        <button
          onClick={() => triggerTransition('/pilih-pulau')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">
            Kembali ke Peta
          </span>
        </button>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">
            Wilayah Terpilih
          </span>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-right leading-none">
            {provinceName}
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 gap-12 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex items-center justify-center relative w-full h-[400px] md:h-[600px]">
          <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-emerald-500/10 rounded-full" />

          {svgData ? (
            (() => {
              let dynamicSize = (svgData.bbox.width + svgData.bbox.height) / 40;

              const minSize = 5;
              const maxSize = 50;
              const dotSize = Math.max(minSize, Math.min(maxSize, dynamicSize));

              const fontSize = Math.max(2, Math.min(20, dotSize * 0.3));

              return (
                <svg
                  viewBox={`${svgData.bbox.x} ${svgData.bbox.y} ${svgData.bbox.width} ${svgData.bbox.height}`}
                  className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  preserveAspectRatio="xMidYMid meet">
                  <motion.path
                    d={svgData.pathData}
                    fill="#34d399"
                    stroke="#10b981"
                    strokeWidth={svgData.bbox.width / 200}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />

                  {touristSpots[provinceName]?.map((spot, index) => (
                    <g
                      key={index}
                      className="cursor-pointer"
                      onClick={() =>
                        openChat(
                          `Ceritakan secara singkat tentang keunikan dan daya tarik wisata ${spot.name} di ${provinceName}!`
                        )
                      }
                      onMouseEnter={() => setHoveredSpot(spot.name)}
                      onMouseLeave={() => setHoveredSpot(null)}>
                      {/* Area Hitbox Hover (Lingkaran transparan yang lebih besar) */}
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r={dotSize}
                        fill="transparent"
                      />

                      {/* Gambar Dot.png */}
                      <motion.image
                        href="/asset/images/dot.png"
                        x={spot.x - dotSize / 2}
                        y={spot.y - dotSize / 2}
                        width={dotSize}
                        height={dotSize}
                        animate={{
                          scale: hoveredSpot === spot.name ? 1.3 : 1,
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          opacity: { repeat: Infinity, duration: 2 },
                        }}
                      />

                      {hoveredSpot === spot.name && (
                        <text
                          x={spot.x}
                          y={
                            spot.y - svgData.bbox.y < svgData.bbox.height * 0.15
                              ? spot.y + dotSize * 1.5
                              : spot.y - dotSize
                          }
                          textAnchor="middle"
                          fill="#fbbf24"
                          fontWeight="bold"
                          fontSize={fontSize}
                          style={{
                            textShadow: "2px 2px 4px black",
                            pointerEvents: "none",
                          }}>
                          {spot.name}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              );
            })()
          ) : (
            <div className="text-zinc-500 animate-pulse">
              Memuat Peta {provinceName}...
            </div>
          )}
        </motion.div>
      </main>
    </motion.div>
  );
}
