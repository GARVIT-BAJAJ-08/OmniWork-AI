import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { INDUSTRY_CONFIGS } from '../../data/mockIndustryTemplates';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { 
  Building2, 
  Layers, 
  Clock, 
  Bell, 
  CreditCard, 
  Save, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles,
  Stethoscope,
  Scissors,
  GraduationCap,
  Home,
  Briefcase
} from 'lucide-react';

export const BusinessSettingsPage = () => {
  const { user, industry, industryConfig, switchIndustry, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');

  // Form States
  const [profileForm, setProfileForm] = useState({
    businessName: user?.businessName || industryConfig.sampleBusinessName,
    contactEmail: user?.email || 'contact@business.in',
    phone: '+91 98765 43210',
    address: '104, Horizon Prime Plaza, Indiranagar, Bengaluru, KA 560038',
    locationsCount: user?.locationsCount || 2,
  });

  const [bookingRules, setBookingRules] = useState({
    slotInterval: 30, // mins
    bufferTime: 10,   // mins
    cancellationWindow: 24, // hours
    requirePhoneVerification: true,
    autoConfirmBookings: true,
  });

  const [hoursForm, setHoursForm] = useState({
    weekdayHours: '09:00 AM - 08:00 PM',
    saturdayHours: '09:00 AM - 06:00 PM',
    sundayHours: '10:00 AM - 02:00 PM',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      businessName: profileForm.businessName,
      email: profileForm.contactEmail,
      locationsCount: profileForm.locationsCount,
    });
    addToast('Business profile settings saved');
  };

  const handleIndustrySwitch = (newInd) => {
    switchIndustry(newInd);
    addToast(`Workspace adapted to ${INDUSTRY_CONFIGS[newInd].name}`);
  };

  const tabs = [
    { id: 'profile', label: 'Business Profile', icon: Building2 },
    { id: 'industry', label: 'Industry & Adaptation', icon: Sparkles },
    { id: 'hours', label: 'Operating Hours', icon: Clock },
    { id: 'booking-rules', label: 'Booking Rules', icon: Layers },
    { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              Business Settings
            </h1>
            <Badge variant="teal" size="sm">{industryConfig.name}</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Configure your business profile, operating hours, and industry terminology.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleSaveProfile} icon={Save}>
          Save All Changes
        </Button>
      </div>

      {/* Navigation Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Business Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-brand-navy">General Business Information</h3>
            <p className="text-xs text-brand-muted">Public details displayed on customer receipts and booking links</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={profileForm.businessName}
                  onChange={(e) => setProfileForm({ ...profileForm, businessName: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={profileForm.contactEmail}
                  onChange={(e) => setProfileForm({ ...profileForm, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Number of Locations
                </label>
                <input
                  type="number"
                  min={1}
                  value={profileForm.locationsCount}
                  onChange={(e) => setProfileForm({ ...profileForm, locationsCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Main Operating Address
              </label>
              <textarea
                rows={2}
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="sm" type="submit" icon={CheckCircle2}>
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Industry & Workspace Adaptation */}
      {activeTab === 'industry' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Industry Verticals & Terminology</h3>
            <p className="text-xs text-brand-muted">
              Select any vertical to see how BusinessOS AI dynamically reconfigures appointments, directories, and AI responses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(INDUSTRY_CONFIGS).map((indKey) => {
              const conf = INDUSTRY_CONFIGS[indKey];
              const isSelected = industry === indKey;
              return (
                <div
                  key={indKey}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-teal-50/30 border-brand-teal shadow-xs ring-1 ring-brand-teal'
                      : 'bg-white border-brand-border hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-brand-teal uppercase">
                        {conf.badge}
                      </span>
                      {isSelected && <Badge variant="teal" size="sm">Active</Badge>}
                    </div>

                    <h4 className="text-sm font-bold text-brand-navy">{conf.name}</h4>
                    <p className="text-[11px] text-brand-muted mt-1 leading-relaxed">{conf.tagline}</p>

                    <div className="mt-3 pt-2.5 border-t border-brand-border/60 text-[11px] space-y-1 text-brand-text">
                      <div><strong>Customers:</strong> {conf.terms.customers}</div>
                      <div><strong>Service:</strong> {conf.terms.service}</div>
                      <div><strong>Staff:</strong> {conf.terms.staffPlural}</div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3">
                    <Button
                      variant={isSelected ? 'primary' : 'secondary'}
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => handleIndustrySwitch(indKey)}
                    >
                      {isSelected ? 'Current Workspace' : `Switch to ${conf.name.split(' ')[0]}`}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Operating Hours */}
      {activeTab === 'hours' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Operational Timings</h3>
            <p className="text-xs text-brand-muted">Used by the AI Receptionist and online booking portal</p>
          </div>

          <div className="divide-y divide-brand-border/60 text-xs">
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-brand-navy">Monday – Friday</span>
              <input
                type="text"
                value={hoursForm.weekdayHours}
                onChange={(e) => setHoursForm({ ...hoursForm, weekdayHours: e.target.value })}
                className="px-3 py-1.5 border border-brand-border rounded-xl w-64 text-xs"
              />
            </div>
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-brand-navy">Saturday</span>
              <input
                type="text"
                value={hoursForm.saturdayHours}
                onChange={(e) => setHoursForm({ ...hoursForm, saturdayHours: e.target.value })}
                className="px-3 py-1.5 border border-brand-border rounded-xl w-64 text-xs"
              />
            </div>
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-brand-navy">Sunday</span>
              <input
                type="text"
                value={hoursForm.sundayHours}
                onChange={(e) => setHoursForm({ ...hoursForm, sundayHours: e.target.value })}
                className="px-3 py-1.5 border border-brand-border rounded-xl w-64 text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToast('Operating hours updated successfully')}
            >
              Save Schedule
            </Button>
          </div>
        </div>
      )}

      {/* Tab 4: Booking Rules */}
      {activeTab === 'booking-rules' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Scheduling Constraints</h3>
            <p className="text-xs text-brand-muted">Buffer times, slot intervals, and cancellation rules</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Slot Interval (Mins)
              </label>
              <select
                value={bookingRules.slotInterval}
                onChange={(e) => setBookingRules({ ...bookingRules, slotInterval: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Buffer Between Slots
              </label>
              <select
                value={bookingRules.bufferTime}
                onChange={(e) => setBookingRules({ ...bookingRules, bufferTime: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              >
                <option value={0}>0 mins (Back to back)</option>
                <option value={10}>10 minutes buffer</option>
                <option value={15}>15 minutes buffer</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-brand-navy uppercase mb-1">
                Notice Period
              </label>
              <select
                value={bookingRules.cancellationWindow}
                onChange={(e) => setBookingRules({ ...bookingRules, cancellationWindow: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-brand-border rounded-xl"
              >
                <option value={12}>12 Hours</option>
                <option value={24}>24 Hours</option>
                <option value={48}>48 Hours</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToast('Booking preferences updated')}
            >
              Save Booking Rules
            </Button>
          </div>
        </div>
      )}

      {/* Tab 5: Plan & Billing */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Current Subscription Plan</h3>
            <p className="text-xs text-brand-muted">Your active commercial tier on BusinessOS AI</p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/50 border border-brand-teal/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-brand-navy">Growth Tier</span>
                <Badge variant="teal" size="sm">Active</Badge>
              </div>
              <p className="text-xs text-brand-muted mt-1">
                ₹6,999 / month • Renews automatically on 1st of every month
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => addToast('Simulated upgrade request sent')}
            >
              Upgrade to Enterprise (₹14,999)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
