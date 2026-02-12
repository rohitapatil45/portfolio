
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/mockData';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
    }),
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 bg-[#0a0a0a] relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />

        {/* Floating orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
            className="absolute w-64 h-64 bg-[#DC143C] rounded-full blur-3xl"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 30}%`,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div className="inline-block relative">
            <h2
              className="text-5xl sm:text-7xl font-bold text-white mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Featured{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] relative">
                Projects
                <motion.div
                  className="absolute -inset-4 bg-[#DC143C]/20 blur-2xl -z-10"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-32 h-1.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-8"
            style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Showcasing my recent work and personal projects
          </motion.p>
        </motion.div>

        {/* Project Carousel */}
        <div className="relative" style={{ perspective: 2000 }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                rotateY: { duration: 0.5 },
                scale: { duration: 0.4 },
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Project Image */}
              <ProjectImage project={currentProject} />

              {/* Project Details */}
              <ProjectDetails project={currentProject} currentIndex={currentIndex} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <ProjectNavigation
            currentIndex={currentIndex}
            totalProjects={projects.length}
            onPrev={prevProject}
            onNext={nextProject}
            onSelect={setCurrentIndex}
          />
        </div>
      </div>
    </section>
  );
};

// Project Image Component
const ProjectImage = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative overflow-hidden rounded-3xl">
        {/* Animated border */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] rounded-3xl opacity-75 blur-xl"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        />

        {/* Image container */}
        <div className="relative">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-[400px] lg:h-[600px] object-cover rounded-3xl relative z-10"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl z-20"
            animate={{
              opacity: isHovered ? 0.7 : 0.9,
            }}
          />

          {/* Project number badge */}
          <motion.div
            className="absolute top-6 left-6 z-30"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <div className="bg-[#DC143C]/90 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-white font-bold text-lg">
                {String(projects.indexOf(project) + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="absolute top-6 right-6 flex gap-3 z-30"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <ActionButton
              href={project.githubLink}
              icon={<Github size={20} />}
              label="GitHub"
            />
            <ActionButton
              href={project.demoLink}
              icon={<ExternalLink size={20} />}
              label="Live Demo"
            />
          </motion.div>

          {/* Hover effect overlay */}
          <motion.div
            className="absolute inset-0 z-25"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(220, 20, 60, 0.3) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Floating particles around image */}
      {isHovered &&
        [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#DC143C] rounded-full"
            initial={{
              x: '50%',
              y: '50%',
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 100}%`,
              y: `${50 + (Math.random() - 0.5) * 100}%`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
    </motion.div>
  );
};

// Action Button Component
const ActionButton = ({ href, icon, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#DC143C] transition-colors group relative"
    >
      {icon}
      <motion.span
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ y: -10 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
};

// Project Details Component
const ProjectDetails = ({ project, currentIndex }) => {
  return (
    <div className="space-y-8">
      {/* Project label */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Zap className="text-[#DC143C]" size={24} />
        </motion.div>
        <span className="text-[#DC143C] font-bold text-sm tracking-[0.3em]">
          PROJECT {String(currentIndex + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl sm:text-5xl font-bold text-white leading-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {project.title.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-3"
            whileHover={{
              y: -5,
              color: '#DC143C',
              transition: { duration: 0.2 },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-lg leading-relaxed"
      >
        {project.description}
      </motion.p>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#DC143C] rounded-full" />
          Technologies Used
        </h4>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05, type: 'spring' }}
              whileHover={{
                scale: 1.15,
                y: -5,
                boxShadow: '0 10px 25px rgba(220, 20, 60, 0.4)',
              }}
              className="px-5 py-2.5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-[#DC143C] rounded-full text-sm font-medium border border-[#DC143C]/30 hover:border-[#DC143C] transition-all cursor-pointer"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#DC143C] rounded-full" />
          Key Features
        </h4>
        <ul className="space-y-3">
          {project.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ x: 10 }}
              className="flex items-start gap-3 text-gray-400 group cursor-pointer"
            >
              <motion.div
                className="w-2 h-2 bg-[#DC143C] rounded-full mt-2 flex-shrink-0"
                whileHover={{ scale: 1.5 }}
              />
              <span className="group-hover:text-white transition-colors">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

// Project Navigation Component
const ProjectNavigation = ({
  currentIndex,
  totalProjects,
  onPrev,
  onNext,
  onSelect,
}) => {
  return (
    <div className="flex justify-center items-center gap-8 mt-16">
      {/* Previous button */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="p-5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white rounded-full hover:bg-[#DC143C] transition-all border border-gray-800 hover:border-[#DC143C] group relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-[#DC143C]"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <ChevronLeft size={24} className="relative z-10" />
      </motion.button>

      {/* Project Indicators */}
      <div className="flex gap-3">
        {[...Array(totalProjects)].map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(index)}
            className={`relative transition-all duration-300 ${
              index === currentIndex ? 'w-12' : 'w-3'
            }`}
          >
            <motion.div
              className={`h-3 rounded-full ${
                index === currentIndex ? 'bg-[#DC143C]' : 'bg-gray-600'
              }`}
              animate={{
                backgroundColor:
                  index === currentIndex ? '#DC143C' : '#4B5563',
              }}
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-[#DC143C] rounded-full blur-md"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="p-5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white rounded-full hover:bg-[#DC143C] transition-all border border-gray-800 hover:border-[#DC143C] group relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-[#DC143C]"
          initial={{ x: '100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <ChevronRight size={24} className="relative z-10" />
      </motion.button>
    </div>
  );
};

export default Projects;