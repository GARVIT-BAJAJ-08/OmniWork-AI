import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Moon, Sun } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useDarkMode } from '../hooks/useDarkMode';

export const PlatformLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const { user, logout, setBusinessOwnerDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    addToast('Signed out of demo session');
    navigate('/');
  };

  const handleSwitchToBusiness = () => {
    setBusinessOwnerDemo('healthcare');
    addToast('Switched to Business Owner Dashboard (Healthcare)');
    navigate('/app');
  };

  const navItems = [
    { name: 'Overview', path: '/platform', icon: LayoutDashboard },
    { name: 'Businesses', path: '/platform/businesses', icon: Building2 },
    { name: 'Subscriptions', path: '/platform/subscriptions', icon: CreditCard },
    { name: 'Platform Settings', path: '/platform/settings', icon: Settings },
  ];

  const getPageTitle = () => {
    const item = navItems.find((i) => i.path === location.pathname);
    return item ? item.name : 'Platform Management';
  };

  return (
    <div className={`min-h-screen bg-brand-bg flex app-shell${darkMode ? ' dark-mode' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-brand-border h-screen sticky top-0 z-30 select-none app-sidebar">
        {/* Sidebar Brand Header */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-brand-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white">
              <div className="grid grid-cols-2 gap-0.5 p-0.5">
                <div className="w-1.5 h-1.5 rounded-xs bg-brand-teal" />
                <div className="w-1.5 h-1.5 rounded-xs bg-white" />
                <div className="w-1.5 h-1.5 rounded-xs bg-white/70" />
                <div className="w-1.5 h-1.5 rounded-xs bg-brand-tealLight" />
              </div>
            </div>
            <div>
              <div className="text-sm font-extrabold text-brand-navy leading-none">
                BusinessOS <span className="text-brand-teal">AI</span>
              </div>
              <span className="text-[10px] font-semibold text-brand-teal uppercase tracking-wider">
                Operator Hub
              </span>
            </div>
          </div>
          <Badge variant="navy" size="sm">Admin</Badge>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            Core Infrastructure
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/platform'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-xs'
                      : 'text-brand-muted hover:text-brand-navy hover:bg-slate-100/80'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Switcher Card */}
        <div className="p-3 border-t border-brand-border bg-slate-50/60">
          <div className="p-3 bg-white rounded-xl border border-brand-border shadow-2xs space-y-2">
            <div className="text-[11px] font-semibold text-brand-navy flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
              Dual Prototype Preview
            </div>
            <p className="text-[10px] text-brand-muted leading-relaxed">
              Explore how individual businesses experience their customized workspaces.
            </p>
            <Button
              variant="mint"
              size="sm"
              className="w-full text-xs"
              onClick={handleSwitchToBusiness}
              icon={ExternalLink}
            >
              Switch to Business App
            </Button>
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
              <div className="text-xs text-brand-muted font-medium">Platform Operations</div>
              <h1 className="text-base font-bold text-brand-navy leading-none mt-0.5">
                {getPageTitle()}
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
            {/* Search Bar */}
            <div className="hidden sm:flex items-center relative">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search businesses, plans..."
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal w-48 lg:w-64 transition-all"
              />
            </div>

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
                    <span className="text-xs font-bold text-brand-navy">Platform Alerts</span>
                    <Badge variant="teal" size="sm">3 New</Badge>
                  </div>
                  <div className="space-y-3 py-2 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-brand-navy">Apex Clinic Upgraded</p>
                        <p className="text-[11px] text-brand-muted">Enterprise Tier renewed for ₹14,999</p>
                        <span className="text-[10px] text-slate-400">10 mins ago</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <Building2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-brand-navy">New Salon Workspace</p>
                        <p className="text-[11px] text-brand-muted">Luxe Aura onboarded 2 salon locations</p>
                        <span className="text-[10px] text-slate-400">1 hour ago</span>
                      </div>
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
                <div className="w-7 h-7 rounded-lg bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                  PO
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-brand-navy leading-none">
                    {user?.name || 'Platform Admin'}
                  </span>
                  <span className="text-[10px] text-brand-muted">SaaS Operator</span>
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
                      onClick={handleSwitchToBusiness}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-brand-text hover:bg-slate-50 rounded-lg flex items-center justify-between"
                    >
                      <span>Switch to Business App</span>
                      <ExternalLink className="w-3.5 h-3.5 text-brand-teal" />
                    </button>
                    <button
                      onClick={() => navigate('/platform/settings')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-brand-text hover:bg-slate-50 rounded-lg"
                    >
                      Platform Settings
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

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-brand-navy/30 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col p-4">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <span className="text-sm font-bold text-brand-navy">Platform Menu</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md text-brand-muted hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 py-4 space-y-1">
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
              variant="mint"
              size="sm"
              onClick={() => {
                setMobileSidebarOpen(false);
                handleSwitchToBusiness();
              }}
            >
              Switch to Business App
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
