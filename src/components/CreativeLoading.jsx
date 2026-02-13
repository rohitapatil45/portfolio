


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Code, Terminal, Cpu } from 'lucide-react';

// const CreativeLoadingPage = ({ onLoadingComplete }) => {
//   const [stage, setStage] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);

//   const stages = [
//     { icon: Code, text: 'Compiling Code', color: '#DC143C' },
//     { icon: Terminal, text: 'Executing Scripts', color: '#FF1744' },
//     { icon: Cpu, text: 'Optimizing', color: '#DC143C' },
//   ];

//   useEffect(() => {
//     const stageTimer = setInterval(() => {
//       setStage((prev) => {
//         if (prev < stages.length - 1) {
//           return prev + 1;
//         }
//         clearInterval(stageTimer);
//         setTimeout(() => {
//           setIsComplete(true);
//           setTimeout(() => {
//             onLoadingComplete?.();
//           }, 600);
//         }, 600);
//         return prev;
//       });
//     }, 800); // Reduced from 1000ms

//     return () => clearInterval(stageTimer);
//   }, [onLoadingComplete, stages.length]);

//   return (
//     <AnimatePresence>
//       {!isComplete && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ 
//             opacity: 0,
//             scale: 1.3,
//             filter: 'blur(8px)'
//           }}
//           transition={{ duration: 0.6 }}
//           className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#1a0a0a] flex items-center justify-center overflow-hidden"
//         >
//           {/* Reduced DNA Helix - Only 6 elements instead of 12 */}
//           <div className="absolute inset-0">
//             {[...Array(6)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute left-1/2 w-1 bg-gradient-to-b from-[#DC143C] to-transparent"
//                 style={{
//                   height: '200px',
//                   transformOrigin: 'center',
//                   willChange: 'transform',
//                 }}
//                 animate={{
//                   rotateY: [i * 60, i * 60 + 360],
//                   opacity: [0.15, 0.4, 0.15],
//                 }}
//                 transition={{
//                   duration: 5,
//                   repeat: Infinity,
//                   ease: 'linear',
//                   delay: i * 0.2,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Simplified Hexagon Grid - Reduced opacity */}
//           <div className="absolute inset-0 opacity-3">
//             <svg width="100%" height="100%">
//               <defs>
//                 <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
//                   <polygon
//                     points="50,0 100,25 100,62 50,87 0,62 0,25"
//                     fill="none"
//                     stroke="#DC143C"
//                     strokeWidth="1"
//                   />
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#hexagons)" />
//             </svg>
//           </div>

//           <div className="relative z-10 flex flex-col items-center space-y-12">
//             {/* Central Loading Icon */}
//             <div className="relative" style={{ willChange: 'transform' }}>
//               {/* Simplified rings - only 2 instead of 3 */}
//               <motion.div
//                 className="absolute -inset-12 border border-[#DC143C]/30 rounded-full"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
//                 style={{ willChange: 'transform' }}
//               />

//               <motion.div
//                 className="absolute -inset-8 border-2 border-[#DC143C]/50 rounded-full"
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
//                 style={{ willChange: 'transform' }}
//               />

//               {/* Center icon container */}
//               <motion.div
//                 className="relative w-32 h-32 bg-gradient-to-br from-[#DC143C] to-[#8B0000] rounded-full flex items-center justify-center"
//                 animate={{
//                   boxShadow: [
//                     '0 0 30px rgba(220, 20, 60, 0.5)',
//                     '0 0 50px rgba(220, 20, 60, 0.8)',
//                     '0 0 30px rgba(220, 20, 60, 0.5)',
//                   ],
//                 }}
//                 transition={{ duration: 2.5, repeat: Infinity }}
//                 style={{ willChange: 'box-shadow' }}
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={stage}
//                     initial={{ scale: 0, rotate: -120 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     exit={{ scale: 0, rotate: 120 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {React.createElement(stages[stage].icon, {
//                       className: 'text-white',
//                       size: 48,
//                     })}
//                   </motion.div>
//                 </AnimatePresence>
//               </motion.div>

//               {/* Reduced orbiting particles - 4 instead of 8 */}
//               {[...Array(4)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute w-2 h-2 bg-[#DC143C] rounded-full"
//                   style={{
//                     top: '50%',
//                     left: '50%',
//                   }}
//                   animate={{
//                     x: [0, Math.cos((i * Math.PI * 2) / 4) * 80],
//                     y: [0, Math.sin((i * Math.PI * 2) / 4) * 80],
//                     scale: [0, 1, 0],
//                     opacity: [0, 1, 0],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     delay: i * 0.5,
//                   }}
//                 />
//               ))}
//             </div>

//             {/* Stage Text */}
//             <div className="text-center space-y-4">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={stage}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="space-y-2"
//                 >
//                   <h2
//                     className="text-3xl font-bold text-white"
//                     style={{ fontFamily: "'Space Grotesk', sans-serif" }}
//                   >
//                     {stages[stage].text}
//                   </h2>
                  
//                   {/* Animated dots */}
//                   <div className="flex justify-center gap-1">
//                     {[...Array(3)].map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className="w-2 h-2 bg-[#DC143C] rounded-full"
//                         animate={{
//                           scale: [1, 1.3, 1],
//                           opacity: [0.3, 1, 0.3],
//                         }}
//                         transition={{
//                           duration: 1.5,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Progress Bar */}
//             <div className="w-96">
//               <div className="relative h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
//                 <motion.div
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C]"
//                   initial={{ width: '0%' }}
//                   animate={{ 
//                     width: `${((stage + 1) / stages.length) * 100}%`,
//                   }}
//                   transition={{ duration: 0.6, ease: 'easeOut' }}
//                   style={{
//                     boxShadow: '0 0 15px rgba(220, 20, 60, 0.6)',
//                   }}
//                 >
//                   {/* Shimmer */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                     animate={{ x: ['-100%', '200%'] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   />
//                 </motion.div>
//               </div>

//               {/* Stage indicators */}
//               <div className="flex justify-between mt-4">
//                 {stages.map((s, i) => (
//                   <motion.div
//                     key={i}
//                     className={`text-xs ${
//                       i <= stage ? 'text-[#DC143C]' : 'text-gray-600'
//                     }`}
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.2 }}
//                   >
//                     {s.text}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Reduced binary rain - 10 instead of 20 */}
//             <motion.div
//               className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 opacity-15 font-mono text-[#DC143C] text-xs overflow-hidden"
//               style={{ height: '60px' }}
//             >
//               {[...Array(10)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   animate={{
//                     y: ['-100%', '200%'],
//                   }}
//                   transition={{
//                     duration: 2 + Math.random() * 2,
//                     repeat: Infinity,
//                     delay: Math.random() * 2,
//                   }}
//                 >
//                   {Math.random() > 0.5 ? '1' : '0'}
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CreativeLoadingPage;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Cpu } from 'lucide-react';

const CreativeLoadingPage = ({ onLoadingComplete }) => {
  const [stage, setStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const stages = [
    { icon: Code, text: 'Compiling Code', color: '#DC143C' },
    { icon: Terminal, text: 'Executing Scripts', color: '#FF1744' },
    { icon: Cpu, text: 'Optimizing', color: '#DC143C' },
  ];

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        }
        clearInterval(stageTimer);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 800);
        }, 800);
        return prev;
      });
    }, 1000);

    return () => clearInterval(stageTimer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.5,
            filter: 'blur(10px)'
          }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#1a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* DNA Helix Background Animation */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 w-1 bg-gradient-to-b from-[#DC143C] to-transparent"
                style={{
                  height: '200px',
                  transformOrigin: 'center',
                }}
                animate={{
                  rotateY: [i * 30, i * 30 + 360],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Hexagon Grid */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
                  <polygon
                    points="50,0 100,25 100,62 50,87 0,62 0,25"
                    fill="none"
                    stroke="#DC143C"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-12">
            {/* Central Loading Icon */}
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute -inset-16 border border-[#DC143C]/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute -inset-12 border-2 border-[#DC143C]/50 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner ring */}
              <motion.div
                className="absolute -inset-8 border-2 border-[#DC143C]/70 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center icon container */}
              <motion.div
                className="relative w-32 h-32 bg-gradient-to-br from-[#DC143C] to-[#8B0000] rounded-full flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(220, 20, 60, 0.6)',
                    '0 0 60px rgba(220, 20, 60, 1)',
                    '0 0 30px rgba(220, 20, 60, 0.6)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.createElement(stages[stage].icon, {
                      className: 'text-white',
                      size: 48,
                    })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Orbiting particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#DC143C] rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * Math.PI * 2) / 8) * 80],
                    y: [0, Math.sin((i * Math.PI * 2) / 8) * 80],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
              ))}
            </div>

            {/* Stage Text */}
            <div className="text-center space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stages[stage].text}
                  </h2>
                  
                  {/* Animated dots */}
                  <div className="flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#DC143C] rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-96">
              <div className="relative h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C]"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: `${((stage + 1) / stages.length) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    boxShadow: '0 0 15px rgba(220, 20, 60, 0.8)',
                  }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Stage indicators */}
              <div className="flex justify-between mt-4">
                {stages.map((s, i) => (
                  <motion.div
                    key={i}
                    className={`text-xs ${
                      i <= stage ? 'text-[#DC143C]' : 'text-gray-600'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3 }}
                  >
                    {s.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Binary rain effect */}
            <motion.div
              className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 opacity-20 font-mono text-[#DC143C] text-xs overflow-hidden"
              style={{ height: '60px' }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreativeLoadingPage;