'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickStatsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false); // true for <=1024px

  // Detect screen width
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth <= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
//hello this is sahil
  return (
    <div className="relative inline-block">
      {/* ⚡ Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(0,255,255,0.7)' }}
        whileTap={{ scale: 0.95 }}
        className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 
                   bg-gradient-to-r from-black-400 to-black-500 
                   rounded-full text-cyan-300 font-semibold tracking-wide text-sm sm:text-base md:text-lg
                   shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
      >
        QUICK STATS
      </motion.button>

      {/* 🌌 Floating Capsule / Notification */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: isCompact ? -40 : 100,
              scale: isCompact ? 1 : 0.9,
            }}
            animate={{
              opacity: 1,
              y: isCompact ? 0 : [0, -8, 0, 8, 0],
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: isCompact ? -60 : 100,
              scale: 0.95,
            }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 12,
              y: {
                repeat: isCompact ? 0 : Infinity,
                repeatType: 'mirror',
                duration: 1,
                ease: 'easeInOut',
              },
            }}
            className={`
              ${isCompact
                ? 'fixed top-4 left-1/2 -translate-x-1/2 w-[92vw] py-3 px-5 z-[100]'
                : 'absolute w-[90vw] sm:w-[380px] md:w-[460px] p-6 sm:p-8 z-50'}
              bg-[rgba(0, 255, 255, 0.46)] border border-[rgba(0,255,255,0.34)]
              backdrop-blur-xl rounded-xl sm:rounded-2xl text-cyan-200 font-mono 
              text-xs sm:text-sm md:text-lg
              shadow-[0_0_35px_rgba(0,255,255,0.6),inset_0_0_15px_rgba(0,255,255,0.25)]
              overflow-hidden 
              flex flex-col ${isCompact ? 'items-center space-y-1' : 'items-start space-y-5 sm:space-y-6'}
              ${!isCompact && 'left-1/2 -translate-x-1/2 bottom-[5rem] md:left-auto md:-left-[320px] lg:-left-[30rem] lg:bottom-[22rem] xl:-left-[30rem] xl:bottom-[22rem]'}
            `}
          >
            {/* ✕ Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute ${isCompact ? 'top-1 right-3' : 'top-3 right-4 sm:right-5'} 
                         text-cyan-400 hover:text-cyan-100 text-lg sm:text-2xl font-bold transition transform hover:scale-125`}
            >
              ✕
            </button>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className={`text-white-300 font-bold tracking-wide drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]
                ${isCompact ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl mb-2'}`}
            >
              Quick Stats
            </motion.h3>

            {/* 📱 Compact notification version */}
            {isCompact ? (
              <div className="flex justify-around w-full text-[0.7rem] sm:text-sm text-cyan-100 font-semibold">
                <div>8+ Projects</div>
                <div>Fresher</div>
                <div>3 Internships</div>
              </div>
            ) : (
              // 💻 Full version for >1024px
              <motion.div
                className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                {[
                  { label: 'Projects', value: '8+' },
                  { label: 'Experience', value: 'Fresher' },
                  { label: 'Hackathons', value: '5+' },
                  { label: 'Internships', value: '3' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: '0 0 15px rgba(0,255,255,0.6)',
                    }}
                    className="flex flex-col items-start bg-[rgba(0,255,255,0.07)] 
                               border border-cyan-400/30 rounded-xl p-3 sm:p-4 
                               hover:bg-[rgba(0,255,255,0.15)] transition-all duration-300"
                  >
                    <span className="text-sm text-cyan-400">{item.label}</span>
                    <span className="text-lg sm:text-xl font-semibold text-cyan-100">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
