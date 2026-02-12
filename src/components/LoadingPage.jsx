import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Zap, Sparkles } from 'lucide-react';

const LoadingPage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const loadingStages = [
      { progress: 20, text: 'Loading Assets', duration: 400 },
      { progress: 40, text: 'Preparing Interface', duration: 400 },
      { progress: 60, text: 'Setting Up Components', duration: 400 },
      { progress: 80, text: 'Optimizing Performance', duration: 400 },
      { progress: 100, text: 'Almost Ready', duration: 400 },
    ];

    let currentStage = 0;

    const progressInterval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        const stage = loadingStages[currentStage];
        setProgress(stage.progress);
        setLoadingText(stage.text);
        currentStage++;
      } else {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 800);
        }, 300);
      }
    }, 500);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Gradient orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#DC143C] rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.25, 0.15, 0.25],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#8B0000] rounded-full blur-3xl"
            />

            {/* Animated grid */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(220, 20, 60, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(220, 20, 60, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '50px 50px'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#DC143C] rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center space-y-12">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="relative"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-8 border-2 border-[#DC143C]/30 rounded-full"
              />

              {/* Middle rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-4 border-2 border-[#DC143C]/50 rounded-full"
              />

              {/* Logo container */}
              <motion.div
                className="relative w-32 h-32 bg-gradient-to-br from-[#DC143C] to-[#8B0000] rounded-full flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(220, 20, 60, 0.5)',
                    '0 0 60px rgba(220, 20, 60, 0.8)',
                    '0 0 20px rgba(220, 20, 60, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Code2 className="text-white" size={48} />
                </motion.div>
              </motion.div>

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#DC143C]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-[#DC143C]">{'<'}</span>
                Portfolio
                <span className="text-[#DC143C]">{'/>'}</span>
              </motion.h1>
              <motion.div
                className="flex items-center justify-center gap-2 text-gray-400"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles size={16} />
                <span className="text-sm tracking-wider">Creating Excellence</span>
                <Sparkles size={16} />
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-80 space-y-4">
              {/* Loading text */}
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-400">{loadingText}</span>
                <span className="text-[#DC143C] font-bold">{progress}%</span>
              </motion.div>

              {/* Progress bar container */}
              <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 bg-[#DC143C]/10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />

                {/* Progress fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] rounded-full"
                  style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 20px rgba(220, 20, 60, 0.8)',
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Glowing tip */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    style={{
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Loading dots */}
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
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
            </motion.div>

            {/* Fun loading messages */}
            <motion.div
              key={`tip-${progress}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-gray-500 text-sm max-w-md px-4"
            >
              {progress < 40 && "✨ Crafting pixel-perfect designs..."}
              {progress >= 40 && progress < 70 && "🚀 Optimizing for blazing speed..."}
              {progress >= 70 && progress < 100 && "🎨 Adding the finishing touches..."}
              {progress === 100 && "🎉 Ready to impress!"}
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="text-[#DC143C]/30" size={32} />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="text-[#DC143C]/30" size={32} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingPage;