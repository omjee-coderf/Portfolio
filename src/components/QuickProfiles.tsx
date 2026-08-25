import { ExternalLink, Github, Code2, Linkedin } from 'lucide-react';
import TiltCard from './TiltCard';

export default function QuickProfiles() {
  const profiles = [
    {
      id: 'github',
      name: 'GitHub',
      metric: '3 Repositories',
      icon: Github,
      url: 'https://github.com/omjee-coderf',
      gradient: 'from-neutral-800 to-neutral-900',
      border: 'border-neutral-700/50 hover:border-neutral-500',
      btnGradient: 'from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700',
      accentColor: 'text-neutral-200',
      tagColor: 'text-neutral-400 bg-neutral-800/80 border-neutral-700',
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      metric: '6+ Solved',
      icon: Code2,
      url: 'https://leetcode.com/u/Om_Jee_1983/',
      gradient: 'from-amber-950/40 to-neutral-900',
      border: 'border-amber-500/20 hover:border-amber-400/50',
      btnGradient: 'from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600',
      accentColor: 'text-amber-400',
      tagColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      metric: 'Connect',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/om-jee-b5261342b/',
      gradient: 'from-blue-950/40 to-neutral-900',
      border: 'border-blue-500/20 hover:border-blue-400/50',
      btnGradient: 'from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600',
      accentColor: 'text-blue-400',
      tagColor: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
      {profiles.map((profile) => {
        const IconComponent = profile.icon;
        return (
          <TiltCard
            key={profile.id}
            id={`profile-card-${profile.id}`}
            className={`group relative rounded-2xl bg-gradient-to-b ${profile.gradient} border ${profile.border} backdrop-blur-xl p-5 shadow-lg transition-all duration-300 flex flex-col justify-between`}
          >
            <div style={{ transform: 'translateZ(25px)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900/90 border border-neutral-700/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconComponent className={`w-5 h-5 ${profile.accentColor}`} />
                </div>
                <span
                  className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border ${profile.tagColor}`}
                >
                  {profile.metric}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                {profile.name}
              </h4>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800/80" style={{ transform: 'translateZ(35px)' }}>
              <a
                id={`btn-profile-${profile.id}`}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r ${profile.btnGradient} text-white font-medium text-xs tracking-wide shadow-md transition-all duration-200 active:scale-[0.98]`}
              >
                <span>View Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
}
