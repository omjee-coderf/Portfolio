import { Award, ShieldCheck, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

export default function CredentialsCard() {
  return (
    <TiltCard
      id="card-azure-credential"
      className="group relative rounded-2xl overflow-hidden p-[1.5px] w-full"
    >
      {/* Animated Glowing Border Gradient */}
      <div className="absolute -inset-[200%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#0284c7,#38bdf8,#818cf8,#c084fc,#38bdf8,#0284c7)] opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      {/* Card Inner Body */}
      <div className="relative rounded-2xl bg-neutral-950/90 backdrop-blur-2xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5" style={{ transform: 'translateZ(30px)' }}>
          {/* Azure Credential Shield Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-sky-950/60 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500/90 flex items-center justify-center text-neutral-950 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase">
                Official Credential
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors">
              Microsoft Azure AZ-900 Certification
            </h3>
          </div>
        </div>

        {/* Action Link Button */}
        <div className="w-full md:w-auto flex-shrink-0" style={{ transform: 'translateZ(40px)' }}>
          <a
            id="btn-view-credential"
            href="https://learn.microsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <span>View Credential</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}
