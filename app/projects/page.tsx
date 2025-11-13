'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Particles from '../../components/reactbits/Particles';
import SplashCursor from '../../components/reactbits/SplashCursor';
import CircularGallery from '../../components/reactbits/CircularGallary';
import { X } from 'lucide-react';
import SocialDock from '../../components/reactbits/SocialDock';
import { Space_Grotesk, Sora } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora',
});

type TechItem = {
  name: string;
  level: number;
};

type Project = {
  image: string;
  text: string;
  description: string;
  significance?: string;
  problem?: string;
  tech: { name: string; level: number }[];
  link?: string;     // live demo link (optional)
  github?: string;   // GitHub repo link (optional)
};


export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projects: Project[] = [
    {
  image: '/event.png',        // replace with your actual image path or URL
  text: 'Event Management System',
  description: 'A full-stack web application for creating, managing and registering events with user authentication and admin panel support.',
  significance: 'Enables organizations or institutions to streamline event workflows by centralizing creation, registration, tracking and feedback mechanisms in one platform.',
  problem: 'Many event-driven organizations still rely on spreadsheets, emails and manual registration which lead to inefficiencies, tracking issues and a poor attendee experience.',
  tech: [
    { name: 'HTML,CSS,JavaScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Express.js', level: 70 },
    { name: 'mySql', level: 65 },
    { name: 'Bootstrap', level: 60 },
  ],
  github: 'https://github.com/shreya3222/event_management',
},
{
  image: '/PostMart.png',             // replace with your actual image path or URL
  text: 'PostMart',
description: 'An Instagram-style marketplace where users share, rate, and review goods they’ve used, helping others make smarter purchasing decisions through honest, community-driven insights.',
  significance: 'Encourages trust-based e-commerce by blending social media interaction with product feedback, letting real users influence purchasing decisions through authentic reviews.',
  problem: 'Traditional e-commerce platforms lack reliable, personal product reviews—many ratings are anonymous or biased. PostMart solves this by introducing social validation through peer feedback.',
  tech: [
    { name: 'HTML,CSS,JavaScript', level: 85 },
    { name: 'Node.js', level: 50 },
    { name: 'Express.js', level: 75 },
    { name: 'SQLite', level: 70 },
    { name: 'Bootstrap', level: 60 },
    { name: 'Django', level: 85 },

  ],
  github: 'https://github.com/shreya3222/PostMart',
},
    {
  image: '/samyog.png', // replace with your actual image or hosted URL
  text: 'Samyog App',
  description: 'A unified campus platform connecting students, clubs, and event organizers — enabling seamless event discovery, registrations, and real-time updates across the institution.',
  significance: 'Promotes better communication and collaboration within colleges by centralizing event information, reducing miscommunication, and helping students actively engage in campus life.',
  problem: 'Most colleges still rely on posters or WhatsApp groups for event updates, causing poor reach and missed opportunities. Samyog solves this by creating a digital ecosystem that connects everyone in one place.',
  tech: [
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Express', level: 75 },
    { name: 'MySQL', level: 70 },
    { name: 'Bootstrap', level: 60 },
  ],
  link: 'https://samyogappx.netlify.app/',
},

{
  image: '/smoor.png', // replace with your actual image or hosted URL
  text: 'SMOOR Chocolates',
  description: 'A visually elegant static website designed for SMOOR — a premium dessert brand — built using pure HTML, CSS, and JavaScript to highlight their products, story, and contact details.',
  significance: 'Focuses on aesthetic presentation and showcasing brand identity and modern web layout skills without relying on frameworks.',
  problem: 'Many local or boutique businesses lack a strong digital presence. This project demonstrates how handcrafted front-end design can create a rich, engaging experience for such brands.',
  tech: [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 90 },
    { name: 'JavaScript', level: 75 },
    { name: 'Bootstrap', level: 60 },
  ],
  link: 'https://sahil2218.github.io/smoor/',
  github:"https://github.com/shreya3222/smoor"
},

{
  image: '/trail.png', // replace with the actual image path or screenshot you choose
  text: 'TRAIL ',
  description: 'A mental-health support chatbot platform developed during a hackathon, designed to provide accessible and personalized emotional assistance and resource guidance.',
  significance: 'Addresses the gap in on-demand mental health support by blending AI chat interactions with trusted resources, helping users who may be unable or unwilling to access traditional therapy.',
  problem: 'Many individuals face barriers to mental-health support such as cost, stigma, or lack of local providers; TRAIL aims to bridge that gap with a low-friction chatbot experience. :contentReference[oaicite:1]{index=1}',
  tech: [
    { name: 'HTML', level: 60 },
    { name: 'CSS', level: 60 },
    { name: 'JavaScript', level: 85 },
    { name: 'Express.js', level: 75 },
    { name: 'API / LLM', level: 70 },
  ],
  github: 'https://devfolio.co/projects/trail-6ad8',
}
,
{
  image: '/urban.png', // add your project image or dashboard screenshot
  text: 'AI Urban Resilience System',
  description: 'An AI-powered system designed to predict urban floods, optimize rescue operations, and mitigate Urban Heat Island (UHI) effects through geospatial data and machine learning models.',
  significance: 'Tackles real-world urban climate challenges by combining predictive analytics, geospatial mapping, and sustainable planning to make modern cities safer and more resilient.',
  problem: 'Rapid urbanization and climate change have increased flood risks and urban heat intensity. Traditional methods lack real-time, data-driven insight for proactive disaster management.',
  tech: [
    { name: 'Python', level: 90 },
    { name: 'Flask', level: 80 },
    { name: 'Machine Learning', level: 85 },
    { name: 'QGIS', level: 70 },
    { name: 'TensorFlow', level: 65 },
  ],
  link:'https://www.routledge.com/Engineering-Science-and-Technology-Innovations-for-the-Future/SR-Gowda-Rammohan-PrabuSankar-Jayalatha/p/book/9781041166801',
  github: 'https://github.com/shreya3222/AI-Urban_Resilience_System', // or your GitHub/hosted demo link if available

},

{
  image: '/drug.png', // replace with an actual screenshot or system flow image
  text: 'Drug Allocation System(cognizant)',
  description: 'A machine learning-powered system that optimizes medical supply routes and automates drug allocation using real-time data, built with React.js, Django, and OpenStreetMap integration.',
  significance: 'Ensures efficient and timely delivery of critical drugs by optimizing logistics routes and predicting allocation needs across hospitals and pharmacies.',
  problem: 'Manual drug distribution and poorly optimized delivery routes lead to delays, higher operational costs, and shortages during emergencies. This system automates those decisions through AI-driven insights.',
  tech: [
    { name: 'React.js', level: 85 },
    { name: 'Django', level: 80 },
    { name: 'Python', level: 50 },
    { name: 'Machine Learning', level: 85 },
    { name: 'OpenStreetMap API', level: 55 },
  ],
}
,
{
  image: '/claimwise.png', // add your project image or dashboard screenshot
  text: 'ClaimWise AI (Harman)',
  description: 'An Insurance claim rejection prediction platform leveraging machine learning to forecast and prevent claim denials. Built with Flask for backend APIs and React.js for the interactive user interface.',
  significance: 'Streamlines healthcare claim validation by automating rejection analysis, improving accuracy, and reducing manual intervention in the insurance workflow.',
  problem: 'Traditional claim processing involves complex, error-prone manual reviews that lead to delays, inefficiencies, and rejections. ClaimWise uses AI to identify high-risk claims and recommend corrections before submission.',
  tech: [
    { name: 'React.js', level:80 },
    { name: 'Flask', level: 85 },
    { name: 'Python', level: 90 },
    { name: 'Scikit-Learn', level: 80 },
    { name: 'SQL', level: 75 },
  ],
}
,
  ];

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: 'easeOut' } },
  });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center text-center text-cyan-100 bg-black font-body">
      {/* 🌌 background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Particles
          particleColors={['#00ffff90', '#00e5ff80', '#003b4ad0']}
          particleCount={600}
          particleSpread={20}
          speed={0.8}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation
        />
      </div>

      <SplashCursor />

      {/* 🧠 header */}
      <motion.h1
        {...(reveal(0) as any)}
        className="text-4xl sm:text-6xl md:text-8xl font-heading mt-24 sm:mt-28 md:mt-32 
        bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent 
        drop-shadow-[0_0_40px_rgba(0,255,255,0.4)]"
      >
        PROJECTS
      </motion.h1>

      {/* 💫 floating sub-glow behind header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute top-36 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* divider */}
      <motion.div
        {...(reveal(0.4) as any)}
        className="mt-12 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent rounded-full"
      />

      {/* ✨ tagline card */}
      <motion.div
        {...(reveal(0.6) as any)}
        className="relative mt-10 max-w-3xl w-[90vw] px-5 sm:px-8 py-8 sm:py-10 rounded-3xl 
        bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-400/20 
        shadow-[0_0_35px_rgba(0,255,255,0.15)] backdrop-blur-md"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-gray-300 text-2xl leading-relaxed"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cyan-400 font-semibold text-2xl tracking-wide"
          >
            Code. Design. Impact.
          </motion.span>
          <br /><br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Think of this as my digital studio — where late-night ideas turn into tangible creations.
            Each project here is built with intent — to solve problems, tell stories, and bring imagination to life.
            From intelligent dashboards to immersive 3D experiences, this gallery captures what I enjoy most:
            turning concepts into reality that inspires.
          </motion.span>
        </motion.p>
      </motion.div>

      {/* glowing separator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-24 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent rounded-full"
      />

      {/* gallery heading */}
      <motion.h2
        {...(reveal(0.3) as any)}
        className="mt-12 text-3xl md:text-4xl font-semibold text-cyan-300 tracking-wide"
      >
        My Digital Studio
      </motion.h2>

      <motion.p
        {...(reveal(0.5) as any)}
        className="text-gray-400 text-sm mt-3 mb-8"
      >
        Scroll or drag through my projects below
      </motion.p>

      {/* 🌀 Gallery Section */}
<div className="w-full relative">

{/* 💻 Circular gallery for large screens */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className={`hidden lg:block relative w-full h-[65vh] pb-10 z-10 transition-all duration-500 ${
    selectedProject ? 'opacity-20 blur-sm' : 'opacity-100'
  }`}
>
  <CircularGallery
    items={projects.map((p) => ({ image: p.image, text: p.text }))}
    bend={3}
    textColor="#00ffff"
    borderRadius={0.05}
    scrollSpeed={2}
    scrollEase={0.05}
    onItemClick={(index) => setSelectedProject(projects[index])} // 👈 Correctly sets selected project
  />
</motion.div>


  {/* 📱 Simple grid gallery for small / tablet screens */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 mt-10 lg:hidden ${
      selectedProject ? 'opacity-20 blur-sm' : 'opacity-100'
    }`}
  >
    {projects.map((p) => (
      <motion.div
        key={p.text}
        whileHover={{ scale: 1.03 }}
        onClick={() => setSelectedProject(p)}
        className="cursor-pointer bg-gradient-to-b from-cyan-900/40 to-black/40 border border-cyan-400/20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.1)]"
      >
        <img src={p.image} alt={p.text} className="w-full h-48 object-cover" />
        <div className="p-4 text-left">
          <h3 className="text-lg font-semibold text-cyan-300">{p.text}</h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{p.description}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</div>

{/* divider */}
<motion.div
  {...(reveal(0.4) as any)}
  className="mt-35 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent rounded-full"
/>

<AnimatePresence>
  {selectedProject && (
    <>
      {/* 🌌 Dim Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-gradient-to-b from-black/90 via-cyan-950/60 to-black/80 backdrop-blur-[3px] z-40"
        onClick={() => setSelectedProject(null)}
      />

      {/* ❌ Floating Close Button */}
      <motion.button
        onClick={() => setSelectedProject(null)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-6 right-6 z-[60] bg-black/50 backdrop-blur-sm p-2 rounded-full 
                   border border-cyan-400/40 hover:bg-cyan-500/40 
                   hover:scale-110 transition-all duration-300"
      >
        <X size={26} className="text-cyan-200" />
      </motion.button>

      {/* 🧱 Responsive Container for both panels */}
      <div className="fixed inset-0 z-50 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-6 px-4 md:px-8">
        {/* 🎴 Left Card */}
        <motion.div
          key={selectedProject.text}
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1.05 }}
          exit={{ opacity: 0, x: -80, scale: 0.9 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-1 md:order-none flex justify-center md:justify-start w-full md:w-[30%] lg:w-[35%] md:pl-6 lg:pl-12 mt-10 md:mt-0"
        >
          <motion.img
            src={selectedProject.image}
            alt={selectedProject.text}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-50 md:h-50 lg:w-70 lg:h-70 max-w-[85vw]
            object-cover rounded-3xl border border-cyan-400/40
            shadow-[0_0_40px_rgba(0,255,255,0.25)] hover:scale-[1.05]
            transition-transform duration-300"
            whileHover={{ scale: 1.08 }}
          />
        </motion.div>

        {/* 🪟 Right Info Panel */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          className="relative order-2 md:order-none w-full md:w-[70%] lg:top-10 lg:right-0 lg:w-[65%] md:top-2 md:mr-8 mt-6 md:mt-0
          bg-gradient-to-b from-cyan-950/60 via-black/40 to-cyan-900/40
          border-t md:border-t-0 md:border-l border-cyan-400/30
          shadow-[0_0_60px_rgba(0,255,255,0.25)] backdrop-blur-2xl
          md:rounded-l-3xl rounded-t-3xl
          p-5 sm:p-6 md:p-8 lg:p-10 pt-16 sm:pt-10
          overflow-y-auto custom-scrollbar text-left space-y-6
          scrollbar-thin scrollbar-thumb-cyan-700/40 scrollbar-track-transparent"
        >
          {/* 🏷️ TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-500 
              bg-clip-text text-transparent mb-4"
          >
            {selectedProject.text}
          </motion.h2>

          {/* 🔹 SIGNIFICANCE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <h3 className="text-lg text-cyan-400 font-semibold mb-2">Significance</h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              {selectedProject.significance || 'This project aims to address a meaningful challenge by blending design and technology to create real-world impact.'}
            </p>
          </motion.div>
        {/* 🧩 PROBLEM STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h3 className="text-lg text-cyan-400 font-semibold mb-2">Problem Statement</h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            {selectedProject.problem ||
              'Defines the challenge or gap this project seeks to overcome, laying the foundation for the implemented solution.'}
          </p>
        </motion.div>

        {/* 💡 SOLUTION / PURPOSE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <h3 className="text-lg text-cyan-400 font-semibold mb-2">Solution / Purpose</h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">{selectedProject.description}</p>
        </motion.div>

        {/* ⚙️ TECH STACK (chart view) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 space-y-5"
        >
          <h3 className="text-lg text-cyan-400 font-semibold mb-4"> Tech Stack Overview</h3>
          {selectedProject.tech.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ width: 0 }}
              animate={{ width: `${t.level}%` }}
              transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
              className="relative bg-cyan-900/30 h-6 rounded-full overflow-hidden border border-cyan-400/20"
            >
              {/* Bar fill */}
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                style={{ width: `${t.level}%` }}
              ></div>
              {/* Text overlay */}
              <div className="absolute inset-0 flex justify-between items-center px-3 text-sm font-medium">
                <span className="text-cyan-100">{t.name}</span>
                <span className="text-cyan-300">{t.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔗 LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-wrap gap-4 justify-start"
        >
          {selectedProject.link && (
  <a
    href={selectedProject.link}
    target="_blank"
    rel="noreferrer"
    className="px-5 py-2 bg-cyan-500/20 border border-cyan-400 
               text-cyan-300 rounded-lg hover:bg-cyan-600/40 transition-all"
  >
    Live Demo
  </a>
)}

{selectedProject.github && (
  <a
    href={selectedProject.github}
    target="_blank"
    rel="noreferrer"
    className="px-5 py-2 bg-white/10 border border-gray-600 
               text-gray-300 rounded-lg hover:bg-white/20 transition-all"
  >
    GitHub
  </a>
)}

        </motion.div>
        </motion.div>
      </div>
    </>
  )}
</AnimatePresence>

{/* 🌐 Social Dock */}
<div className="mt-4 sm:mt-6">
  <SocialDock />
</div>

    </div>
  );
}
