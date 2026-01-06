"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiInfo, FiCompass, FiMap } from "react-icons/fi";
import { useEffect, useState } from "react";
import INDONESIA_DATA from "@/data/Data_Indonesia";

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

export default function PulauDetailPage() {
  const params = useParams();
  const router = useRouter();
  const provinceName = decodeURIComponent(params.provinceName as string);
  const [svgData, setSvgData] = useState<ProvinceSVGData | null>(null);

  useEffect(() => {
    // Retrieve SVG data from sessionStorage
    const storedData = sessionStorage.getItem('selectedProvinceSVG');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setSvgData(parsed);
      } catch (e) {
        console.error('Failed to parse SVG data:', e);
      }
    }
  }, []);

  const provinceData = INDONESIA_DATA[provinceName];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#020607] text-white flex flex-col relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="z-10 px-8 py-8 flex justify-between items-center">
        <Link href="/pilih-pulau" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">Kembali ke Peta</span>
        </Link>
        <div className="flex gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Wilayah Terpilih</span>
            <h1 className="text-3xl font-black uppercase tracking-tighter">{provinceName}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 gap-12 z-10">

        {/* Visual Section - Display Extracted SVG */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center relative w-full h-[400px] md:h-[600px]"
        >
          {svgData ? (
            <svg
              viewBox={`${svgData.bbox.x - 10} ${svgData.bbox.y - 10} ${svgData.bbox.width + 20} ${svgData.bbox.height + 20}`}
              className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <motion.path
                d={svgData.pathData}
                fill="#34d399"
                stroke="#10b981"
                strokeWidth={2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          ) : (
            <div className="text-zinc-500 text-center">
              <p className="text-sm">Loading SVG...</p>
            </div>
          )}

          {/* Decorative Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-emerald-500/10 rounded-full"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex-1 max-w-xl space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] uppercase tracking-widest font-bold">
              <FiCompass className="animate-spin-slow" /> Penjelajahan Budaya
            </div>
            <h2 className="text-5xl font-black leading-tight">
              Kilau <span className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">Warisan</span> Nusantara di {provinceName}
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg">
              {provinceData?.tag || `Temukan keindahan tak ternilai dari ${provinceName}, mulai dari arsitektur megah hingga tradisi yang masih terjaga.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl text-left hover:border-emerald-500/30 transition-all group"
            >
              <div className="p-3 bg-emerald-500/10 rounded-2xl w-fit text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                <FiInfo />
              </div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">Destinasi</div>
              <div className="text-lg font-bold">{provinceData?.tour || "Eksplorasi Destinasi"}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl text-left hover:border-emerald-500/30 transition-all group"
            >
              <div className="p-3 bg-emerald-500/10 rounded-2xl w-fit text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                <FiMap />
              </div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">Budaya</div>
              <div className="text-lg font-bold">{provinceData?.culture || "Tradisi Lokal"}</div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-5 bg-emerald-500 text-[#020607] font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:bg-emerald-400 transition-colors"
          >
            Mulailah Penjelajahan
          </motion.button>
        </motion.div>

      </main>

      {/* Ambient Particles */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
    </motion.div>
  );
}
