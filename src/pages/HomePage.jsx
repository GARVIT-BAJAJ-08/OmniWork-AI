import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { INDUSTRY_CONFIGS } from '../data/mockIndustryTemplates';
import { 
  Sparkles, 
  ArrowRight, 
  CalendarDays, 
  Users, 
  UserCheck, 
  Bot, 
  Stethoscope, 
  Scissors, 
  GraduationCap, 
  Home, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3, 
  Zap, 
  Clock, 
  Layers,
  ChevronRight,
  Star,
  Check,
  Building2,
  Globe,
  MessageSquare,
  Lock,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

export const HomePage = () => {
  const [activeTabIndustry, setActiveTabIndustry] = useState('healthcare');
  const { setBusinessOwnerDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLaunchIndustry = (indKey) => {
    setBusinessOwnerDemo(indKey);
    addToast(`Launching ${INDUSTRY_CONFIGS[indKey].name} Demo Workspace`);
    navigate('/app');
  };

  const currentPreviewConfig = INDUSTRY_CONFIGS[activeTabIndustry];

  const miniChartData = [
    { day: 'Mon', val: 18, rev: 14200 },
    { day: 'Tue', val: 26, rev: 21800 },
    { day: 'Wed', val: 22, rev: 19400 },
    { day: 'Thu', val: 34, rev: 28900 },
    { day: 'Fri', val: 42, rev: 36500 },
    { day: 'Sat', val: 56, rev: 48200 },
    { day: 'Sun', val: 30, rev: 24000 },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-brand-navy text-slate-100">
      {/* 1. HERO SECTION (Dark Luxury / High-Tech Executive Atmosphere) */}
      <section className="relative min-h-[92vh] pt-28 pb-20 lg:pt-36 lg:pb-32 flex items-center overflow-hidden">
        {/* Background Graphic Asset with High-Tech Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-business.jpg"
            alt="BusinessOS AI Executive Analytics Backdrop"
            className="w-full h-full object-cover object-right lg:object-center filter brightness-[0.45] contrast-[1.15] scale-[1.02]"
            onError={(e) => {
              e.currentTarget.src = '/hero-bg.jpg';
            }}
          />
          {/* Deep Navy Multidirectional Gradients for Razor-Sharp Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/92 to-brand-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/70" />
          
          {/* Subtle Ambient Glowing Mesh & Light Flares */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-teal/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
          
          {/* High-tech Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline Area */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Glowing Pill Tag */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-tealLight text-xs font-bold tracking-wider uppercase shadow-inner">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
                <span className="w-2 h-2 rounded-full bg-brand-teal absolute" />
                <span>Next-Gen Multi-Industry Platform</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                One Platform. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-100 to-amber-200">
                  Every Business.
                </span>
                <span className="block text-2xl sm:text-3xl text-slate-300 font-medium tracking-normal mt-2">
                  Orchestrated by Intelligent AI.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                Manage appointments, customer directories, provider teams, and autonomous 24/7 AI receptionists from one unified workspace built to dynamically adapt to your exact industry.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => navigate('/signup/business-owner')}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-teal via-teal-500 to-brand-tealLight hover:from-teal-500 hover:to-teal-400 shadow-xl shadow-teal-900/50 hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Start Free Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('product-preview');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-brand-tealLight" />
                  <span>Explore Interactive Tour</span>
                </button>
              </div>

              {/* Reassurance Social Proof */}
              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-medium text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-tealLight" />
                  <span>Free Frontend Demo</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-tealLight" />
                  <span>5 Adaptive Verticals</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-tealLight" />
                  <span>Instant Local Storage</span>
                </div>
              </div>
            </div>

            {/* Right Product Preview Mockup (Floating Glassmorphism Dashboard) */}
            <div className="lg:col-span-6 relative">
              {/* Outer Decorative Gradient Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-teal/40 via-white/10 to-amber-500/30 blur-lg opacity-70" />

              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/15 shadow-2xl p-5 lg:p-6 transition-all duration-300">
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-brand-tealLight" />
                      Apex Health & Wellness • Live Console
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Real-time AI Sync
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2.5 my-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-teal/40 transition-colors">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Today's Bookings</span>
                    <div className="text-xl font-extrabold text-white mt-1">18 Slots</div>
                    <span className="text-[10px] text-emerald-400 font-semibold">+24% vs avg</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-teal/40 transition-colors">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Active Patients</span>
                    <div className="text-xl font-extrabold text-white mt-1">1,420</div>
                    <span className="text-[10px] text-brand-tealLight font-semibold">98% retention</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-teal/40 transition-colors">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Doctors On Duty</span>
                    <div className="text-xl font-extrabold text-white mt-1">6 Active</div>
                    <span className="text-[10px] text-slate-400 font-medium">3 Clinics</span>
                  </div>
                </div>

                {/* Performance Mini-Chart */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-200">Revenue Trajectory (INR ₹)</span>
                    <span className="text-xs font-semibold text-brand-tealLight">₹1,42,800 Generated</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniChartData}>
                        <defs>
                          <linearGradient id="heroDarkTeal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{ background: '#0A1624', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                        />
                        <Area type="monotone" dataKey="val" stroke="#14B8A6" strokeWidth={2.5} fillOpacity={1} fill="url(#heroDarkTeal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Booking Snippets */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                      <span className="font-semibold text-white">Aditi Rao</span>
                      <span className="text-slate-400">• Cardiology Consultation</span>
                    </div>
                    <span className="text-brand-tealLight font-bold">10:00 AM • Confirmed</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
                      <span className="font-semibold text-white">Karthik Raman</span>
                      <span className="text-slate-400">• Preventive Checkup</span>
                    </div>
                    <span className="text-slate-300 font-medium">11:30 AM • Scheduled</span>
                  </div>
                </div>
              </div>

              {/* Floating AI Receptionist Pill Card */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-5 bg-brand-navy/95 backdrop-blur-xl p-3.5 rounded-2xl border border-white/20 shadow-2xl">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-teal to-teal-700 text-white shadow-md shadow-teal-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    AI Concierge Active
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-300">3 new appointments automated today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGO CLOUD / TRUSTED TICKER */}
      <section className="py-8 border-y border-white/10 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase font-bold tracking-widest text-slate-400 mb-6">
            Engineered for Forward-Thinking Clinics, Salons & Multi-Location Businesses
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <Stethoscope className="w-4 h-4 text-brand-teal" /> Apex Health Networks
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <Scissors className="w-4 h-4 text-brand-teal" /> Luxe Aura Studios
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <GraduationCap className="w-4 h-4 text-brand-teal" /> Zenith Learning Hubs
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <Home className="w-4 h-4 text-brand-teal" /> Skyline Prime Realty
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <Briefcase className="w-4 h-4 text-brand-teal" /> Vanguard Advisory Co.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MODERN FEATURES BENTO GRID (Linear / Vercel Aesthetic) */}
      <section id="features" className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-brand-tealLight text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-brand-tealLight" />
              SaaS Architectural Features
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Everything your business needs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tealLight to-teal-300">
                Nothing you don't.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Replace fragmented spreadsheets, disconnected calendars, and manual messaging with one unified, modern command center.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: AI Receptionist (Large Span 2) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-white/10 hover:border-teal-500/40 shadow-xl transition-all group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/20 border border-brand-teal/30 text-brand-tealLight flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Bot className="w-6 h-6" />
                  </div>
                  <Badge variant="teal" size="sm">24/7 Autonomous Agent</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Intelligent AI Receptionist & Triage
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-lg mb-6">
                  An automated concierge that answers patient and client inquiries about operating hours, fees, and available slots, then generates provisional bookings directly on your schedule.
                </p>
              </div>

              {/* Interactive Mini Chat Mockup */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/10 space-y-3 text-xs">
                <div className="flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                    U
                  </div>
                  <div className="bg-white/10 text-slate-200 px-3 py-2 rounded-xl rounded-tl-xs">
                    "Hi! Can I book an appointment with Dr. Verma tomorrow morning?"
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-lg bg-brand-teal text-white flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-brand-teal/20 border border-brand-teal/30 text-teal-100 px-3 py-2 rounded-xl rounded-tl-xs space-y-1">
                    <div>"I would be glad to help! I have held a 10:30 AM slot for tomorrow."</div>
                    <div className="text-[10px] text-brand-tealLight font-bold">✓ Draft appointment reserved</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Smart Bookings */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-white/10 hover:border-teal-500/40 shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smart Scheduling</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Conflict-free scheduling across multiple staff members and branch locations with list and calendar timeline views.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300 font-medium">
                  <span>Slot Duration</span>
                  <span className="text-brand-tealLight font-bold">30 mins buffer</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 font-medium">
                  <span>Double Booking Check</span>
                  <span className="text-emerald-400 font-bold">100% Protected</span>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Unified Customer 360 */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-white/10 hover:border-teal-500/40 shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Customer Dossier</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Track client records, medical notes, past visit logs, and lifetime spending in Indian Rupees (₹).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Aditi Rao</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-brand-teal/20 text-brand-tealLight font-bold">VIP Tier</span>
                </div>
                <div className="text-[11px] text-slate-400">Total Visits: 6 • ₹7,400 Spent</div>
              </div>
            </div>

            {/* Bento Card 4: Financial & Telemetry (Span 2) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-white/10 hover:border-teal-500/40 shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <Badge variant="teal" size="sm">INR Financial Engine</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Real-time Operational & Revenue Analytics
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-lg mb-4">
                  Visual telemetry on booking fulfillment rates, staff workloads, cancellation curves, and monthly gross revenue across branches.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Monthly Run Rate</div>
                  <div className="text-xl font-extrabold text-white mt-1">₹6,42,000</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">+18% growth</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Fulfillment Rate</div>
                  <div className="text-xl font-extrabold text-white mt-1">94.6%</div>
                  <div className="text-[10px] text-brand-tealLight font-semibold">2.4% cancellation</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400">AI Attribution</div>
                  <div className="text-xl font-extrabold text-white mt-1">38% Bookings</div>
                  <div className="text-[10px] text-brand-tealLight font-semibold">Hands-free triage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC INDUSTRY ADAPTATION STUDIO */}
      <section id="industries" className="py-24 bg-slate-950 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-brand-tealLight text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-tealLight" />
              Dynamic Industry Engine
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Built for the way your industry works.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              BusinessOS AI is not a generic database. Click below to experience how labels, workflows, and sample data dynamically transform for your sector.
            </p>

            {/* Interactive Vertical Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {Object.keys(INDUSTRY_CONFIGS).map((k) => {
                const conf = INDUSTRY_CONFIGS[k];
                const isSelected = activeTabIndustry === k;
                return (
                  <button
                    key={k}
                    onClick={() => setActiveTabIndustry(k)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-brand-teal to-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105'
                        : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span>{conf.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Adaptive Studio Card */}
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 to-brand-navy border border-white/15 p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-tealLight">
                  {currentPreviewConfig.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {currentPreviewConfig.name}
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  {currentPreviewConfig.tagline}
                </p>
              </div>

              <button
                onClick={() => handleLaunchIndustry(activeTabIndustry)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-brand-teal hover:bg-teal-500 transition-all self-start md:self-center shadow-md cursor-pointer"
              >
                <span>Launch {currentPreviewConfig.name.split(' ')[0]} Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Adapted Matrix Comparison */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400">Client Entity</span>
                <div className="text-lg font-bold text-white mt-1">{currentPreviewConfig.terms.customers}</div>
                <span className="text-[10px] text-brand-tealLight">Patient / Client directory</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400">Service Model</span>
                <div className="text-lg font-bold text-white mt-1">{currentPreviewConfig.terms.services}</div>
                <span className="text-[10px] text-brand-tealLight">Procedure catalogue</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400">Provider Role</span>
                <div className="text-lg font-bold text-white mt-1">{currentPreviewConfig.terms.staffPlural}</div>
                <span className="text-[10px] text-brand-tealLight">Specialist roster</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400">Scheduling Unit</span>
                <div className="text-lg font-bold text-white mt-1">{currentPreviewConfig.terms.bookings}</div>
                <span className="text-[10px] text-brand-tealLight">Calendar slots</span>
              </div>
            </div>

            {/* Sample Business Card Showcase */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/20 text-brand-tealLight font-bold flex items-center justify-center text-sm">
                  {currentPreviewConfig.sampleBusinessName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{currentPreviewConfig.sampleBusinessName}</div>
                  <div className="text-slate-400">Pre-loaded with verified Indian healthcare & wellness sample data</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Categories:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPreviewConfig.sampleCategories.slice(0, 3).map((cat) => (
                    <span key={cat} className="px-2 py-0.5 rounded-md bg-white/10 text-slate-200 text-[10px] font-semibold">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS WORKFLOW */}
      <section id="how-it-works" className="py-24 bg-brand-navy border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-brand-tealLight text-xs font-bold uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5 text-brand-tealLight" />
              Simple Onboarding Flow
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Three steps to operational clarity.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              No complicated configuration or months of implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 text-left relative group hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-teal to-teal-700 text-white text-base font-extrabold flex items-center justify-center mb-6 shadow-lg shadow-teal-500/25">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Create your workspace</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sign up as a business owner and select your vertical: healthcare, salon, education, real estate, or general enterprise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 text-left relative group hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white text-base font-extrabold flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Configure services & AI</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add your consultation fees in ₹, assign team members, and tailor your AI receptionist responses for common inquiries.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 text-left relative group hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white text-base font-extrabold flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Run all operations seamlessly</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Manage appointment bookings, patient records, team shifts, and monthly revenue performance from one intelligent dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIVE PRODUCT PREVIEW CONTAINER */}
      <section id="product-preview" className="py-24 bg-slate-950 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="teal" size="sm" className="mb-3">Live Interactive Console</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineered for seamless day-to-day productivity.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              A responsive, modular command center built for high-performance operators.
            </p>
          </div>

          {/* Full Mock Application Shell */}
          <div className="rounded-3xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Mini Sidebar */}
              <div className="w-full md:w-60 bg-slate-950/80 border-r border-white/10 p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center text-white text-xs font-bold">
                    BO
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white truncate block">
                      {currentPreviewConfig.sampleBusinessName}
                    </span>
                    <span className="text-[10px] text-brand-tealLight font-semibold">Active Workspace</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs font-semibold">
                  <div className="px-3.5 py-2 rounded-xl bg-brand-teal text-white flex items-center gap-2.5 shadow-sm">
                    <BarChart3 className="w-4 h-4" />
                    Overview
                  </div>
                  <div className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors">
                    <CalendarDays className="w-4 h-4" />
                    {currentPreviewConfig.terms.bookings}
                  </div>
                  <div className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors">
                    <Users className="w-4 h-4" />
                    {currentPreviewConfig.terms.customers}
                  </div>
                  <div className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors">
                    <Briefcase className="w-4 h-4" />
                    {currentPreviewConfig.terms.services}
                  </div>
                  <div className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-2.5 transition-colors">
                    <Bot className="w-4 h-4" />
                    AI Receptionist
                  </div>
                </div>
              </div>

              {/* Mini Content Area */}
              <div className="flex-1 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Good morning, {activeTabIndustry === 'healthcare' ? 'Dr. Verma' : 'Manager'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Here is what is happening with your {currentPreviewConfig.name.toLowerCase()} operations today.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleLaunchIndustry(activeTabIndustry)}
                    icon={ArrowRight}
                  >
                    Open Full Workspace
                  </Button>
                </div>

                {/* 4 KPI cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Today's {currentPreviewConfig.terms.bookings}
                    </span>
                    <div className="text-xl font-bold text-white mt-1">16</div>
                    <span className="text-[10px] text-emerald-400 font-semibold">+18% vs avg</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Active {currentPreviewConfig.terms.customers}
                    </span>
                    <div className="text-xl font-bold text-white mt-1">428</div>
                    <span className="text-[10px] text-brand-tealLight font-semibold">94% active</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {currentPreviewConfig.terms.staffPlural}
                    </span>
                    <div className="text-xl font-bold text-white mt-1">8 Members</div>
                    <span className="text-[10px] text-slate-400">2 Locations</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Monthly Value
                    </span>
                    <div className="text-xl font-bold text-white mt-1">₹6,42,000</div>
                    <span className="text-[10px] text-emerald-400 font-semibold">+22% MoM</span>
                  </div>
                </div>

                {/* Booking list */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-bold text-white">
                    <span>Upcoming {currentPreviewConfig.terms.bookings}</span>
                    <span className="text-brand-tealLight">Live Schedule</span>
                  </div>
                  <div className="divide-y divide-white/5 text-xs">
                    <div className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-brand-tealLight font-bold flex items-center justify-center text-xs">
                          AR
                        </div>
                        <div>
                          <div className="font-semibold text-white">Aditi Rao</div>
                          <div className="text-[11px] text-slate-400">General Consultation • 30 mins</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Confirmed</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center text-xs">
                          KR
                        </div>
                        <div>
                          <div className="font-semibold text-white">Karthik Raman</div>
                          <div className="text-[11px] text-slate-400">Specialist Review • 45 mins</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300">Scheduled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL HIGH-TECH CTA */}
      <section className="py-24 bg-brand-navy text-white text-center relative overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-business.jpg"
            alt="BusinessOS AI Backdrop"
            className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.2] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/85 to-brand-navy" />
          <div className="absolute inset-0 bg-radial from-brand-teal/25 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-tealLight text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Adaptive SaaS Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Your business deserves a smarter workspace.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Start with the tools you need today and grow at your own pace. Built to adapt seamlessly to your exact industry.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/signup/business-owner')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-teal to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-xl shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Your Workspace Free</span>
            </button>
            <button
              onClick={() => navigate('/signup/platform-owner')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-5 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Platform Operator Console →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
