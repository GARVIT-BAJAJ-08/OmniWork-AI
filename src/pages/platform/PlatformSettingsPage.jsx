import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { 
  Settings, 
  ShieldCheck, 
  Palette, 
  Bell, 
  RotateCcw, 
  CheckCircle2, 
  Save, 
  Globe, 
  Lock, 
  Zap,
  Layers
} from 'lucide-react';

export const PlatformSettingsPage = () => {
  const { user } = useAuth();
  const { resetAllData } = useData();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    platformName: 'BusinessOS AI SaaS Platform',
    operatorName: user?.name || 'Alex Thorne',
    supportEmail: 'support@businessos.ai',
    primaryCurrency: 'INR (₹)',
    customDomain: 'app.businessos.ai',
  });

  const [featureFlags, setFeatureFlags] = useState({
    enableAIReceptionistGlobally: true,
    enableMultiLocationTiers: true,
    enableWhatsAppReminders: true,
    enableClientPortalPreviews: true,
    enableStrictRoleAudit: false,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    notifyOnNewRegistration: true,
    notifyOnPlanUpgrade: true,
    notifyOnFailedPayment: true,
    dailySummaryDigest: true,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    addToast('Platform configuration saved locally');
  };

  const handleResetData = () => {
    resetAllData();
    addToast('All mock data has been reset to default state');
    setIsResetConfirmOpen(false);
  };

  const tabs = [
    { id: 'profile', label: 'Platform Profile', icon: Globe },
    { id: 'features', label: 'Feature Flags', icon: Zap },
    { id: 'branding', label: 'Global Branding', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">Platform Settings</h1>
          <p className="text-xs text-brand-muted mt-1">
            Configure global SaaS parameters, tenant entitlements, and system preferences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
            icon={RotateCcw}
          >
            Reset Demo Data
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveProfile} icon={Save}>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Profile & General */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Platform Identity</h3>
            <p className="text-xs text-brand-muted">Root metadata visible across operator environments</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={profileForm.platformName}
                  onChange={(e) => setProfileForm({ ...profileForm, platformName: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl text-xs focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Operator Name
                </label>
                <input
                  type="text"
                  value={profileForm.operatorName}
                  onChange={(e) => setProfileForm({ ...profileForm, operatorName: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl text-xs focus:ring-1 focus:ring-brand-teal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={profileForm.supportEmail}
                  onChange={(e) => setProfileForm({ ...profileForm, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl text-xs focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Default Currency
                </label>
                <input
                  type="text"
                  readOnly
                  value={profileForm.primaryCurrency}
                  className="w-full px-3 py-2 border border-brand-border bg-slate-50 rounded-xl text-xs text-brand-muted"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Custom Domain
                </label>
                <input
                  type="text"
                  value={profileForm.customDomain}
                  onChange={(e) => setProfileForm({ ...profileForm, customDomain: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl text-xs focus:ring-1 focus:ring-brand-teal"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="sm" type="submit" icon={CheckCircle2}>
                Update Profile Settings
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Feature Flags */}
      {activeTab === 'features' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Global Feature Availability</h3>
            <p className="text-xs text-brand-muted">Turn features on or off for all tenant business workspaces</p>
          </div>

          <div className="divide-y divide-brand-border/60 text-xs">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-brand-navy">AI Receptionist Concierge Module</div>
                <div className="text-brand-muted">Allows clinics and salons to enable automated conversational booking agents.</div>
              </div>
              <input
                type="checkbox"
                checked={featureFlags.enableAIReceptionistGlobally}
                onChange={(e) => setFeatureFlags({ ...featureFlags, enableAIReceptionistGlobally: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal cursor-pointer"
              />
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-brand-navy">Multi-Location Branching</div>
                <div className="text-brand-muted">Allows business owners to link multiple branches to a single billing account.</div>
              </div>
              <input
                type="checkbox"
                checked={featureFlags.enableMultiLocationTiers}
                onChange={(e) => setFeatureFlags({ ...featureFlags, enableMultiLocationTiers: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal cursor-pointer"
              />
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-brand-navy">Automated WhatsApp & SMS Notifications</div>
                <div className="text-brand-muted">Sends simulated appointment confirmations directly to patient/client phone numbers.</div>
              </div>
              <input
                type="checkbox"
                checked={featureFlags.enableWhatsAppReminders}
                onChange={(e) => setFeatureFlags({ ...featureFlags, enableWhatsAppReminders: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal cursor-pointer"
              />
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-brand-navy">Strict RBAC Role Auditing</div>
                <div className="text-brand-muted">Enforce dual approval for appointment cancellation and team member removal.</div>
              </div>
              <input
                type="checkbox"
                checked={featureFlags.enableStrictRoleAudit}
                onChange={(e) => setFeatureFlags({ ...featureFlags, enableStrictRoleAudit: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Branding */}
      {activeTab === 'branding' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Design Tokens & Palette</h3>
            <p className="text-xs text-brand-muted">The core design tokens applied across the platform</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-brand-border">
              <div className="w-full h-10 rounded-lg bg-brand-navy mb-2" />
              <div className="font-bold text-brand-navy">Deep Navy</div>
              <div className="text-brand-muted">#10243A</div>
            </div>
            <div className="p-3 rounded-xl border border-brand-border">
              <div className="w-full h-10 rounded-lg bg-brand-teal mb-2" />
              <div className="font-bold text-brand-navy">Primary Teal</div>
              <div className="text-brand-muted">#0D9488</div>
            </div>
            <div className="p-3 rounded-xl border border-brand-border">
              <div className="w-full h-10 rounded-lg bg-brand-tealLight mb-2" />
              <div className="font-bold text-brand-navy">Bright Teal</div>
              <div className="text-brand-muted">#14B8A6</div>
            </div>
            <div className="p-3 rounded-xl border border-brand-border">
              <div className="w-full h-10 rounded-lg bg-brand-mint border border-teal-200 mb-2" />
              <div className="font-bold text-brand-navy">Pale Mint</div>
              <div className="text-brand-muted">#E8F8F4</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Platform Alerts & Email Digests</h3>
            <p className="text-xs text-brand-muted">Configure operational notifications sent to platform administrators</p>
          </div>

          <div className="divide-y divide-brand-border/60 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-brand-navy">New Tenant Registration Alert</div>
                <div className="text-brand-muted">Receive an instant notice when a business creates a workspace.</div>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.notifyOnNewRegistration}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, notifyOnNewRegistration: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-brand-navy">Subscription Upgrade Notice</div>
                <div className="text-brand-muted">Notice when a clinic or studio upgrades to Growth or Enterprise.</div>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.notifyOnPlanUpgrade}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, notifyOnPlanUpgrade: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-brand-navy">Daily Revenue & Booking Digest</div>
                <div className="text-brand-muted">Summary of total bookings and active platform transactions.</div>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.dailySummaryDigest}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, dailySummaryDigest: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setIsResetConfirmOpen(false)}
          onConfirm={handleResetData}
          title="Reset All Mock Data"
          message="This will reset all bookings, customers, services, team members, and business registrations back to the initial sample records. Local edits will be cleared."
          confirmText="Yes, Reset to Defaults"
          variant="danger"
        />
      )}
    </div>
  );
};
