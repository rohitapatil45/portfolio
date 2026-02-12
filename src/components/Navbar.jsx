

import React, { useState, useEffect } from 'react';
import { motion,AnimatePresence , useScroll, useTransform } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Zap } from 'lucide-react';
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        style={{ backgroundColor }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl shadow-2xl border-b border-gray-800' : ''
        }`}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer group"
              onClick={() => scrollToSection('hero')}
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
              
              {/* Logo glow effect */}
              <motion.div
                className="absolute -inset-2 bg-[#DC143C]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <NavButton
                  key={item.id}
                  item={item}
                  onClick={() => scrollToSection(item.id)}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Social Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <SocialIcon
                href={personalInfo.github}
                icon={<Github size={20} />}
                label="GitHub"
              />
              <SocialIcon
                href={personalInfo.linkedIn}
                icon={<Linkedin size={20} />}
                label="LinkedIn"
              />
              <SocialIcon
                href={`mailto:${personalInfo.email}`}
                icon={<Mail size={20} />}
                label="Email"
              />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
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
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-black/98 backdrop-blur-xl border-b border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left relative group"
                >
                  <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#DC143C]/10 transition-colors">
                    <motion.div
                      className="w-2 h-2 bg-[#DC143C] rounded-full"
                      whileHover={{ scale: 1.5 }}
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
                transition={{ delay: 0.6 }}
                className="pt-6 border-t border-gray-800"
              >
                <div className="flex justify-center gap-6">
                  <SocialIcon
                    href={personalInfo.github}
                    icon={<Github size={24} />}
                    label="GitHub"
                  />
                  <SocialIcon
                    href={personalInfo.linkedIn}
                    icon={<Linkedin size={24} />}
                    label="LinkedIn"
                  />
                  <SocialIcon
                    href={`mailto:${personalInfo.email}`}
                    icon={<Mail size={24} />}
                    label="Email"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Navigation Button Component with magnetic effect
const NavButton = ({ item, onClick, delay }) => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring' }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium group"
      >
        <span className="relative z-10">{item.name}</span>
        
        {/* Hover background */}
        <motion.div
          className="absolute inset-0 bg-[#DC143C]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          layoutId="navHover"
        />
        
        {/* Bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
        />
      </motion.button>
    </motion.div>
  );
};

// Social Icon Component
const SocialIcon = ({ href, icon, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="relative p-2.5 text-gray-300 hover:text-[#DC143C] transition-colors group"
    >
      <div className="relative z-10">{icon}</div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-[#DC143C]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-md"
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
};

export default Navbar;