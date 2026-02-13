
import React, { useMemo, useCallback } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '../data/mockData';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 bg-[#1a1a1a] relative overflow-hidden"
    >
      {/* Simplified Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-[#DC143C] rounded-full blur-3xl opacity-8"
          style={{ willChange: 'transform' }}
        />
        
        {/* Simplified grid overlay */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 20, 60, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 20, 60, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div className="inline-block relative">
            <h2
              className="text-5xl sm:text-7xl font-bold text-white mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Work{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744]">
                Experience
              </span>
            </h2>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DC143C] to-transparent"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-32 h-1.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-8"
            style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.4)' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            My professional journey and internship experiences
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Simplified animated vertical line */}
          <div className="absolute left-12 top-0 bottom-0 w-1 hidden md:block overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DC143C] to-transparent"
              initial={{ y: '-100%' }}
              animate={inView ? { y: '100%' } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className="absolute inset-0 bg-[#DC143C]/25" />
          </div>

          {/* Experience Items */}
          <div className="space-y-16">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Optimized Experience Card Component
const ExperienceCard = React.memo(({ experience: exp, index, inView }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef(null);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -100, rotateY: -10 }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              rotateY: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 120,
      }}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Timeline dot */}
      <div className="absolute left-12 -translate-x-1/2 hidden md:block z-20">
        <motion.div
          whileHover={{ scale: 1.6 }}
          className="relative"
        >
          <motion.div
            className="w-6 h-6 bg-[#DC143C] rounded-full border-4 border-[#1a1a1a] relative z-10"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(220, 20, 60, 0.3)',
                '0 0 0 15px rgba(220, 20, 60, 0)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 bg-[#DC143C] rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{
          scale: 1.02,
          x: 15,
        }}
        transition={{ duration: 0.3 }}
        className="md:ml-28 relative"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 border border-gray-800 hover:border-[#DC143C] transition-all duration-300 overflow-hidden group relative"
          style={{
            boxShadow: isHovered
              ? '0 25px 50px rgba(220, 20, 60, 0.25)'
              : '0 10px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Simplified animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at top right, rgba(220, 20, 60, 0.12), transparent 70%)',
            }}
          />

          {/* Simplified animated border effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, rgba(220, 20, 60, 0.25) 50%, transparent 100%)',
              filter: 'blur(15px)',
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="p-3 bg-gradient-to-br from-[#DC143C]/20 to-[#DC143C]/5 rounded-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Briefcase className="text-[#DC143C]" size={24} />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-2xl sm:text-3xl font-bold text-white"
                      whileHover={{ x: 5, color: '#DC143C' }}
                    >
                      {exp.position}
                    </motion.h3>
                    <motion.h4
                      className="text-xl text-[#DC143C] font-semibold mt-1"
                      whileHover={{ x: 5 }}
                    >
                      {exp.company}
                    </motion.h4>
                  </div>
                </div>
              </div>

              {/* Duration badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.25, type: 'spring' }}
                whileHover={{ scale: 1.08, rotate: 3 }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#DC143C]/20 to-[#FF1744]/20 rounded-full border border-[#DC143C]/30"
              >
                <Calendar size={16} className="text-[#DC143C]" />
                <span className="text-gray-300 text-sm font-medium whitespace-nowrap">
                  {exp.duration}
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="text-gray-300 mb-6 leading-relaxed text-lg"
            >
              {exp.description}
            </motion.p>

            {/* Responsibilities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="w-2 h-2 bg-[#DC143C] rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <h5 className="text-white font-semibold text-lg">
                  Key Responsibilities
                </h5>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exp.responsibilities.map((resp, respIndex) => (
                  <motion.div
                    key={respIndex}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: index * 0.15 + respIndex * 0.08 + 0.4,
                    }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-start gap-3 text-gray-400 p-3 rounded-lg hover:bg-[#DC143C]/5 transition-colors group cursor-pointer"
                  >
                    <motion.div
                      className="w-2 h-2 bg-[#DC143C] rounded-full mt-1.5 flex-shrink-0"
                      whileHover={{ scale: 1.4 }}
                    />
                    <span className="group-hover:text-white transition-colors text-sm">
                      {resp}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Simplified decorative corner elements */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-[#DC143C]/8 rounded-full blur-3xl"
            animate={{
              scale: isHovered ? 1.4 : 1,
              opacity: isHovered ? 0.25 : 0.08,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-32 h-32 bg-[#DC143C]/8 rounded-full blur-3xl"
            animate={{
              scale: isHovered ? 1.4 : 1,
              opacity: isHovered ? 0.25 : 0.08,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

export default Experience;


// import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { experience } from '../data/mockData';
// import { Briefcase, Calendar, MapPin } from 'lucide-react';

// const Experience = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.05,
//   });

//   const sectionRef = React.useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start end', 'end start'],
//   });

//   return (
//     <section
//       id="experience"
//       ref={sectionRef}
//       className="py-32 bg-[#1a1a1a] relative overflow-hidden"
//     >
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             rotate: [0, 180, 360],
//           }}
//           transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
//           className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-[#DC143C] rounded-full blur-3xl opacity-10"
//         />
        
//         {/* Grid overlay */}
//         <div
//           className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(220, 20, 60, 0.5) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(220, 20, 60, 0.5) 1px, transparent 1px)
//             `,
//             backgroundSize: '100px 100px',
//           }}
//         />
//       </div>

//       <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Title */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-24"
//         >
//           <motion.div className="inline-block relative">
//             <h2
//               className="text-5xl sm:text-7xl font-bold text-white mb-6"
//               style={{
//                 fontFamily: "'Playfair Display', serif",
//               }}
//             >
//               Work{' '}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744]">
//                 Experience
//               </span>
//             </h2>
//             <motion.div
//               className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DC143C] to-transparent"
//               initial={{ scaleX: 0 }}
//               animate={inView ? { scaleX: 1 } : {}}
//               transition={{ delay: 0.5, duration: 0.8 }}
//             />
//           </motion.div>
//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={inView ? { scaleX: 1 } : {}}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="w-32 h-1.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-8"
//             style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' }}
//           />
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.7 }}
//             className="text-gray-400 text-lg max-w-2xl mx-auto"
//           >
//             My professional journey and internship experiences
//           </motion.p>
//         </motion.div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Animated vertical line */}
//           <div className="absolute left-12 top-0 bottom-0 w-1 hidden md:block overflow-hidden">
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DC143C] to-transparent"
//               initial={{ y: '-100%' }}
//               animate={inView ? { y: '100%' } : {}}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//             <div className="absolute inset-0 bg-[#DC143C]/30" />
//           </div>

//           {/* Experience Items */}
//           <div className="space-y-16">
//             {experience.map((exp, index) => (
//               <ExperienceCard
//                 key={exp.id}
//                 experience={exp}
//                 index={index}
//                 inView={inView}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Experience Card Component
// const ExperienceCard = ({ experience: exp, index, inView }) => {
//   const [isHovered, setIsHovered] = React.useState(false);
//   const cardRef = React.useRef(null);

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, x: -100, rotateY: -15 }}
//       animate={
//         inView
//           ? {
//               opacity: 1,
//               x: 0,
//               rotateY: 0,
//             }
//           : {}
//       }
//       transition={{
//         duration: 0.8,
//         delay: index * 0.2,
//         type: 'spring',
//         stiffness: 100,
//       }}
//       className="relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Timeline dot */}
//       <div className="absolute left-12 -translate-x-1/2 hidden md:block z-20">
//         <motion.div
//           whileHover={{ scale: 1.8 }}
//           className="relative"
//         >
//           <motion.div
//             className="w-6 h-6 bg-[#DC143C] rounded-full border-4 border-[#1a1a1a] relative z-10"
//             animate={{
//               boxShadow: [
//                 '0 0 0 0 rgba(220, 20, 60, 0.4)',
//                 '0 0 0 20px rgba(220, 20, 60, 0)',
//               ],
//             }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//           <motion.div
//             className="absolute inset-0 bg-[#DC143C] rounded-full"
//             animate={{
//               scale: [1, 2, 1],
//               opacity: [0.6, 0, 0.6],
//             }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         </motion.div>
//       </div>

//       {/* Content Card */}
//       <motion.div
//         whileHover={{
//           scale: 1.02,
//           x: 20,
//         }}
//         transition={{ duration: 0.3 }}
//         className="md:ml-28 relative"
//         style={{
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         <motion.div
//           className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 border border-gray-800 hover:border-[#DC143C] transition-all duration-300 overflow-hidden group relative"
//           style={{
//             boxShadow: isHovered
//               ? '0 25px 50px rgba(220, 20, 60, 0.3)'
//               : '0 10px 30px rgba(0, 0, 0, 0.5)',
//           }}
//         >
//           {/* Animated gradient background */}
//           <motion.div
//             className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//             style={{
//               background:
//                 'radial-gradient(circle at top right, rgba(220, 20, 60, 0.15), transparent 70%)',
//             }}
//           />

//           {/* Animated border effect */}
//           <motion.div
//             className="absolute inset-0 opacity-0 group-hover:opacity-100"
//             initial={{ rotate: 0 }}
//             animate={{ rotate: 360 }}
//             transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
//             style={{
//               background:
//                 'conic-gradient(from 0deg, transparent 0%, rgba(220, 20, 60, 0.3) 50%, transparent 100%)',
//               filter: 'blur(20px)',
//             }}
//           />

//           <div className="relative z-10">
//             {/* Header */}
//             <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-4 mb-4">
//                   <motion.div
//                     className="p-3 bg-gradient-to-br from-[#DC143C]/20 to-[#DC143C]/5 rounded-xl"
//                     whileHover={{ rotate: 360, scale: 1.1 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     <Briefcase className="text-[#DC143C]" size={24} />
//                   </motion.div>
//                   <div>
//                     <motion.h3
//                       className="text-2xl sm:text-3xl font-bold text-white"
//                       whileHover={{ x: 5, color: '#DC143C' }}
//                     >
//                       {exp.position}
//                     </motion.h3>
//                     <motion.h4
//                       className="text-xl text-[#DC143C] font-semibold mt-1"
//                       whileHover={{ x: 5 }}
//                     >
//                       {exp.company}
//                     </motion.h4>
//                   </div>
//                 </div>
//               </div>

//               {/* Duration badge */}
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={inView ? { scale: 1, rotate: 0 } : {}}
//                 transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
//                 whileHover={{ scale: 1.1, rotate: 5 }}
//                 className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#DC143C]/20 to-[#FF1744]/20 rounded-full border border-[#DC143C]/30"
//               >
//                 <Calendar size={16} className="text-[#DC143C]" />
//                 <span className="text-gray-300 text-sm font-medium whitespace-nowrap">
//                   {exp.duration}
//                 </span>
//               </motion.div>
//             </div>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ delay: index * 0.2 + 0.4 }}
//               className="text-gray-300 mb-6 leading-relaxed text-lg"
//             >
//               {exp.description}
//             </motion.p>

//             {/* Responsibilities */}
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <motion.div
//                   className="w-2 h-2 bg-[#DC143C] rounded-full"
//                   animate={{
//                     scale: [1, 1.5, 1],
//                     opacity: [0.5, 1, 0.5],
//                   }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 />
//                 <h5 className="text-white font-semibold text-lg">
//                   Key Responsibilities
//                 </h5>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {exp.responsibilities.map((resp, respIndex) => (
//                   <motion.div
//                     key={respIndex}
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={inView ? { opacity: 1, x: 0 } : {}}
//                     transition={{
//                       delay: index * 0.2 + respIndex * 0.1 + 0.5,
//                     }}
//                     whileHover={{ x: 10, scale: 1.02 }}
//                     className="flex items-start gap-3 text-gray-400 p-3 rounded-lg hover:bg-[#DC143C]/5 transition-colors group cursor-pointer"
//                   >
//                     <motion.div
//                       className="w-2 h-2 bg-[#DC143C] rounded-full mt-1.5 flex-shrink-0"
//                       whileHover={{ scale: 1.5 }}
//                     />
//                     <span className="group-hover:text-white transition-colors text-sm">
//                       {resp}
//                     </span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Decorative corner elements */}
//           <motion.div
//             className="absolute top-0 right-0 w-32 h-32 bg-[#DC143C]/10 rounded-full blur-3xl"
//             animate={{
//               scale: isHovered ? 1.5 : 1,
//               opacity: isHovered ? 0.3 : 0.1,
//             }}
//           />
//           <motion.div
//             className="absolute bottom-0 left-0 w-32 h-32 bg-[#DC143C]/10 rounded-full blur-3xl"
//             animate={{
//               scale: isHovered ? 1.5 : 1,
//               opacity: isHovered ? 0.3 : 0.1,
//             }}
//           />
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Experience;
