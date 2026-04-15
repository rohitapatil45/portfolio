'use client';

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

const Footer = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const scrollToSection = useCallback((item) => {
    const id = item === 'Home' ? 'hero' : item.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const socialLinks = useMemo(() => [
    { href: personalInfo.github,            icon: Github,   label: 'GitHub'   },
    { href: personalInfo.linkedIn,          icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${personalInfo.email}`, icon: Mail,     label: 'Email'    },
  ], []);

  return (
    <footer className="bg-[#080808] border-t border-gray-800/60 relative overflow-hidden">
      {/* CSS background blob */}
      <div className="blob-b absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#DC143C]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <button
              onClick={scrollToTop}
              className="group text-2xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-[#DC143C]">{'<'}</span>
              <span className="group-hover:text-[#DC143C] transition-colors duration-200">{personalInfo.name.split(' ')[0]}</span>
              <span className="text-[#DC143C]">{'/>'}</span>
            </button>
            <p className="text-gray-500 text-sm leading-relaxed">
              Full Stack Developer passionate about building scalable web applications and learning new technologies.
            </p>
            {/* Social */}
            <div className="flex gap-3 pt-1">
              {socialLinks.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left text-gray-500 hover:text-[#DC143C] text-sm transition-colors duration-200 py-0.5"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Contact</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-gray-500 hover:text-[#DC143C] text-sm transition-colors duration-200 group"
              >
                <Mail size={14} className="text-[#DC143C] flex-shrink-0" />
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="w-1 h-1 rounded-full bg-[#DC143C]" />
                {personalInfo.location}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mt-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC143C] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC143C]" />
              </span>
              <span className="text-xs text-gray-500">Available for opportunities</span>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            © {currentYear} {personalInfo.name}. Made with
            <Heart size={13} className="inline text-[#DC143C] fill-[#DC143C] heartbeat" />
            using React &amp; Next.js
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-500 hover:text-[#DC143C] text-sm transition-colors duration-200"
          >
            <span>Back to top</span>
            <span className="p-1.5 rounded-full border border-gray-700 group-hover:border-[#DC143C] group-hover:bg-[#DC143C]/10 transition-all duration-200">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

const SocialBtn = React.memo(({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-2 text-gray-500 hover:text-[#DC143C] hover:bg-[#DC143C]/10 rounded-lg border border-gray-800 hover:border-[#DC143C]/30 transition-all duration-200"
  >
    <Icon size={17} />
  </a>
));
SocialBtn.displayName = 'SocialBtn';

export default Footer;