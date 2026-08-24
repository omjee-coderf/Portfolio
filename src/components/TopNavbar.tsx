import { Mail, ArrowUpRight, Bot } from 'lucide-react';

export default function TopNavbar() {
  const triggerChat = () => {
    const btn = document.getElementById('btn-open-gemini-chat');
    if (btn) {
      btn.click();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#05070f]/70 border-b border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Monogram */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            OJ
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              Om Jee
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
              SWE & ML
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-neutral-300">
          <a
            href="#about"
            className="hover:text-cyan-400 transition-colors py-1"
          >
            // about
          </a>
          <a
            href="#terminal"
            className="hover:text-cyan-400 transition-colors py-1"
          >
            // workstation
          </a>
          <a
            href="#projects"
            className="hover:text-cyan-400 transition-colors py-1"
          >
            // projects
          </a>
          <a
            href="#credentials"
            className="hover:text-cyan-400 transition-colors py-1"
          >
            // credentials
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-400 transition-colors py-1"
          >
            // contact
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={triggerChat}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-cyan-300 text-xs font-medium tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          <a
            id="btn-nav-touch"
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-cyan-500/20 active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3 text-cyan-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
