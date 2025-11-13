'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, Code, BookOpen, Globe, BookCheck, AppWindow } from 'lucide-react';
import SocialDock from '../../components/reactbits/SocialDock';
import Particles from '../../components/reactbits/Particles';
import SplashCursor from '../../components/reactbits/SplashCursor';
import { useState } from "react";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { 
    icon: <BookOpen size={20} />, 
    title: "Joined JSS Academy of Technical Education, Bengaluru", 
    year: "2021", 
    desc: (
      <>Began <span className="text-cyan-300 font-semibold">B.E. in Information Science and Engineering</span>, laying the foundation for my tech journey.</>
    )
  },
  { 
    icon: <Briefcase size={20} />, 
    title: "Lead Coordinator — Mini Fest", 
    year: "2023", 
    desc: (
      <>Led the <span className="text-cyan-300 font-semibold">department-level tech & cultural fest</span>, organizing and managing multiple student-driven events.</>
    )
  },
  { 
    icon: <Award size={20} />, 
    title: "Cognizant Hackathon - Digital Technoverse", 
    year: "2023", 
    desc: (
      <>Ranked among the <span className="text-cyan-300 font-semibold">Top 12 teams nationally</span> for developing a <span className="text-cyan-300 font-semibold">real-world scalable solution</span>.</>
    )
  },
  { 
    icon: <Briefcase size={20} />, 
    title: "Intern — Cognizant Technology Solutions", 
    year: "2024", 
    desc: (
      <>Developed an <span className="text-cyan-300 font-semibold">AI-based Drug Allocation and Route Optimization System</span> using <span className="text-cyan-300 font-semibold">Django</span> and <span className="text-cyan-300 font-semibold">Machine Learning</span>.</>
    )
  },
  { 
    icon: <BookCheck size={20} />, 
    title: "Head — Web & App Development Club (ISE Dept.)", 
    year: "2024", 
    desc: (
      <>Mentored juniors and led <span className="text-cyan-300 font-semibold">full-stack workshops</span>, promoting <span className="text-cyan-300 font-semibold">modern web technologies</span> and collaboration.</>
    )
  },
  { 
    icon: <AppWindow size={20} />, 
    title: "Research Intern — IIT Guwahati", 
    year: "2024", 
    desc: (
      <>Worked on <span className="text-cyan-300 font-semibold">Adaptive Frequency Assignment</span> and <span className="text-cyan-300 font-semibold">IRS-assisted 5G Communication</span> under <span className="text-cyan-300 font-semibold">Dr. Moumita Patra</span>.</>
    )
  },
  { 
    icon: <Briefcase size={20} />, 
    title: "Intern — Harman", 
    year: "2025", 
    desc: (
      <>Built an <span className="text-cyan-300 font-semibold">AI-powered Insurance Claim Rejection Prediction System</span> using <span className="text-cyan-300 font-semibold">Flask</span>, <span className="text-cyan-300 font-semibold">React</span>, and <span className="text-cyan-300 font-semibold">Machine Learning</span>.</>
    )
  },
  { 
    icon: <BookCheck size={20} />, 
    title: "Final Year Project — Top Innovation", 
    year: "2025", 
    desc: (
      <>Selected among <span className="text-cyan-300 font-semibold">Top Innovations</span> during the <span className="text-cyan-300 font-semibold">College Open-Day Project Exhibition 2025</span>.</>
    )
  },
  { 
    icon: <Award size={20} />, 
    title: "Exceptional Scholar Award (Batch 2021–2024)", 
    year: "2025", 
    desc: (
      <>Honored for <span className="text-cyan-300 font-semibold">academic excellence</span> and <span className="text-cyan-300 font-semibold">project innovation</span> at <span className="text-cyan-300 font-semibold">JSSATE Bengaluru</span>.</>
    )
  },
  { 
    icon: <Briefcase size={20} />, 
    title: "Research Paper — Taylor & Francis (ICRIET 2025)", 
    year: "2025", 
    desc: (
      <>Published research on <span className="text-cyan-300 font-semibold">Intelligent Communication and Network Systems</span> in <span className="text-cyan-300 font-semibold">Taylor & Francis – ICRIET 2025</span> proceedings.<br /><br />
      <a className="text-cyan-300" href="https://www.routledge.com/Engineering-Science-and-Technology-Innovations-for-the-Future/SR-Gowda-Rammohan-PrabuSankar-Jayalatha/p/book/9781041166801">CLICK HERE TO VIEW PUBLICATION</a></>
    )
  },
];


export default function AchievementsPage() {
const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef(null);
  const orbRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);


    const galleryItems = [
    { src: 'IITG.png', caption: 'IIT Guwahati Internship' },
    { src: 'Harman.png', caption: 'Harman Internship' },
    { src: 'Cogni1.png', caption: 'Cognizant Internship' },
    { src: 'FinalYrproject.jpeg', caption: 'Best Final Year Project Award' },
    { src: 'exceptional.jpeg', caption: 'Exceptional Scholar ' },
    { src: 'CogniHackathon.jpeg', caption: 'Certificate(Cognizant hackathon)' },
    { src: 'DegreeCertificate.jpeg', caption: 'Bachelor of Engineering(Degree Certificate)' },
    { src: 'Hacka-A-League.jpeg', caption: 'Hackathon Participation' },
    { src: 'workshop.jpeg', caption: 'Nano Satellite Technology Workshop (JSSATEB)' },
    { src: 'Research.jpeg', caption: 'Research Paper — Taylor & Francis (ICRIET 2025)' },
    { src: 'CogniInternship.jpeg', caption: 'Internship at Cognizant — Digital Technoverse' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the line filling down
      if (window.innerWidth < 640) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );

      // Fade in/out glowing orb (center indicator)
const container = sectionRef.current as HTMLDivElement | null;
if (!container) return;

const bentoBoxes = container.querySelectorAll<HTMLDivElement>('.bento');

      if (bentoBoxes.length > 1) {
        const first = bentoBoxes[0];
        const last = bentoBoxes[bentoBoxes.length - 1];

        // Fade in when first Bento appears
        gsap.fromTo(
          orbRef.current,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: first,
              start: 'top bottom',
              end: 'center center',
              scrub: true,
            },
          }
        );

        // Fade out when last Bento exits
        gsap.fromTo(
          orbRef.current,
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 0.6,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: last,
              start: 'bottom center',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-gradient-to-b from-black via-slate-900 to-gray-950 text-cyan-100 overflow-hidden">
        {/* 🌌 Particle background */}
<div className="fixed inset-0 z-0 pointer-events-none">
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

      {/* HERO */}
<section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 sm:px-6 md:px-10 py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />
<h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-cyan-300 drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
          My Achievements
        </h1>
<p className="mt-6 max-w-xl sm:max-w-2xl text-cyan-100/80 text-base sm:text-lg leading-relaxed px-2">
          A journey through my professional milestones — engineering, creativity & curosity.
        </p>
        <div className="absolute bottom-45 flex flex-col items-center">
          <span className="text-cyan-300 text-sm tracking-wide">Scroll Down</span>
          <div className="w-4 h-4 mt-2 border-b-2 border-r-2 border-cyan-400 rotate-45 animate-bounce" />
        </div>
      </section>

      {/* TIMELINE */}
      <section
  ref={sectionRef}
  className="relative flex flex-col items-center py-24 sm:py-32 px-4 sm:px-8 min-h-screen"
>


        <div className="relative max-w-5xl w-full mt-8">
          {/* Static and growing line */}
<div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-cyan-400/20 hidden sm:block" />
<div
  ref={lineRef}
  className="absolute left-1/2 top-0 w-[3px] origin-top bg-gradient-to-b from-cyan-400 via-teal-300 to-transparent shadow-[0_0_25px_rgba(0,255,255,0.8)] hidden sm:block"
/>


          {/* 🌌 Floating glowing circles (orb) */}
          <div
            ref={orbRef}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0"
          >
            <div className="relative w-10 h-10">
              {/* Core circle */}
              <div className="absolute inset-0 rounded-full bg-cyan-300/60 blur-[6px] animate-ping" />
              <div className="absolute inset-1 rounded-full bg-cyan-400/80 blur-[10px] animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-teal-300/60 blur-[15px]" />
              {/* Outer orbiting particles */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-200 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-[spin_6s_linear_infinite]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-teal-200 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.7)] animate-[spin_8s_linear_reverse_infinite]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-100 rounded-full shadow-[0_0_8px_rgba(0,255,255,0.6)] animate-[spin_10s_linear_infinite]" />
            </div>
          </div>

          {/* Timeline cards */}
          {achievements.map((ach, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={i}
className={`bento relative flex items-center mb-16 sm:mb-24 ${
  left ? 'justify-start md:justify-start' : 'justify-end md:justify-end'
}`}
              >
                {/* milestone dot */}
                <div className="absolute left-1/2 -translate-x-1/2 bg-cyan-400 w-6 h-6 rounded-full shadow-[0_0_22px_rgba(0,255,255,0.8)] z-10 flex items-center justify-center">
                  {ach.icon}
                </div>

                {/* Bento card */}
                <div
                  className={`w-full sm:w-[80%] md:w-[48%] bg-black/60 border border-cyan-400/35 rounded-2xl p-5 sm:p-6 backdrop-blur-md
              shadow-[0_0_26px_rgba(0,255,255,0.15)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]
              transition-all duration-300 ${
                left ? 'mr-auto md:pr-8' : 'ml-auto md:pl-8'
              }`}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-cyan-200">{ach.title}</h3>
                  <p className="mt-6 max-w-xl sm:max-w-2xl text-cyan-100/80 text-base sm:text-lg leading-relaxed px-2">{ach.year}</p>
                  <p className="mt-6 max-w-xl sm:max-w-2xl text-cyan-100/80 text-base sm:text-lg leading-relaxed px-2">{ach.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
     <section className="bg-gradient-to-b from-black via-slate-900 to-gray-950 text-cyan-100 overflow-hidden">
      {/* 🖼️ Gallery Wall — Proof of Achievements */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-gray-950 via-slate-900 to-black text-cyan-100 overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-16 text-center drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
          Gallery Wall of Achievements
        </h2>

        {/* Equal-sized tiles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item)}
              className="relative group overflow-hidden rounded-2xl border border-cyan-400/20 bg-black/50 
                         backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 aspect-[4/3] 
                         flex flex-col justify-center items-center cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                <p className="text-cyan-200 text-xs sm:text-sm md:text-base font-medium leading-snug">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle cyan glow backdrop */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05),transparent_80%)]" />
      </section>

      {/* 🔍 Fullscreen Preview Modal */}
{selectedImage && (
  <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-8">
    
    {/* 🩵 Close Button Above Image */}
    <button
      onClick={() => setSelectedImage(null)}
      className="mb-6 sm:mb-8 px-4 py-2 flex items-center gap-2 text-cyan-300 hover:text-cyan-100 
                 hover:scale-105 transition-all duration-300 border border-cyan-400/40 
                 bg-black/40 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.4)] 
                 text-sm sm:text-base font-semibold tracking-wide"
    >
      <X size={22} /> Close
    </button>

    {/* 🖼️ Full Image */}
    <img
      src={selectedImage.src}
      alt={selectedImage.caption}
      className="max-h-[80vh] w-auto object-contain rounded-xl shadow-[0_0_40px_rgba(0,255,255,0.4)]"
    />

    {/* 🩵 Caption */}
    <p className="mt-6 text-cyan-200 text-center text-sm sm:text-base md:text-lg font-medium">
      {selectedImage.caption}
    </p>
  </div>
)}

    </section>

<div className="mt-4 sm:mt-6">
  <SocialDock />
</div>

    </main>
  );
}
