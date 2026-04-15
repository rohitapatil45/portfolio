'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Cpu } from 'lucide-react';

/* ── All random values pre-computed at module level ──────────────────────────
   This ensures server & client render identically (no hydration mismatch).   */

// 8 orbiting particle angles around the central logo
const ORBIT_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  x: Math.cos((i * Math.PI * 2) / 8) * 72,
  y: Math.sin((i * Math.PI * 2) / 8) * 72,
  delay: i * 0.25,
}));

// 16 binary rain columns — fixed values, no Math.random in render
const RAIN_COLS = [
  { bit: '1', dur: 2.4, delay: 0.0  },
  { bit: '0', dur: 3.1, delay: 0.3  },
  { bit: '1', dur: 2.7, delay: 0.6  },
  { bit: '0', dur: 3.5, delay: 0.1  },
  { bit: '1', dur: 2.2, delay: 0.9  },
  { bit: '0', dur: 3.8, delay: 0.4  },
  { bit: '1', dur: 2.6, delay: 0.7  },
  { bit: '0', dur: 3.0, delay: 0.2  },
  { bit: '1', dur: 2.9, delay: 1.0  },
  { bit: '0', dur: 2.3, delay: 0.5  },
  { bit: '1', dur: 3.4, delay: 0.8  },
  { bit: '0', dur: 2.8, delay: 0.15 },
  { bit: '1', dur: 3.6, delay: 1.1  },
  { bit: '0', dur: 2.5, delay: 0.45 },
  { bit: '1', dur: 3.2, delay: 0.75 },
  { bit: '0', dur: 2.1, delay: 1.2  },
];

const STAGES = [
  { icon: Code,     text: 'Compiling Code'    },
  { icon: Terminal, text: 'Executing Scripts' },
  { icon: Cpu,      text: 'Optimizing'        },
];

const CreativeLoadingPage = ({ onLoadingComplete }) => {
  const [stage, setStage]         = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((prev) => {
        if (prev < STAGES.length - 1) return prev + 1;
        clearInterval(id);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => onLoadingComplete?.(), 700);
        }, 700);
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* CSS background blobs */}
          <div className="blob-a absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#DC143C]/12 blur-3xl" />
          <div className="blob-b absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#8B0000]/12 blur-3xl" />

          {/* Hexagon grid — static SVG, no animation */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hex" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
                  <polygon points="50,0 100,25 100,62 50,87 0,62 0,25" fill="none" stroke="#DC143C" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-10 px-6">

            {/* ── Central logo + rings ── */}
            <div className="relative flex items-center justify-center">
              {/* CSS-spun rings */}
              <div className="spin-cw  absolute w-[220px] h-[220px] rounded-full border   border-[#DC143C]/25" />
              <div className="spin-ccw absolute w-[180px] h-[180px] rounded-full border-2 border-[#DC143C]/40" />
              <div className="spin-cw  absolute w-[140px] h-[140px] rounded-full border-2 border-[#DC143C]/60" />

              {/* Logo circle */}
              <motion.div
                className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#DC143C] to-[#8B0000] flex items-center justify-center"
                animate={{ boxShadow: ['0 0 25px rgba(220,20,60,0.5)', '0 0 55px rgba(220,20,60,0.85)', '0 0 25px rgba(220,20,60,0.5)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    {React.createElement(STAGES[stage].icon, { className: 'text-white', size: 44 })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Ping pulse */}
              <div className="absolute w-28 h-28 rounded-full bg-[#DC143C]/20 animate-ping" />

              {/* Orbiting dots — pre-computed positions, no Math.random */}
              {ORBIT_PARTICLES.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#DC143C] rounded-full"
                  style={{ top: '50%', left: '50%', marginTop: -4, marginLeft: -4 }}
                  animate={{ x: [0, p.x, 0], y: [0, p.y, 0], scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: p.delay }}
                />
              ))}
            </div>

            {/* Stage text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="text-center space-y-3"
              >
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {STAGES[stage].text}
                </h2>
                <div className="flex justify-center gap-2">
                  <span className="w-2 h-2 bg-[#DC143C] rounded-full dot-1" />
                  <span className="w-2 h-2 bg-[#DC143C] rounded-full dot-2" />
                  <span className="w-2 h-2 bg-[#DC143C] rounded-full dot-3" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="w-80 space-y-1">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                {STAGES.map((s, i) => (
                  <span key={i} className={i <= stage ? 'text-[#DC143C] font-medium' : ''}>{s.text}</span>
                ))}
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#DC143C] to-[#FF1744] rounded-full shimmer-bar"
                  animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{ boxShadow: '0 0 12px rgba(220,20,60,0.6)' }}
                />
              </div>
            </div>

            {/* Binary rain — pre-computed, no Math.random in render */}
            <div className="flex gap-3 opacity-20 font-mono text-[#DC143C] text-xs overflow-hidden h-12">
              {RAIN_COLS.map((col, i) => (
                <motion.span
                  key={i}
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: col.dur, repeat: Infinity, delay: col.delay, ease: 'linear' }}
                >
                  {col.bit}
                </motion.span>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreativeLoadingPage;