'use client';

import React, { useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo, education } from '../data/mockData';
import { GraduationCap, MapPin, Code2, Zap } from 'lucide-react';

const FLOATING_DOTS = [0, 1, 2];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  // Fix: compute inverse y OUTSIDE jsx so hooks are not called in render
  const yInverse = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const springConfig = useMemo(() => ({ stiffness: 100, damping: 30, restDelta: 0.001 }), []);
  const ySpring = useSpring(y, springConfig);
  const yInverseSpring = useSpring(yInverse, springConfig);

  const infoCards = useMemo(() => [
    { icon: GraduationCap, title: education.degree, subtitle: education.institution, detail: education.duration, delay: 0.2 },
    { icon: MapPin, title: 'Location', subtitle: personalInfo.location, detail: null, delay: 0.3 },
  ], []);

  const stats = useMemo(() => [
    { value: 4, label: 'Projects', suffix: '+' },
    { value: 2, label: 'Internships', suffix: '' },
    { value: 12, label: 'Tech Skills', suffix: '+' },
  ], []);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div style={{ y: ySpring, willChange: 'transform' }} className="absolute top-20 right-20 w-96 h-96 bg-[#DC143C] rounded-full blur-3xl opacity-25" />
        <motion.div style={{ y: yInverseSpring, willChange: 'transform' }} className="absolute bottom-20 left-20 w-96 h-96 bg-[#DC143C] rounded-full blur-3xl opacity-25" />
        {FLOATING_DOTS.map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -25, 0], rotate: [0, 360], scale: [1, 1.15, 1] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            className="absolute w-4 h-4 border-2 border-[#DC143C]/40 rounded-full"
            style={{ top: `${20 + i * 20}%`, left: `${10 + i * 30}%`, willChange: 'transform' }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, type: 'spring' }} className="text-center mb-20">
          <motion.div className="inline-block" whileHover={{ rotateX: 8, rotateY: 8 }} style={{ transformStyle: 'preserve-3d' }}>
            <h2 className="text-5xl sm:text-7xl font-bold text-white mb-6 relative" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}>
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] relative">
                Me
                <motion.div className="absolute -inset-2 bg-[#DC143C]/25 blur-2xl -z-10" animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="w-32 h-1.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full" style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.6)' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div initial={{ opacity: 0, x: -100 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }} className="relative perspective-1000">
            <TiltCard>
              <div className="relative group">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative overflow-hidden rounded-3xl">
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] rounded-3xl opacity-80 blur-lg"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={personalInfo.profileImage} alt={personalInfo.name} className="w-full h-[600px] object-cover rounded-3xl relative z-10" />
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-[#DC143C]/40 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                    <motion.div className="absolute inset-0 z-30" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.7 }} style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)' }} />
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.6, type: 'spring', bounce: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-6 rounded-2xl shadow-2xl z-30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{ boxShadow: '0 10px 40px rgba(220, 20, 60, 0.5)' }}
                >
                  <div className="text-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                      <Zap className="text-white mb-2 mx-auto" size={32} />
                    </motion.div>
                    <div className="text-3xl font-bold text-white">4+</div>
                    <div className="text-white/90 text-sm font-medium">Projects</div>
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Content Section */}
          <motion.div initial={{ opacity: 0, x: 100 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }} className="space-y-8">
            <motion.div className="flex items-center gap-3 text-[#DC143C] text-xl font-semibold" whileHover={{ x: 10 }}>
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                <Code2 size={28} />
              </motion.div>
              <span className="tracking-wider">INTRODUCTION</span>
            </motion.div>

            {/* Fixed: single paragraph fade-in instead of per-word animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {personalInfo.about}
            </motion.p>

            <div className="grid grid-cols-1 gap-6 mt-12">
              {infoCards.map((card, index) => (
                <InfoCard key={index} card={card} inView={inView} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} inView={inView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = React.memo(({ card, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: card.delay, type: 'spring' }}
    whileHover={{ scale: 1.02, x: 12, boxShadow: '0 20px 40px rgba(220, 20, 60, 0.3)' }}
    className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl border border-gray-800 hover:border-[#DC143C] overflow-hidden group transition-all duration-300"
    style={{ willChange: 'transform' }}
  >
    <div className="flex items-start gap-4 relative z-10">
      <motion.div className="p-4 bg-gradient-to-br from-[#DC143C]/25 to-[#DC143C]/5 rounded-xl" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
        <card.icon className="text-[#DC143C]" size={28} />
      </motion.div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-xl mb-1">{card.title}</h3>
        <p className="text-gray-400">{card.subtitle}</p>
        {card.detail && <p className="text-gray-500 text-sm mt-2">{card.detail}</p>}
      </div>
    </div>
  </motion.div>
));
InfoCard.displayName = 'InfoCard';

const StatCard = React.memo(({ stat, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay: 0.5 + index * 0.1, type: 'spring', bounce: 0.5 }}
    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
    className="text-center p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-[#DC143C]/30 hover:border-[#DC143C] relative overflow-hidden group transition-all duration-300"
    style={{ boxShadow: '0 4px 20px rgba(220, 20, 60, 0.1)', willChange: 'transform' }}
  >
    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#DC143C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <CountUp value={stat.value} suffix={stat.suffix} inView={inView} />
    <div className="text-gray-400 text-sm font-medium mt-2 tracking-wider">{stat.label}</div>
  </motion.div>
));
StatCard.displayName = 'StatCard';

const TiltCard = React.memo(({ children }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setRotation({ x: (clientY - top - height / 2) / 25, y: -(clientX - left - width / 2) / 25 });
  }, []);

  const handleMouseLeave = useCallback(() => setRotation({ x: 0, y: 0 }), []);

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} animate={{ rotateX: rotation.x, rotateY: rotation.y }} transition={{ type: 'spring', stiffness: 200, damping: 30 }} style={{ transformStyle: 'preserve-3d', perspective: 1000, willChange: 'transform' }}>
      {children}
    </motion.div>
  );
});
TiltCard.displayName = 'TiltCard';

const CountUp = React.memo(({ value, suffix, inView }) => {
  const [count, setCount] = React.useState(0);
  const hasStarted = React.useRef(false);

  React.useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, inView]);

  return <div className="text-4xl font-bold text-[#DC143C] relative z-10">{count}{suffix}</div>;
});
CountUp.displayName = 'CountUp';

export default About;
