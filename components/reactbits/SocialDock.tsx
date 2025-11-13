'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaGlobe } from 'react-icons/fa';

export default function SocialDock() {
  const socials = [
    { icon: <FaGithub />, link: 'https://github.com/shreya3222', label: 'GitHub' },
    { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/shreya-gore-b26645253/', label: 'LinkedIn' },
{ 
  icon: <FaEnvelope />, 
  link: 'https://mail.google.com/mail/?view=cm&fs=1&to=shreyagore68@gmail.com', 
  label: 'Email' 
},
    { icon: <FaGlobe />, link: 'https://yourwebsite.com', label: 'Website' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed left-5 bottom-8 sm:bottom-10 md:bottom-14 z-50 
                 flex flex-col items-center gap-5 sm:gap-6"
    >
      {socials.map((item, i) => (
        <motion.a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.3, y: -3, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="group text-cyan-300 hover:text-cyan-100 
                     text-xl sm:text-2xl md:text-3xl relative 
                     transition-all duration-300"
        >
          {/* Glowing icon */}
          <motion.div
            animate={{
              textShadow: [
                '0 0 5px rgba(0,255,255,0.4)',
                '0 0 12px rgba(0,255,255,0.8)',
                '0 0 5px rgba(0,255,255,0.4)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
          >
            {item.icon}
          </motion.div>

          {/* Tooltip */}
          <span
            className="absolute left-10 sm:left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                       bg-black/80 text-cyan-100 text-[0.65rem] sm:text-xs px-2 py-1 rounded-md
                       transition-all duration-300 whitespace-nowrap
                       shadow-[0_0_6px_rgba(0,255,255,0.3)] translate-x-2 group-hover:translate-x-0"
          >
            {item.label}
          </span>
        </motion.a>
      ))}

      {/* Decorative Line */}
      <motion.div
        className="w-[2px] h-16 sm:h-20 bg-cyan-400/40 mt-4"
        animate={{
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            '0 0 5px rgba(0,255,255,0.4)',
            '0 0 15px rgba(0,255,255,0.6)',
            '0 0 5px rgba(0,255,255,0.4)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
      />
    </motion.div>
  );
}
