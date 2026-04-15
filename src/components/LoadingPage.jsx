'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Static particle positions — computed once, never change */
const PARTICLES = [
  { x: 10, y: 80, d: '3.1s', delay: '0s' },
  { x: 25, y: 20, d: '4.2s', delay: '0.4s' },
  { x: 45, y: 65, d: '3.8s', delay: '0.8s' },
  { x: 60, y: 35, d: '4.6s', delay: '1.2s' },
  { x: 75, y: 75, d: '3.4s', delay: '0.3s' },
  { x: 88, y: 15, d: '4.0s', delay: '0.7s' },
  { x: 52, y: 90, d: '3.6s', delay: '1.0s' },
  { x: 18, y: 45, d: '4.3s', delay: '1.5s' },
];

const STAGES = [
  { progress: 20, text: 'Loading Assets' },
  { progress: 40, text: 'Preparing Interface' },
  { progress: 65, text: 'Setting Up Components' },
  { progress: 85, text: 'Optimising Performance' },
  { progress: 100, text: 'Almost Ready!' },
];

const TIPS = {
  0: '✨ Crafting pixel-perfect designs…',
  40: '🚀 Optimising for blazing speed…',
  70: '🎨 Adding the finishing touches…',
  96: '🎉 Ready to impress!',
};
const getTip = (p) => {
  if (p >= 96) return TIPS[96];
  if (p >= 70) return TIPS[70];
  if (p >= 40) return TIPS[40];
  return TIPS[0];
};

const LoadingPage = ({ onLoadingComplete }) => {
  const [stageIdx, setStageIdx] = useState(0);
  const [done, setDone] = useState(false);

  const stage = STAGES[Math.min(stageIdx, STAGES.length - 1)];

  useEffect(() => {
    const id = setInterval(() => {
      setStageIdx((prev) => {
        if (prev >= STAGES.length - 1) {
          clearInterval(id);
          setTimeout(() => {
            setDone(true);
            setTimeout(() => onLoadingComplete?.(), 700);
          }, 350);
        }
        return prev + 1;
      });
    }, 480);
    return () => clearInterval(id);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* Background blobs — pure CSS */}
          <div className="blob-a absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#DC143C]/12 blur-3xl" />
          <div className="blob-b absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#8B0000]/12 blur-3xl" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(rgba(220,20,60,0.4) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(220,20,60,0.4) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Static CSS particles */}
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#DC143C]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animation: `particle-rise ${p.d} ease-in-out ${p.delay} infinite`,
                opacity: 0,
              }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-sm">

            {/* Logo ring */}
            <div className="relative">
              {/* Outer ring — CSS spin */}
              <div className="spin-cw absolute -inset-8 rounded-full border-2 border-dashed border-[#DC143C]/25" />
              {/* Inner ring */}
              <div className="spin-ccw absolute -inset-4 rounded-full border border-[#DC143C]/40" />

              {/* Logo circle */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.15 }}
                className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#DC143C] to-[#8B0000] flex items-center justify-center pulse-glow"
                style={{ boxShadow: '0 0 40px rgba(220,20,60,0.45)' }}
              >
                <span className="text-white text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  RP
                </span>
              </motion.div>

              {/* Ping pulse */}
              <div className="absolute inset-0 rounded-full bg-[#DC143C]/20 animate-ping" />
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="text-[#DC143C]">{'<'}</span>
                Portfolio
                <span className="text-[#DC143C]">{'/>'}</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1 tracking-widest uppercase">Rohit Patil</p>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full space-y-3"
            >
              <div className="flex justify-between text-sm">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stage.text}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400"
                  >
                    {stage.text}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[#DC143C] font-bold tabular-nums">{stage.progress}%</span>
              </div>

              {/* Bar */}
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#DC143C] to-[#FF1744] rounded-full relative shimmer-bar"
                  animate={{ width: `${stage.progress}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ boxShadow: '0 0 12px rgba(220,20,60,0.6)' }}
                />
              </div>
            </motion.div>

            {/* Bouncing dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`w-2 h-2 bg-[#DC143C] rounded-full dot-${i + 1}`} />
              ))}
            </div>

            {/* Tip */}
            <AnimatePresence mode="wait">
              <motion.p
                key={getTip(stage.progress)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-gray-500 text-sm text-center"
              >
                {getTip(stage.progress)}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingPage;