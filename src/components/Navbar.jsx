'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const NAV_ITEMS = [
  { name: 'Home',       id: 'hero'       },
  { name: 'About',      id: 'about'      },
  { name: 'Skills',     id: 'skills'     },
  { name: 'Projects',   id: 'projects'   },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact',    id: 'contact'    },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('hero');
  const { scrollYProgress } = useScroll();

  /* Only track scrolled state — avoids per-pixel state updates */
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrolled(v > 0.02);
  });

  /* Close mobile menu on resize */
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close, { passive: true });
    return () => window.removeEventListener('resize', close);
  }, []);

  /* Highlight active section */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveId(e.target.id);
          }
        });
      },
      // Trigger when a section enters the middle 40% of the viewport.
      // This prevents tall sections (like Projects) from failing to trigger.
      { rootMargin: '-30% 0px -30% 0px' }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md shadow-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] origin-left"
          style={{ scaleX: scrollYProgress, right: 0 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">

            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="group text-2xl font-bold text-white relative"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-[#DC143C]">{'<'}</span>
              <span className="group-hover:text-[#DC143C] transition-colors duration-200">RP</span>
              <span className="text-[#DC143C]">{'/>'}</span>
              <span className="absolute -inset-2 rounded-lg bg-[#DC143C]/0 group-hover:bg-[#DC143C]/10 transition-colors duration-200 -z-10" />
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onClick={() => scrollTo(item.id)}
                />
              ))}
            </div>

            {/* Social icons */}
            <div className="hidden md:flex items-center gap-2">
              <SocialIcon href={personalInfo.github}            icon={<Github  size={18} />} label="GitHub"   />
              <SocialIcon href={personalInfo.linkedIn}          icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialIcon href={`mailto:${personalInfo.email}`} icon={<Mail    size={18} />} label="Email"    />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="mn" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-[72px] inset-x-0 z-40 md:hidden bg-black/95 backdrop-blur-xl border-b border-gray-800"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                    activeId === item.id
                      ? 'bg-[#DC143C]/15 text-[#DC143C]'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeId === item.id ? 'bg-[#DC143C]' : 'bg-gray-600'}`} />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              ))}
              <div className="pt-4 border-t border-gray-800 flex gap-4 px-4">
                <SocialIcon href={personalInfo.github}            icon={<Github  size={22} />} label="GitHub"   />
                <SocialIcon href={personalInfo.linkedIn}          icon={<Linkedin size={22} />} label="LinkedIn" />
                <SocialIcon href={`mailto:${personalInfo.email}`} icon={<Mail    size={22} />} label="Email"    />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Nav item — NO magnetic effect (caused mousemove state spam) ── */
const NavItem = React.memo(({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 group ${
      isActive ? 'text-[#DC143C]' : 'text-gray-400 hover:text-white'
    }`}
  >
    <span className="relative z-10">{item.name}</span>
    {/* Background fill on hover */}
    <span className="absolute inset-0 rounded-lg bg-[#DC143C]/0 group-hover:bg-[#DC143C]/8 transition-colors duration-200" />
    {/* Active underline indicator */}
    {isActive && (
      <motion.span
        layoutId="nav-indicator"
        className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#DC143C] rounded-full"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </button>
));
NavItem.displayName = 'NavItem';

const SocialIcon = React.memo(({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="p-2.5 text-gray-400 hover:text-[#DC143C] hover:bg-[#DC143C]/10 rounded-lg transition-all duration-200"
  >
    {icon}
  </a>
));
SocialIcon.displayName = 'SocialIcon';

export default Navbar;