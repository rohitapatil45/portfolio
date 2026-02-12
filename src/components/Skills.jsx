import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/mockData';
import { Sparkles } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 bg-[#1a1a1a] relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 20, 60, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 20, 60, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#DC143C] rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#DC143C] rounded-full blur-3xl opacity-20"
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Technical{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] relative">
                Skills
                {/* Animated sparkles */}
                <motion.div
                  className="absolute -top-4 -right-8"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="text-[#DC143C]" size={24} />
                </motion.div>
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
            A comprehensive set of technologies I work with to build modern web
            applications
          </motion.p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              >
                {/* Category Header */}
                <motion.div
                  className="flex items-center gap-4 mb-10"
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-3 h-3 bg-[#DC143C] rounded-full"
                  />
                  <h3
                    className="text-3xl font-bold text-white tracking-wide"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {category}
                  </h3>
                  <motion.div
                    className="flex-1 h-px bg-gradient-to-r from-[#DC143C]/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: categoryIndex * 0.2 + 0.5, duration: 0.8 }}
                  />
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorySkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={index}
                      categoryIndex={categoryIndex}
                      inView={inView}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24"
        >
          <motion.div
            className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border border-[#DC143C]/30 rounded-3xl p-10 overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(220, 20, 60, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(220, 20, 60, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(220, 20, 60, 0.2) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <Sparkles className="text-[#DC143C]" size={32} />
              </motion.div>
              <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
                <span className="text-[#DC143C] font-bold text-2xl">
                  Continuously learning
                </span>{' '}
                and adapting to new technologies to stay current in the
                ever-evolving web development landscape.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Skill Card Component
const SkillCard = ({ skill, index, categoryIndex, inView }) => {
  const cardRef = React.useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientY - top - height / 2) / 10;
    const y = -(clientX - left - width / 2) / 10;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: categoryIndex * 0.2 + index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-[#DC143C] transition-all duration-300 overflow-hidden group"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 25px 50px rgba(220, 20, 60, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Glowing corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-[#DC143C]/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated border gradient */}
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

        <div className="relative z-10">
          {/* Skill name with icon */}
          <div className="flex items-center justify-between mb-6">
            <motion.h4
              className="text-white font-bold text-xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
              animate={{
                color: isHovered ? '#DC143C' : '#ffffff',
              }}
            >
              {skill.name}
            </motion.h4>
            <motion.span
              className="text-[#DC143C] font-bold text-lg px-3 py-1 bg-[#DC143C]/10 rounded-lg"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
            >
              {skill.level}%
            </motion.span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-[#DC143C]/10"
              animate={{
                opacity: isHovered ? 0.3 : 0,
              }}
            />

            {/* Progress fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{
                duration: 1.5,
                delay: categoryIndex * 0.2 + index * 0.1,
                ease: 'easeOut',
              }}
              className="relative h-full bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] rounded-full"
              style={{
                boxShadow: '0 0 20px rgba(220, 20, 60, 0.6)',
              }}
            >
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Glowing tip */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                style={{
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                }}
              />
            </motion.div>
          </div>

          {/* Skill level text */}
          <motion.div
            className="mt-3 text-gray-400 text-sm text-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: categoryIndex * 0.2 + index * 0.1 + 0.5 }}
          >
            {skill.level >= 90
              ? 'Expert'
              : skill.level >= 75
              ? 'Advanced'
              : skill.level >= 60
              ? 'Intermediate'
              : 'Beginner'}
          </motion.div>
        </div>

        {/* 3D depth effect */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none rounded-2xl"
          style={{ transform: 'translateZ(-10px)' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Skills;

