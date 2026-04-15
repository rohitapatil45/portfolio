'use client';

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '../data/mockData';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const cardV = {
  hidden:  { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="py-28 bg-[#111111] relative overflow-hidden">
      {/* Grid pattern — static, no animation */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(220,20,60,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220,20,60,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* CSS blob */}
      <div className="blob-a absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#DC143C]/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744]">
              Experience
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-28 h-1 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mt-4 mb-6"
            style={{ boxShadow: '0 0 18px rgba(220,20,60,0.4)' }}
          />
          <p className="text-gray-400 text-lg">My professional journey and internship experiences</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#DC143C]/40 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = React.memo(({ exp, index, inView }) => {
  return (
    <motion.div
      custom={index}
      variants={cardV}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative md:pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-4 top-8 -translate-x-1/2 hidden md:block z-10">
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full bg-[#DC143C] pulse-glow" />
          <div className="absolute inset-0 rounded-full bg-[#DC143C] animate-ping opacity-30" />
        </div>
      </div>

      {/* Card */}
      <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-7 border border-gray-800 hover:border-[#DC143C]/50 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(220,20,60,0.15)] relative overflow-hidden">
        {/* Hover glow layer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC143C]/0 to-[#DC143C]/0 group-hover:from-[#DC143C]/5 group-hover:to-transparent transition-all duration-400" />

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#DC143C]/10 rounded-xl border border-[#DC143C]/20 group-hover:bg-[#DC143C]/20 transition-colors duration-200 flex-shrink-0">
              <Briefcase className="text-[#DC143C]" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">{exp.position}</h3>
              <h4 className="text-[#DC143C] font-semibold mt-0.5">{exp.company}</h4>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC143C]/8 border border-[#DC143C]/20 flex-shrink-0">
            <Calendar size={14} className="text-[#DC143C]" />
            <span className="text-gray-300 text-sm font-medium whitespace-nowrap">{exp.duration}</span>
          </div>
        </div>

        <p className="text-gray-300 mb-5 leading-relaxed relative z-10">{exp.description}</p>

        {/* Responsibilities */}
        <div className="relative z-10">
          <h5 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C]" />
            Key Responsibilities
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exp.responsibilities.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-gray-400 text-sm p-2.5 rounded-lg hover:bg-[#DC143C]/5 hover:text-gray-200 transition-colors duration-200 group/item"
              >
                <ChevronRight size={14} className="text-[#DC143C] mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover/item:translate-x-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ExperienceCard.displayName = 'ExperienceCard';

export default Experience;
