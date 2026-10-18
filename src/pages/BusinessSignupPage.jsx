import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { INDUSTRY_CONFIGS } from '../data/mockIndustryTemplates';
import { 
  Building2, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Stethoscope, 
  Scissors, 
  GraduationCap, 
  Home, 
  Briefcase,
  Sparkles,
  MapPin,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const BusinessSignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Dr. Rajesh Verma',
    workEmail: 'rajesh.verma@apexhealth.in',
    password: 'password123',
    confirmPassword: 'password123',
    businessName: 'Apex Health & Wellness Clinic',
    industry: 'healthcare',
    category: 'General Medicine',
    locationsCount: 3,
    teamSize: '11-25',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { setBusinessOwnerDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const industriesList = [
    { id: 'healthcare', label: 'Healthcare & Clinics', icon: Stethoscope, desc: 'Patients, Doctors, Consultations' },
    { id: 'salon', label: 'Salon & Wellness', icon: Scissors, desc: 'Clients, Stylists, Treatments' },
    { id: 'education', label: 'Education & Coaching', icon: GraduationCap, desc: 'Students, Instructors, Sessions' },
    { id: 'real_estate', label: 'Real Estate & Property', icon: Home, desc: 'Leads, Agents, Property Visits' },
    { id: 'general', label: 'Professional Services', icon: Briefcase, desc: 'Clients, Staff, Consultations' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectIndustry = (indKey) => {
    const config = INDUSTRY_CONFIGS[indKey];
    setFormData((prev) => ({
      ...prev,
      industry: indKey,
      businessName: config.sampleBusinessName,
      category: config.sampleCategories[0],
    }));
  };

  const handleNextStep = () => {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName.trim()) {
      setErrors({ businessName: 'Business name is required' });
      return;
    }

    // Save demo business owner state
    setBusinessOwnerDemo(formData.industry, formData.fullName, formData.businessName);
    addToast(`Workspace created for ${formData.businessName}! Welcome to your dashboard.`);
    navigate('/app');
  };

  const selectedConfig = INDUSTRY_CONFIGS[formData.industry] || INDUSTRY_CONFIGS.healthcare;

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 auth-page">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Informative Column */}
        <div className="lg:col-span-5 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-navy transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to BusinessOS Home
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-teal text-white flex items-center justify-center shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-brand-navy tracking-tight">
                BusinessOS <span className="text-brand-teal">AI</span>
              </span>
              <div className="text-[11px] font-bold text-brand-teal uppercase tracking-wider">
                Multi-Industry Onboarding
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Your business. <br />One smarter workspace.
            </h1>
            <p className="text-sm text-brand-muted leading-relaxed">
              Set up your workspace and start organizing your everyday operations. The platform automatically tailors appointments, customer directories, and AI responses to your sector.
            </p>
          </div>

          {/* Dynamic Preview Card of Selected Industry */}
          <div className="p-4 rounded-2xl bg-white border border-brand-teal/30 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-teal" />
                Adaptive Preview
              </span>
              <Badge variant="teal" size="sm">{selectedConfig.name.split(' ')[0]}</Badge>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-brand-muted">Target Customers:</span>
                <span className="font-semibold text-brand-navy">{selectedConfig.terms.customers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Service Model:</span>
                <span className="font-semibold text-brand-navy">{selectedConfig.terms.services}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Provider Label:</span>
                <span className="font-semibold text-brand-navy">{selectedConfig.terms.staffPlural}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Scheduling Units:</span>
                <span className="font-semibold text-brand-navy">{selectedConfig.terms.bookings}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-brand-muted">
            Are you the SaaS operator running the entire platform?{' '}
            <Link to="/signup/platform-owner" className="text-brand-teal font-semibold hover:underline">
              Operator Sign Up →
            </Link>
          </div>
        </div>

        {/* Right Form Card with 2-Step Wizard */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-brand-border shadow-modal p-6 sm:p-10 auth-form-card">
            {/* Step Wizard Header */}
            <div className="flex items-center justify-between pb-6 border-b border-brand-border mb-6">
              <div>
                <h2 className="text-xl font-bold text-brand-navy">
                  {step === 1 ? 'Step 1: Your Account' : 'Step 2: Business Profile'}
                </h2>
                <p className="text-xs text-brand-muted mt-0.5">
                  {step === 1 ? 'Enter your login and contact details' : 'Configure your workspace and vertical'}
                </p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    step === 1
                      ? 'bg-brand-teal text-white'
                      : 'bg-brand-mint text-brand-teal'
                  }`}
                >
                  {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <div className={`w-8 h-1 rounded-full ${step === 2 ? 'bg-brand-teal' : 'bg-slate-200'}`} />
                <div
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    step === 2
                      ? 'bg-brand-teal text-white'
                      : 'bg-slate-100 text-brand-muted'
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            {/* Step 1: Your Account */}
            {step === 1 && (
              <div className="space-y-4">
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
                    placeholder="e.g. Dr. Rajesh Verma"
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
                    placeholder="e.g. contact@apexclinic.com"
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

                <div className="pt-4 flex items-center justify-between">
                  <Link to="/" className="text-xs font-semibold text-brand-muted hover:text-brand-navy">
                    Cancel
                  </Link>
                  <Button variant="primary" size="md" onClick={handleNextStep} icon={ArrowRight}>
                    Continue to Business Setup
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Your Business */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                {/* Visual Industry Selector */}
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                    Select Your Industry
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {industriesList.map((ind) => {
                      const Icon = ind.icon;
                      const isSelected = formData.industry === ind.id;
                      return (
                        <div
                          key={ind.id}
                          onClick={() => handleSelectIndustry(ind.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-teal-50/40 border-brand-teal ring-1 ring-brand-teal shadow-xs'
                              : 'bg-slate-50/50 border-brand-border hover:border-slate-300'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-brand-teal text-white' : 'bg-slate-200 text-slate-700'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-brand-navy">{ind.label}</div>
                            <div className="text-[11px] text-brand-muted">{ind.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all ${
                      errors.businessName ? 'border-brand-error' : 'border-brand-border'
                    }`}
                    placeholder="e.g. Apex Health Clinic"
                  />
                  {errors.businessName && <p className="text-xs text-brand-error mt-1">{errors.businessName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-xs text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      {selectedConfig.sampleCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Locations
                    </label>
                    <select
                      name="locationsCount"
                      value={formData.locationsCount}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-xs text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option value={1}>1 Location</option>
                      <option value={2}>2 - 3 Locations</option>
                      <option value={5}>4 - 10 Locations</option>
                      <option value={10}>10+ Multi-Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Team Size
                    </label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-xs text-brand-navy bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option value="1-5">1 - 5 staff</option>
                      <option value="6-15">6 - 15 staff</option>
                      <option value="16-50">16 - 50 staff</option>
                      <option value="50+">50+ staff</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <Button variant="secondary" size="md" onClick={() => setStep(1)} icon={ArrowLeft}>
                    Back
                  </Button>
                  <Button variant="primary" size="md" type="submit" icon={Sparkles}>
                    Create Workspace & Launch
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
