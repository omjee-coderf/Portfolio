import { ExternalLink, Radio, Scissors } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Project 1: SIMPulse */}
      <TiltCard
        id="card-project-simpulse"
        className="group relative rounded-2xl bg-neutral-900/60 border border-cyan-500/20 backdrop-blur-xl p-7 shadow-xl shadow-cyan-950/20 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between h-full"
      >
        <div style={{ transform: 'translateZ(30px)' }}>
          {/* Header Badge & Icon */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-cyan-400/90 uppercase px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
              ML & IoT Stream
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
            SIMPulse
          </h3>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-neutral-800/80" style={{ transform: 'translateZ(40px)' }}>
          <a
            id="btn-view-simpulse"
            href="https://vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <span>View Live Project</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </TiltCard>

      {/* Project 2: Background Remover */}
      <TiltCard
        id="card-project-bg-remover"
        className="group relative rounded-2xl bg-neutral-900/60 border border-indigo-500/20 backdrop-blur-xl p-7 shadow-xl shadow-indigo-950/20 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between h-full"
      >
        <div style={{ transform: 'translateZ(30px)' }}>
          {/* Header Badge & Icon */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-400 transition-all">
              <Scissors className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-indigo-400/90 uppercase px-2.5 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/20">
              Vision AI
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
            Background Remover
          </h3>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-neutral-800/80" style={{ transform: 'translateZ(40px)' }}>
          <a
            id="btn-view-bg-remover"
            href="https://vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <span>View Live Project</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </TiltCard>
    </div>
  );
}
