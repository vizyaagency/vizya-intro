import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { Suspense, useRef, useState } from 'react';
import gsap from 'gsap';

function VGold() {
  const { scene } = useGLTF('/VGLD1.glb');
  const ref = useRef();
  return (
    <motion.group
      ref={ref}
      position={[1.8, 0, 0]}
      animate={{ rotateY: [0, Math.PI * 2] }}
      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
    >
      <primitive object={scene} scale={1.1} />
    </motion.group>
  );
}

function VBlue() {
  const { scene } = useGLTF('/Vbleu1.glb');
  const ref = useRef();
  return (
    <motion.group
      ref={ref}
      position={[-1.8, 0, 0]}
      animate={{ rotateY: [0, Math.PI * 2] }}
      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
    >
      <primitive object={scene} scale={1.1} />
    </motion.group>
  );
}

export default function VizyaSelector() {
  const [hover, setHover] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleClick = (path) => {
    if (transitioning) return;
    setTransitioning(true);
    gsap.to('.transition-overlay', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => window.location.href = path,
    });
  };

  return (
    <div className="w-screen h-screen relative bg-black overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <VBlue />
          <VGold />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex">
        <div
          className="w-1/2 h-full flex flex-col justify-center items-center text-white hover:bg-white/5 transition cursor-pointer"
          onClick={() => handleClick('/ecom')}
          onMouseEnter={() => setHover('ecom')}
          onMouseLeave={() => setHover(null)}
        >
          <p className="text-3xl font-semibold">VIZYA</p>
          <p className="text-xl opacity-70">ECOM</p>
        </div>
        <div
          className="w-1/2 h-full flex flex-col justify-center items-center text-white hover:bg-white/5 transition cursor-pointer"
          onClick={() => handleClick('/agency')}
          onMouseEnter={() => setHover('agency')}
          onMouseLeave={() => setHover(null)}
        >
          <p className="text-3xl font-semibold">VIZYA</p>
          <p className="text-xl opacity-70">AGENCY</p>
        </div>
      </div>

      <div className="transition-overlay pointer-events-none absolute inset-0 bg-black opacity-0 z-50" />
    </div>
  );
}