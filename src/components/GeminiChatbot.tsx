import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import {
  Bot,
  Send,
  User,
  RefreshCw,
  X,
  Maximize2,
  Minimize2,
  Cpu,
  Copy,
  Check,
  Layers,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
}

const QUICK_PROMPTS = [
  'Tell me about Om Jee & his background',
  'What are his core skills in Python & ML?',
  'Explain his SIMPulse & Background Remover projects',
  'Why should we hire Om Jee for an internship?',
];

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        "Hello! I am **Om Jee's Neural AI Assistant**, powered by Google Gemini. Ask me anything about Om Jee's software engineering background, ML architectures, projects like **SIMPulse**, or internship availability!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'gemini-3.5-flash',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview'>('gemini-3.5-flash');
  const [roleMode, setRoleMode] = useState<'default' | 'recruiter' | 'code_interviewer'>('default');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'assistant',
        content:
          "Conversation cleared. How can I assist you regarding Om Jee's engineering background or technical projects today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel,
      },
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Map history for the multi-turn backend API
      const historyPayload = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          history: historyPayload.slice(0, -1), // exclude the current user message
          model: selectedModel,
          roleMode,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response received from Gemini.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || selectedModel,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Error reaching Gemini AI:** ${err?.message || 'Please check connection or try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              id="btn-open-gemini-chat"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-medium text-sm shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 border border-cyan-400/40 cursor-pointer backdrop-blur-xl"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute -inset-1 rounded-full bg-cyan-400 animate-ping opacity-30" />
                <Bot className="w-5 h-5 text-cyan-200" />
              </div>
              <span className="tracking-wide">Ask Gemini AI</span>
              <span className="px-2 py-0.5 rounded-full bg-black/30 border border-white/20 text-[10px] font-mono text-cyan-200">
                Live
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chatbot Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="gemini-chatbot-window"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 ${
              isExpanded
                ? 'w-[94vw] sm:w-[700px] h-[85vh]'
                : 'w-[94vw] sm:w-[460px] h-[600px] max-h-[85vh]'
            } flex flex-col rounded-3xl bg-[#090d18]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-[#060a12]/95 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <Bot className="w-4 h-4 text-cyan-100" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white tracking-tight">
                      Om Jee Copilot
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.2 rounded-full">
                      Gemini
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Multi-Turn Active
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 text-neutral-400">
                <button
                  onClick={handleReset}
                  type="button"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  type="button"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors hidden sm:block"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Model & Role Configuration Strip */}
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-950/80 border-b border-neutral-800/80 text-[11px] font-mono gap-2 flex-wrap">
              {/* Model Selector */}
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span className="text-neutral-400">Model:</span>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as any)}
                  className="bg-neutral-900 text-cyan-300 border border-neutral-700/80 rounded-md px-1.5 py-0.5 text-[10px] font-mono focus:outline-none focus:border-cyan-400"
                >
                  <option value="gemini-3.5-flash">gemini-3.5-flash (General)</option>
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
                  <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex)</option>
                </select>
              </div>

              {/* Role Persona Selector */}
              <div className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-indigo-400" />
                <span className="text-neutral-400">Role:</span>
                <select
                  value={roleMode}
                  onChange={(e) => setRoleMode(e.target.value as any)}
                  className="bg-neutral-900 text-indigo-300 border border-neutral-700/80 rounded-md px-1.5 py-0.5 text-[10px] font-mono focus:outline-none focus:border-indigo-400"
                >
                  <option value="default">Assistant</option>
                  <option value="recruiter">Recruiter Mode</option>
                  <option value="code_interviewer">Tech Interviewer</option>
                </select>
              </div>
            </div>

            {/* Messages Container (Scrollable Thread) */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-sm font-sans select-text">
              {messages.map((msg) => {
                const isBot = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs ${
                        isBot
                          ? 'bg-cyan-950/80 border border-cyan-500/30 text-cyan-300'
                          : 'bg-neutral-800 border border-neutral-700 text-neutral-200'
                      }`}
                    >
                      {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`relative group max-w-[82%] rounded-2xl p-3.5 ${
                        isBot
                          ? 'bg-neutral-900/90 border border-neutral-800 text-neutral-200 shadow-md shadow-black/20'
                          : 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-950/30'
                      }`}
                    >
                      {/* Markdown rendered body */}
                      <div className="prose prose-invert prose-xs leading-relaxed overflow-x-auto text-[13px] break-words">
                        <Markdown>{msg.content}</Markdown>
                      </div>

                      {/* Message Meta & Copy */}
                      <div
                        className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t ${
                          isBot ? 'border-neutral-800/80 text-neutral-500' : 'border-cyan-500/30 text-cyan-200'
                        } text-[10px] font-mono`}
                      >
                        <span>{msg.timestamp}</span>
                        {isBot && (
                          <div className="flex items-center gap-2">
                            {msg.model && (
                              <span className="text-[9px] opacity-70">{msg.model}</span>
                            )}
                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              type="button"
                              title="Copy response"
                              aria-label="Copy response"
                              className="hover:text-neutral-300 transition-colors"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-300">
                    <Bot className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-3.5 text-neutral-400 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-mono">Gemini is reasoning...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Strip */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-neutral-800/60 bg-neutral-950/50 flex gap-2 overflow-x-auto no-scrollbar">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    type="button"
                    className="flex-shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-neutral-800 text-cyan-300/90 hover:text-white hover:border-cyan-500/50 hover:bg-neutral-800 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 bg-[#060a12] border-t border-neutral-800">
              <form onSubmit={onFormSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Om Jee's background, ML, projects..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                />
                <button
                  id="btn-send-gemini-message"
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message to Gemini"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold tracking-wide shadow-md shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
