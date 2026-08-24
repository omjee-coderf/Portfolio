import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import NeuralBackdrop from './components/NeuralBackdrop';
import CinematicLoader from './components/CinematicLoader';
import TopNavbar from './components/TopNavbar';
import HeroSection from './components/HeroSection';
import ProjectCards from './components/ProjectCards';
import CredentialsCard from './components/CredentialsCard';
import QuickProfiles from './components/QuickProfiles';
import ContactSection from './components/ContactSection';
import GeminiChatbot from './components/GeminiChatbot';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Stagger animation variants for smooth entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 140,
        damping: 18,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#05070f] text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans scroll-smooth">
      {/* 1. Interactive 3D Three.js Neural Constellation */}
      <NeuralBackdrop />

      {/* Cinematic Loading Sequence */}
      <AnimatePresence>
        {isLoading && (
          <CinematicLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Navigation Bar */}
          <TopNavbar />

          {/* Main Cohesive Single-Page Content Canvas */}
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-12 w-full flex-grow">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-14"
            >
              {/* [1. UPPER COMPONENT: HERO ENTRY SECTION] */}
              <motion.div variants={itemVariants}>
                <HeroSection />
              </motion.div>

              {/* [2. LOWER COMPONENT: THE MINIMAL CARD GRID] */}
              <div id="projects" className="flex flex-col gap-8 scroll-mt-24">
                {/* Section Header */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between border-b border-neutral-800/80 pb-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Selected Projects
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400/90 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
                    Live Demonstrations
                  </span>
                </motion.div>

                {/* Project Cards (SIMPulse & Background Remover) */}
                <motion.section variants={itemVariants} aria-label="Projects">
                  <ProjectCards />
                </motion.section>

                {/* Credentials Section */}
                <motion.div
                  id="credentials"
                  variants={itemVariants}
                  className="scroll-mt-24 pt-4"
                >
                  <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-4 mb-6">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-sm shadow-sky-400" />
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Certifications & Badges
                    </h2>
                  </div>
                  <CredentialsCard />
                </motion.div>

                {/* Quick Profiles Section */}
                <motion.div
                  id="profiles"
                  variants={itemVariants}
                  className="pt-4"
                >
                  <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-4 mb-6">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-sm shadow-indigo-400" />
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Engineering Profiles
                    </h2>
                  </div>
                  <QuickProfiles />
                </motion.div>

                {/* [3. CONTACT & COMMUNICATION SECTION: CONNECT WITH OM JEE] */}
                <motion.div variants={itemVariants}>
                  <ContactSection />
                </motion.div>
              </div>
            </motion.div>
          </main>

          {/* Minimalist Bottom Footer */}
          <footer className="border-t border-neutral-800/60 bg-[#05070f]/90 py-6 mt-16 text-center text-xs font-mono text-neutral-500">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>© {new Date().getFullYear()} Om Jee • GLA University, Mathura</span>
              <span className="text-cyan-400/80">// Neural 3D Experience</span>
            </div>
          </footer>

          {/* Gemini AI Multi-Turn Chatbot */}
          <GeminiChatbot />
        </div>
      )}
    </div>
  );
}
