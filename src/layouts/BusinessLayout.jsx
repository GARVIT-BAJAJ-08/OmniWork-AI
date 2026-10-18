import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { INDUSTRY_CONFIGS } from '../data/mockIndustryTemplates';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Briefcase, 
  UserCheck, 
  BarChart3, 
  Bot, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Plus,
  ShieldCheck,
  Building2,
  ChevronDown,
  Sparkles,
  Stethoscope,
  Scissors,
  GraduationCap,
  Home
} from 'lucide-react';
import { Moon, Sun } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useDarkMode } from '../hooks/useDarkMode';

export const BusinessLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const { user, industry, industryConfig, switchIndustry, logout, setPlatformOwnerDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    addToast('Signed out of demo session');
    navigate('/');
  };

  const handleSwitchToPlatform = () => {
    setPlatformOwnerDemo();
    addToast('Switched to Platform Owner Dashboard');
    navigate('/platform');
  };

  const handleIndustryChange = (newInd) => {
    switchIndustry(newInd);
    setIndustryDropdownOpen(false);
    addToast(`Adapted workspace to ${INDUSTRY_CONFIGS[newInd].name}`);
  };

  const terms = industryConfig.terms;

  // Dynamic Navigation items based on selected industry terminology
  const navItems = [
    { name: 'Overview', path: '/app', icon: LayoutDashboard },
    { name: terms.bookings, path: '/app/bookings', icon: CalendarDays },
    { name: terms.customers, path: '/app/customers', icon: Users },
    { name: terms.services, path: '/app/services', icon: Briefcase },
    { name: terms.staffPlural, path: '/app/team', icon: UserCheck },
    { name: 'Analytics', path: '/app/analytics', icon: BarChart3 },
    { name: 'AI Receptionist', path: '/app/ai-receptionist', icon: Bot, badge: 'AI' },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  const getIndustryIcon = (ind) => {
    switch (ind) {
      case 'healthcare': return Stethoscope;
      case 'salon': return Scissors;
      case 'education': return GraduationCap;
      case 'real_estate': return Home;
      default: return Briefcase;
    }
  };

  const ActiveIcon = getIndustryIcon(industry);

  return (
    <div className={`min-h-screen bg-brand-bg flex app-shell${darkMode ? ' dark-mode' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-brand-border h-screen sticky top-0 z-30 select-none app-sidebar">
        {/* Business Header & Industry Tag */}
        <div className="h-18 px-5 flex items-center justify-between border-b border-brand-border bg-slate-50/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-brand-teal text-white flex items-center justify-center shrink-0">
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-brand-navy truncate">
                {user?.businessName || industryConfig.sampleBusinessName}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-semibold text-brand-teal truncate">
                  {industryConfig.name.split('&')[0]}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] text-brand-muted">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            <span>Workspace Operations</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-teal text-white shadow-xs'
                      : 'text-brand-muted hover:text-brand-navy hover:bg-slate-100/80'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-brand-tealLight/20 text-brand-teal group-hover:bg-brand-tealLight/40">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Interactive Industry Switcher Box */}
        <div className="p-3 border-t border-brand-border bg-slate-50/60">
          <div className="p-3 bg-white rounded-xl border border-brand-border shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-brand-navy flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                Industry Adapter
              </span>
              <Badge variant="teal" size="sm">Active</Badge>
            </div>
            <p className="text-[10px] text-brand-muted leading-relaxed">
              Test how all 7 tabs instantly adapt to other business verticals.
            </p>
            <div className="grid grid-cols-2 gap-1 pt-1">
              {Object.keys(INDUSTRY_CONFIGS).map((indKey) => {
                const conf = INDUSTRY_CONFIGS[indKey];
                const isSelected = industry === indKey;
                return (
                  <button
                    key={indKey}
                    type="button"
                    onClick={() => handleIndustryChange(indKey)}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all text-left truncate ${
                      isSelected
                        ? 'bg-brand-navy text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {conf.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-18 bg-white border-b border-brand-border sticky top-0 z-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between app-header">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="text-xs text-brand-muted font-medium flex items-center gap-1.5">
                <span>{industryConfig.name}</span>
                <span>•</span>
                <span className="text-brand-teal font-semibold">Tier 1 Multi-Industry Engine</span>
              </div>
              <h1 className="text-base font-bold text-brand-navy leading-none mt-0.5">
                {user?.businessName || industryConfig.sampleBusinessName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl text-brand-muted hover:text-brand-teal hover:bg-slate-100 transition-colors theme-toggle"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {/* Quick Action Button */}
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/app/bookings')}
              className="hidden sm:inline-flex"
            >
              New {terms.booking}
            </Button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-brand-muted hover:text-brand-navy hover:bg-slate-100 relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-brand-teal absolute top-2 right-2 ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-modal border border-brand-border p-4 z-40 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                    <span className="text-xs font-bold text-brand-navy">Recent {terms.bookings}</span>
                    <Badge variant="teal" size="sm">2 Scheduled</Badge>
                  </div>
                  <div className="space-y-3 py-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <p className="font-semibold text-brand-navy">Aditi Rao confirmed</p>
                      <p className="text-[11px] text-brand-muted">{terms.booking} today at 10:00 AM</p>
                    </div>
                    <div className="p-2 bg-teal-50/50 rounded-xl">
                      <p className="font-semibold text-brand-navy">AI Receptionist Draft</p>
                      <p className="text-[11px] text-brand-muted">Automated query resolved via chat</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 p-1 pl-2 rounded-xl border border-brand-border hover:bg-slate-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-teal text-white text-xs font-bold flex items-center justify-center">
                  BO
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-brand-navy leading-none">
                    {user?.name || 'Business Owner'}
                  </span>
                  <span className="text-[10px] text-brand-muted">Workspace Admin</span>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-modal border border-brand-border p-2 z-40 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-brand-border">
                    <p className="text-xs font-bold text-brand-navy">{user?.name}</p>
                    <p className="text-[11px] text-brand-muted truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleSwitchToPlatform}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-brand-text hover:bg-slate-50 rounded-lg flex items-center justify-between"
                    >
                      <span>Switch to Platform SaaS</span>
                      <Building2 className="w-3.5 h-3.5 text-brand-navy" />
                    </button>
                    <button
                      onClick={() => navigate('/app/settings')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-brand-text hover:bg-slate-50 rounded-lg"
                    >
                      Business Settings
                    </button>
                  </div>
                  <div className="pt-1 border-t border-brand-border">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-brand-error hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-brand-navy/30 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col p-4">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <span className="text-sm font-bold text-brand-navy">Business Menu</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md text-brand-muted hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-brand-muted hover:bg-slate-100"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setMobileSidebarOpen(false);
                handleSwitchToPlatform();
              }}
            >
              Switch to Platform Hub
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
