import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const navItems = useMemo(() => [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ], []);

  const socialLinks = useMemo(() => [
    { href: personalInfo.github, icon: Github, label: 'GitHub' },
    { href: personalInfo.linkedIn, icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' },
  ], []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, type: 'spring' }}
        style={{ backgroundColor }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl shadow-2xl border-b border-gray-800' : ''
        }`}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] origin-left"
          style={{ scaleX: scrollYProgress, willChange: 'transform' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer group"
              onClick={() => scrollToSection('hero')}
              style={{ willChange: 'transform' }}
            >
              <motion.div
                className="text-2xl font-bold text-white relative z-10"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-[#DC143C]">{'<'}</span>
                <motion.span
                  whileHover={{ color: '#DC143C' }}
                  transition={{ duration: 0.2 }}
                >
                  RP
                </motion.span>
                <span className="text-[#DC143C]">{'/>'}</span>
              </motion.div>
              
              {/* Simplified logo glow effect */}
              <motion.div
                className="absolute -inset-2 bg-[#DC143C]/15 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Social Icons - Desktop Only (No navigation menu) */}
            <div className="hidden md:flex items-center space-x-3">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white relative"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-black/98 backdrop-blur-xl border-b border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left relative group"
                >
                  <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#DC143C]/10 transition-colors">
                    <motion.div
                      className="w-2 h-2 bg-[#DC143C] rounded-full"
                      whileHover={{ scale: 1.4 }}
                    />
                    <span className="text-gray-300 group-hover:text-[#DC143C] transition-colors font-medium text-lg">
                      {item.name}
                    </span>
                  </div>
                </motion.button>
              ))}

              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-gray-800"
              >
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social) => (
                    <SocialIcon key={social.label} {...social} size={24} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Optimized Social Icon Component
const SocialIcon = React.memo(({ href, icon: Icon, label, size = 20 }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, rotate: 3, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2.5 text-gray-300 hover:text-[#DC143C] transition-colors group"
      style={{ willChange: 'transform' }}
    >
      <div className="relative z-10">
        <Icon size={size} />
      </div>
      
      {/* Simplified glow effect */}
      <motion.div
        className="absolute inset-0 bg-[#DC143C]/15 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-md"
      />
      
      {/* Tooltip */}
      <motion.span
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#DC143C] text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{ y: -5 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
});

SocialIcon.displayName = 'SocialIcon';

export default Navbar;