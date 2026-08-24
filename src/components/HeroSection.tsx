import { useState } from 'react';
import { ArrowUpRight, Award, Mail, Copy, Check, Terminal, MapPin } from 'lucide-react';
import TiltCard from './TiltCard';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const email = 'om598648@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="pt-8 pb-14 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* MAIN LEFT PANEL */}
        <div className="lg:col-span-6 flex flex-col items-start gap-5">
          {/* Green Status Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-medium backdrop-blur-md shadow-sm shadow-emerald-950/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-tight">
              Sophomore B.Tech CSE • GLA University, Mathura
            </span>
          </div>

          {/* Subtitle Track */}
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-2">
            <span className="w-4 h-[1px] bg-cyan-400" />
            SOFTWARE & MACHINE LEARNING ENGINEER
          </div>

          {/* Large Display Text */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Om Jee.
            </span>
          </h1>

          {/* Core Body Copy */}
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl">
            Specializing in high-throughput backend services and machine learning architectures with{' '}
            <span className="text-cyan-300 font-medium">FastAPI</span>,{' '}
            <span className="text-cyan-300 font-medium">Python</span>,{' '}
            <span className="text-cyan-300 font-medium">C</span>,{' '}
            <span className="text-cyan-300 font-medium">Pandas</span>, and{' '}
            <span className="text-cyan-300 font-medium">NumPy</span>.
          </p>

          {/* Primary Action Cluster */}
          <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
            {/* Explore Selected Projects Solid Button */}
            <a
              id="btn-hero-explore-projects"
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-95"
            >
              <span>Explore Selected Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Azure AZ-900 Credential Bordered Link */}
            <a
              id="btn-hero-azure-credential"
              href="#credentials"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-sky-500/30 hover:border-sky-400 text-sky-300 text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              <Award className="w-4 h-4 text-sky-400" />
              <span>Azure AZ-900 Credential</span>
            </a>

            {/* Email Chip Button */}
            <button
              id="btn-hero-email-chip"
              onClick={copyEmail}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-700/60 text-neutral-300 text-xs font-mono transition-all active:scale-95"
              title="Click to copy email"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{email}</span>
              <span className="sm:hidden">Email</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>
          </div>

          {/* Meta Footer String */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800/80 w-full">
            <span className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              GitHub (3 Repos)
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              LeetCode (6+ Solved)
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Mathura, IN
            </span>
          </div>
        </div>

        {/* MAIN RIGHT PANEL (3D/Glassmorphic Terminal Frame) */}
        <div id="terminal" className="lg:col-span-6 w-full">
          <TiltCard
            id="card-terminal-frame"
            className="group relative rounded-2xl bg-[#0b0f19]/90 border border-cyan-500/30 backdrop-blur-2xl p-0 shadow-2xl shadow-cyan-950/40 overflow-hidden"
          >
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#070a12]/90 border-b border-neutral-800/90">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
                <span className="ml-2 text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  omjee@gla-workstation:~
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                  bash / zsh
                </span>
              </div>
            </div>

            {/* Terminal Code Content */}
            <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-300 overflow-x-auto select-text">
              <div className="flex items-center gap-2 text-neutral-500 pb-2 mb-2 border-b border-neutral-800/60 text-[11px]">
                <span className="text-emerald-400">●</span> active runtime env
                <span className="text-neutral-600">|</span>
                <span className="text-cyan-400">python 3.12</span>
              </div>

              <p className="text-neutral-500">
                <span className="text-cyan-400">$</span> cat profile.json
              </p>

              <pre className="mt-2 text-neutral-200">
                <code>
                  <span className="text-indigo-400">const</span>{' '}
                  <span className="text-cyan-300">engineer</span> = &#123;{'\n'}
                  {'  '}<span className="text-sky-300">name</span>:{' '}
                  <span className="text-emerald-300">"Om Jee"</span>,{'\n'}
                  {'  '}<span className="text-sky-300">role</span>:{' '}
                  <span className="text-emerald-300">"Software & ML Engineer"</span>,{'\n'}
                  {'  '}<span className="text-sky-300">education</span>:{' '}
                  <span className="text-emerald-300">"GLA University, Mathura"</span>,{'\n'}
                  {'  '}<span className="text-sky-300">stack</span>: [
                  <span className="text-amber-300">"FastAPI"</span>,{' '}
                  <span className="text-amber-300">"Python"</span>,{' '}
                  <span className="text-amber-300">"C"</span>,{' '}
                  <span className="text-amber-300">"Pandas"</span>,{' '}
                  <span className="text-amber-300">"NumPy"</span>],{'\n'}
                  {'  '}<span className="text-sky-300">focus</span>: [
                  <span className="text-cyan-300">"Neural Networks"</span>,{' '}
                  <span className="text-cyan-300">"Vision AI"</span>,{' '}
                  <span className="text-cyan-300">"Backend APIs"</span>],{'\n'}
                  {'  '}<span className="text-sky-300">credentials</span>: [
                  <span className="text-emerald-300">"Microsoft Azure AZ-900"</span>],{'\n'}
                  {'  '}<span className="text-sky-300">status</span>:{' '}
                  <span className="text-emerald-400">"Building high-performance systems"</span>
                  {'\n'}&#125;;
                </code>
              </pre>

              <div className="mt-3 flex items-center gap-1.5 text-cyan-400 text-xs">
                <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Base Panel Micro-Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-neutral-800/80 border-t border-neutral-800">
              <div className="p-3 bg-[#080c16]/95 flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                  GITHUB REPOS
                </span>
                <span className="text-sm font-bold text-white font-mono mt-0.5">
                  3
                </span>
              </div>
              <div className="p-3 bg-[#080c16]/95 flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                  LEETCODE
                </span>
                <span className="text-sm font-bold text-amber-400 font-mono mt-0.5">
                  6+ Solved
                </span>
              </div>
              <div className="p-3 bg-[#080c16]/95 col-span-2 sm:col-span-1 flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                  CLOUD CERT
                </span>
                <span className="text-sm font-bold text-sky-400 font-mono mt-0.5">
                  Azure AZ-900
                </span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
