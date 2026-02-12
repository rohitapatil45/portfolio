
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#DC143C] rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#DC143C] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold text-white inline-block cursor-pointer group"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-[#DC143C]">{'<'}</span>
              {personalInfo.name.split(' ')[0]}
              <span className="text-[#DC143C]">{'/>'}</span>
              
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-2 bg-[#DC143C]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"
              />
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Full Stack Developer passionate about building scalable web
              applications and learning new technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-white font-semibold text-xl flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="text-[#DC143C]" size={20} />
              </motion.div>
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(
                (item) => (
                  <motion.button
                    key={item}
                    whileHover={{ x: 10, color: '#DC143C' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase());
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-[#DC143C] transition-colors text-left flex items-center gap-2 group"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[#DC143C] rounded-full"
                      whileHover={{ scale: 1.5 }}
                    />
                    {item}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-white font-semibold text-xl flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-[#DC143C] rounded-full"
              />
              Connect
            </h3>
            <div className="flex gap-4">
              <SocialButton
                href={personalInfo.github}
                icon={<Github size={22} />}
                label="GitHub"
              />
              <SocialButton
                href={personalInfo.linkedIn}
                icon={<Linkedin size={22} />}
                label="LinkedIn"
              />
              <SocialButton
                href={`mailto:${personalInfo.email}`}
                icon={<Mail size={22} />}
                label="Email"
              />
            </div>
            <motion.p
              whileHover={{ x: 5 }}
              className="text-gray-400 flex items-center gap-2 cursor-pointer"
            >
              <Mail size={16} className="text-[#DC143C]" />
              {personalInfo.email}
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <p className="text-gray-400 text-sm text-center sm:text-left flex items-center gap-2">
            © {currentYear} {personalInfo.name}. Made with
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="inline text-[#DC143C] fill-[#DC143C]" />
            </motion.span>
            using React & Tailwind CSS
          </p>

          {/* Scroll to Top Button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative group"
          >
            <div className="p-4 bg-gradient-to-br from-[#DC143C] to-[#8B0000] rounded-full text-white relative z-10">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUp size={20} />
              </motion.div>
            </div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-[#DC143C] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

// Social Button Component
const SocialButton = ({ href, icon, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="relative p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-gray-800 hover:border-[#DC143C] transition-all group"
    >
      <div className="relative z-10 text-gray-400 group-hover:text-[#DC143C] transition-colors">
        {icon}
      </div>
      
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-[#DC143C]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
      />
      
      {/* Tooltip */}
      <motion.span
        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#DC143C] text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{ y: 5 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
};

export default Footer;