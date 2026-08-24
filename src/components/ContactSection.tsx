import { useState, FormEvent } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  GraduationCap,
  MapPin,
  Clock,
  Github,
  Code2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactEmail = 'om598648@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Format mailto link for direct client dispatch
    const subjectParam = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
    );
    const bodyParam = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open default email client
    window.location.href = `mailto:${contactEmail}?subject=${subjectParam}&body=${bodyParam}`;
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="scroll-mt-24 pt-8 pb-12 w-full">
      {/* Top Badge */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide shadow-sm shadow-cyan-950/40 mb-3">
          <span>✉️</span>
          <span>Open for Engineering Opportunities</span>
        </div>

        {/* Primary Section Header */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Connect with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
            Om Jee
          </span>
        </h2>

        {/* Section Subtitle */}
        <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Currently welcoming software engineering internships, collaborative ML research projects, and backend development roles.
        </p>
      </div>

      {/* Grid: Left (Contact Coordinates) & Right (Send a Direct Message) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Coordinates */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-2">
            <span className="w-3 h-[1px] bg-cyan-400" />
            Contact Coordinates
          </div>

          {/* Direct Email Box */}
          <TiltCard
            id="card-contact-email"
            className="group relative rounded-2xl bg-neutral-900/70 border border-cyan-500/20 backdrop-blur-xl p-5 shadow-lg hover:border-cyan-400/40 transition-all"
          >
            <div style={{ transform: 'translateZ(25px)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
                  Direct Inbox
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 mt-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm font-mono font-medium text-white truncate">
                    {contactEmail}
                  </span>
                </div>

                <button
                  id="btn-copy-contact-email"
                  onClick={copyEmail}
                  type="button"
                  aria-label="Copy email address"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition-all active:scale-95 border border-neutral-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </TiltCard>

          {/* Education Block */}
          <TiltCard
            id="card-contact-education"
            className="group relative rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xl p-5 shadow-lg hover:border-neutral-700 transition-all"
          >
            <div className="flex items-start gap-4" style={{ transform: 'translateZ(20px)' }}>
              <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase text-indigo-400 tracking-wider">
                  Education & Degree
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  GLA University, Mathura
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  B.Tech Computer Science • 2nd Year (Sophomore)
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Location Block */}
          <TiltCard
            id="card-contact-location"
            className="group relative rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xl p-5 shadow-lg hover:border-neutral-700 transition-all"
          >
            <div className="flex items-start gap-4" style={{ transform: 'translateZ(20px)' }}>
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase text-rose-400 tracking-wider">
                  Location & Timezone
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Mathura, Uttar Pradesh, India
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  Standard Time (IST / UTC+5:30)
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Bottom Badges Row */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              id="badge-contact-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/80 transition-all group"
            >
              <Github className="w-4 h-4 text-neutral-300 group-hover:text-white" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  GitHub
                </span>
                <span className="text-xs font-bold text-neutral-200 font-mono">
                  3 Repos
                </span>
              </div>
            </a>

            <a
              id="badge-contact-leetcode"
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-amber-500/20 hover:border-amber-500/40 hover:bg-neutral-800/80 transition-all group"
            >
              <Code2 className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                  LeetCode
                </span>
                <span className="text-xs font-bold text-amber-300 font-mono">
                  6+ Solved
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Send a Direct Message */}
        <div className="lg:col-span-7 w-full">
          <TiltCard
            id="card-contact-form-frame"
            className="group relative rounded-2xl bg-neutral-900/80 border border-indigo-500/30 backdrop-blur-2xl p-7 shadow-2xl shadow-indigo-950/30"
          >
            <div style={{ transform: 'translateZ(30px)' }}>
              {/* Form Container Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-neutral-800 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    Send a Direct Message
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Dispatches directly to:{' '}
                    <span className="text-cyan-300 font-semibold">{contactEmail}</span>
                  </p>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-mono uppercase tracking-wider text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 rounded-full">
                  Quick Dispatch
                </span>
              </div>

              {/* Message Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Your Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-mono font-medium text-neutral-300"
                    >
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                    />
                  </div>

                  {/* Your Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-mono font-medium text-neutral-300"
                    >
                      Your Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Subject / Opportunity Type */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-mono font-medium text-neutral-300"
                  >
                    Subject / Opportunity Type
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Software Engineering Internship / Project Collab"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                  />
                </div>

                {/* Message Content */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-mono font-medium text-neutral-300"
                  >
                    Message Content <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe your project, team requirements, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none font-sans"
                  />
                </div>

                {/* Core Action Trigger: Prominent Purple/Blue Interactive Button */}
                <button
                  id="btn-submit-message"
                  type="submit"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 hover:from-indigo-400 hover:via-purple-500 hover:to-blue-500 text-white font-semibold text-sm tracking-wide shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                      <span>Message Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-indigo-200" />
                      <span>Send Message to Om Jee</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
