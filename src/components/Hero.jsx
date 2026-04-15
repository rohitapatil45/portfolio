'use client';

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/mockData';

/* Pre-compute canvas particles once */
function createParticles(count, w, h) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 1.5 + 0.5,
    speedX: Math.random() * 0.25 - 0.125,
    speedY: Math.random() * 0.25 - 0.125,
    opacity: Math.random() * 0.4 + 0.1,
  }));
}

const Hero = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scale  = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);

  /* ── Canvas particle field ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      particlesRef.current = createParticles(45, w, h);
    };

    resize();

    let last = 0;
    const FPS = 38;
    const INTERVAL = 1000 / FPS;

    const tick = (now) => {
      animRef.current = requestAnimationFrame(tick);
      if (now - last < INTERVAL) return;
      last = now;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > w) p.x = 0; else if (p.x < 0) p.x = w;
        if (p.y > h) p.y = 0; else if (p.y < 0) p.y = h;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,20,60,${p.opacity})`;
        ctx.fill();
      }
    };

    animRef.current = requestAnimationFrame(tick);

    let timer;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(resize, 200); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* Name letter animation variants */
  const letterVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.04, duration: 0.5, type: 'spring', stiffness: 130, damping: 14 },
    }),
  }), []);

  const name = personalInfo.name;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Canvas dots */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* CSS blob backgrounds — no JS animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-a absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-[#DC143C]/10 blur-3xl" />
        <div className="blob-b absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] rounded-full bg-[#8B0000]/10 blur-3xl" />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-[#DC143C]/30 bg-[#DC143C]/8 text-[#DC143C] text-sm font-semibold tracking-widest uppercase"
        >
          <Sparkles size={16} className="animate-pulse" />
          Hello, I&apos;m
          <Sparkles size={16} className="animate-pulse" />
        </motion.div>

        {/* Animated name */}
        <div className="relative mb-6">
          <h1
            className="text-5xl sm:text-7xl lg:text-9xl font-bold text-white leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.18,
                  color: '#DC143C',
                  textShadow: '0 0 30px rgba(220,20,60,0.8)',
                  transition: { duration: 0.15 },
                }}
                className="inline-block"
                style={{ willChange: 'transform' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
          {/* Sliding underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 w-3/4 bg-gradient-to-r from-transparent via-[#DC143C] to-transparent rounded-full"
            style={{ boxShadow: '0 0 20px rgba(220,20,60,0.7)', transformOrigin: 'center' }}
          />
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-5 font-light tracking-wide"
        >
          {personalInfo.title}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6 }}
          className="text-base sm:text-lg text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          {/* Primary */}
          <motion.button
            onClick={() => scrollTo('projects')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(220,20,60,0.55)' }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-9 py-4 bg-[#DC143C] text-white font-semibold rounded-full overflow-hidden flex items-center gap-2.5"
            style={{ willChange: 'transform' }}
          >
            <span className="relative z-10">View My Work</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            {/* Shimmer on hover */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.button>

          {/* Secondary */}
          <motion.a
            href={personalInfo.resumeUrl}
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-9 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white overflow-hidden flex items-center gap-2.5 transition-colors duration-300"
            style={{ willChange: 'transform' }}
          >
            <Download size={18} />
            <span>Download Resume</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300 rounded-full" />
          </motion.a>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-16 flex flex-wrap gap-6 justify-center"
        >
          {[
            { num: '4+', label: 'Projects Built' },
            { num: '2',  label: 'Internships' },
            { num: '12+', label: 'Technologies' },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="flex flex-col items-center px-6 py-3 rounded-xl border border-gray-800 bg-white/[0.03]"
            >
              <span className="text-2xl font-bold text-[#DC143C]">{num}</span>
              <span className="text-xs text-gray-500 mt-0.5 tracking-wider">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {/* <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <span className="text-[#DC143C] text-xs font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={28} className="text-[#DC143C] arrow-bounce" />
      </div> */}
    </section>
  );
};

export default Hero;