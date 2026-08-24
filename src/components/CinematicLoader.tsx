import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Sparkles } from 'lucide-react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING NEURAL WEIGHTS');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18) + 8;
        if (next > 40 && next < 80) {
          setStatusText('CALIBRATING 3D SYNAPSE MESH');
        } else if (next >= 80) {
          setStatusText('ACTIVATING VECTOR NODES');
        }
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      id="cinematic-loader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070f] text-white select-none cursor-pointer"
      onClick={onComplete}
      title="Click anywhere to enter immediately"
    >
      {/* Subtle Background Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Central Core Icon with Pulsing Halo */}
        <div className="relative mb-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-3 rounded-full border border-dashed border-cyan-500/40"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-md"
          />
          <div className="w-14 h-14 rounded-2xl bg-neutral-900/90 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50">
            <Cpu className="w-7 h-7 text-cyan-400" />
          </div>
        </div>

        {/* Progress Value */}
        <motion.div
          key={progress}
          initial={{ opacity: 0.7, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-mono font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400"
        >
          {progress}%
        </motion.div>

        {/* Dynamic Status Text */}
        <p className="mt-2 text-xs font-mono tracking-widest text-neutral-400 uppercase h-4">
          {statusText}
        </p>

        {/* Progress Bar Line */}
        <div className="w-48 h-1 mt-5 bg-neutral-800/80 rounded-full overflow-hidden border border-neutral-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Click to skip indicator */}
        <span className="mt-8 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-500/70" />
          Tap to enter
        </span>
      </div>
    </motion.div>
  );
}
