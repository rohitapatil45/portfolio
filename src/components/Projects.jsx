'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/mockData';
import { ExternalLink, Github, ArrowUpRight, Layers, Star } from 'lucide-react';

/* ── Animation variants ─────────────────────────────────────────── */
const sectionV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const headV = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const cardV = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-a absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-[#DC143C]/7 blur-3xl" />
        <div className="blob-b absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-[#DC143C]/7 blur-3xl" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(220,20,60,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(220,20,60,0.8) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          variants={sectionV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-24"
        >
          <motion.div variants={headV} className="inline-flex items-center gap-2 px-5 py-2 bg-[#DC143C]/10 border border-[#DC143C]/25 rounded-full mb-6">
            <Layers size={15} className="text-[#DC143C]" />
            <span className="text-[#DC143C] text-xs font-bold tracking-[0.2em] uppercase">Portfolio</span>
          </motion.div>

          <motion.h2 variants={headV} className="text-5xl sm:text-7xl font-bold mb-5 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-white">Featured </span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF6B6B]">
              Projects
            </span>
          </motion.h2>

          <motion.div
            variants={headV}
            className="w-24 h-0.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto mb-5 rounded-full"
            style={{ boxShadow: '0 0 16px rgba(220,20,60,0.5)' }}
          />
          <motion.p variants={headV} className="text-gray-500 max-w-xl mx-auto">
            Real-world applications showcasing my skills and problem-solving abilities
          </motion.p>
        </motion.div>

        {/* ── Project list ── */}
        <motion.div
          variants={sectionV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-28"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isActive={activeProject === index}
              onEnter={() => setActiveProject(index)}
              onLeave={() => setActiveProject(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ── Project card ─────────────────────────────────────────────────── */
const ProjectCard = React.memo(({ project, index, isActive, onEnter, onLeave }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      variants={cardV}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
    >

      {/* ── Image column ─────────────────────────────────────── */}
      <motion.div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}>
        <div className="relative group">

          {/* Outer glow frame */}
          <motion.div
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-70"
            style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 3s ease infinite' }}
          />

          {/* Image container */}
          <div className="relative rounded-3xl overflow-hidden border border-gray-800/60 group-hover:border-transparent transition-colors duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-[360px] lg:h-[440px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Project number badge */}
            <div className="absolute top-5 left-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                className="relative overflow-hidden"
              >
                <div className="flex items-center gap-2 bg-[#DC143C] px-4 py-2 rounded-xl shimmer-bar">
                  <Star size={12} className="text-white/80" />
                  <span className="text-white font-bold text-xs tracking-[0.15em]">
                    PROJECT {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Action buttons */}
            <div className="absolute top-5 right-5 flex gap-2">
              {[
                { href: project.githubLink, icon: <Github size={16} />, label: 'GitHub' },
                { href: project.demoLink,   icon: <ExternalLink size={16} />, label: 'Demo'   },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 bg-black/60 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-[#DC143C] hover:border-[#DC143C] hover:scale-110 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Bottom tech preview — slides up on hover */}
            <div className="absolute bottom-0 inset-x-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-gray-300 text-xs mb-2 uppercase tracking-widest font-semibold">Built with</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 6).map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-[#DC143C]/20 border border-[#DC143C]/30 text-[#FF6B6B] text-xs rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Content column ─────────────────────────────────────── */}
      <motion.div
        className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Category pill */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-px bg-[#DC143C]" />
          <span className="text-[#DC143C] text-xs font-bold tracking-[0.2em] uppercase">Full Stack</span>
        </div>

        {/* Title */}
        <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">{project.description}</p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 + i * 0.04, type: 'spring' }}
              className="px-3 py-1 bg-[#1a1a1a] border border-gray-700/60 text-gray-300 rounded-full text-xs font-medium hover:border-[#DC143C]/40 hover:text-[#DC143C] hover:bg-[#DC143C]/5 transition-all duration-200 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Feature list */}
        <ul className="space-y-2">
          {project.features.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 + i * 0.07, ease: 'easeOut' }}
              className="flex items-start gap-3 text-sm text-gray-400 group"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#DC143C]/60 flex-shrink-0 group-hover:bg-[#DC143C] transition-colors" />
              <span className="group-hover:text-gray-200 transition-colors">{f}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="flex gap-3 pt-2">
          {project.demoLink && (
  <motion.a
    href={project.demoLink}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    className="group flex items-center gap-2 px-6 py-3 bg-[#DC143C] text-white rounded-full text-sm font-semibold hover:bg-[#FF1744] transition-colors duration-200 shimmer-bar overflow-hidden"
    style={{ willChange: 'transform' }}
  >
    Live Demo
    <ArrowUpRight
      size={15}
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </motion.a>
)}
          <motion.a
            href={project.githubLink}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 rounded-full text-sm font-semibold hover:border-[#DC143C]/50 hover:text-white hover:bg-white/5 transition-all duration-200"
            style={{ willChange: 'transform' }}
          >
            <Github size={15} />
            Source Code
          </motion.a>
        </div>
      </motion.div>

    </motion.article>
  );
});
ProjectCard.displayName = 'ProjectCard';

export default Projects;