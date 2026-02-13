
// import React, { useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Download, ChevronDown, Sparkles } from 'lucide-react';
// import { personalInfo } from '../data/mockData';

// const Hero = () => {
//   const canvasRef = useRef(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

//   // Particle animation
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles = [];
//     const particleCount = 100;

//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 2 + 0.5;
//         this.speedX = Math.random() * 0.5 - 0.25;
//         this.speedY = Math.random() * 0.5 - 0.25;
//         this.opacity = Math.random() * 0.5 + 0.2;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x > canvas.width) this.x = 0;
//         if (this.x < 0) this.x = canvas.width;
//         if (this.y > canvas.height) this.y = 0;
//         if (this.y < 0) this.y = canvas.height;
//       }

//       draw() {
//         ctx.fillStyle = `rgba(220, 20, 60, ${this.opacity})`;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     for (let i = 0; i < particleCount; i++) {
//       particles.push(new Particle());
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((particle) => {
//         particle.update();
//         particle.draw();
//       });
//       requestAnimationFrame(animate);
//     }

//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.8,
//         type: 'spring',
//         stiffness: 100,
//       },
//     }),
//   };

//   const name = personalInfo.name;

//   return (
//     <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
//       {/* Particle Canvas */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 pointer-events-none"
//         style={{ opacity: 0.6 }}
//       />

//       {/* Animated Background Gradients */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             rotate: [0, 180, 360],
//             opacity: [0.15, 0.25, 0.15],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: 'linear',
//           }}
//           className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#DC143C]/20 to-transparent rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1.3, 1, 1.3],
//             rotate: [360, 180, 0],
//             opacity: [0.25, 0.15, 0.25],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: 'linear',
//           }}
//           className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#8B0000]/20 to-transparent rounded-full blur-3xl"
//         />
//       </div>

//       {/* Content */}
//       <motion.div
//         style={{ opacity, scale }}
//         className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
//       >
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           {/* Greeting with sparkle effect */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="flex items-center justify-center gap-2 text-[#DC143C] text-lg sm:text-xl mb-6 font-medium tracking-wider"
//           >
//             <motion.div
//               animate={{ rotate: [0, 360] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//             >
//               <Sparkles size={20} />
//             </motion.div>
//             <span>Hello, I'm</span>
//             <motion.div
//               animate={{ rotate: [0, -360] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//             >
//               <Sparkles size={20} />
//             </motion.div>
//           </motion.div>

//           {/* Animated Name */}
//           <div className="relative">
//             <h1
//               className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
//               style={{
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 textShadow:
//                   '0 0 30px rgba(220, 20, 60, 0.4), 0 0 60px rgba(220, 20, 60, 0.2), 0 5px 20px rgba(0, 0, 0, 0.5)',
//               }}
//             >
//               {name.split('').map((char, i) => (
//                 <motion.span
//                   key={i}
//                   custom={i}
//                   variants={letterVariants}
//                   initial="hidden"
//                   animate="visible"
//                   whileHover={{
//                     scale: 1.2,
//                     color: '#DC143C',
//                     textShadow: '0 0 30px rgba(220, 20, 60, 0.8)',
//                   }}
//                   className="inline-block"
//                 >
//                   {char === ' ' ? '\u00A0' : char}
//                 </motion.span>
//               ))}
//             </h1>

//             {/* Glowing underline */}
//             <motion.div
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
//               className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#DC143C] to-transparent w-3/4"
//               style={{
//                 boxShadow: '0 0 20px rgba(220, 20, 60, 0.8)',
//               }}
//             />
//           </div>

//           {/* Title with typewriter effect */}
//           <motion.h2
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.8, duration: 0.8 }}
//             className="text-2xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 mb-6 font-light"
//           >
//             {personalInfo.title}
//           </motion.h2>

//           {/* Tagline */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2, duration: 0.8 }}
//             className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
//           >
//             {personalInfo.tagline}
//           </motion.p>

//           {/* CTA Buttons with magnetic effect */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2.3, duration: 0.8 }}
//             className="flex flex-col sm:flex-row gap-6 justify-center items-center"
//           >
//             <MagneticButton onClick={() => scrollToSection('projects')}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative px-8 py-4 bg-[#DC143C] text-white font-semibold rounded-full overflow-hidden group"
//               >
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#DC143C]"
//                   initial={{ x: '-100%' }}
//                   whileHover={{ x: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <span className="relative z-10 flex items-center gap-2">
//                   View My Work
//                   <motion.div
//                     animate={{ x: [0, 5, 0] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   >
//                     →
//                   </motion.div>
//                 </span>
//               </motion.div>
//             </MagneticButton>

//             <MagneticButton>
//               <motion.a
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 href={personalInfo.resumeUrl}
//                 download
//                 className="relative px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white overflow-hidden group flex items-center gap-2"
//               >
//                 <motion.div
//                   className="absolute inset-0 bg-white"
//                   initial={{ y: '100%' }}
//                   whileHover={{ y: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <span className="relative z-10 group-hover:text-blue transition-colors duration-300 flex items-center gap-2">
//                   <Download size={20} />
//                   Download Resume
//                 </span>
//               </motion.a>
//             </MagneticButton>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Enhanced Scroll Indicator */}
//       <motion.div
//         animate={{
//           y: [0, 15, 0],
//           opacity: [0.5, 1, 0.5],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//         className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
//         onClick={() => scrollToSection('about')}
//       >
//         <div className="flex flex-col items-center gap-2">
//           <span className="text-[#DC143C] text-sm font-medium tracking-wider">SCROLL</span>
//           <motion.div
//             animate={{ scaleY: [1, 1.5, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <ChevronDown size={32} className="text-[#DC143C]" />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// // Magnetic Button Component
// const MagneticButton = ({ children, onClick }) => {
//   const ref = useRef(null);
//   const [position, setPosition] = React.useState({ x: 0, y: 0 });

//   const handleMouse = (e) => {
//     const { clientX, clientY } = e;
//     const { width, height, left, top } = ref.current.getBoundingClientRect();
//     const x = (clientX - (left + width / 2)) * 0.3;
//     const y = (clientY - (top + height / 2)) * 0.3;
//     setPosition({ x, y });
//   };

//   const reset = () => {
//     setPosition({ x: 0, y: 0 });
//   };

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouse}
//       onMouseLeave={reset}
//       animate={{ x: position.x, y: position.y }}
//       transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
//       onClick={onClick}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default Hero;
import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ChevronDown, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Hero = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Optimized particle animation with reduced count and better performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
    
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    const particles = [];
    const particleCount = 50; // Reduced from 100

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width / dpr;
        this.y = Math.random() * canvas.height / dpr;
        this.size = Math.random() * 1.5 + 0.5; // Slightly smaller
        this.speedX = Math.random() * 0.3 - 0.15; // Reduced speed
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.1; // Slightly less opaque
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw() {
        ctx.fillStyle = `rgba(220, 20, 60, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let lastTime = 0;
    const fps = 30; // Limit to 30fps for particles
    const interval = 1000 / fps;

    function animate(currentTime) {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime < interval) return;
      
      lastTime = currentTime - (deltaTime % interval);

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Optimized animation variants
  const letterVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03, // Reduced from 0.05
        duration: 0.5, // Reduced from 0.8
        type: 'spring',
        stiffness: 120,
        damping: 15, // Added damping for smoother animation
      },
    }),
  }), []);

  const name = personalInfo.name;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* Simplified Background Gradients - Will-change for GPU acceleration */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 25, // Slower animation
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'reverse',
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#DC143C]/20 to-transparent rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 90, 0],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'reverse',
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#8B0000]/20 to-transparent rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting with sparkle effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-[#DC143C] text-lg sm:text-xl mb-6 font-medium tracking-wider"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={20} />
            </motion.div>
            <span>Hello, I'm</span>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={20} />
            </motion.div>
          </motion.div>

          {/* Animated Name */}
          <div className="relative">
            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                textShadow:
                  '0 0 30px rgba(220, 20, 60, 0.4), 0 0 60px rgba(220, 20, 60, 0.2), 0 5px 20px rgba(0, 0, 0, 0.5)',
                willChange: 'transform',
              }}
            >
              {name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.15, // Reduced from 1.2
                    color: '#DC143C',
                    textShadow: '0 0 30px rgba(220, 20, 60, 0.8)',
                    transition: { duration: 0.2 },
                  }}
                  className="inline-block"
                  style={{ willChange: 'transform' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            {/* Glowing underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#DC143C] to-transparent w-3/4"
              style={{
                boxShadow: '0 0 20px rgba(220, 20, 60, 0.8)',
              }}
            />
          </div>

          {/* Title with typewriter effect */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-2xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 mb-6 font-light"
          >
            {personalInfo.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton onClick={() => scrollToSection('projects')}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-8 py-4 bg-[#DC143C] text-white font-semibold rounded-full overflow-hidden group"
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#DC143C]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </motion.div>
            </MagneticButton>

            <MagneticButton>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={personalInfo.resumeUrl}
                download
                className="relative px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white overflow-hidden group flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 group-hover:text-[#DC143C] transition-colors duration-300 flex items-center gap-2">
                  <Download size={20} />
                  Download Resume
                </span>
              </motion.a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 12, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#DC143C] text-sm font-medium tracking-wider">SCROLL</span>
          <motion.div
            animate={{ scaleY: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} className="text-[#DC143C]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Optimized Magnetic Button Component
const MagneticButton = React.memo(({ children, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2; // Reduced from 0.3
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  }, []);

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
      onClick={onClick}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
});

MagneticButton.displayName = 'MagneticButton';

export default Hero;