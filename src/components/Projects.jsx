import React, { useState, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/mockData';
import { ExternalLink, Github, Rocket, Code2, Zap, Sparkles } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleHover = useCallback((index) => setHoveredIndex(index), []);
  const handleLeave = useCallback(() => setHoveredIndex(null), []);

  return (
    <section
      id="projects"
      className="py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Simplified Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(220, 20, 60, 0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.12) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute inset-0"
          style={{ willChange: 'background' }}
        />
        
        {/* Reduced floating orbs - 2 instead of 3 */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-[#DC143C] rounded-full blur-3xl opacity-8"
            animate={{
              y: [0, -40, 0],
              x: [0, 25, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              top: `${20 + i * 40}%`,
              left: `${10 + i * 40}%`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          {/* Badge with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -120 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C]/10 border border-[#DC143C]/30 rounded-full mb-6 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Rocket className="text-[#DC143C]" size={18} />
            </motion.div>
            <span className="text-[#DC143C] text-sm font-bold tracking-wider">
              PORTFOLIO
            </span>
            
            {/* Simplified pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#DC143C]/15"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Animated Title */}
          <motion.h2
            className="text-5xl sm:text-7xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <motion.span 
              className="text-white inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              Featured{' '}
            </motion.span>
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] inline-block relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Projects
              {/* Animated sparkle */}
              <motion.div
                className="absolute -top-6 -right-8"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="text-[#DC143C]" size={24} />
              </motion.div>
            </motion.span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-32 h-1 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-6"
            style={{
              boxShadow: '0 0 20px rgba(220, 20, 60, 0.4)',
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Real-world applications showcasing my skills and problem-solving abilities
          </motion.p>
        </motion.div>

        {/* Projects Grid with Stagger Animation */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.title}
              project={project}
              index={index}
              inView={inView}
              isHovered={hoveredIndex === index}
              onHover={() => handleHover(index)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Optimized Project Showcase Component
const ProjectShowcase = React.memo(({ project, index, inView, isHovered, onHover, onLeave }) => {
  const isEven = index % 2 === 0;
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Simplified parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.4]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      style={{ opacity, willChange: 'opacity' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}
    >
      {/* Animated Project Image */}
      <motion.div
        className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}
        style={{ y: imageY, willChange: 'transform' }}
        initial={{ opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -20 : 20 }}
        animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
      >
        <div className="relative group perspective-1000">
          {/* Simplified glowing border */}
          <motion.div
            className="absolute -inset-1 rounded-3xl opacity-60 blur-lg"
            style={{
              background: 'linear-gradient(90deg, #DC143C, #FF1744, #DC143C)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{
              backgroundPosition: {
                duration: 4,
                repeat: Infinity,
              },
              opacity: {
                duration: 0.3,
              },
            }}
          />

          <motion.div 
            className="relative overflow-hidden rounded-3xl"
            whileHover={{ 
              scale: 1.02,
              rotateY: isEven ? 4 : -4,
              rotateX: 2,
            }}
            transition={{ duration: 0.35 }}
          >
            {/* Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-3xl relative z-10"
              animate={{
                scale: isHovered ? 1.04 : 1,
              }}
              transition={{ duration: 0.35 }}
            />

            {/* Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent rounded-3xl z-20"
              animate={{
                opacity: isHovered ? 0.6 : 0.85,
              }}
            />

            {/* Project Number Badge */}
            <motion.div
              className="absolute top-6 left-6 z-30"
              initial={{ scale: 0, rotate: -120 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15, type: 'spring', bounce: 0.5 }}
              whileHover={{ scale: 1.08, rotate: 360 }}
            >
              <div className="bg-[#DC143C] px-6 py-3 rounded-2xl shadow-2xl relative overflow-hidden">
                <span className="text-white font-bold text-xl relative z-10">
                  PROJECT {String(index + 1).padStart(2, '0')}
                </span>
                {/* Simplified shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="absolute top-6 right-6 flex gap-3 z-30"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.15 }}
            >
              <ActionButton
                href={project.githubLink}
                icon={<Github size={24} />}
              />
              <ActionButton
                href={project.demoLink}
                icon={<ExternalLink size={24} />}
              />
            </motion.div>

            {/* Reduced hover particles - 4 instead of 8 */}
            {isHovered && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#DC143C] rounded-full z-25"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -40, -80],
                      opacity: [1, 0.5, 0],
                      scale: [0, 1.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Project Details */}
      <motion.div 
        className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
        style={{ y: contentY, willChange: 'transform' }}
      >
        {/* Category Tag */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.25 + index * 0.15 }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Code2 className="text-[#DC143C]" size={24} />
          </motion.div>
          <span className="text-[#DC143C] font-bold text-sm tracking-wider">
            FULL STACK PROJECT
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.35 + index * 0.15, type: 'spring' }}
          className="text-4xl sm:text-5xl font-bold text-white leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15 + i * 0.08 }}
              whileHover={{ 
                y: -5, 
                color: '#DC143C',
                transition: { duration: 0.2 }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.45 + index * 0.15 }}
          className="text-gray-400 text-lg leading-relaxed"
        >
          {project.description}
        </motion.p>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 + index * 0.15 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-white font-semibold">
            <Zap className="text-[#DC143C]" size={20} />
            Tech Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <TechBadge key={tech} tech={tech} index={i} inView={inView} delay={0.6 + index * 0.15 + i * 0.04} />
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 + index * 0.15 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-white font-semibold">
            <span className="w-2 h-2 bg-[#DC143C] rounded-full" />
            Key Features
          </div>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <FeatureItem key={i} feature={feature} index={i} inView={inView} delay={0.7 + index * 0.15 + i * 0.08} />
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ProjectShowcase.displayName = 'ProjectShowcase';

// Optimized Action Button Component
const ActionButton = React.memo(({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    className="p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#DC143C] transition-all group relative"
    style={{ willChange: 'transform' }}
  >
    {icon}
  </motion.a>
));

ActionButton.displayName = 'ActionButton';

// Optimized Tech Badge Component
const TechBadge = React.memo(({ tech, index, inView, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay, type: 'spring' }}
    whileHover={{
      scale: 1.1,
      y: -3,
      boxShadow: '0 10px 25px rgba(220, 20, 60, 0.3)',
    }}
    className="px-4 py-2 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-[#DC143C] rounded-full text-sm font-medium border border-[#DC143C]/30 hover:border-[#DC143C] transition-all cursor-pointer"
    style={{ willChange: 'transform' }}
  >
    {tech}
  </motion.span>
));

TechBadge.displayName = 'TechBadge';

// Optimized Feature Item Component
const FeatureItem = React.memo(({ feature, index, inView, delay }) => (
  <motion.li
    initial={{ opacity: 0, x: -30 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay }}
    whileHover={{ x: 8 }}
    className="flex items-start gap-3 text-gray-400 group cursor-pointer"
  >
    <motion.div
      className="w-2 h-2 bg-[#DC143C] rounded-full mt-2 flex-shrink-0"
      whileHover={{ scale: 1.4 }}
    />
    <span className="group-hover:text-white transition-colors">
      {feature}
    </span>
  </motion.li>
));

FeatureItem.displayName = 'FeatureItem';

export default Projects;

// import React, { useState, useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { projects } from '../data/mockData';
// import { ExternalLink, Github, Rocket, Code2, Zap, Star, Sparkles } from 'lucide-react';

// const Projects = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.05,
//   });

//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   return (
//     <section
//       id="projects"
//       className="py-32 bg-[#0a0a0a] relative overflow-hidden"
//     >
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <motion.div
//           animate={{
//             background: [
//               'radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
//               'radial-gradient(circle at 80% 70%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
//               'radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
//             ],
//           }}
//           transition={{ duration: 10, repeat: Infinity }}
//           className="absolute inset-0"
//         />
        
//         {/* Floating orbs */}
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-64 h-64 bg-[#DC143C] rounded-full blur-3xl opacity-10"
//             animate={{
//               y: [0, -50, 0],
//               x: [0, 30, 0],
//             }}
//             transition={{
//               duration: 8 + i * 2,
//               repeat: Infinity,
//               ease: 'easeInOut',
//             }}
//             style={{
//               top: `${20 + i * 30}%`,
//               left: `${10 + i * 30}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-20"
//         >
//           {/* Badge with animation */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0, rotate: -180 }}
//             animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
//             transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C]/10 border border-[#DC143C]/30 rounded-full mb-6 relative"
//           >
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//             >
//               <Rocket className="text-[#DC143C]" size={18} />
//             </motion.div>
//             <span className="text-[#DC143C] text-sm font-bold tracking-wider">
//               PORTFOLIO
//             </span>
            
//             {/* Pulsing glow */}
//             <motion.div
//               className="absolute inset-0 rounded-full bg-[#DC143C]/20"
//               animate={{
//                 scale: [1, 1.5, 1],
//                 opacity: [0.5, 0, 0.5],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </motion.div>

//           {/* Animated Title */}
//           <motion.h2
//             className="text-5xl sm:text-7xl font-bold mb-6"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             <motion.span 
//               className="text-white inline-block"
//               initial={{ opacity: 0, y: 50 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.3, duration: 0.6 }}
//             >
//               Featured{' '}
//             </motion.span>
//             <motion.span 
//               className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] inline-block relative"
//               initial={{ opacity: 0, y: 50 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.4, duration: 0.6 }}
//             >
//               Projects
//               {/* Animated sparkle */}
//               <motion.div
//                 className="absolute -top-6 -right-8"
//                 animate={{
//                   rotate: [0, 360],
//                   scale: [1, 1.2, 1],
//                 }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               >
//                 <Sparkles className="text-[#DC143C]" size={24} />
//               </motion.div>
//             </motion.span>
//           </motion.h2>

//           {/* Animated underline */}
//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={inView ? { scaleX: 1 } : {}}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="w-32 h-1 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-6"
//             style={{
//               boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)',
//             }}
//           />

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.6 }}
//             className="text-gray-400 text-lg max-w-2xl mx-auto"
//           >
//             Real-world applications showcasing my skills and problem-solving abilities
//           </motion.p>
//         </motion.div>

//         {/* Projects Grid with Stagger Animation */}
//         <div className="space-y-32">
//           {projects.map((project, index) => (
//             <ProjectShowcase
//               key={project.title}
//               project={project}
//               index={index}
//               inView={inView}
//               isHovered={hoveredIndex === index}
//               onHover={() => setHoveredIndex(index)}
//               onLeave={() => setHoveredIndex(null)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Enhanced Project Showcase with Parallax and 3D
// const ProjectShowcase = ({ project, index, inView, isHovered, onHover, onLeave }) => {
//   const isEven = index % 2 === 0;
//   const sectionRef = useRef(null);
  
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start end', 'end start'],
//   });

//   // Parallax effects
//   const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
//   const contentY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

//   return (
//     <motion.div
//       ref={sectionRef}
//       initial={{ opacity: 0 }}
//       animate={inView ? { opacity: 1 } : {}}
//       style={{ opacity }}
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//       className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
//         isEven ? '' : 'lg:grid-flow-dense'
//       }`}
//     >
//       {/* Animated Project Image with 3D Transform */}
//       <motion.div
//         className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}
//         style={{ y: imageY }}
//         initial={{ opacity: 0, x: isEven ? -100 : 100, rotateY: isEven ? -30 : 30 }}
//         animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
//         transition={{ duration: 0.8, delay: index * 0.2 }}
//       >
//         <div className="relative group perspective-1000">
//           {/* Animated glowing border */}
//           <motion.div
//             className="absolute -inset-1 rounded-3xl opacity-75 blur-lg"
//             style={{
//               background: 'linear-gradient(90deg, #DC143C, #FF1744, #DC143C)',
//               backgroundSize: '200% 200%',
//             }}
//             animate={{
//               backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
//               opacity: isHovered ? 1 : 0.5,
//             }}
//             transition={{
//               backgroundPosition: {
//                 duration: 3,
//                 repeat: Infinity,
//               },
//               opacity: {
//                 duration: 0.3,
//               },
//             }}
//           />

//           <motion.div 
//             className="relative overflow-hidden rounded-3xl"
//             whileHover={{ 
//               scale: 1.02,
//               rotateY: isEven ? 5 : -5,
//               rotateX: 3,
//             }}
//             transition={{ duration: 0.4 }}
//           >
//             {/* Image with parallax */}
//             <motion.img
//               src={project.image}
//               alt={project.title}
//               className="w-full h-[400px] lg:h-[500px] object-cover rounded-3xl relative z-10"
//               style={{
//                 y: useTransform(scrollYProgress, [0, 1], [0, -20]),
//               }}
//               animate={{
//                 scale: isHovered ? 1.05 : 1,
//               }}
//               transition={{ duration: 0.4 }}
//             />

//             {/* Gradient Overlay with animation */}
//             <motion.div 
//               className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl z-20"
//               animate={{
//                 opacity: isHovered ? 0.7 : 0.9,
//               }}
//             />

//             {/* Animated Project Number Badge */}
//             <motion.div
//               className="absolute top-6 left-6 z-30"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={inView ? { scale: 1, rotate: 0 } : {}}
//               transition={{ delay: 0.5 + index * 0.2, type: 'spring', bounce: 0.6 }}
//               whileHover={{ scale: 1.1, rotate: 360 }}
//             >
//               <div className="bg-[#DC143C] px-6 py-3 rounded-2xl shadow-2xl relative overflow-hidden">
//                 <span className="text-white font-bold text-xl relative z-10">
//                   PROJECT {String(index + 1).padStart(2, '0')}
//                 </span>
//                 {/* Shimmer effect */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                   animate={{
//                     x: ['-100%', '200%'],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                   }}
//                 />
//               </div>
//             </motion.div>

//             {/* Animated Action Buttons */}
//             <motion.div 
//               className="absolute top-6 right-6 flex gap-3 z-30"
//               initial={{ opacity: 0, x: 50 }}
//               animate={inView ? { opacity: 1, x: 0 } : {}}
//               transition={{ delay: 0.6 + index * 0.2 }}
//             >
//               <ActionButton
//                 href={project.githubLink}
//                 icon={<Github size={24} />}
//                 delay={0}
//               />
//               <ActionButton
//                 href={project.demoLink}
//                 icon={<ExternalLink size={24} />}
//                 delay={0.1}
//               />
//             </motion.div>

//             {/* Hover particles */}
//             {isHovered && (
//               <>
//                 {[...Array(8)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute w-2 h-2 bg-[#DC143C] rounded-full z-25"
//                     style={{
//                       top: `${Math.random() * 100}%`,
//                       left: `${Math.random() * 100}%`,
//                     }}
//                     animate={{
//                       y: [0, -50, -100],
//                       opacity: [1, 0.5, 0],
//                       scale: [0, 1.5, 0],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       delay: i * 0.2,
//                     }}
//                   />
//                 ))}
//               </>
//             )}
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Animated Project Details */}
//       <motion.div 
//         className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
//         style={{ y: contentY }}
//       >
//         {/* Category Tag */}
//         <motion.div
//           initial={{ opacity: 0, x: isEven ? 50 : -50 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ delay: 0.3 + index * 0.2 }}
//           className="flex items-center gap-3"
//         >
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//           >
//             <Code2 className="text-[#DC143C]" size={24} />
//           </motion.div>
//           <span className="text-[#DC143C] font-bold text-sm tracking-wider">
//             FULL STACK PROJECT
//           </span>
//         </motion.div>

//         {/* Animated Title */}
//         <motion.h3
//           initial={{ opacity: 0, x: isEven ? 50 : -50 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ delay: 0.4 + index * 0.2, type: 'spring' }}
//           className="text-4xl sm:text-5xl font-bold text-white leading-tight"
//           style={{ fontFamily: "'Space Grotesk', sans-serif" }}
//         >
//           {project.title.split(' ').map((word, i) => (
//             <motion.span
//               key={i}
//               className="inline-block mr-3"
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
//               whileHover={{ 
//                 y: -5, 
//                 color: '#DC143C',
//                 transition: { duration: 0.2 }
//               }}
//             >
//               {word}
//             </motion.span>
//           ))}
//         </motion.h3>

//         {/* Description with fade in */}
//         <motion.p
//           initial={{ opacity: 0, x: isEven ? 50 : -50 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ delay: 0.5 + index * 0.2 }}
//           className="text-gray-400 text-lg leading-relaxed"
//         >
//           {project.description}
//         </motion.p>

//         {/* Animated Tech Stack */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.6 + index * 0.2 }}
//           className="space-y-3"
//         >
//           <div className="flex items-center gap-2 text-white font-semibold">
//             <Zap className="text-[#DC143C]" size={20} />
//             Tech Stack
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {project.technologies.map((tech, i) => (
//               <motion.span
//                 key={tech}
//                 initial={{ opacity: 0, scale: 0, rotate: -180 }}
//                 animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
//                 transition={{ 
//                   delay: 0.7 + index * 0.2 + i * 0.05,
//                   type: 'spring',
//                   stiffness: 200
//                 }}
//                 whileHover={{ 
//                   scale: 1.15, 
//                   y: -5,
//                   boxShadow: '0 10px 25px rgba(220, 20, 60, 0.4)',
//                 }}
//                 className="px-4 py-2 bg-[#1a1a1a] text-[#DC143C] rounded-xl text-sm font-bold border border-[#DC143C]/30 hover:border-[#DC143C] transition-all cursor-pointer"
//               >
//                 {tech}
//               </motion.span>
//             ))}
//           </div>
//         </motion.div>

//         {/* Animated Features */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.7 + index * 0.2 }}
//           className="space-y-3"
//         >
//           <div className="flex items-center gap-2 text-white font-semibold">
//             <Star className="text-[#DC143C]" size={20} />
//             Key Features
//           </div>
//           <ul className="space-y-2">
//             {project.features.map((feature, i) => (
//               <motion.li
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={inView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
//                 whileHover={{ x: 10 }}
//                 className="flex items-start gap-3 text-gray-400 group cursor-pointer"
//               >
//                 <motion.div
//                   className="w-2 h-2 bg-[#DC143C] rounded-full mt-2 flex-shrink-0"
//                   whileHover={{ scale: 2 }}
//                 />
//                 <span className="leading-relaxed group-hover:text-white transition-colors">
//                   {feature}
//                 </span>
//               </motion.li>
//             ))}
//           </ul>
//         </motion.div>

//         {/* Animated CTA Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.9 + index * 0.2 }}
//           className="flex gap-4 pt-4"
//         >
//           <motion.a
//             href={project.demoLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.05, x: 5 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex-1 px-6 py-4 bg-[#DC143C] text-white font-bold rounded-xl hover:bg-[#FF1744] transition-colors flex items-center justify-center gap-2 relative overflow-hidden group"
//           >
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#DC143C]"
//               initial={{ x: '-100%' }}
//               whileHover={{ x: 0 }}
//               transition={{ duration: 0.3 }}
//             />
//             <ExternalLink size={20} className="relative z-10" />
//             <span className="relative z-10">View Live Demo</span>
//           </motion.a>
//           <motion.a
//             href={project.githubLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.05, x: 5 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl border border-[#DC143C]/50 hover:border-[#DC143C] transition-all flex items-center justify-center gap-2"
//           >
//             <Github size={20} />
//             Source Code
//           </motion.a>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Animated Action Button
// const ActionButton = ({ href, icon, delay }) => {
//   return (
//     <motion.a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       initial={{ scale: 0, rotate: -180 }}
//       animate={{ scale: 1, rotate: 0 }}
//       transition={{ delay, type: 'spring', stiffness: 200 }}
//       whileHover={{ 
//         scale: 1.2, 
//         rotate: 360,
//         boxShadow: '0 10px 30px rgba(220, 20, 60, 0.5)',
//       }}
//       whileTap={{ scale: 0.9 }}
//       className="p-4 bg-black/70 backdrop-blur-md rounded-2xl text-white hover:bg-[#DC143C] transition-all border border-gray-700 hover:border-[#DC143C] relative overflow-hidden group"
//     >
//       <div className="relative z-10">{icon}</div>
      
//       {/* Shimmer effect */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//         initial={{ x: '-100%' }}
//         whileHover={{ x: '100%' }}
//         transition={{ duration: 0.5 }}
//       />
//     </motion.a>
//   );
// };

// export default Projects;

// // import React, { useState } from 'react';
// // import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// // import { useInView } from 'react-intersection-observer';
// // import { projects } from '../data/mockData';
// // import { ExternalLink, Github, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

// // const Projects = () => {
// //   const [ref, inView] = useInView({
// //     triggerOnce: true,
// //     threshold: 0.1,
// //   });

// //   const sectionRef = React.useRef(null);
// //   const { scrollYProgress } = useScroll({
// //     target: sectionRef,
// //     offset: ['start end', 'end start'],
// //   });

// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [direction, setDirection] = useState(0);

// //   const nextProject = () => {
// //     setDirection(1);
// //     setCurrentIndex((prev) => (prev + 1) % projects.length);
// //   };

// //   const prevProject = () => {
// //     setDirection(-1);
// //     setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
// //   };

// //   const currentProject = projects[currentIndex];

// //   const slideVariants = {
// //     enter: (direction) => ({
// //       x: direction > 0 ? 1000 : -1000,
// //       opacity: 0,
// //       rotateY: direction > 0 ? 45 : -45,
// //       scale: 0.8,
// //     }),
// //     center: {
// //       zIndex: 1,
// //       x: 0,
// //       opacity: 1,
// //       rotateY: 0,
// //       scale: 1,
// //     },
// //     exit: (direction) => ({
// //       zIndex: 0,
// //       x: direction < 0 ? 1000 : -1000,
// //       opacity: 0,
// //       rotateY: direction < 0 ? 45 : -45,
// //       scale: 0.8,
// //     }),
// //   };

// //   return (
// //     <section
// //       id="projects"
// //       ref={sectionRef}
// //       className="py-32 bg-[#0a0a0a] relative overflow-hidden min-h-screen flex items-center"
// //     >
// //       {/* Dynamic Background */}
// //       <div className="absolute inset-0">
// //         <motion.div
// //           animate={{
// //             background: [
// //               'radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
// //               'radial-gradient(circle at 80% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
// //               'radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
// //             ],
// //           }}
// //           transition={{ duration: 10, repeat: Infinity }}
// //           className="absolute inset-0"
// //         />

// //         {/* Floating orbs */}
// //         {[...Array(3)].map((_, i) => (
// //           <motion.div
// //             key={i}
// //             animate={{
// //               y: [0, -50, 0],
// //               x: [0, 30, 0],
// //               scale: [1, 1.2, 1],
// //               opacity: [0.1, 0.2, 0.1],
// //             }}
// //             transition={{
// //               duration: 8 + i * 2,
// //               repeat: Infinity,
// //               ease: 'easeInOut',
// //               delay: i * 2,
// //             }}
// //             className="absolute w-64 h-64 bg-[#DC143C] rounded-full blur-3xl"
// //             style={{
// //               top: `${20 + i * 30}%`,
// //               left: `${10 + i * 30}%`,
// //             }}
// //           />
// //         ))}
// //       </div>

// //       <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
// //         {/* Section Title */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 50 }}
// //           animate={inView ? { opacity: 1, y: 0 } : {}}
// //           transition={{ duration: 0.8 }}
// //           className="text-center mb-20"
// //         >
// //           <motion.div className="inline-block relative">
// //             <h2
// //               className="text-5xl sm:text-7xl font-bold text-white mb-6"
// //               style={{
// //                 fontFamily: "'Playfair Display', serif",
// //               }}
// //             >
// //               Featured{' '}
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] relative">
// //                 Projects
// //                 <motion.div
// //                   className="absolute -inset-4 bg-[#DC143C]/20 blur-2xl -z-10"
// //                   animate={{
// //                     scale: [1, 1.3, 1],
// //                     opacity: [0.3, 0.6, 0.3],
// //                   }}
// //                   transition={{ duration: 2, repeat: Infinity }}
// //                 />
// //               </span>
// //             </h2>
// //           </motion.div>
// //           <motion.div
// //             initial={{ scaleX: 0 }}
// //             animate={inView ? { scaleX: 1 } : {}}
// //             transition={{ delay: 0.5, duration: 0.8 }}
// //             className="w-32 h-1.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-8"
// //             style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' }}
// //           />
// //           <motion.p
// //             initial={{ opacity: 0 }}
// //             animate={inView ? { opacity: 1 } : {}}
// //             transition={{ delay: 0.7 }}
// //             className="text-gray-400 text-lg max-w-2xl mx-auto"
// //           >
// //             Showcasing my recent work and personal projects
// //           </motion.p>
// //         </motion.div>

// //         {/* Project Carousel */}
// //         <div className="relative" style={{ perspective: 2000 }}>
// //           <AnimatePresence initial={false} custom={direction} mode="wait">
// //             <motion.div
// //               key={currentIndex}
// //               custom={direction}
// //               variants={slideVariants}
// //               initial="enter"
// //               animate="center"
// //               exit="exit"
// //               transition={{
// //                 x: { type: 'spring', stiffness: 300, damping: 30 },
// //                 opacity: { duration: 0.3 },
// //                 rotateY: { duration: 0.5 },
// //                 scale: { duration: 0.4 },
// //               }}
// //               className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //               style={{ transformStyle: 'preserve-3d' }}
// //             >
// //               {/* Project Image */}
// //               <ProjectImage project={currentProject} />

// //               {/* Project Details */}
// //               <ProjectDetails project={currentProject} currentIndex={currentIndex} />
// //             </motion.div>
// //           </AnimatePresence>

// //           {/* Navigation */}
// //           <ProjectNavigation
// //             currentIndex={currentIndex}
// //             totalProjects={projects.length}
// //             onPrev={prevProject}
// //             onNext={nextProject}
// //             onSelect={setCurrentIndex}
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // // Project Image Component
// // const ProjectImage = ({ project }) => {
// //   const [isHovered, setIsHovered] = useState(false);

// //   return (
// //     <motion.div
// //       className="relative group"
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //       whileHover={{ scale: 1.03 }}
// //       transition={{ duration: 0.4 }}
// //     >
// //       <div className="relative overflow-hidden rounded-3xl">
// //         {/* Animated border */}
// //         <motion.div
// //           className="absolute -inset-1 bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] rounded-3xl opacity-75 blur-xl"
// //           animate={{
// //             backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
// //           }}
// //           transition={{ duration: 3, repeat: Infinity }}
// //           style={{ backgroundSize: '200% 200%' }}
// //         />

// //         {/* Image container */}
// //         <div className="relative">
// //           <motion.img
// //             src={project.image}
// //             alt={project.title}
// //             className="w-full h-[400px] lg:h-[600px] object-cover rounded-3xl relative z-10"
// //             animate={{
// //               scale: isHovered ? 1.05 : 1,
// //             }}
// //             transition={{ duration: 0.4 }}
// //           />

// //           {/* Overlay gradient */}
// //           <motion.div
// //             className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl z-20"
// //             animate={{
// //               opacity: isHovered ? 0.7 : 0.9,
// //             }}
// //           />

// //           {/* Project number badge */}
// //           <motion.div
// //             className="absolute top-6 left-6 z-30"
// //             initial={{ x: -100, opacity: 0 }}
// //             animate={{ x: 0, opacity: 1 }}
// //             transition={{ delay: 0.3, type: 'spring' }}
// //           >
// //             <div className="bg-[#DC143C]/90 backdrop-blur-sm px-6 py-3 rounded-full">
// //               <span className="text-white font-bold text-lg">
// //                 {String(projects.indexOf(project) + 1).padStart(2, '0')}
// //               </span>
// //             </div>
// //           </motion.div>

// //           {/* Action buttons */}
// //           <motion.div
// //             className="absolute top-6 right-6 flex gap-3 z-30"
// //             initial={{ x: 100, opacity: 0 }}
// //             animate={{ x: 0, opacity: 1 }}
// //             transition={{ delay: 0.4, type: 'spring' }}
// //           >
// //             <ActionButton
// //               href={project.githubLink}
// //               icon={<Github size={20} />}
// //               label="GitHub"
// //             />
// //             <ActionButton
// //               href={project.demoLink}
// //               icon={<ExternalLink size={20} />}
// //               label="Live Demo"
// //             />
// //           </motion.div>

// //           {/* Hover effect overlay */}
// //           <motion.div
// //             className="absolute inset-0 z-25"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: isHovered ? 1 : 0 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <div
// //               className="absolute inset-0 rounded-3xl"
// //               style={{
// //                 background:
// //                   'radial-gradient(circle at center, rgba(220, 20, 60, 0.3) 0%, transparent 70%)',
// //               }}
// //             />
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* Floating particles around image */}
// //       {isHovered &&
// //         [...Array(5)].map((_, i) => (
// //           <motion.div
// //             key={i}
// //             className="absolute w-2 h-2 bg-[#DC143C] rounded-full"
// //             initial={{
// //               x: '50%',
// //               y: '50%',
// //               scale: 0,
// //               opacity: 0,
// //             }}
// //             animate={{
// //               x: `${50 + (Math.random() - 0.5) * 100}%`,
// //               y: `${50 + (Math.random() - 0.5) * 100}%`,
// //               scale: [0, 1, 0],
// //               opacity: [0, 1, 0],
// //             }}
// //             transition={{
// //               duration: 2,
// //               repeat: Infinity,
// //               delay: i * 0.2,
// //             }}
// //           />
// //         ))}
// //     </motion.div>
// //   );
// // };

// // // Action Button Component
// // const ActionButton = ({ href, icon, label }) => {
// //   return (
// //     <motion.a
// //       href={href}
// //       target="_blank"
// //       rel="noopener noreferrer"
// //       whileHover={{ scale: 1.15, rotate: 5 }}
// //       whileTap={{ scale: 0.9 }}
// //       className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#DC143C] transition-colors group relative"
// //     >
// //       {icon}
// //       <motion.span
// //         className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
// //         initial={{ y: -10 }}
// //         whileHover={{ y: 0 }}
// //       >
// //         {label}
// //       </motion.span>
// //     </motion.a>
// //   );
// // };

// // // Project Details Component
// // const ProjectDetails = ({ project, currentIndex }) => {
// //   return (
// //     <div className="space-y-8">
// //       {/* Project label */}
// //       <motion.div
// //         initial={{ opacity: 0, x: 50 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: 0.2 }}
// //         className="flex items-center gap-3"
// //       >
// //         <motion.div
// //           animate={{ rotate: 360 }}
// //           transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
// //         >
// //           <Zap className="text-[#DC143C]" size={24} />
// //         </motion.div>
// //         <span className="text-[#DC143C] font-bold text-sm tracking-[0.3em]">
// //           PROJECT {String(currentIndex + 1).padStart(2, '0')}
// //         </span>
// //       </motion.div>

// //       {/* Title */}
// //       <motion.h3
// //         initial={{ opacity: 0, x: 50 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: 0.3 }}
// //         className="text-4xl sm:text-5xl font-bold text-white leading-tight"
// //         style={{ fontFamily: "'Space Grotesk', sans-serif" }}
// //       >
// //         {project.title.split(' ').map((word, i) => (
// //           <motion.span
// //             key={i}
// //             className="inline-block mr-3"
// //             whileHover={{
// //               y: -5,
// //               color: '#DC143C',
// //               transition: { duration: 0.2 },
// //             }}
// //           >
// //             {word}
// //           </motion.span>
// //         ))}
// //       </motion.h3>

// //       {/* Description */}
// //       <motion.p
// //         initial={{ opacity: 0, x: 50 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: 0.4 }}
// //         className="text-gray-400 text-lg leading-relaxed"
// //       >
// //         {project.description}
// //       </motion.p>

// //       {/* Technologies */}
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.5 }}
// //       >
// //         <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
// //           <span className="w-2 h-2 bg-[#DC143C] rounded-full" />
// //           Technologies Used
// //         </h4>
// //         <div className="flex flex-wrap gap-3">
// //           {project.technologies.map((tech, index) => (
// //             <motion.span
// //               key={tech}
// //               initial={{ opacity: 0, scale: 0 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.6 + index * 0.05, type: 'spring' }}
// //               whileHover={{
// //                 scale: 1.15,
// //                 y: -5,
// //                 boxShadow: '0 10px 25px rgba(220, 20, 60, 0.4)',
// //               }}
// //               className="px-5 py-2.5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-[#DC143C] rounded-full text-sm font-medium border border-[#DC143C]/30 hover:border-[#DC143C] transition-all cursor-pointer"
// //             >
// //               {tech}
// //             </motion.span>
// //           ))}
// //         </div>
// //       </motion.div>

// //       {/* Features */}
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.7 }}
// //       >
// //         <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
// //           <span className="w-2 h-2 bg-[#DC143C] rounded-full" />
// //           Key Features
// //         </h4>
// //         <ul className="space-y-3">
// //           {project.features.map((feature, index) => (
// //             <motion.li
// //               key={index}
// //               initial={{ opacity: 0, x: -30 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ delay: 0.8 + index * 0.1 }}
// //               whileHover={{ x: 10 }}
// //               className="flex items-start gap-3 text-gray-400 group cursor-pointer"
// //             >
// //               <motion.div
// //                 className="w-2 h-2 bg-[#DC143C] rounded-full mt-2 flex-shrink-0"
// //                 whileHover={{ scale: 1.5 }}
// //               />
// //               <span className="group-hover:text-white transition-colors">
// //                 {feature}
// //               </span>
// //             </motion.li>
// //           ))}
// //         </ul>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // // Project Navigation Component
// // const ProjectNavigation = ({
// //   currentIndex,
// //   totalProjects,
// //   onPrev,
// //   onNext,
// //   onSelect,
// // }) => {
// //   return (
// //     <div className="flex justify-center items-center gap-8 mt-16">
// //       {/* Previous button */}
// //       <motion.button
// //         whileHover={{ scale: 1.1, x: -5 }}
// //         whileTap={{ scale: 0.9 }}
// //         onClick={onPrev}
// //         className="p-5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white rounded-full hover:bg-[#DC143C] transition-all border border-gray-800 hover:border-[#DC143C] group relative overflow-hidden"
// //       >
// //         <motion.div
// //           className="absolute inset-0 bg-[#DC143C]"
// //           initial={{ x: '-100%' }}
// //           whileHover={{ x: 0 }}
// //           transition={{ duration: 0.3 }}
// //         />
// //         <ChevronLeft size={24} className="relative z-10" />
// //       </motion.button>

// //       {/* Project Indicators */}
// //       <div className="flex gap-3">
// //         {[...Array(totalProjects)].map((_, index) => (
// //           <motion.button
// //             key={index}
// //             whileHover={{ scale: 1.3 }}
// //             whileTap={{ scale: 0.9 }}
// //             onClick={() => onSelect(index)}
// //             className={`relative transition-all duration-300 ${
// //               index === currentIndex ? 'w-12' : 'w-3'
// //             }`}
// //           >
// //             <motion.div
// //               className={`h-3 rounded-full ${
// //                 index === currentIndex ? 'bg-[#DC143C]' : 'bg-gray-600'
// //               }`}
// //               animate={{
// //                 backgroundColor:
// //                   index === currentIndex ? '#DC143C' : '#4B5563',
// //               }}
// //             />
// //             {index === currentIndex && (
// //               <motion.div
// //                 className="absolute inset-0 bg-[#DC143C] rounded-full blur-md"
// //                 animate={{
// //                   opacity: [0.5, 1, 0.5],
// //                 }}
// //                 transition={{ duration: 2, repeat: Infinity }}
// //               />
// //             )}
// //           </motion.button>
// //         ))}
// //       </div>

// //       {/* Next button */}
// //       <motion.button
// //         whileHover={{ scale: 1.1, x: 5 }}
// //         whileTap={{ scale: 0.9 }}
// //         onClick={onNext}
// //         className="p-5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white rounded-full hover:bg-[#DC143C] transition-all border border-gray-800 hover:border-[#DC143C] group relative overflow-hidden"
// //       >
// //         <motion.div
// //           className="absolute inset-0 bg-[#DC143C]"
// //           initial={{ x: '100%' }}
// //           whileHover={{ x: 0 }}
// //           transition={{ duration: 0.3 }}
// //         />
// //         <ChevronRight size={24} className="relative z-10" />
// //       </motion.button>
// //     </div>
// //   );
// // };

// // export default Projects;