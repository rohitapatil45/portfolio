// import React, { useEffect, useState, useCallback } from 'react';
// import { motion, useMotionValue, useSpring } from 'framer-motion';

// const CustomCursor = () => {
//   const [isPointer, setIsPointer] = useState(false);

//   // Use motion values for better performance
//   const cursorX = useMotionValue(0);
//   const cursorY = useMotionValue(0);

//   // Smooth spring animation with optimized settings
//   const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   // Optimized mouse move handler with useCallback
//   const handleMouseMove = useCallback((e) => {
//     cursorX.set(e.clientX - 16);
//     cursorY.set(e.clientY - 16);

//     // Check if hovering over interactive elements (optimized)
//     const target = e.target;
//     const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
//     setIsPointer(!!isInteractive);
//   }, [cursorX, cursorY]);

//   useEffect(() => {
//     // Use passive event listener for better performance
//     window.addEventListener('mousemove', handleMouseMove, { passive: true });

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [handleMouseMove]);

//   return (
//     <>
//       {/* Main cursor - Simplified */}
//       <motion.div
//         className="custom-cursor pointer-events-none fixed z-[9999] mix-blend-difference"
//         style={{
//           x: cursorXSpring,
//           y: cursorYSpring,
//           width: '32px',
//           height: '32px',
//         }}
//       >
//         <div
//           className={`w-full h-full rounded-full border-2 transition-all duration-150 ${
//             isPointer 
//               ? 'border-[#DC143C] scale-150 bg-[#DC143C]/20' 
//               : 'border-[#DC143C]'
//           }`}
//         />
//       </motion.div>
      
//       {/* Cursor dot - Simplified */}
//       <motion.div
//         className="cursor-dot pointer-events-none fixed z-[9998]"
//         style={{
//           x: cursorXSpring,
//           y: cursorYSpring,
//           width: '8px',
//           height: '8px',
//           left: '12px',
//           top: '12px',
//         }}
//       >
//         <div className="w-full h-full bg-[#DC143C] rounded-full" />
//       </motion.div>

//       <style jsx>{`
//         * {
//           cursor: none !important;
//         }
//       `}</style>
//     </>
//   );
// };

// export default CustomCursor;


import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);

  // Use motion values for better performance
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Optimized spring config - memoized
  const springConfig = useMemo(() => ({ 
    damping: 30, 
    stiffness: 250, 
    mass: 0.3 
  }), []);
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);

    // Optimized element detection - using composedPath for better performance
    const path = e.composedPath();
    const isInteractive = path.some(el => 
      el.tagName === 'A' || 
      el.tagName === 'BUTTON' || 
      el.tagName === 'INPUT' || 
      el.tagName === 'TEXTAREA' ||
      el.getAttribute?.('role') === 'button'
    );
    
    setIsPointer(isInteractive);
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Use passive event listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Hide on touch devices for performance
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

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
          willChange: 'transform',
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-all duration-200 ${
            isPointer 
              ? 'border-[#DC143C] scale-150 bg-[#DC143C]/15' 
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
          willChange: 'transform',
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