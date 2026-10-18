import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  Building2, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Stethoscope, 
  Scissors, 
  GraduationCap, 
  Home, 
  Briefcase,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export const PublicLayout = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDemoIndustry, setSelectedDemoIndustry] = useState('healthcare');

  const { setPlatformOwnerDemo, setBusinessOwnerDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLaunchPlatformOwner = () => {
    setPlatformOwnerDemo();
    setIsSignInOpen(false);
    addToast('Signed in as Platform Owner (Demo Mode)');
    navigate('/platform');
  };

  const handleLaunchBusinessOwner = (ind) => {
    const industryToUse = ind || selectedDemoIndustry;
    setBusinessOwnerDemo(industryToUse);
    setIsSignInOpen(false);
    addToast(`Signed in to Business Dashboard (${industryToUse.toUpperCase()})`);
    navigate('/app');
  };

  const industriesList = [
    { id: 'healthcare', label: 'Healthcare & Clinics', icon: Stethoscope },
    { id: 'salon', label: 'Salon & Wellness', icon: Scissors },
    { id: 'education', label: 'Education & Coaching', icon: GraduationCap },
    { id: 'real_estate', label: 'Real Estate & Property', icon: Home },
    { id: 'general', label: 'Corporate & Services', icon: Briefcase },
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-navy text-slate-100 selection:bg-brand-teal selection:text-white">
      {/* Modern Floating Glassmorphic Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-6xl mx-auto">
          <div className="pointer-events-auto bg-brand-navy/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-teal to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-all">
                <div className="grid grid-cols-2 gap-0.5 p-0.5">
                  <div className="w-1.5 h-1.5 rounded-xs bg-white" />
                  <div className="w-1.5 h-1.5 rounded-xs bg-brand-mint" />
                  <div className="w-1.5 h-1.5 rounded-xs bg-white/70" />
                  <div className="w-1.5 h-1.5 rounded-xs bg-teal-200" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-white leading-none">
                    BusinessOS
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-brand-teal/30 border border-brand-teal/50 text-brand-tealLight tracking-wider">
                    AI
                  </span>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                  Multi-Industry SaaS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Pill Style) */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-3 py-1 text-xs font-semibold text-slate-300">
              <button
                onClick={() => scrollToSection('features')}
                className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('industries')}
                className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                Industries
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('product-preview')}
                className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                Live Preview
              </button>
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={() => setIsSignInOpen(true)}
                className="text-xs font-semibold text-slate-200 hover:text-white px-3.5 py-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
              >
                Demo Sign In
              </button>

              <button
                onClick={() => setIsGetStartedOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-full bg-gradient-to-r from-brand-teal to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-md shadow-teal-500/25 hover:shadow-teal-500/40 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Started Free</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsSignInOpen(true)}
                className="text-xs font-bold text-brand-tealLight px-2.5 py-1 rounded-full border border-teal-500/30 bg-teal-500/10"
              >
                Sign In
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="pointer-events-auto md:hidden mt-2 border border-white/10 bg-brand-navy/95 backdrop-blur-2xl rounded-2xl p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-brand-tealLight"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('industries')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-brand-tealLight"
              >
                Industries
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-brand-tealLight"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('product-preview')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-brand-tealLight"
              >
                Live Preview
              </button>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsGetStartedOpen(true);
                  }}
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center text-white">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  BusinessOS <span className="text-brand-tealLight">AI</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                One Platform. Every Business. Manage customers, bookings, team operations, and AI receptionist workflows from one intelligent modular workspace.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="teal" size="sm">Frontend Prototype</Badge>
                <span className="text-[11px] text-slate-400">Local State Persistent</span>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Platform Suite
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Smart Bookings</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Customer Directory</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Team Coordination</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">AI Receptionist Concierge</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Real-time Analytics</button></li>
              </ul>
            </div>

            {/* Industry Verticals */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Tailored Industries
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><button onClick={() => handleLaunchBusinessOwner('healthcare')} className="hover:text-white transition-colors flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-brand-teal" /> Healthcare & Clinics</button></li>
                <li><button onClick={() => handleLaunchBusinessOwner('salon')} className="hover:text-white transition-colors flex items-center gap-1.5"><Scissors className="w-3.5 h-3.5 text-brand-teal" /> Salon & Wellness</button></li>
                <li><button onClick={() => handleLaunchBusinessOwner('education')} className="hover:text-white transition-colors flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-brand-teal" /> Education & Coaching</button></li>
                <li><button onClick={() => handleLaunchBusinessOwner('real_estate')} className="hover:text-white transition-colors flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-brand-teal" /> Real Estate & Property</button></li>
                <li><button onClick={() => handleLaunchBusinessOwner('general')} className="hover:text-white transition-colors flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-brand-teal" /> Professional Services</button></li>
              </ul>
            </div>

            {/* Demo & Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Demonstration Modes
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Explore the dual architecture: Platform Owner for overall SaaS administration, or Business Owner adapted for your specific vertical.
              </p>
              <div className="space-y-2">
                <button
                  onClick={handleLaunchPlatformOwner}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>Operator Control Center</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" />
                </button>
                <button
                  onClick={() => setIsSignInOpen(true)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>Business Owner Experience</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} BusinessOS AI Inc. Built for Multi-Industry Excellence. Frontend Demonstration Prototype.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Sign In Modal */}
      <Modal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        title="Welcome to BusinessOS AI Demo"
        subtitle="Select the persona and environment you wish to explore"
        maxWidth="max-w-lg"
      >
        <div className="space-y-5">
          {/* Option A: Platform Owner */}
          <div
            onClick={handleLaunchPlatformOwner}
            className="p-4 rounded-xl border border-brand-border bg-slate-50 hover:bg-brand-ice/60 hover:border-brand-teal/40 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-navy text-white group-hover:bg-brand-teal transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    Platform Owner Demo
                    <Badge variant="navy" size="sm">SaaS Operator</Badge>
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Manage multi-tenant business registrations, platform revenue (₹2,48,000 MRR), subscriptions, and global settings.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-teal group-hover:translate-x-0.5 transition-all mt-1" />
            </div>
          </div>

          {/* Option B: Business Owner */}
          <div className="p-4 rounded-xl border border-brand-teal/40 bg-teal-50/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-brand-teal text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy">
                    Business Owner Demo
                  </h4>
                  <p className="text-xs text-brand-muted">
                    Select your industry to experience tailored terminology and sample records:
                  </p>
                </div>
              </div>
            </div>

            {/* Industry Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {industriesList.map((ind) => {
                const Icon = ind.icon;
                const isSelected = selectedDemoIndustry === ind.id;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setSelectedDemoIndustry(ind.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-white border-brand-teal shadow-xs font-semibold text-brand-navy ring-1 ring-brand-teal'
                        : 'bg-white/60 border-brand-border text-brand-muted hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-teal' : 'text-brand-muted'}`} />
                    <span className="text-xs">{ind.label}</span>
                  </button>
                );
              })}
            </div>

            <Button
              variant="primary"
              className="w-full mt-2"
              onClick={() => handleLaunchBusinessOwner()}
              icon={ArrowRight}
            >
              Enter {industriesList.find((i) => i.id === selectedDemoIndustry)?.label} Workspace
            </Button>
          </div>

          <div className="pt-2 text-center text-xs text-brand-muted">
            No password or credit card required. Data is locally saved in your browser.
          </div>
        </div>
      </Modal>

      {/* Get Started Choice Modal */}
      <Modal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        title="Start with BusinessOS AI"
        subtitle="Choose which profile you want to register"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <Link
            to="/signup/business-owner"
            onClick={() => setIsGetStartedOpen(false)}
            className="flex items-start gap-4 p-4 rounded-xl border border-brand-teal/40 bg-brand-mint/30 hover:bg-brand-mint/60 transition-all group"
          >
            <div className="p-3 rounded-xl bg-brand-teal text-white group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-brand-navy flex items-center justify-between">
                Business Owner Signup
                <ArrowRight className="w-4 h-4 text-brand-teal group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Set up your clinic, salon, coaching academy, or agency with AI scheduling and custom branding.
              </p>
            </div>
          </Link>

          <Link
            to="/signup/platform-owner"
            onClick={() => setIsGetStartedOpen(false)}
            className="flex items-start gap-4 p-4 rounded-xl border border-brand-border bg-slate-50 hover:bg-slate-100 transition-all group"
          >
            <div className="p-3 rounded-xl bg-brand-navy text-white group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-brand-navy flex items-center justify-between">
                Platform Operator Signup
                <ArrowRight className="w-4 h-4 text-brand-navy group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Operate the SaaS core, manage multi-tenant accounts, subscription tiers, and global system health.
              </p>
            </div>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
