'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function TerminalInterface({
  onExit,
  points,
  setPoints,
}: {
  onExit?: () => void;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [hiddenUnlocked, setHiddenUnlocked] = useState(false);
  const [showHiddenLevel, setShowHiddenLevel] = useState(false);
const bootedRef = useRef(false);

  // blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(id);
  }, []);

  // boot sequence
useEffect(() => {
  // ✅ Prevent double boot (StrictMode-safe)
  if (bootedRef.current) return;
  bootedRef.current = true;

  const boot = [
    'BOOT SEQUENCE COMPLETE.',
    'Loading classified environment...',
    'Welcome Captain Shreya.',
    'Type "help" to begin your mission.',
  ];

  boot.forEach((l, i) =>
    setTimeout(() => setLines(prev => [...prev, l]), 700 * i)
  );
}, []);

  // automatic unlock check when user explores enough commands
  useEffect(() => {
    const mustVisit = ['about', 'projects', 'internships', 'values'];
    const exploredAll = mustVisit.every(c => visited.includes(c));
    if (exploredAll && !hiddenUnlocked) {
      setHiddenUnlocked(true);
      setTimeout(() => {
        setLines(prev => [
          ...prev,
          '',
          ' SYSTEM STABLE.',
          'Hidden access unlocked — type the hidden command to enter hidden level.',
          '',
        ]);
      }, 800);
    }
  }, [visited, hiddenUnlocked]);

  // main command handler
  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    const out: string[] = [];
  const validCommands = [
    'help', 'about', 'skills', 'projects',
    'internships', 'beyondcode', 'values',
    'resume', 'contact', 'access 404', 'reboot', 'exit', 'clear'
  ];

  // 🛑 If invalid, show message and exit early — no points added
  if (!validCommands.includes(c)) {
    setLines(prev => [...prev, `> ${cmd}`, ` Unknown command: "${cmd}". Type "help" for the list.`]);
    return;
  }

  // 🧠 Award points only for first-time valid command
  if (!visited.includes(c) && c !== 'exit' && c !== 'clear') {
    setVisited(prev => [...prev, c]);
    // +5 for regular commands, +50 for hidden
    if (c === 'access 404' || c === 'reboot') {
      setPoints(prev => prev + 50);
    } else {
      setPoints(prev => prev + 5);
    }
  }

    switch (c) {
      case 'help':
        out.push(
          '🧠 Available commands:',
          '- about         → Learn about this journey',
          '- skills        → View tech stack',
          '- projects      → Showcase of works',
          '- internships   → Real breakdown of projects & teams',
          '- beyondcode    → My creative side beyond coding',
          '- values        → What principles define my work',
          '- clear         → Clear the terminal screen'
        );
        break;

      case 'about':
        out.push(
          ' Hey, I’m Shreya Gore — an engineer who believes code is the most creative language humans have invented.',
          'From AI-driven research to full-stack development, I love turning complex ideas into experiences people can interact with.',
          'Currently, I’m exploring how intelligence and imagination can co-exist in every product I create.',
          '',
          '⚠️ System Note: Some glitches aren’t errors...  Not all errors are mistakes... try (access 404) and then u need to to (reboot).'
        );
        break;

      case 'skills':
        out.push(
          '-> Tech Stack — tools I earned by building real things:',
          '─────────────────────────────────────────────',
          '-> Programming Languages',
          '• Java',
          '• Python',
          '• HTML & CSS',
          '',
          '──────────────────────────────────────────────',
          '-> Libraries / Frameworks',
          '• JavaScript ',
          '• React.js ',
          '• Django ',
          '• Node.js + Express.js',
          '• Bootstrap ',
          '',
          '──────────────────────────────────────────────',
          '-> Tools / Platforms',
          '• VS Code ',
          '• Framer ',
          '• MS Azure + OpenAI ',
          '',
          '──────────────────────────────────────────────',
          '-> Databases',
          '• MongoDB ',
          '• SQL / MySQL ',
          '',
          '──────────────────────────────────────────────',
          '-> How I learned them:',
          '• Internships → Cognizant (ML + logistics), IIT-G (5G research), Harman (Flask + ML).',
          '• Projects → PostMart, Samyog, Urban Resilience System, personal apps.',
          '• Practice → Debugging, curiosity, and endless “aha!” moments.'
        );
        break;

      case 'projects':
        out.push(
          ' PROJECTS — each one built to solve, not just impress:',
          '─────────────────────────────────────────────',
          '1️⃣ Event Management System | Node.js · Express.js · HTML · CSS · SQL',

          '',
          '2️⃣ PostMart | Django · HTML · CSS · JavaScript',

          '',
          '3️⃣ Samyog | React.js · MongoDB · Framer · Figma',

          '',
          '4️⃣ Urban Resilience System | React.js · Flask · ML · Geo Data',
          '',
          '5️⃣ Insurance Claim Rejection Predictor | Flask · ML · React (Harman)',
          '',
          '6️⃣ Drug Allocation & Route Optimizer | Django · ML · React (Cognizant)',
          '',
          '7️⃣ Trail | AI Mental Health Chatbot (Voice + Text) · Hackathon Project',
          '',
          '8️⃣ Smoor | Website for smoor desserts · HTML  · CSS · JavaScript ',
          '',
          '💬 Each project taught me persistence, empathy, and creativity.'
        );
        break;

      case 'internships':
        out.push(
          ' INTERNSHIP LOGS — where curiosity met real-world systems:',
          '──────────────────────────────────────────────',
          '1️⃣ HARMAN (Feb 2025 – Jun 2025)',
          '   • Built an end-to-end Insurance Claim Rejection Prediction System using Flask, React, and ML.',
          '   • Learned healthcare data = human stories in numbers.',
          '',
          '──────────────────────────────────────────────',
          '2️⃣ IIT GUWAHATI (Sep 2024 – Dec 2024)',
          '   • Research under Dr. Moumita Patra — Adaptive Frequency Assignment in UAV Networks.',
          '   • Built LTE & mmWave 5G systems in ns-3; implemented IRS to boost communication.',
          '   • “Exploring Sum Rate Maximization in UAV-Based Multi-IRS Networks.”',
          '',
          '──────────────────────────────────────────────',
          '3️⃣ COGNIZANT (Jun 2024 – Jul 2024)',
          '   • Drug Allocation + Route Optimizer — Django, ML, React.',
          '   • Proved algorithms can save real hours.',
          '',
          '──────────────────────────────────────────────',
          '💬 Each internship reshaped how I see engineering — as empathy in logic.'
        );
        break;

      case 'beyondcode':
        out.push(
          ' Beyond Code (aka "Why I Need Sleep"):',
          '──────────────────────────────',
          ' Music = anti-bug therapy.',
          ' Foodie. Professional taster, occasional cook.',
          ' Travel = perspective reset button.',
          ' Basketball + badminton to balance caffeine intake.',
          ' Sketching when pixels aren’t enough.',
          ' Anime = emotional fuel. Motivation wrapped in chaos.',
          '💭 Creativity drives tech; imagination builds the interface.'
        );
        break;

      case 'reboot':
        if (!hiddenUnlocked) {
          out.push('❌ Access denied. Explore more system sectors first.');
        } else {
          out.push('⚡ System glitch detected...', 'Rebooting in 3...', '2...', '1...');
          setPoints(prev => prev + 100); // 🏆 bonus for unlocking hidden level
          setTimeout(() => setShowHiddenLevel(true), 2500);
        }
        break;

      case 'access 404':
        if (!hiddenUnlocked) {
          out.push('⚠️ Access Denied: Insufficient exploration level.');
        } else {
          out.push(' Accessing anomaly node 503...');
          setPoints(prev => prev + 50); // 🏆 bonus for unlocking hidden level
          setTimeout(() => setShowHiddenLevel(true), 2500);
        }
        break;


      case 'values':
        out.push(
          ' Core Values:',
          '──────────────────────────────',
          '1️⃣ Curiosity over comfort.',
          '2️⃣ Project-Based Learning over pure theory.',
          '3️⃣ Depth over speed.',
          '4️⃣ Quality over quantity.',
          '5️⃣ Collaboration over competition.',
          '',
          ' "I don’t chase trends — I chase understanding, then build with it."'
        );
        break;

      case 'clear':
        setLines([]);
        return;

      default:
        out.push(` Unknown command: "${cmd}". Type "help" for the list.`);
    }

    setLines(prev => [...prev, `> ${cmd}`, ...out]);
  };

  // handle input
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    run(input);
    setInput('');
  };

  useEffect(() => inputRef.current?.focus(), []);

return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 1.2 }}
    className="
      fixed inset-0 flex flex-col sm:flex-row 
      bg-black text-cyan-400 font-mono 
      overflow-hidden
    "
  >
    {/* scanline flicker */}
    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(rgba(0,255,255,0.08)_0_2px,transparent_2px_4px)] opacity-25 animate-[flicker_3s_infinite]" />

    {/* Left side — Instruction Console */}
    <div
      className="
        relative flex flex-col items-center justify-start 
        border-b sm:border-b-0 sm:border-r border-cyan-600/50
        p-4 sm:p-5 md:p-3 md:m-4 sm:m-3
        w-full sm:w-[30%] md:w-[40%] lg:w-[40%]
        min-h-[50vh] sm:min-h-full
        overflow-y-auto
        transition-all duration-500
      "
    >
      {/* Profile Frame */}
      <div
        className="
          relative 
          w-[90%] sm:w-[380px] md:w-[300px] lg:w-[430px]
          h-[280px] sm:h-[400px] md:h-[500px] 
          overflow-hidden 
          
          rounded-md
          transition-all duration-500
        "
      >
        <img
          src="gore.png"
          alt="subject"
          className="w-full h-full object-contain opacity-95"
        />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(rgba(0,255,255,0.15)_0_1px,transparent_1px_3px)] opacity-40" />
      </div>

      {/* Command Instructions */}
      <div
        className="
          mt-6 
          w-[90%] sm:w-[200px] md:w-[300px] lg:w-[410px]
          border border-cyan-600/60 
          p-4 sm:p-5 
          text-cyan-300 text-xs sm:text-sm leading-relaxed tracking-wide 
          bg-black/60 rounded-md 
          shadow-[0_0_20px_rgba(0,255,255,0.2)] 
          max-h-[45vh] sm:max-h-none overflow-y-auto custom-scrollbar"
      >
        <p className="text-cyan-400 font-bold text-lg sm:text-xl mb-3 tracking-wide text-center sm:text-left">
          TERMINAL COMMAND MANUAL
        </p>

        <p className="text-cyan-200 mb-3 text-center sm:text-left">
          Type <span className="text-cyan-300 font-semibold">help</span> to view all available commands.<br />
          Type <span className="text-cyan-300 font-semibold">clear</span> to clear the screen.
        </p>

        <div className="border-t border-cyan-700/50 my-4"></div>

        {/* 🕵️ Hidden Level Section */}
        <p className="text-cyan-400 font-bold text-base sm:text-lg mb-2 text-center sm:text-left">
          CLASSIFIED MISSION — Hidden Level Access
        </p>
        <p className="text-cyan-100/90 mb-2 text-center sm:text-left">
          There’s a secret within this terminal. Unlocking it requires exploration.
        </p>

        <ul className="list-disc list-inside text-cyan-100/90 space-y-1 mb-3 text-left">
          <li>
            Run <span className="text-cyan-300 font-semibold">about</span>,{' '}
            <span className="text-cyan-300 font-semibold">projects</span>,{' '}
            <span className="text-cyan-300 font-semibold">internships</span>, and{' '}
            <span className="text-cyan-300 font-semibold">values</span>.
          </li>
          <li>Once all are explored, the system stabilizes and unlocks a hidden protocol.</li>
          <li>
            Watch for a system message: <span className="text-cyan-200 font-semibold">“Hidden access unlocked” Or find the secret clue hidden in the information</span>
          </li>
          <li>
            Hint: use it as a command in the terminal to access the hidden level else you can exit.
          </li>
        </ul>

        <div className="border-t border-cyan-700/50 my-3"></div>
          <div className="space-y-1">
    <p className="text-cyan-400 font-semibold mb-2"> GENERAL COMMANDS</p>
    <ul className="list-disc list-inside text-cyan-100/90 space-y-1">
      <li><span className="text-cyan-300 font-semibold">about</span> — Learn about the creator’s journey</li>
      <li><span className="text-cyan-300 font-semibold">skills</span> — Display technical expertise</li>
      <li><span className="text-cyan-300 font-semibold">projects</span> — Explore projects</li>
      <li><span className="text-cyan-300 font-semibold">internships</span> — View internship experience</li>
      <li><span className="text-cyan-300 font-semibold">beyondcode</span> — Discover creative side beyond tech</li>
      <li><span className="text-cyan-300 font-semibold">values</span> — Core principles & beliefs</li>
    </ul>
  </div>
        <div className="border-t border-cyan-700/50 my-4"></div>

        <p className="text-center italic text-cyan-400/80 text-xs sm:text-sm">
          Press <span className="font-semibold text-cyan-200">Enter ↵</span> after each command.
        </p>
      </div>
    </div>

  {/* Right side — terminal */}
<div
  className="
    flex flex-col 
    w-full sm:flex-[1]
    h-[60vh] sm:h-full 
    p-4 sm:p-5 md:p-6
    overflow-y-hidden
    border-t sm:border-t-0 sm:border-l border-cyan-600/50
    bg-black/90
    transition-all duration-500
    shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]
  "
>

  <button
onClick={() => onExit && onExit()}
  className="
    absolute top-4 right-4 sm:top-6 sm:right-8 
    px-3 sm:px-4 py-1.5 sm:py-2 
    border border-cyan-400 text-cyan-300 
    hover:bg-cyan-300 hover:text-black 
    rounded-md text-xs sm:text-sm font-semibold 
    transition-all duration-300 
    shadow-[0_0_20px_rgba(0,255,255,0.3)]
  "
>
  EXIT LEVEL 4
</button>

  {/* Terminal Output */}
  <div className="flex-1  overflow-y-auto custom-scrollbar mb-4 sm:mb-0 pr-2 sm:pr-0">
{lines.map((l, i) => {
  const isCommand = l.trim().startsWith('>');
  return (
    <motion.p
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.05 }}
      className={`mb-1 text-xs sm:text-sm break-words ${
        isCommand
          ? 'text-white font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
          : 'text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]'
      }`}
    >
      {l}
    </motion.p>
  );
})}

  </div>

  {/* Terminal Input Bar */}
  <form
    onSubmit={submit}
    className="
      flex items-center 
      mt-auto z-10 
      bg-black/80 backdrop-blur-md 
      p-2 sm:p-3 
      border-t border-white-700/30 sm:border-none
      sticky bottom-0 sm:static
    "
  >
    <span className="mr-2 text-white-500 text-sm sm:text-base">{'>'}</span>
    <input
      ref={inputRef}
      value={input}
      onChange={e => setInput(e.target.value)}
      className="
        bg-transparent outline-none 
        text-white-300 caret-cyan-400 
        w-full text-sm sm:text-base
      "
    />
    {cursorVisible && (
      <span className="ml-1 text-cyan-400 text-sm sm:text-base">▍</span>
    )}
  </form>
</div>

{/* Hidden Level Overlay */}
{showHiddenLevel && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    className="
      absolute inset-0 z-[12000] 
      flex items-center justify-center 
      bg-black/90 backdrop-blur-lg 
      px-4 py-6 sm:px-6 md:px-8 overflow-y-auto custom-scrollbar
    "
  >
    <div
      className="
        w-full max-w-[90%] sm:max-w-2xl md:max-w-3xl 
        p-5 sm:p-6 md:p-8 
        border border-cyan-500/40 
        bg-black/70 rounded-2xl 
        shadow-[0_0_40px_rgba(0,255,255,0.3)] 
        text-cyan-200 font-mono leading-relaxed 
        text-sm sm:text-base md:text-lg 
        relative
      "
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 tracking-wide text-center sm:text-left">
        LEVEL 503 — THE TIMEOUT
      </h2>

      <p className="mb-4 text-cyan-100/90">
        System overload. Too many tabs. Too little sleep.
        <br />
        This is the moment I paused — not because I failed,
        <br />
        but because I forgot why I started.
        <br />
        And in that silence, I remembered:
        <br />
        you can reboot logic,
        <br />
        but you have to recharge passion.
      </p>

      <p className="mt-6 italic text-cyan-200/80">
        System reset.
        <br />
        Clearing fear... loading curiosity...
        <br />
        This is where everything began again.
        <br />
        Not from success — but from the decision to start one more time.
      </p>

      <p className="mt-8 text-cyan-400 font-semibold text-center text-sm sm:text-base">
         You found the hidden level. Curiosity always finds a backdoor. 
      </p>

      {/* 🚀 Exit Button */}
      <div
  className="
    flex justify-center sm:justify-end 
    mt-6 sm:mt-0
  "
>
  <button
onClick={() => onExit && onExit()}
    className="
      relative sm:absolute sm:top-6 sm:right-8
      px-4 py-2 
      border border-cyan-400 text-cyan-300 
      hover:bg-cyan-300 hover:text-black 
      rounded-md text-sm font-semibold 
      transition-all duration-300 
      shadow-[0_0_20px_rgba(0,255,255,0.3)]
    "
  >
    EXIT
  </button>
</div>

    </div>
  </motion.div>
)}

  </motion.div>  
);            
}             
