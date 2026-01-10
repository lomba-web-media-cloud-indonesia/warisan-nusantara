"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTransition } from '@/context/TransitionContext';

const GetStarted = () => {
    const { triggerTransition } = useTransition();

    return (
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620549146396-9024d914cd99?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9yb2J1ZHVyfGVufDB8fDB8fHww')" }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-wider"
                >
                    Mulai Petualanganmu
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-zinc-300 text-sm md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Temukan keajaiban yang tersembunyi di setiap sudut Nusantara. Dari Sabang sampai Merauke, cerita nenek moyang menantimu.
                </motion.p>

                <motion.button
                    onClick={() => triggerTransition('/pilih-pulau')}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_30px_rgba(198,166,100,0.4)] hover:shadow-[0_0_50px_rgba(198,166,100,0.6)] transition-all"
                >
                    <span className="relative z-10">Ayo Jelajahi</span>
                    <FiArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </motion.button>
            </div>
        </section>
    );
};

export default GetStarted;
