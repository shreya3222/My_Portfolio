'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaCode, FaRoad, FaTrophy, FaEnvelope } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const items = [
  { href: '/', label: 'Home', icon: <FaHome /> },
  { href: '/projects', label: 'Projects', icon: <FaCode /> },
  { href: '/myjourney', label: 'My Journey', icon: <FaRoad /> },
  { href: '/achievements', label: 'Achievements', icon: <FaTrophy /> },
  { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
];

export default function DockNav() {
  const pathname = usePathname();
  const [isOverlay, setIsOverlay] = useState(false);

  useEffect(() => {
    const observer = () => setIsOverlay(document.body.classList.contains('overlay-open'));
    observer();
    window.addEventListener('overlay-toggle', observer);
    return () => window.removeEventListener('overlay-toggle', observer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: isOverlay ? 0 : 1, y: isOverlay ? 50 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 
        flex gap-5 sm:gap-8 md:gap-12 
        bg-black/50 backdrop-blur-xl border border-cyan-400/20 
        px-5 sm:px-10 md:px-14 lg:px-16 py-3 sm:py-4 md:py-6 
        rounded-2xl sm:rounded-3xl shadow-[0_0_25px_rgba(0,255,255,0.25)]
        transition-all duration-500
        ${isOverlay ? 'pointer-events-none blur-md' : 'pointer-events-auto'}
      `}
      style={{ zIndex: 30 }}
    >
      {items.map((item, i) => {
        const active = pathname === item.href;
        return (
          <div key={i} className="relative flex flex-col items-center group">
            <motion.div
              whileHover={{ scale: 1.4, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Link
                href={item.href}
                className={`
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                  transition-all duration-200 
                  text-cyan-300 group-hover:text-cyan-100 
                  ${active ? 'drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]' : ''}
                `}
              >
                {item.icon}
              </Link>
            </motion.div>

            <span
              className="
                absolute -top-8 sm:-top-9 opacity-0 group-hover:opacity-100 
                group-hover:-translate-y-1 transition-all duration-300
                text-[0.65rem] sm:text-xs md:text-sm text-cyan-100 
                bg-black/80 px-2 sm:px-3 py-1 rounded-md 
                shadow-[0_0_6px_rgba(0,255,255,0.3)]
                pointer-events-none whitespace-nowrap
              "
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}
