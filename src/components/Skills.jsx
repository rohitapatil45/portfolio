// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { skills } from '../data/mockData';
// import { Zap, Sparkles } from 'lucide-react';

// const Skills = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const [activeCategory, setActiveCategory] = useState('All');
//   const categories = ['All', ...new Set(skills.map((skill) => skill.category))];

//   const filteredSkills = activeCategory === 'All' 
//     ? skills 
//     : skills.filter(skill => skill.category === activeCategory);

//   // Different shapes based on skill level
//   const getSkillShape = (level) => {
//     if (level >= 85) return { 
//       type: 'hexagon',
//       gradient: 'from-orange-500 via-red-500 to-red-600',
//       glow: 'rgba(255, 87, 34, 0.6)'
//     };
//     if (level >= 70) return { 
//       type: 'octagon',
//       gradient: 'from-purple-500 via-pink-500 to-pink-600',
//       glow: 'rgba(156, 39, 176, 0.6)'
//     };
//     if (level >= 60) return { 
//       type: 'diamond',
//       gradient: 'from-blue-500 via-cyan-500 to-cyan-600',
//       glow: 'rgba(33, 150, 243, 0.6)'
//     };
//     return { 
//       type: 'circle',
//       gradient: 'from-green-500 via-teal-500 to-teal-600',
//       glow: 'rgba(76, 175, 80, 0.6)'
//     };
//   };

//   return (
//     <section
//       id="skills"
//       className="py-32 bg-[#0a0a0a] relative overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#DC143C] rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#DC143C] rounded-full blur-3xl" />
//       </div>

//       <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={inView ? { scale: 1 } : {}}
//             transition={{ delay: 0.2, type: 'spring' }}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C]/10 border border-[#DC143C]/30 rounded-full mb-6"
//           >
//             <Zap className="text-[#DC143C]" size={18} />
//             <span className="text-[#DC143C] text-sm font-bold tracking-wider">
//               TECHNOLOGIES
//             </span>
//           </motion.div>

//           <motion.h2
//             className="text-5xl sm:text-7xl font-bold mb-6"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             <span className="text-white">Tech </span>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744]">
//               Skills
//             </span>
//           </motion.h2>

//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={inView ? { scaleX: 1 } : {}}
//             className="w-32 h-1 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-6"
//           />

//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             A diverse set of technologies I use to build modern applications
//           </p>
//         </motion.div>

//         {/* Category Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.3 }}
//           className="flex flex-wrap justify-center gap-3 mb-16"
//         >
//           {categories.map((category, index) => (
//             <motion.button
//               key={category}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={inView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ delay: 0.4 + index * 0.05 }}
//               onClick={() => setActiveCategory(category)}
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               className={`px-6 py-3 rounded-full font-semibold transition-all ${
//                 activeCategory === category
//                   ? 'bg-[#DC143C] text-white shadow-lg shadow-[#DC143C]/50'
//                   : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white border border-gray-800'
//               }`}
//             >
//               {category}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Skills Grid with Different Shapes */}
//         <motion.div
//           layout
//           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16"
//         >
//           {filteredSkills.map((skill, index) => {
//             const shape = getSkillShape(skill.level);
            
//             return (
//               <SkillBubble
//                 key={`${activeCategory}-${skill.name}`}
//                 skill={skill}
//                 shape={shape}
//                 index={index}
//                 inView={inView}
//               />
//             );
//           })}
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.8 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-6"
//         >
//           {[
//             { label: 'Technologies', value: skills.length, icon: Sparkles },
//             { label: 'Advanced Skills', value: skills.filter(s => s.level >= 85).length, icon: Zap },
//             { label: 'Proficient', value: skills.filter(s => s.level >= 70).length, icon: Sparkles },
//             { label: 'Categories', value: categories.length - 1, icon: Zap },
//           ].map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={inView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ delay: 0.9 + i * 0.1 }}
//               whileHover={{ scale: 1.05, y: -5 }}
//               className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl text-center border border-[#DC143C]/20 hover:border-[#DC143C]/50 transition-all relative overflow-hidden group"
//             >
//               <motion.div
//                 className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//               >
//                 <stat.icon size={40} className="text-[#DC143C]" />
//               </motion.div>
//               <div className="text-4xl font-bold text-[#DC143C] mb-2 relative z-10">{stat.value}</div>
//               <div className="text-gray-400 text-sm relative z-10">{stat.label}</div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // Skill Bubble with Different Shapes
// const SkillBubble = ({ skill, shape, index, inView }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   // Shape clip paths
//   const getShapeClipPath = (type) => {
//     switch (type) {
//       case 'hexagon':
//         return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
//       case 'octagon':
//         return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
//       case 'diamond':
//         return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
//       case 'circle':
//         return 'circle(50% at 50% 50%)';
//       default:
//         return 'none';
//     }
//   };

//   const getBorderRadius = (type) => {
//     switch (type) {
//       case 'hexagon':
//         return '1rem';
//       case 'octagon':
//         return '1.5rem';
//       case 'diamond':
//         return '0.5rem';
//       case 'circle':
//         return '50%';
//       default:
//         return '1rem';
//     }
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0, rotate: -180 }}
//       animate={inView ? { 
//         opacity: 1, 
//         scale: 1,
//         rotate: 0,
//       } : {}}
//       exit={{ opacity: 0, scale: 0 }}
//       transition={{
//         duration: 0.5,
//         delay: index * 0.03,
//         type: 'spring',
//         stiffness: 200,
//       }}
//       whileHover={{ 
//         scale: 1.15, 
//         zIndex: 10,
//         rotate: shape.type === 'diamond' ? 45 : 0,
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="relative cursor-pointer"
//     >
//       {/* Skill Shape */}
//       <motion.div
//         className={`
//           relative p-6
//           bg-gradient-to-br ${shape.gradient}
//           shadow-xl
//           aspect-square
//           flex items-center justify-center
//           text-center
//           overflow-hidden
//         `}
//         style={{
//           borderRadius: getBorderRadius(shape.type),
//           boxShadow: isHovered 
//             ? `0 20px 60px ${shape.glow}, 0 0 0 4px rgba(255,255,255,0.2)`
//             : '0 10px 30px rgba(0, 0, 0, 0.3)',
//         }}
//       >
//         {/* Skill Name */}
//         <motion.div 
//           className="text-white font-bold text-sm sm:text-base leading-tight relative z-10"
//           animate={{
//             scale: isHovered ? 1.1 : 1,
//           }}
//         >
//           {skill.name}
//         </motion.div>

//         {/* Animated background effect */}
//         <motion.div
//           className="absolute inset-0 opacity-30"
//           animate={{
//             rotate: isHovered ? 360 : 0,
//             scale: isHovered ? 1.5 : 1,
//           }}
//           transition={{ duration: 0.8 }}
//           style={{
//             background: `radial-gradient(circle, ${shape.glow}, transparent)`,
//           }}
//         />

//         {/* Glow pulse on hover */}
//         {isHovered && (
//           <motion.div
//             className="absolute inset-0"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.4] }}
//             transition={{ duration: 1, repeat: Infinity }}
//             style={{
//               background: `radial-gradient(circle, ${shape.glow}, transparent)`,
//             }}
//           />
//         )}
//       </motion.div>

//       {/* Floating particles on hover */}
//       {isHovered && (
//         <>
//           {[...Array(3)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 rounded-full"
//               style={{ 
//                 background: shape.gradient,
//                 top: '50%',
//                 left: '50%',
//               }}
//               initial={{ scale: 0, x: 0, y: 0 }}
//               animate={{
//                 scale: [0, 1, 0],
//                 x: [(Math.random() - 0.5) * 100],
//                 y: [(Math.random() - 0.5) * 100],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}
//         </>
//       )}
//     </motion.div>
//   );
// };

// export default Skills;


import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/mockData';
import { Zap, Sparkles } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = useMemo(() => 
    ['All', ...new Set(skills.map((skill) => skill.category))],
    []
  );

  const filteredSkills = useMemo(() => 
    activeCategory === 'All' 
      ? skills 
      : skills.filter(skill => skill.category === activeCategory),
    [activeCategory]
  );

  // Memoize stats
  const stats = useMemo(() => [
    { label: 'Technologies', value: skills.length, icon: Sparkles },
    { label: 'Advanced Skills', value: skills.filter(s => s.level >= 85).length, icon: Zap },
    { label: 'Proficient', value: skills.filter(s => s.level >= 70).length, icon: Sparkles },
    { label: 'Categories', value: categories.length - 1, icon: Zap },
  ], [categories.length]);

  return (
    <section
      id="skills"
      className="py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#DC143C] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#DC143C] rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.15, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C]/10 border border-[#DC143C]/30 rounded-full mb-6"
          >
            <Zap className="text-[#DC143C]" size={18} />
            <span className="text-[#DC143C] text-sm font-bold tracking-wider">
              TECHNOLOGIES
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl sm:text-7xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-white">Tech </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744]">
              Skills
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            className="w-32 h-1 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-6"
          />

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A diverse set of technologies I use to build modern applications
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <CategoryButton
              key={category}
              category={category}
              index={index}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              inView={inView}
            />
          ))}
        </motion.div>

        {/* Skills Grid with Different Shapes */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16"
        >
          {filteredSkills.map((skill, index) => (
            <SkillBubble
              key={`${activeCategory}-${skill.name}`}
              skill={skill}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Optimized Category Button Component
const CategoryButton = React.memo(({ category, index, isActive, onClick, inView }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay: 0.3 + index * 0.04 }}
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className={`px-6 py-3 rounded-full font-semibold transition-all ${
      isActive
        ? 'bg-[#DC143C] text-white shadow-lg shadow-[#DC143C]/40'
        : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white border border-gray-800'
    }`}
    style={{ willChange: 'transform' }}
  >
    {category}
  </motion.button>
));

CategoryButton.displayName = 'CategoryButton';

// Optimized Skill Bubble Component
const SkillBubble = React.memo(({ skill, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false);

  const shape = useMemo(() => getSkillShape(skill.level), [skill.level]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0, rotate: -120 }}
      animate={inView ? { 
        opacity: 1, 
        scale: 1,
        rotate: 0,
      } : {}}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.025, // Reduced from 0.03
        type: 'spring',
        stiffness: 220,
      }}
      whileHover={{ 
        scale: 1.12, 
        zIndex: 10,
        rotate: shape.type === 'diamond' ? 45 : 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      {/* Skill Shape */}
      <motion.div
        className={`
          relative p-6
          bg-gradient-to-br ${shape.gradient}
          shadow-xl
          aspect-square
          flex items-center justify-center
          text-center
          overflow-hidden
        `}
        style={{
          borderRadius: getBorderRadius(shape.type),
          boxShadow: isHovered 
            ? `0 20px 60px ${shape.glow}, 0 0 0 4px rgba(255,255,255,0.15)`
            : '0 10px 30px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Skill Name */}
        <motion.div 
          className="text-white font-bold text-sm sm:text-base leading-tight relative z-10"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
        >
          {skill.name}
        </motion.div>

        {/* Simplified animated background effect */}
        <motion.div
          className="absolute inset-0 opacity-25"
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.4 : 1,
          }}
          transition={{ duration: 0.7 }}
          style={{
            background: `radial-gradient(circle, ${shape.glow}, transparent)`,
          }}
        />

        {/* Simplified glow pulse on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.15, 1.3] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              background: `radial-gradient(circle, ${shape.glow}, transparent)`,
            }}
          />
        )}
      </motion.div>

      {/* Reduced floating particles - 2 instead of 3 */}
      {isHovered && (
        <>
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                background: shape.gradient,
                top: '50%',
                left: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: [(Math.random() - 0.5) * 80],
                y: [(Math.random() - 0.5) * 80],
              }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
});

SkillBubble.displayName = 'SkillBubble';

// Optimized Stat Card Component
const StatCard = React.memo(({ stat, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay: 0.7 + index * 0.08 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl text-center border border-[#DC143C]/20 hover:border-[#DC143C]/40 transition-all relative overflow-hidden group"
    style={{ willChange: 'transform' }}
  >
    <motion.div
      className="absolute top-2 right-2 opacity-8 group-hover:opacity-15 transition-opacity"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    >
      <stat.icon size={40} className="text-[#DC143C]" />
    </motion.div>
    <div className="text-4xl font-bold text-[#DC143C] mb-2 relative z-10">{stat.value}</div>
    <div className="text-gray-400 text-sm relative z-10">{stat.label}</div>
  </motion.div>
));

StatCard.displayName = 'StatCard';

// Helper functions
const getSkillShape = (level) => {
  if (level >= 85) return { 
    type: 'hexagon',
    gradient: 'from-orange-500 via-red-500 to-red-600',
    glow: 'rgba(255, 87, 34, 0.5)'
  };
  if (level >= 70) return { 
    type: 'octagon',
    gradient: 'from-purple-500 via-pink-500 to-pink-600',
    glow: 'rgba(156, 39, 176, 0.5)'
  };
  if (level >= 60) return { 
    type: 'diamond',
    gradient: 'from-blue-500 via-cyan-500 to-cyan-600',
    glow: 'rgba(33, 150, 243, 0.5)'
  };
  return { 
    type: 'circle',
    gradient: 'from-green-500 via-teal-500 to-teal-600',
    glow: 'rgba(76, 175, 80, 0.5)'
  };
};

const getBorderRadius = (type) => {
  switch (type) {
    case 'hexagon':
      return '1rem';
    case 'octagon':
      return '1.5rem';
    case 'diamond':
      return '0.5rem';
    case 'circle':
      return '50%';
    default:
      return '1rem';
  }
};

export default Skills;