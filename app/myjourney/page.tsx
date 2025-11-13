'use client';
/* @jsxImportSource @react-three/fiber */
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import TerminalInterface from '@/components/reactbits/TerminalInterface';
import SocialDock from '../../components/reactbits/SocialDock';

useGLTF.preload('/models/spaceship.glb');
useGLTF.preload('/models/space_ship_hallway.glb');
useGLTF.preload('/models/room_draco.glb');


const SHIP_POS: [number, number, number] = [0, -1, 0];
const FINAL_CAM_POS = new THREE.Vector3(0, 90, 180);


function ResponsiveCamera() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: w, innerHeight: h } = window;

      // ✅ Only apply aspect ratio if camera is a PerspectiveCamera
      if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
        const persp = camera as THREE.PerspectiveCamera;
        persp.aspect = w / h;
        persp.updateProjectionMatrix();
      }

      gl.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // adjust immediately
    return () => window.removeEventListener("resize", handleResize);
  }, [camera, gl]);

  return null;
}


/** Manual raycast catcher — turns clicks into intersects for ship/hitbox */
function ClickCatcher({
  targets,
  onHit,
}: {
  targets: React.MutableRefObject<THREE.Object3D | null>[];
  onHit: () => void;
}) {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2()).current;

  useEffect(() => {
    const handle = (ev: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const objs: THREE.Object3D[] = [];
      for (const r of targets) if (r.current) objs.push(r.current);
      if (objs.length === 0) return;

      const hits = raycaster.intersectObjects(objs, true);
      if (hits.length > 0) {
        onHit();
      }
    };

    gl.domElement.addEventListener('pointerdown', handle, { passive: true });
    return () => gl.domElement.removeEventListener('pointerdown', handle as any);
  }, [camera, gl, onHit, raycaster, targets]);

  return null;
}

function SpaceshipModel({
  groupRef,
  hitboxRef,
}: {
  groupRef: React.MutableRefObject<THREE.Group | null>;
  hitboxRef: React.MutableRefObject<THREE.Mesh | null>;
}) {
  const { scene } = useGLTF('/models/spaceship.glb');

  return (
    <Float floatIntensity={1.2} rotationIntensity={0.6} speed={2}>
      <group
        ref={groupRef}
        position={SHIP_POS}
        scale={1.5}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        {/* Cyan accent lighting hint for the model */}
        <primitive object={scene} />
        <mesh ref={hitboxRef} position={[0, 0, 0]}>
          <sphereGeometry args={[2.5, 24, 24]} />
          <meshBasicMaterial transparent opacity={0} color="#00ffff" />
        </mesh>
      </group>
    </Float>
  );
}

/** Cinematic intro rotation then settle to FINAL_CAM_POS */
function IntroCamera({ duration = 4.0 }: { duration?: number }) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const [phase, setPhase] = useState<'spin' | 'settle' | 'done'>('spin');
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    // Start the camera from a side position to see the rotation
    camera.position.set(-140, 110, -140);
    camera.lookAt(...SHIP_POS);
  }, [camera]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;
    controlsRef.current.target.set(...SHIP_POS);

    if (phase === 'spin') {
      // Slowly orbit around the ship
      const rotSpeed = 0.8; // radians per second
      const px = camera.position.x, pz = camera.position.z;
      const r = Math.hypot(px - SHIP_POS[0], pz - SHIP_POS[2]) || 1;
      const theta = Math.atan2(pz - SHIP_POS[2], px - SHIP_POS[0]) + rotSpeed * delta;
      camera.position.set(
        SHIP_POS[0] + Math.cos(theta) * r,
        camera.position.y,
        SHIP_POS[2] + Math.sin(theta) * r
      );
      camera.lookAt(...SHIP_POS);

      if (startTime.current === null) startTime.current = state.clock.elapsedTime;
      if (state.clock.elapsedTime - startTime.current >= duration) {
        setPhase('settle');
      }
    }

    // Smooth transition to final resting position
    else if (phase === 'settle') {
      camera.position.lerp(FINAL_CAM_POS, Math.min(1, delta * 1.5));
      camera.lookAt(...SHIP_POS);
      if (camera.position.distanceTo(FINAL_CAM_POS) < 0.5) {
        camera.position.copy(FINAL_CAM_POS);
        setPhase('done');
      }
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={40}
      maxDistance={400}
      enabled={phase === 'done'} // Disable control until animation ends
    />
  );
}

function InsideScene() {
  const hallway = useGLTF('/models/space_ship_hallway.glb');
  const room = useGLTF('/models/room_draco.glb');
  const { camera, scene } = useThree();
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    if (!hasEnteredRef.current) {
      camera.position.set(0, 2, 8);
      camera.lookAt(0, 1, 0);
      hasEnteredRef.current = true;
    }

    // Neutral white lights — keep original GLB colors
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.6);
    const pointLight = new THREE.PointLight('#ffffff', 1.2, 100);
    pointLight.position.set(0, 5, 10);
    scene.add(ambientLight, pointLight);

    return () => {
      scene.remove(ambientLight, pointLight);
    };
  }, [camera, scene]);
  
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(hallway.scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    hallway.scene.position.sub(center);
    room.scene.position.set(0, 0, -(size.z / 2 + 5));
  }, [hallway.scene, room.scene]);

  return (
    <>
      {/* Neutral background to let textures pop */}
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[4, 8, 2]} intensity={1.5} color="#ffffff" />
      <group>
        <primitive object={hallway.scene} />
        <primitive object={room.scene} />
      </group>
    </>
  );
}



/** Fly camera close to spaceship entrance (stops outside) */
function FlyToEntranceCamera({
  duration = 2.0,
  onDone,
}: {
  duration?: number;
  onDone: () => void;
}) {
  const { camera } = useThree();
  const tRef = useRef(0);
  const start = useRef(camera.position.clone());

  // Smooth cyan glow flight path
  const curve = useRef(
    new THREE.CatmullRomCurve3(
      [
        start.current,                // outer position (current)
        new THREE.Vector3(0, 2, 10),  // approach the door
        new THREE.Vector3(0, 1.5, 3), // at the entrance
        new THREE.Vector3(0, 1.2, -6), // inside middle
        new THREE.Vector3(0, 1.2, -14) // deep inside
      ],
      false,
      'catmullrom',
      0.04
    )
  ).current;

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    tRef.current = Math.min(1, tRef.current + delta / duration);
    const p = curve.getPoint(tRef.current);
    camera.position.copy(p);
    camera.lookAt(0, 0, 0);

    if (tRef.current >= 1) onDone();
  });

  return null;
}

function FlyInsideCamera({
  duration = 1.6,
  onMidReveal,
  onDone
}: { duration?: number; onMidReveal: () => void; onDone: () => void }) {
  const { camera } = useThree();
  const tRef = useRef(0);
  const revealed = useRef(false);

  // Read the *current* camera as the start point
  const start = useRef(camera.position.clone());
  const curve = useRef(
    new THREE.CatmullRomCurve3(
      [
        start.current,               // outer position (current)
        new THREE.Vector3(0, 2, 10), // approach the door
        new THREE.Vector3(0, 1.5, 3),// at the entrance
        new THREE.Vector3(0, 1.2, -6), // inside middle
        new THREE.Vector3(0, 1.2, -14) // deep inside
      ],
      false,
      'catmullrom',
      0.04
    )
  ).current;

  useEffect(() => {
    camera.lookAt(0, 2, 10);
  }, [camera]);

  useFrame((_, delta) => {
    tRef.current = Math.min(1, tRef.current + delta / duration);
    const p = curve.getPoint(tRef.current);
    camera.position.copy(p);
    camera.lookAt(0, 2, 10);

    if (!revealed.current && tRef.current > 0.55) {
      revealed.current = true;
      onMidReveal(); // show inside scene mid-flight
    }
    if (tRef.current >= 1) onDone(); // land inside
  });

  return null;
}

function FlyToRoomCamera({
  duration = 3.5,
  onDone,
}: {
  duration?: number;
  onDone: () => void;
}) {
  const { camera } = useThree();
  const tRef = useRef(0);
  const start = useRef(camera.position.clone());

  // Fly *into* the room and stop there — no bounce back
  const curve = useRef(
    new THREE.CatmullRomCurve3(
      [
        start.current,
        new THREE.Vector3(0, 1.2, -14), // corridor mid
        new THREE.Vector3(0, 1.2, -18), // corridor end
        new THREE.Vector3(0, 1.2, -15), // just inside room
      ],
      false,
      'catmullrom',
      0.03
    )
  ).current;

  useFrame((_, delta) => {
    tRef.current = Math.min(1, tRef.current + delta / duration);

    // Add ease-out for a smoother stop
    const easedT = 1 - Math.pow(1 - tRef.current, 3);
    const p = curve.getPoint(easedT);

    camera.position.copy(p);
    camera.lookAt(0, 1.3, -25); // look slightly deeper inside room

    if (tRef.current >= 1) onDone();
  });

  return null;
}

function PulseLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const pulse = 1.5 + Math.sin(clock.elapsedTime * 2) * 0.5;
      lightRef.current.intensity = pulse * 3;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={position}
      color="#00ffff"     // 💡 changed from greenish to bright cyan
      intensity={3}
      distance={2}
      decay={2}
    />
  );
}


export default function MyJourneyPage() {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [stage, setStage] = useState<
    | 'intro'
    | 'level1'
    | 'toEntrance'
    | 'level2'
    | 'flyin'
    | 'inside'
    | 'level3'
    | 'level4'
    | 'level4Transition'
    | 'terminalPrompt'
    | 'level5'
  >('intro');

  const [showInside, setShowInside] = useState(false);
  const [points, setPoints] = useState(0);
const [showSummary, setShowSummary] = useState(false);

    // Reset states when returning to intro
  useEffect(() => {
    if (stage === 'intro') {
      setZoomedIn(false);
      setShowInside(false);
    }
  }, [stage]);
 
  
    const shipGroupRef = useRef<THREE.Group | null>(null);
  const hitboxRef = useRef<THREE.Mesh | null>(null);

  // 💡 Central exit handler to trigger summary popup anywhere
const handleExit = () => {
  setShowSummary(true);
  setStage('intro');
};

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas
  camera={{ position: [0, 90, 180], fov: 50 }}
  style={{ touchAction: 'none', pointerEvents: 'auto' }} 
>
  <ResponsiveCamera />  {/* ✅ one global resize listener */}
  {/* Neutral lights for realistic spaceship color */}
  <ambientLight intensity={0.8} color="#ffffff" />
  <directionalLight position={[5, 10, 5]} intensity={1.8} color="#ffffff" />


          {/* Outside scene — visible until we are fully inside */}
          {!(stage === 'inside' || stage === 'level3' || stage === 'level4' || stage === 'terminalPrompt') && (
            <Suspense fallback={null}>
              <SpaceshipModel groupRef={shipGroupRef} hitboxRef={hitboxRef} />
            </Suspense>
          )}

          {/* Inside scene — becomes visible mid-flight and stays on */}
          {(stage === 'flyin' ||
            stage === 'inside' ||
            stage === 'level3' ||
            stage === 'level4' ||
            stage === 'level4Transition' ||
            stage === 'terminalPrompt' ||
            stage === 'level5') && (
            <Suspense fallback={null}>
              <InsideScene />
            </Suspense>
          )}

          {/* Intro interactions & camera */}
          {(stage === 'intro' || stage === 'level1') && (
            <>
              <ClickCatcher targets={[shipGroupRef, hitboxRef]} onHit={() => setStage('level1')} />
              <IntroCamera duration={2.0} />
            </>
          )}

          {/* Fly-in animation (no user controls here) */}
          {stage === 'flyin' && (
            <FlyInsideCamera
              duration={1.6}
              onMidReveal={() => setShowInside(true)}
              onDone={() => setStage('inside')}
            />
          )}

          {/* Fly to spaceship entrance (for Level 2) */}
          {stage === 'toEntrance' && (
            <FlyToEntranceCamera duration={2.0} onDone={() => setStage('level2')} />
          )}

          {/* Enable controls only after we’re inside */}
          {stage === 'inside' && (
            <OrbitControls
              enablePan={false}
              minDistance={2}
              maxDistance={20}
              onChange={(e) => {
                const distance = e.target.object.position.length();
                // Trigger Level 3 when zoomed in close enough
                if (distance < 8 && !zoomedIn) {
                  setZoomedIn(true);
                  setTimeout(() => setStage('level3'), 800); // cinematic delay
                }
              }}
            />
          )}

          {stage === 'level4' && (
  <FlyToRoomCamera
    duration={3.5}
    onDone={() => {
      if (stage !== 'level4') setStage('level4');  // ✅ Avoid duplicate re-trigger
    }}
  />
)}

{stage === 'level4Transition' && (
  <FlyToRoomCamera
    key="fly-to-terminal"
    duration={3.5}
    onDone={() => setStage('terminalPrompt')} // ✅ Ensures orb appears
  />
)}


          {stage === 'terminalPrompt' && (
            <>
              {/* 🌟 Cyan central light */}
              <pointLight
                position={[0, 1.4, -18.8]}
                color="#00ffff"
                intensity={3.5}
                distance={8}
              />

              {/* ⚪ Glowing cyan energy orb */}
              <Float floatIntensity={0.5} rotationIntensity={0}>
                <mesh position={[0, 1.4, -18.8]} onClick={() => setStage('level5')}>
                  <sphereGeometry args={[0.15, 64, 64]} />
                  <meshStandardMaterial
                    emissive="#00ffff"
                    emissiveIntensity={15}
                    color="#ffffff"
                    metalness={0.4}
                    roughness={0.1}
                    toneMapped={false}
                  />
                </mesh>

                {/* Soft cyan outer aura */}
                <mesh position={[0, 1.4, -18.8]}>
                  <sphereGeometry args={[0.4, 64, 64]} />
                  <meshBasicMaterial
                    color="#00eaff"
                    transparent
                    opacity={0.5}
                    side={THREE.BackSide}
                  />
                </mesh>
              </Float>

              {/* ✨ Pulsating cyan light */}
              <PulseLight position={[0, 1.4, -18.8]} />
            </>
          )}

        </Canvas>

      </div>

{/* 🪙 Points HUD — Futuristic Glow Badge */}
<div
  className="absolute top-5 left-6 z-[15000] flex items-center gap-2 px-4 py-2 
             bg-black/40 border border-cyan-400/50 rounded-xl 
             shadow-[0_0_20px_rgba(0,255,255,0.4)] backdrop-blur-md
             text-cyan-200 font-semibold text-sm sm:text-base tracking-widest 
             hover:shadow-[0_0_35px_rgba(0,255,255,0.8)] transition-all duration-500"
>
  {/* Glowing animated orb */}
  <div className="relative w-4 h-4">
    <div className="absolute inset-0 rounded-full bg-cyan-400 blur-[2px] animate-ping" />
    <div className="absolute inset-[3px] rounded-full bg-cyan-300" />
  </div>

  {/* Points text */}
  <span className="text-cyan-100">
     <span className="text-cyan-300 font-bold">{points}</span> points
  </span>
</div>


{/* Guide (intro only) */}
<AnimatePresence>
  {stage === 'intro' && (
    <motion.div
      initial={{ opacity: 0, y: -40, scale: 0.95 }}
      animate={{
        opacity: [0.8, 1, 0.8],
        y: [0, -10, 0],
        scale: [1, 1.02, 1],
        textShadow: [
          "0 0 10px rgba(0,255,255,0.8)",
          "0 0 25px rgba(0,240,255,0.9)",
          "0 0 10px rgba(0,255,255,0.8)",
        ],
      }}
      transition={{
        delay: 1,
        duration: 2.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className="absolute top-[8%] left-1/2 -translate-x-1/2 
                 z-[9999] flex flex-col items-center justify-center
                 text-2xl md:text-3xl font-semibold text-cyan-200 
                 drop-shadow-[0_0_25px_rgba(0,255,255,0.9)] 
                 pointer-events-none select-none leading-snug"
    >
      {/* Hologram Text Card */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          textShadow: [
            "0 0 10px rgba(0,255,255,0.8)",
            "0 0 25px rgba(0,240,255,0.9)",
            "0 0 10px rgba(0,255,255,0.8)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="relative px-6 py-3 rounded-xl bg-cyan-500/10 
                   border border-cyan-300/50 backdrop-blur-md
                   shadow-[0_0_30px_rgba(0,255,255,0.5)] text-center bg-black"
      >
        Click the <span className="text-cyan-300 font-bold">spaceship</span> to begin discovering my journey<br/>
        <p className='text-sm'>(Switch to destop site/mode for better experience)</p>
      </motion.div>

      {/* Floating glow ring behind */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute w-[260px] h-[70px] border border-cyan-400/30 rounded-full blur-[3px]"
      />

      {/* Holographic light orbs */}
      <motion.div
        className="absolute top-[-12px] w-3 h-3 rounded-full bg-cyan-300/80 blur-[4px]"
        animate={{
          y: [0, -6, 0],
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[-12px] w-2 h-2 rounded-full bg-cyan-400/70 blur-[3px]"
        animate={{
          y: [0, 6, 0],
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </motion.div>
  )}
</AnimatePresence>


{/* Level 1 overlay — Next triggers fly-in */}
<AnimatePresence>
  {stage === 'level1' && (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-[10000] flex items-center justify-center px-3 sm:px-6 md:px-10"
    >
      <div className="bg-black/70 border border-cyan-400/40 rounded-2xl 
               p-4 sm:p-6 md:p-8 
               w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%] max-w-3xl mx-auto 
               backdrop-blur-md shadow-[0_0_40px_rgba(0,255,255,0.25)] 
               overflow-y-auto custom-scrollbar max-h-[85vh]"
>
        <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-4xl font-bold text-cyan-300 mb-4">
          INTRO TO GAMIFIED JOURNEY
        </h2>

        <p className="text-cyan-100/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed leading-relaxed">
          <span className="text-cyan-300 font-semibold">Welcome aboard, Explorer!</span><br />
          Your mission begins now. This interactive journey has <span className="text-cyan-200 font-medium">five exciting levels</span>, each revealing a part of my story and growth.
        </p>

        <ul className="mt-4 space-y-1 text-cyan-100/90 text-sm md:text-base">
          <li> <span className="text-cyan-300 font-medium">Level 1 — The Arrival</span> <span className="text-cyan-200">· 10 points</span></li>
          <li> <span className="text-cyan-300 font-medium">Level 2 — The Boarding</span> <span className="text-cyan-200">· 10 points</span></li>
          <li> <span className="text-cyan-300 font-medium">Level 3 — The Exploration</span> <span className="text-cyan-200">· 10 points</span></li>
          <li><span className="text-cyan-300 font-medium">Level 4 — The Guided Terminal</span> <span className="text-cyan-200">+5 points for each command</span></li>
          <li> <span className="text-cyan-300 font-medium">Level 5 — The Timeout</span> <span className="text-cyan-200">· 50 points</span> 🕵️‍♂️</li>
        </ul>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mt-4 text-cyan-100/80 italic">
          <span className="text-cyan-300 font-semibold">Note:</span> Level 5 is a secret stage, unlocked only by solving a puzzle.
        </p>

        <p className="mt-5 text-cyan-100/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium">
          Ready to start your mission, Captain?
        </p>

        <div className="mt-6 flex gap-3">
          <button
  onClick={() => {
    // 🪙 Add points when completing Level 1
    setPoints((prev) => prev + 0);
    setShowInside(false);
    setStage('toEntrance');
  }}
  className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 transition"
>
  NEXT
</button>

          <button
onClick={handleExit}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white transition"
          >
            NOT NOW
          </button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

{/* Level 2 overlay — continue into ship */}
<AnimatePresence>
  {stage === 'level2' && (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-0 z-[10000] flex items-center justify-center px-3 sm:px-6 md:px-10"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
className="bg-black/70 border border-cyan-400/40 rounded-2xl 
p-4 sm:p-6 md:p-8 
w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%] max-w-3xl mx-auto 
backdrop-blur-md shadow-[0_0_40px_rgba(0,255,255,0.25)] 
overflow-y-auto custom-scrollbar max-h-[85vh]"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent mb-5 drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]"
        >
          LEVEL 1 — THE ARRIVAL
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="text-cyan-100/90 text-base md:text-lg leading-relaxed italic tracking-wide"
        >
          Plot twist — I didn’t start in tech at all.
          <br />
          I was a <span className="text-cyan-300 font-semibold not-italic">biology student</span>, spending my days talking about cells while secretly wondering how websites magically appeared when you clicked a link.
          <br />
          One day I realized... maybe I like{" "}
          <span className="text-cyan-400 font-semibold not-italic">“network connections”</span> more than{" "}
          <span className="text-cyan-400 font-semibold not-italic">“neural connections.”</span>
          <br />
          <br />
          So, I ditched the microscope, opened my first code editor, and instantly thought,{" "}
          <span className="text-cyan-300 font-semibold not-italic">“what in the world is this?”</span>
          <br />
          No idea what I was doing — but curiosity turned into obsession, and I’ve been debugging my way through the universe ever since.
          <br />
          <br />
          <span className="not-italic font-semibold text-cyan-200">
            Welcome to where it all began — the accidental start of a not-so-accidental journey.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex justify-left"
        >
          <button
  onClick={() => {
    // 🪙 Level 1 → Level 2 reward (+10 points)
    setPoints((prev) => prev + 10);
    setStage('flyin');
  }}
  className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 
             border border-cyan-400/50 text-cyan-200 transition
             shadow-[0_0_15px_rgba(0,255,255,0.3)] 
             hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]"
>
  NEXT
</button>

          <button
onClick={handleExit}
            className="px-4 py-2 mx-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white transition"
          >
            BACK
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
{/* Level 3 overlay — Zoom in instruction after entering */}
<AnimatePresence>
  {stage === 'inside' && (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="absolute inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
    >
<motion.div
  animate={{
    scale: [1, 1.05, 1],
    opacity: [0.85, 1, 0.85],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  }}
  className="text-3xl md:text-4xl font-semibold 
             text-[#00eaff] 
             drop-shadow-[0_0_35px_rgba(0,255,255,0.9)] 
             tracking-wide 
             text-center 
             select-none 
             px-6 py-3 
             rounded-xl 
             bg-black/50 
             backdrop-blur-md 
             border border-cyan-400/30 
             shadow-[0_0_25px_rgba(0,255,255,0.4)]"
>
  You’re inside! Use your <span className="text-[#aaffff] font-bold">scroll </span> or <span className="text-[#aaffff] font-bold">pinch </span> to zoom in
</motion.div>

    </motion.div>
  )}
</AnimatePresence>

{/* Level 3 — After zoom-in inside hallway */}
<AnimatePresence>
  {stage === 'level3' && (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-0 z-[10000] flex items-center justify-center px-3 sm:px-6 md:px-10"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
className="bg-black/70 border border-cyan-400/40 rounded-2xl 
p-4 sm:p-6 md:p-8 
w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%] max-w-3xl mx-auto 
backdrop-blur-md shadow-[0_0_40px_rgba(0,255,255,0.25)] 
overflow-y-auto custom-scrollbar max-h-[85vh]"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent mb-5 drop-shadow-[0_0_25px_rgba(0,255,255,0.4)] text-center"
        >
          LEVEL 2 — THE BOARDING
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="text-cyan-100/90 text-base md:text-lg leading-relaxed italic tracking-wide text-left"
        >
          <span className="not-italic font-semibold text-cyan-200">
            Welcome to Level 2 — where chaos became curiosity, and curiosity became code.
          </span>
          <br /><br />
          Once I stepped into tech, there was no going back. Servers, APIs, databases — everything felt like secret rooms waiting to be unlocked.
          <br />
          At first, I built random stuff just to see if it wouldn’t explode{" "}
          <span className="text-cyan-300 font-semibold not-italic">(spoiler: it did)</span>.
          <br />
          Every crash, every bug, every “why is this not working?” moment taught me more than any textbook ever could.
          <br /><br />
          Soon, my tutorials turned into projects, and my “what the hell???” moments turned into “ohhh, that’s how it works.”
          <br />
          Slowly, I wasn’t just exploring tech anymore — I was{" "}
          <span className="text-cyan-300 font-semibold not-italic">living</span> it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex justify-left"
        >
          <button
  onClick={() => {
    // 🪙 Level 2 → Level 3 reward (+10 points)
    setPoints((prev) => prev + 10);
    setStage("level4");
  }}
  className="px-5 py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 
             border border-cyan-400/50 text-cyan-200 font-medium transition 
             shadow-[0_0_20px_rgba(0,255,255,0.25)] 
             hover:shadow-[0_0_35px_rgba(0,255,255,0.5)]"
>
  NEXT
</button>

          <button
onClick={handleExit}
            className="ml-3 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition"
          >
            BACK
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
  {stage === 'level4' && (
    <motion.div
      key="level4"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-0 z-[10000] flex items-center justify-center px-3 sm:px-6 md:px-10"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
className="bg-black/70 border border-cyan-400/40 rounded-2xl 
p-4 sm:p-6 md:p-8 
w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%] max-w-3xl mx-auto 
backdrop-blur-md shadow-[0_0_40px_rgba(0,255,255,0.25)] 
overflow-y-auto custom-scrollbar max-h-[85vh]"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent mb-6 text-center drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]"
        >
          LEVEL 3 — THE DESK
        </motion.h2>

        {/* Narrative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.4 }}
          className="text-cyan-100/90 text-base md:text-lg leading-relaxed tracking-wide italic space-y-2"
        >
          <span className="not-italic font-semibold text-cyan-200">
            Welcome to my desk — the place where caffeine, chaos, and curiosity formed a start-up of their own.
          </span>
          <br /><br />
          This is where things got real — from building a full event-management system that handled people and plans,
          to designing an AI-driven urban-resilience project that predicted floods and helped cities breathe smarter.
          <br /><br />
          Half my nights were spent fighting bugs, API tantrums, and model errors that refused to cooperate — but somehow, it all clicked.
          I wasn’t just learning anymore; I was building things that meant something.
          <br /><br />
          This desk became my lab — where I mixed creativity with logic and realized I could build worlds with code.
          <br /><br />
          Every bug taught me patience, every “aha!” moment pushed me deeper, and every small success made me fall in love with what I was doing.
          <br /><br />
          This is where I stopped being curious about tech — and started belonging to it.
          <br /><br />
          I realized I didn’t just want to work with tech — I wanted to shape it.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-10 flex justify-left"
        >
<button
  onClick={() => {
    // 🪙 Level 3 → Level 4 reward (+10 points)
    setPoints((prev) => prev + 10);
    setStage("level4Transition");
  }}
  className="px-6 py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 
             border border-cyan-400/50 text-cyan-200 font-medium transition 
             shadow-[0_0_25px_rgba(0,255,255,0.3)] 
             hover:shadow-[0_0_40px_rgba(0,255,255,0.5)]"
>
  NEXT
</button>


          <button
onClick={handleExit}            
className="ml-3 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition"
          >
            BACK
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* UI overlay (outside Canvas) */}
<AnimatePresence>
  {stage === 'terminalPrompt' && (
    <motion.div
      className="absolute inset-0 flex items-start my-20 justify-center pb-16 z-[10000] pointer-events-none select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: [0.8, 1, 0.8], y: [0, -6, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    >
      <p className="text-5xl md:text-4xl sm:text-sm md:text-base lg:text-lg text-center leading-relaxed tracking-wide 
             
             select-none 
             px-6 py-3 
             rounded-xl 
             bg-black/50 
             backdrop-blur-md 
             border border-cyan-400/30 
             shadow-[0_0_25px_rgba(0,255,255,0.4)] font-semibold text-[#00eaff] drop-shadow-[0_0_35px_rgba(0,255,255,0.9)] ">

        Tap the radiant orb to unlock Developer Mode
      </p>
    </motion.div>
  )}
</AnimatePresence>

{/* Level 5 — Guided Developer Terminal */}
<AnimatePresence>
  {stage === 'level5' && (
    <motion.div
      key="level5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 z-[12000] bg-gradient-to-b from-black via-[#030713] to-[#041026]"
    >
      {/* Centered text container with safe margins */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.2 }}
        className="absolute inset-0 flex items-center justify-center 
                   px-3 sm:px-6 md:px-10 text-center"
      >
        <p
          className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold 
                     text-cyan-400 tracking-widest 
                     drop-shadow-[0_0_25px_rgba(0,255,255,0.4)] 
                     leading-snug max-w-[90%] sm:max-w-[80%] 
                     mx-auto"
        >
          INITIALIZING TERMINAL&nbsp;. . .
        </p>
      </motion.div>

      {/* 🧠 Reveal the actual terminal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="w-full h-full overflow-hidden"
      >
<TerminalInterface
  onExit={() => {
    setShowSummary(true);
    setStage('intro');
  }}
  points={points}
  setPoints={setPoints}
/>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<div className="mt-4 sm:mt-6">
  <SocialDock />
</div>

{/* 🏆 Points Summary Modal */}
<AnimatePresence>
  {showSummary && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-b from-[#001a1a]/90 to-[#001212]/70 border border-cyan-400/40 rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.4)] p-8 text-center max-w-md mx-6"
      >
        <h2 className="text-3xl font-bold text-cyan-300 mb-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]">
          Mission Complete 
        </h2>
        <p className="text-cyan-100/90 text-lg mb-6 leading-relaxed">
          You’ve finished your developer journey!<br />
          <span className="text-cyan-300 font-semibold">
            Total Points Earned: {points}
          </span>
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setPoints(0);
              setShowSummary(false);
            }}
            className="px-5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 font-medium transition shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,255,255,0.5)]"
          >
            Restart Mission
          </button>

          <button
            onClick={() => setShowSummary(false)}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}