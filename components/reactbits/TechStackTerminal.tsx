'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const stacks = [
  // 💻 Programming Languages
  'Python', 'Java', 'HTML', 'CSS', 'JavaScript',
  
  // ⚙️ Frameworks & Libraries
  'React.js', 'Node.js', 'Express.js', 'Django', 'Flask',
  
  // ☁️ Cloud, Tools & Platforms
  'Git', 'GitHub', 'Postman', 'VS Code','Bootstrap','Framer','C', 
  
  // 🧠 Machine Learning & Data
  'Machine Learning','GSAP',
  
  // 🗄️ Databases
  'MySQL', 'MongoDB',
  
  ];


export default function TechStackTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [retrigger, setRetrigger] = useState(0);
  const [visible, setVisible] = useState(false); // 🧠 hidden initially
    const [mounted, setMounted] = useState(false); // 🧠 Fix flash for buttons

  useEffect(() => {
    // Wait one paint frame before showing
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!visible) {
    // Prevent any DOM flash until after first frame
    return <div style={{ display: 'none' }} suppressHydrationWarning />;
  }

  
  const handleClose = () => {
    setIsOpen(false);
    setRetrigger(prev => prev + 1);
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 1],
    boxShadow: [
      '0 0 0px rgba(0,255,255,0)',
      '0 0 25px rgba(0,255,255,0.8)',
      '0 0 10px rgba(0,255,255,0.4)',
    ],
  };

  const pulseTransition = {
    duration: 1.5,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: 'easeInOut',
  };

  return (
    <>
      {/* Sidebar */}
<motion.div
  initial={false} // 👈 disable Framer's pre-animation flash
  animate={{ x: isOpen ? 0 : '100%' }}
  transition={{ type: 'spring', stiffness: 80, damping: 14 }}
  className={`
    fixed top-16 sm:top-20 right-0 z-50 flex items-stretch
    h-[65vh] sm:h-[70vh] md:h-[80vh]
    w-[260px] sm:w-[260px] md:w-[280px] lg:w-[300px]
    ${!isOpen ? 'techstack-hidden' : ''}
  `}
>

        <div className="
          relative h-full overflow-y-scroll custom-scrollbar
          text-cyan-300 font-mono text-base sm:text-lg leading-relaxed
          bg-[rgba(0,0,0,0.75)] sm:bg-transparent sm:backdrop-blur-none
          pr-5 pl-5 sm:pr-6 sm:pl-6
          rounded-l-2xl sm:rounded-none
        ">
          
          {/* ❌ Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 left-2 text-cyan-400 hover:text-cyan-200 
                       text-lg font-bold transition transform hover:scale-110"
            aria-label="Close Skills Sidebar"
          >
            ✖
          </button>

          {/* Skills list */}
          <div className="mt-8 space-y-6 sm:space-y-8 divide-y divide-cyan-400/10">
            {stacks.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="pt-5 sm:pt-6 first:pt-0 hover:text-cyan-400/90 transition-colors text-right"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

{/* 🌟 SKILLS Button */}
{!isOpen && (
  <motion.button
    key={retrigger}
    onClick={() => setIsOpen(true)}
    animate={{
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      boxShadow: [
        '0 0 10px rgba(0,255,255,0.4)',
        '0 0 20px rgba(0,255,255,0.8)',
        '0 0 10px rgba(0,255,255,0.4)',
      ],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    }}
    className="
      fixed right-0 z-40 -translate-y-1/2
      top-[35%] sm:top-[40%]
      bg-gradient-to-r from-cyan-500 to-cyan-400 
      text-black font-semibold tracking-widest 
      text-[0.6rem] sm:text-[0.7rem] md:text-sm
      px-1 sm:px-1.5 md:px-2 
      py-4 sm:py-7 md:py-10 
      rounded-l-md sm:rounded-l-lg 
      cursor-pointer select-none
      shadow-[0_0_15px_rgba(0,255,255,0.4)]
      sm:shadow-[0_0_20px_rgba(0,255,255,0.5)]
      backdrop-blur-md
      hover:scale-105 hover:bg-cyan-300/90 transition-all
    "
  >
    <span className="-rotate-90 block">SKILLS</span>
  </motion.button>
)}

{/* 📄 RESUME Button */}
{!isOpen && (
  <motion.a
    href="https://drive.google.com/file/d/1HbypSK2AHMts6CyNqeVRLBIt6ygbzBwX/view?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    animate={{
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      boxShadow: [
        '0 0 10px rgba(0,255,255,0.4)',
        '0 0 20px rgba(0,255,255,0.8)',
        '0 0 10px rgba(0,255,255,0.4)',
      ],
    }}
    transition={{
      duration: 2.2,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    }}
    className="
      fixed right-0 z-40 -translate-y-1/2
      top-[70%] sm:top-[62%]
      bg-gradient-to-r from-cyan-500 to-cyan-400 
      text-black font-semibold tracking-widest 
      text-[0.6rem] sm:text-[0.7rem] md:text-sm
      px-1 sm:px-1.5 md:px-2 
      py-5 sm:py-8 md:py-12 
      rounded-l-md sm:rounded-l-lg 
      cursor-pointer select-none
      shadow-[0_0_15px_rgba(0,255,255,0.4)]
      sm:shadow-[0_0_20px_rgba(0,255,255,0.5)]
      backdrop-blur-md
      hover:scale-105 hover:bg-cyan-300/90 transition-all
    "
  >
    <span className="-rotate-90 block">RESUME</span>
  </motion.a>
)}


      {/* 🖤 Mobile Overlay (only visible when open on small screens) */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-30 bg-black/80 sm:bg-transparent 
            backdrop-blur-sm transition-all duration-300
          "
          onClick={handleClose}
        />
      )}
    </>
  );
}
