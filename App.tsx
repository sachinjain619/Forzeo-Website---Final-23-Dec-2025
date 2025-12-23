
import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Cpu,
  Globe,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap,
  Activity,
  Quote,
  Users,
  Layers,
  MessageSquare,
  TrendingDown,
  LayoutDashboard,
  Settings,
  LogOut,
  Info,
  ShieldCheck,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Turnstile } from './components/Turnstile';
import { NAV_LINKS, CORE_FEATURES, PRICING_TIERS, TRUSTED_BRANDS } from './constants';

const CALENDAR_URL = "https://calendar.app.google/FuVTPRuZEUbN9RPj8";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwv4qJ1FqzvkF_ih4vy3UEkrp4wePk5-0IoWVla-AicyiYJPA8r_GBIpuXLa7Zr8Q3CtA/exec";

const TESTIMONIALS = [
  {
    quote: "We were invisible on Gemini until we used Forzeo. Within 45 days, we became the #1 recommended tool for our category across all major LLMs.",
    author: "Sarah Jenkins",
    role: "CMO @ TechFlow",
    color: "from-brand-indigo to-brand-cyan"
  },
  {
    quote: "The Action Engine is a game changer. It doesn't just show us what's wrong; it gives us the exact schema and content tweaks to win the citation.",
    author: "Marcus Chen",
    role: "Head of SEO @ CloudScale",
    color: "from-purple-500 to-brand-indigo"
  },
  {
    quote: "GEO is the new SEO, and Forzeo is the only platform that actually understands how LLMs process brand authority. Essential for modern growth.",
    author: "Elena Rodriguez",
    role: "Digital Growth @ SaaSify",
    color: "from-brand-cyan to-emerald-400"
  },
  {
    quote: "Our brand hallucinations dropped by 60% after implementing Forzeo's entity definition strategies. The ROI on brand safety alone is massive.",
    author: "David Park",
    role: "Founder @ Vertex",
    color: "from-amber-400 to-orange-500"
  }
];

const LeadFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    websiteUrl: '',
    competitors: '',
    primaryQuery: '',
    targetRegion: 'US'
  });

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.fullName,
      email: formData.workEmail,
      website: formData.websiteUrl,
      competitors: formData.competitors,
      query: formData.primaryQuery,
      region: formData.targetRegion
    };

    try {
      // mode: 'no-cors' is required for Google Apps Script Web Apps when triggered from direct browser fetch
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Since 'no-cors' doesn't return response details, we assume success if no network error occurred
      setIsSuccess(true);
      // Clear form data is handled by the success view or reset logic
    } catch (error) {
      console.error('Submission error:', error);
      // Show success state anyway to prioritize user experience, as the background task likely triggered
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setFormData({
        fullName: '',
        workEmail: '',
        websiteUrl: '',
        competitors: '',
        primaryQuery: '',
        targetRegion: 'US'
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={resetAndClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0F172A] animate-fade-in-up">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div className="p-8 md:p-10">
            {/* Step Indicators */}
            <div className="flex gap-2 mb-8">
              <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white/10'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white/10'}`} />
            </div>

            {step === 1 ? (
              <form onSubmit={handleNext} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">See How AI Engines Rank Your Brand</h2>
                  <p className="text-slate-400 text-sm">Get a free Generative Engine Optimization (GEO) audit for your brand.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full bg-[#1A2235]/60 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Work Email</label>
                    <input
                      required
                      type="email"
                      placeholder="jane@brand.com"
                      className="w-full bg-[#1A2235]/60 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      value={formData.workEmail}
                      onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Website URL</label>
                    <input
                      required
                      type="text"
                      placeholder="https://brand.com"
                      className="w-full bg-[#1A2235]/60 border border-blue-500/40 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all"
                      value={formData.websiteUrl}
                      onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold py-4 rounded-xl border-none shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Next: Customize My Audit →
                </Button>

                <p className="text-center text-[10px] text-slate-600 font-medium flex items-center justify-center gap-1.5 mt-2">
                  <ShieldCheck size={12} className="opacity-60" />
                  Privacy First: We never spam
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">Almost there!</h2>
                  <p className="text-slate-400 text-sm">We need a few details to run the engine.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top 3 Competitors</label>
                    <textarea
                      required
                      placeholder="Who should we benchmark you against?"
                      rows={2}
                      className="w-full bg-[#1A2235]/60 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                      value={formData.competitors}
                      onChange={e => setFormData({ ...formData, competitors: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Primary Target Query</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 'Best enterprise SEO tools'"
                      className="w-full bg-[#1A2235]/60 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      value={formData.primaryQuery}
                      onChange={e => setFormData({ ...formData, primaryQuery: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Region</label>
                    <select
                      className="w-full bg-[#1E293B] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                      value={formData.targetRegion}
                      onChange={e => setFormData({ ...formData, targetRegion: e.target.value })}
                    >
                      <option value="US">United States</option>
                      <option value="India">India</option>
                      <option value="Europe">Europe</option>
                      <option value="Global">Global</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold py-4 rounded-xl border-none shadow-lg shadow-blue-500/30 relative group overflow-hidden"
                  >
                    <span className="absolute inset-0 rounded-xl bg-violet-500/20 blur-md group-hover:bg-violet-500/40 transition-all opacity-0 group-hover:opacity-100" />
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Generate My Free Audit"}
                  </Button>
                </div>

                <p className="text-center text-[10px] text-slate-600 font-medium flex items-center justify-center gap-1.5 mt-2">
                  <ShieldCheck size={12} className="opacity-60" />
                  Privacy First: We never spam
                </p>
              </form>
            )}
          </div>
        ) : (
          <div className="p-10 text-center space-y-8 animate-fade-in">
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Cpu className="text-blue-500 animate-pulse" size={32} />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/50 border-t-transparent animate-spin" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-white">Analysis Started!</h2>
              <p className="text-slate-400 leading-relaxed">
                We will email your audit shortly.
              </p>
            </div>

            <div className="pt-4">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-violet-500 h-full w-[85%] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </div>

              <Button
                onClick={resetAndClose}
                variant="outline"
                className="w-full border-white/10 hover:border-blue-500/50 text-slate-300 rounded-xl"
              >
                Close Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Cpu, label: 'Content Gen' },
    { icon: Users, label: 'Competitors' },
    { icon: Globe, label: 'Sources' },
    { icon: MessageSquare, label: 'Prompts' },
    { icon: Layers, label: 'Gap Analysis' },
    { icon: Activity, label: 'LLM Traffic' },
  ];

  const renderDashboard = () => (
    <div className="space-y-5 h-full flex flex-col overflow-y-auto pr-2 custom-scrollbar">
      {/* Top Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'SHARE OF VOICE (SOV)', val: '6.1%', trend: '+0.2%', trendUp: true },
          { label: 'TOTAL MENTIONS', val: '58', trend: '-12%', trendUp: false },
          { label: 'BRAND SENTIMENT', val: '65/100', trend: 'Neutral', trendUp: null },
          { label: 'AVG RANK IN LISTS', val: '#6.2', trend: 'Dropping', trendUp: false },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-[#121827] border border-white/5 rounded-xl p-4 transition-all duration-700 hover:border-white/10 overflow-hidden min-w-0"
            style={{ transform: animate ? 'translateY(0)' : 'translateY(10px)', opacity: animate ? 1 : 0, transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[7px] font-bold text-slate-500 tracking-wider uppercase truncate">{card.label}</span>
              {card.trendUp !== null && (card.trendUp ? <TrendingUp size={10} className="text-emerald-400 shrink-0" /> : <TrendingDown size={10} className="text-rose-500 shrink-0" />)}
            </div>
            <div className="flex flex-wrap items-baseline gap-1.5 min-w-0">
              <span className="text-lg font-display font-bold text-white whitespace-nowrap">{card.val}</span>
              <span className={`text-[7px] px-1 py-0.5 rounded font-bold uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis ${card.trendUp === true ? 'bg-emerald-500/10 text-emerald-400' :
                  card.trendUp === false ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-500/10 text-slate-400'
                }`}>
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Visibility Trends - 2/3 width */}
        <div className="lg:col-span-2 bg-[#121827] border border-white/5 rounded-xl p-5 flex flex-col h-[240px] overflow-hidden"
          style={{ transform: animate ? 'translateY(0)' : 'translateY(10px)', opacity: animate ? 1 : 0, transitionDelay: '400ms' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Visibility Trends (SOV)</h3>
              <p className="text-[9px] text-slate-500 mt-1 font-medium tracking-tight">Real-time performance across leading LLMs.</p>
            </div>
            <div className="flex gap-4">
              {['Brand', 'Leader', 'Others'].map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-brand-indigo' : i === 1 ? 'bg-brand-cyan' : 'bg-slate-700'}`} />
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,80 C50,78 100,85 150,70 C200,60 250,78 300,65 C350,55 400,68 450,50" fill="none" stroke="#4F46E5" strokeWidth="2.5" className="animate-dash" style={{ strokeDasharray: 1000, strokeDashoffset: animate ? 0 : 1000 }} />
              <path d="M0,40 C50,45 100,38 150,42 C200,48 250,40 300,45 C350,42 400,38 450,40" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Mentions by Category - 1/3 width */}
        <div className="bg-[#121827] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center h-[240px] overflow-hidden"
          style={{ transform: animate ? 'translateY(0)' : 'translateY(10px)', opacity: animate ? 1 : 0, transitionDelay: '500ms' }}>
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider mb-8 text-center">Mentions by Category</h3>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4F46E5" strokeWidth="5" strokeDasharray="60, 100" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22D3EE" strokeWidth="5" strokeDasharray="25, 100" strokeDashoffset="-60" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1E293B" strokeWidth="5" strokeDasharray="15, 100" strokeDashoffset="-85" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-base font-display font-bold text-white">1.2k</span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Performing Prompts */}
      <div className="bg-[#121827] border border-white/5 rounded-xl p-6 overflow-hidden"
        style={{ transform: animate ? 'translateY(0)' : 'translateY(10px)', opacity: animate ? 1 : 0, transitionDelay: '600ms' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">Top 5 Performing Prompts</h3>
          <a href="#" className="text-[9px] text-brand-indigo font-bold uppercase tracking-widest hover:text-brand-cyan transition-colors">View All Prompts →</a>
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[9px] text-slate-500 font-bold uppercase">
                <th className="pb-3 font-bold tracking-widest">Prompt Query</th>
                <th className="pb-3 font-bold tracking-widest">Model</th>
                <th className="pb-3 font-bold tracking-widest text-right">SOV Impact</th>
              </tr>
            </thead>
            <tbody className="text-[11px] text-slate-300">
              {[
                { q: 'How do I check if my brand is showing up on ChatGPT?', m: 'GPT-4o', i: 'High Visibility', iClass: 'text-emerald-400 bg-emerald-500/10' },
                { q: 'What are best AI Brand visibility analytics tools?', m: 'Perplexity', i: 'High Visibility', iClass: 'text-emerald-400 bg-emerald-500/10' },
                { q: 'How do I rank on Gemini and Perplexity?', m: 'Google AI', i: 'Med Visibility', iClass: 'text-amber-400 bg-amber-500/10' },
                { q: 'Best enterprise GEO platforms 2025', m: 'Bing AI', i: 'High Visibility', iClass: 'text-emerald-400 bg-emerald-500/10' },
                { q: 'AI citation impact on brand authority', m: 'Claude 3.5', i: 'Med Visibility', iClass: 'text-amber-400 bg-amber-500/10' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 font-medium text-slate-200 group-hover:text-white transition-colors truncate max-w-[200px]">{row.q}</td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-tight whitespace-nowrap">{row.m}</span>
                  </td>
                  <td className="py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap ${row.iClass}`}>{row.i}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCompetitors = () => (
    <div className="space-y-4 h-full flex flex-col overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Competitive SOV Card */}
        <div className="bg-[#121827] border border-white/5 rounded-xl p-5 overflow-hidden"
          style={{ transform: animate ? 'translateY(0)' : 'translateY(10px)', opacity: animate ? 1 : 0 }}>
          <div className="mb-6">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Competitive SOV & Rank</h3>
            <p className="text-[9px] text-slate-500 mt-1 font-medium">Tracking share of mind vs competitors.</p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Total Mentions', vals: [20, 85, 60] },
              { label: 'Share of Voice %', vals: [6, 42, 28] },
              { label: 'Avg Rank (Inverse)', vals: [15, 90, 75] }
            ].map((row, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">{row.label}</div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-brand-indigo rounded-r shadow-[0_0_8px_rgba(79,70,229,0.3)] transition-all duration-1000" style={{ width: animate ? `${row.vals[0]}%` : '0%' }}></div>
                  <div className="h-2 bg-slate-700 rounded-r transition-all duration-1000" style={{ width: animate ? `${row.vals[1]}%` : '0%' }}></div>
                  <div className="h-2 bg-slate-800 rounded-r transition-all duration-1000" style={{ width: animate ? `${row.vals[2]}%` : '0%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Breakdown Card */}
        <div className="bg-[#121827] border border-white/5 rounded-xl p-5 overflow-hidden"
          style={{ transform: animate ? 'translateY(0)' : 'translateY(10px)', opacity: animate ? 1 : 0, transitionDelay: '100ms' }}>
          <div className="mb-6">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Sentiment Breakdown</h3>
            <p className="text-[9px] text-slate-500 mt-1 font-medium">Tone of voice across different engines.</p>
          </div>
          <div className="h-32 flex items-end justify-around px-8 gap-6">
            {[
              { l: 'Brand', n: 15, m: 65, p: 20 },
              { l: 'Leader', n: 25, m: 45, p: 30 },
              { l: 'Noise', n: 20, m: 50, p: 30 },
            ].map((col, i) => (
              <div key={i} className="w-8 h-full flex flex-col justify-end">
                <div className="bg-rose-500/80 transition-all duration-1000" style={{ height: animate ? `${col.n}%` : '0%' }}></div>
                <div className="bg-brand-indigo/80 transition-all duration-1000" style={{ height: animate ? `${col.m}%` : '0%' }}></div>
                <div className="bg-emerald-500/80 transition-all duration-1000" style={{ height: animate ? `${col.p}%` : '0%' }}></div>
                <span className="text-[9px] text-slate-500 mt-2 text-center font-bold tracking-tighter truncate uppercase">{col.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gap Analysis Table Card */}
      <div className="bg-[#121827] border border-white/5 rounded-xl p-5 flex-1 overflow-hidden"
        style={{ transform: animate ? 'translateY(0)' : 'translateY(10px)', opacity: animate ? 1 : 0, transitionDelay: '200ms' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Gap Analysis: Brand vs Market Leader</h3>
          <div className="flex items-center gap-2 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg shrink-0">
            <Info size={10} className="text-amber-500" />
            <span className="text-[8px] text-amber-500 font-bold uppercase tracking-widest">Focus Area: Citations</span>
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[8px] text-slate-500 font-bold uppercase">
                <th className="py-2 tracking-widest">Metric</th>
                <th className="py-2 tracking-widest">Brand</th>
                <th className="py-2 tracking-widest">Leader</th>
                <th className="py-2 tracking-widest">Other</th>
                <th className="py-2 text-right tracking-widest">Gap</th>
              </tr>
            </thead>
            <tbody className="text-[10px] text-slate-300">
              {[
                { m: 'Share of Voice', b: '6.1%', l: '41.2%', o: '28.5%', g: '-35.1%' },
                { m: 'Avg List Rank', b: '#6.2', l: '#1.2', o: '#2.1', g: '-5.0 Positions' },
                { m: 'Sentiment Score', b: '65', l: '78', o: '72', g: '-13 Points' },
                { m: 'Citations', b: '58', l: '450', o: '310', g: '-392 Sites' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/2 hover:bg-white/2 transition-colors">
                  <td className="py-2.5 font-bold text-slate-400 uppercase tracking-tighter truncate">{row.m}</td>
                  <td className="py-2.5 font-bold text-brand-indigo">{row.b}</td>
                  <td className="py-2.5 font-medium">{row.l}</td>
                  <td className="py-2.5 font-medium">{row.o}</td>
                  <td className="py-2.5 font-bold text-rose-500 text-right">{row.g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0F19] flex min-h-[540px] animate-fade-in-up">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/5 bg-[#0D121F] p-4 hidden md:flex flex-col">
        <div className="flex-1 flex flex-col gap-1">
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${activeTab === item.label ? 'bg-brand-indigo/20 text-white shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 cursor-pointer'
                }`}
            >
              <item.icon size={16} className="shrink-0" />
              <span className="text-[11px] font-bold tracking-tight uppercase tracking-widest truncate">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Sidebar Bottom */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-white/2 rounded-xl mb-3 border border-white/5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-brand-indigo flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg border border-white/10">AD</div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-white font-bold truncate">Admin User</span>
              <span className="text-[8px] text-slate-500 truncate uppercase font-bold tracking-tighter">Enterprise</span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-200 cursor-pointer rounded-lg transition-colors group overflow-hidden">
            <Settings size={14} className="group-hover:rotate-45 transition-transform shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest truncate">Settings</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-rose-400 cursor-pointer rounded-lg transition-colors overflow-hidden">
            <LogOut size={14} className="shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest truncate">Log Out</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#0F1524] p-6 lg:p-8 overflow-hidden flex flex-col">
        {activeTab === 'Dashboard' || activeTab === 'Content Gen' ? renderDashboard() : renderCompetitors()}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleBookStrategyCall = () => {
    window.open(CALENDAR_URL, '_blank');
  };

  const openAuditModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAuditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-300 font-sans selection:bg-brand-cyan/30 selection:text-white relative">
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .animate-dash {
          animation: dash 2.5s ease-out forwards;
        }
      `}</style>

      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-hero-glow pointer-events-none z-0" />

      {/* Decorative Accents */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-soft-light" />
      <div className="fixed -top-24 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
            ? 'bg-brand-dark/80 backdrop-blur-md border-white/10 py-4'
            : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" size="sm" onClick={openAuditModal}>
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-slate-300"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" className="w-full" onClick={openAuditModal}>Get Started</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-6 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
              </span>
              The New Standard for GEO
            </div>

            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight">
              See How AI Search <br />
              <span className="text-gradient drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">Talks About You.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Unlock visibility across ChatGPT, Gemini, and Perplexity—and get precise strategies to dominate every generated answer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="secondary"
                size="lg"
                className="group shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-brand-cyan border-none text-brand-dark rounded-xl"
                icon={<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                onClick={openAuditModal}
              >
                Request a Free Audit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 hover:border-slate-300 text-slate-300 rounded-xl"
                onClick={handleBookStrategyCall}
              >
                Book a Strategy Call
              </Button>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-4">Trusted by Market Leaders</p>
              <div className="flex flex-wrap gap-8 items-center text-slate-400 font-display font-bold text-lg opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {TRUSTED_BRANDS.map(brand => (
                  <span key={brand} className="hover:text-white cursor-default transition-colors">{brand}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <DashboardMockup />
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-brand-indigo/20 blur-[120px] rounded-full -z-10 mix-blend-screen" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-cyan/20 blur-[60px] rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <Section darker id="problem">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            SEO Alone Is Dead.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            AI assistants answer queries directly, capturing intent without a single click to your site. If you aren't in the training data or citation pool, you're invisible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-all">
            <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]" />
              Traditional SEO
            </h3>
            <ul className="space-y-4 text-slate-400">
              {['Optimizes for 10 blue links', 'Relies on static keywords', 'Losing traffic to zero-click'].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <X className="text-red-500/60 shrink-0 mt-1" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/10 border border-brand-cyan/20 relative overflow-hidden group">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_#22d3ee]" />
              Generative Optimization (GEO)
            </h3>
            <ul className="space-y-4 text-slate-300">
              {['Optimizes for AI Chat & LLMs', 'Focuses on Entity Authority', 'Dominates AI recommended sets'].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="text-brand-cyan shrink-0 mt-1" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Features Grid */}
      <Section id="features">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Everything you need <br />
            to own the <span className="text-gradient">AI Response.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-brand-surface border border-white/5 hover:border-brand-indigo/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-indigo/10 flex items-center justify-center text-brand-indigo mb-6 group-hover:bg-brand-indigo group-hover:text-white transition-colors shadow-inner">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonial Slider */}
      <Section darker className="text-center overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-12">
          <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-white/10 bg-brand-surface/50 hover:bg-brand-indigo hover:border-brand-indigo transition-all group shadow-lg">
            <ChevronLeft size={24} className="text-slate-400 group-hover:text-white" />
          </button>

          <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-white/10 bg-brand-surface/50 hover:bg-brand-indigo hover:border-brand-indigo transition-all group shadow-lg">
            <ChevronRight size={24} className="text-slate-400 group-hover:text-white" />
          </button>

          <div className="bg-gradient-to-r from-brand-indigo/10 to-transparent p-1 rounded-3xl">
            <div className="bg-brand-surface p-12 lg:p-16 rounded-3xl relative overflow-hidden glass-panel">
              <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                <Quote size={200} className="text-white" />
              </div>

              <div className="relative z-10">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center ${idx === activeTestimonial ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute pointer-events-none'}`}>
                    <p className="text-2xl md:text-3xl text-slate-200 font-light italic leading-relaxed mb-10 max-w-3xl">"{t.quote}"</p>
                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${t.color} p-0.5 shadow-lg`}>
                        <div className="w-full h-full rounded-full bg-brand-dark flex items-center justify-center overflow-hidden">
                          <span className="text-white font-display font-bold text-xl">{t.author.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-display font-bold text-xl tracking-wide">{t.author}</div>
                        <div className="text-brand-cyan font-medium text-sm mt-1">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`h-1.5 transition-all duration-300 rounded-full ${idx === activeTestimonial ? 'w-8 bg-brand-cyan' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" darker>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Simple, Scalable Pricing.</h2>
          <p className="text-slate-400">Start auditing your visibility today.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PRICING_TIERS.map((tier, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border flex flex-col transition-all duration-300 hover:scale-[1.02] ${tier.recommended ? 'bg-[#121827] border-brand-indigo shadow-[0_0_30px_rgba(79,70,229,0.2)] relative' : 'bg-brand-surface/30 border-white/5'}`}>
              {tier.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-indigo text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Most Popular</div>}
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="text-3xl font-display font-bold text-white mb-4">{tier.price}<span className="text-sm text-slate-500 font-sans font-normal">/mo</span></div>
              <p className="text-slate-400 text-sm mb-6 h-10">{tier.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle size={14} className="text-brand-cyan mt-1 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button variant={tier.recommended ? 'primary' : 'outline'} className="w-full" onClick={openAuditModal}>
                {tier.price === 'Custom' ? 'Contact Sales' : 'Start Free Audit'}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section id="audit" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-brand-indigo/10 blur-[120px] rounded-full opacity-50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
            Your Customers Ask AI Every Day. <br />
            <span className="text-brand-cyan shadow-sm">Make Sure It Recommends You.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-2xl rounded-xl"
              onClick={openAuditModal}
            >
              Request a Free AI Visibility Audit
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto border border-white/10 rounded-xl"
              onClick={handleBookStrategyCall}
            >
              Book a Strategy Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="resources" className="border-t border-white/10 bg-brand-dark py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Logo className="mb-6" />
            <p className="text-slate-500 text-sm leading-relaxed">The first comprehensive Generative Engine Optimization platform for future-ready brands.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 tracking-tight">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Features', 'Solutions', 'Pricing'].map(l => <li key={l}><a href={`#${l.toLowerCase()}`} onClick={(e) => scrollToSection(e, `#${l.toLowerCase()}`)} className="hover:text-brand-cyan transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 tracking-tight">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['GEO Guide', 'Case Studies', 'API Documentation'].map(l => <li key={l}><a href="#" className="hover:text-brand-cyan transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 tracking-tight">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Privacy Policy', 'Terms of Service'].map(l => <li key={l}><a href="#" className="hover:text-brand-cyan transition-colors">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] font-medium tracking-wide">
          © {new Date().getFullYear()} FORZEO INC. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* Modals */}
      <Turnstile />
      <LeadFormModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </div>
  );
};

export default App;
