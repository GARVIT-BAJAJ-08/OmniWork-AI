import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  Lock,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const PlatformSignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Alex Thorne',
    workEmail: 'operator@businessos.ai',
    password: 'password123',
    confirmPassword: 'password123',
    acceptTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { setPlatformOwnerDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.workEmail.trim() || !formData.workEmail.includes('@')) {
      newErrors.workEmail = 'Valid work email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms of service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save demo role locally
    setPlatformOwnerDemo(formData.fullName, formData.workEmail);
    addToast('Platform Administrator account created! Welcome to the Control Center.');
    navigate('/platform');
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 auth-page">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Branding Column */}
        <div className="lg:col-span-5 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-navy transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to BusinessOS Home
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-navy text-white flex items-center justify-center shadow-sm">
              <Building2 className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-brand-navy tracking-tight">
                BusinessOS <span className="text-brand-teal">AI</span>
              </span>
              <div className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                Platform Operator Console
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Build and manage your business platform.
            </h1>
            <p className="text-sm text-brand-muted leading-relaxed">
              Create your platform administrator profile and explore the BusinessOS AI control center. Supervise multi-tenant businesses, global subscriptions, and system health.
            </p>
          </div>

          {/* Benefits highlights */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-border shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-brand-navy">Multi-Industry SaaS Infrastructure</h4>
                <p className="text-[11px] text-brand-muted mt-0.5">Operate medical clinics, salons, coaching institutes, and real estate teams under one centralized engine.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-border shadow-2xs">
              <BarChart3 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-brand-navy">Consolidated Platform MRR Analytics</h4>
                <p className="text-[11px] text-brand-muted mt-0.5">Real-time revenue metrics in ₹, active subscriber retention, and tier upgrade tracking.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-border shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-brand-navy">Prototype Demonstration Mode</h4>
                <p className="text-[11px] text-brand-muted mt-0.5">No backend API or credit card required. All operational data stores cleanly in your local browser storage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-brand-border shadow-modal p-6 sm:p-10 auth-form-card">
            <div className="flex items-center justify-between pb-6 border-b border-brand-border mb-6">
              <div>
                <h2 className="text-xl font-bold text-brand-navy">Operator Registration</h2>
                <p className="text-xs text-brand-muted mt-1">Configure your master SaaS platform access credentials.</p>
              </div>
              <Badge variant="navy" size="md">Platform Owner</Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all ${
                    errors.fullName ? 'border-brand-error' : 'border-brand-border'
                  }`}
                  placeholder="e.g. Alex Thorne"
                />
                {errors.fullName && <p className="text-xs text-brand-error mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all ${
                    errors.workEmail ? 'border-brand-error' : 'border-brand-border'
                  }`}
                  placeholder="e.g. operator@businessos.ai"
                />
                {errors.workEmail && <p className="text-xs text-brand-error mt-1">{errors.workEmail}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all pr-10 ${
                        errors.password ? 'border-brand-error' : 'border-brand-border'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-brand-muted hover:text-brand-navy"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-brand-error mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all ${
                      errors.confirmPassword ? 'border-brand-error' : 'border-brand-border'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-brand-error mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 rounded text-brand-teal focus:ring-brand-teal border-brand-border w-4 h-4"
                  />
                  <span className="text-xs text-brand-muted leading-relaxed">
                    I acknowledge that this is a frontend demonstration instance of BusinessOS AI and agree to simulated operator terms.
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-xs text-brand-error mt-1">{errors.acceptTerms}</p>}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <Button variant="primary" size="lg" type="submit" className="w-full sm:w-auto flex-1" icon={ArrowRight}>
                  Create Platform Account
                </Button>
                <Link to="/" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className="pt-4 text-center text-[11px] text-brand-muted">
                Looking to sign up as a Clinic, Salon, or Business Owner?{' '}
                <Link to="/signup/business-owner" className="text-brand-teal font-semibold hover:underline">
                  Create Business Workspace →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
