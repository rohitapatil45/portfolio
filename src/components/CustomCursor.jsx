import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);

  // Use motion values for better performance
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation with optimized settings
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Optimized mouse move handler with useCallback
  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);

    // Check if hovering over interactive elements (optimized)
    const target = e.target;
    const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
    setIsPointer(!!isInteractive);
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Main cursor - Simplified */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: '32px',
          height: '32px',
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-all duration-150 ${
            isPointer 
              ? 'border-[#DC143C] scale-150 bg-[#DC143C]/20' 
              : 'border-[#DC143C]'
          }`}
        />
      </motion.div>
      
      {/* Cursor dot - Simplified */}
      <motion.div
        className="cursor-dot pointer-events-none fixed z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: '8px',
          height: '8px',
          left: '12px',
          top: '12px',
        }}
      >
        <div className="w-full h-full bg-[#DC143C] rounded-full" />
      </motion.div>

      <style jsx>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// const CustomCursor = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [cursorVariant, setCursorVariant] = useState('default');
//   const [isPointer, setIsPointer] = useState(false);

//   useEffect(() => {
//     const mouseMove = (e) => {
//       setMousePosition({
//         x: e.clientX,
//         y: e.clientY,
//       });

//       // Check if hovering over interactive elements
//       const target = e.target;
//       const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
//       setIsPointer(!!isInteractive);
//     };

//     window.addEventListener('mousemove', mouseMove);

//     return () => {
//       window.removeEventListener('mousemove', mouseMove);
//     };
//   }, []);

//   const variants = {
//     default: {
//       x: mousePosition.x - 16,
//       y: mousePosition.y - 16,
//       scale: 1,
//     },
//     pointer: {
//       x: mousePosition.x - 32,
//       y: mousePosition.y - 32,
//       scale: 1.5,
//       backgroundColor: 'rgba(220, 20, 60, 0.2)',
//     },
//   };

//   return (
//     <>
//       {/* Main cursor */}
//       <motion.div
//         className="custom-cursor"
//         variants={variants}
//         animate={isPointer ? 'pointer' : 'default'}
//         transition={{
//           type: 'spring',
//           stiffness: 500,
//           damping: 28,
//           mass: 0.5,
//         }}
//         style={{
//           position: 'fixed',
//           width: '32px',
//           height: '32px',
//           borderRadius: '50%',
//           border: '2px solid #DC143C',
//           pointerEvents: 'none',
//           zIndex: 9999,
//           mixBlendMode: 'difference',
//         }}
//       />
      
//       {/* Cursor trail */}
//       <motion.div
//         className="cursor-trail"
//         animate={{
//           x: mousePosition.x - 4,
//           y: mousePosition.y - 4,
//         }}
//         transition={{
//           type: 'spring',
//           stiffness: 150,
//           damping: 15,
//           mass: 0.1,
//         }}
//         style={{
//           position: 'fixed',
//           width: '8px',
//           height: '8px',
//           borderRadius: '50%',
//           backgroundColor: '#DC143C',
//           pointerEvents: 'none',
//           zIndex: 9998,
//         }}
//       />

//       <style >{`
//         * {
//           cursor: none !important;
//         }
//       `}</style>
//     </>
//   );
// };

// export default CustomCursor;