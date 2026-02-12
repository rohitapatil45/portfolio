import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo, education } from '../data/mockData';
import { GraduationCap, MapPin, Code2, Zap } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Lowered threshold for earlier trigger
  });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // FIXED: Removed opacity fade that was making it dim
  // Now it stays fully visible when in view
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Enhanced Animated Background - Brighter */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: ySpring }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#DC143C] rounded-full blur-3xl opacity-30"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#DC143C] rounded-full blur-3xl opacity-30"
        />
        
        {/* Floating shapes - More visible */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            className="absolute w-4 h-4 border-2 border-[#DC143C]/50 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* FIXED: Removed opacity/scale transforms that were fading content */}
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Title with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block"
            whileHover={{ rotateX: 10, rotateY: 10 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h2
              className="text-5xl sm:text-7xl font-bold text-white mb-6 relative"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] relative">
                Me
                <motion.div
                  className="absolute -inset-2 bg-[#DC143C]/30 blur-2xl -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
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
            className="w-32 h-1.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full"
            style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.8)' }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
            className="relative perspective-1000"
          >
            <TiltCard>
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-3xl"
                >
                  {/* Glowing border effect - Brighter */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] rounded-3xl opacity-90 blur-lg"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  <div className="relative">
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-[600px] object-cover rounded-3xl relative z-10"
                    />
                    
                    {/* Gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#DC143C]/50 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                    />
                    
                    {/* Shimmer effect - More visible */}
                    <motion.div
                      className="absolute inset-0 z-30"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Floating badge - Brighter */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.8, type: 'spring', bounce: 0.6 }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-6 rounded-2xl shadow-2xl z-30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    boxShadow: '0 10px 40px rgba(220, 20, 60, 0.6)',
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap className="text-white mb-2 mx-auto" size={32} />
                    </motion.div>
                    <div className="text-3xl font-bold text-white">4+</div>
                    <div className="text-white/90 text-sm font-medium">Projects</div>
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
            className="space-y-8"
          >
            <motion.div
              className="flex items-center gap-3 text-[#DC143C] text-xl font-semibold"
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Code2 size={28} />
              </motion.div>
              <span className="tracking-wider">INTRODUCTION</span>
            </motion.div>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {personalInfo.about.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.03 }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Info Cards with stagger - Enhanced brightness */}
            <div className="grid grid-cols-1 gap-6 mt-12">
              {[
                {
                  icon: GraduationCap,
                  title: education.degree,
                  subtitle: education.institution,
                  detail: education.duration,
                  delay: 0.2,
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  subtitle: personalInfo.location,
                  detail: null,
                  delay: 0.4,
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: card.delay, type: 'spring' }}
                  whileHover={{
                    scale: 1.03,
                    x: 15,
                    boxShadow: '0 20px 40px rgba(220, 20, 60, 0.4)',
                  }}
                  className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl border border-gray-800 hover:border-[#DC143C] overflow-hidden group transition-all duration-300"
                >
                  {/* Animated gradient border - Brighter */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(220, 20, 60, 0.3), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div
                      className="p-4 bg-gradient-to-br from-[#DC143C]/30 to-[#DC143C]/10 rounded-xl"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <card.icon className="text-[#DC143C]" size={28} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl mb-1">
                        {card.title}
                      </h3>
                      <p className="text-gray-400">{card.subtitle}</p>
                      {card.detail && (
                        <p className="text-gray-500 text-sm mt-2">{card.detail}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats with counter animation - Brighter */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { value: 4, label: 'Projects', suffix: '+' },
                { value: 2, label: 'Internships', suffix: '' },
                { value: 12, label: 'Tech Skills', suffix: '+' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    type: 'spring',
                    bounce: 0.6,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="text-center p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-[#DC143C]/40 hover:border-[#DC143C] relative overflow-hidden group transition-all duration-300"
                  style={{
                    boxShadow: '0 4px 20px rgba(220, 20, 60, 0.1)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#DC143C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <div className="text-gray-400 text-sm font-medium mt-2 tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 3D Tilt Card Component
const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientY - top - height / 2) / 20;
    const y = -(clientX - left - width / 2) / 20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

// Counter Animation Component
const CountUp = ({ value, suffix }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-4xl font-bold text-[#DC143C] relative z-10">
      {count}
      {suffix}
    </div>
  );
};

export default About;
