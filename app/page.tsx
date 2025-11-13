'use client';
import Image from 'next/image';
import SplashCursor from '../components/reactbits/SplashCursor';
import Particles from '../components/reactbits/Particles';
import QuickStatsCard from '../components/reactbits/QuickStatsCard';
import SocialDock from '../components/reactbits/SocialDock';
import { motion } from 'framer-motion';
import TechStackTerminal from '@/components/reactbits/TechStackTerminal';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white bg-black overflow-hidden font-body">
      
      {/* 🌌 Particle background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Particles
          particleColors={['#00FFFF', '#00FFFFB0', '#00FFFF80']}
          particleCount={600}
          particleSpread={20}
          speed={0.8}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation
        />
      </div>


      {/* 💧 Fluid splash cursor */}
<SplashCursor />

{/* 🌟 Hero Section */}
<div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 md:px-12 space-y-5 sm:space-y-6 md:space-y-8">
  
  {/* 🖼️ Profile Image */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 
               rounded-full overflow-hidden border-4 border-cyan-400 
               shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:shadow-[0_0_45px_rgba(0,255,255,0.9)] 
               transition-all duration-700"
  >
    <Image
      src="/shrey.png"
      alt="Shreya Gore"
      fill
      className="object-cover rounded-full"
      priority
    />
  </motion.div>

  {/* 🌈 Animated Name */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
    className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
               tracking-wide bg-gradient-to-r from-cyan-300 via-cyan-400 to-white 
               bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,255,255,0.5)]
               hover:scale-105 hover:drop-shadow-[0_0_45px_rgba(0,255,255,0.7)]
               transition-transform duration-500"
  >
    SHREYA GORE
  </motion.h1>

{/* ✍️ Subtitle / Tagline */}
<motion.p
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
  className="text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl mx-auto 
             text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed 
             font-[var(--font-space-grotesk)] drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
>
  A developer who turns caffeine and curiosity into clean,creative code.
  Every pixel and line I write has its own attitude —
  <br className="hidden sm:block" />polished, playful, and purposeful.
</motion.p>

{/* 🔘 Buttons Section */}
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.1, duration: 0.9 }}
  className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-2"
>
  <a
    href="/myjourney"
    className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to- from-black-400 to-white-500 
               rounded-full text-cyan-400 font-semibold text-base sm:text-lg hover:scale-110 transition-all
               shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:shadow-[0_0_35px_rgba(0,255,255,0.7)]"
  >
     MY GAMIFIED STORY<br/> 
  </a>
     {/* Slide-in skills panel (client component) */}
  <TechStackTerminal />
  <QuickStatsCard />
</motion.div>

{/* 🌐 Social Dock */}
<div className="mt-4 sm:mt-6">
  <SocialDock />
</div>

      </div>
    </div>
  );
}
