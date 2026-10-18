import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  Eye,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const SubscriptionsPage = () => {
  const { subscriptions } = useData();
  const { addToast } = useToast();
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);

  const planTiers = [
    {
      name: 'Starter',
      price: '₹2,499',
      period: 'per month',
      desc: 'Ideal for single-location clinics, solo stylists, and independent coaches.',
      features: [
        '1 Business Location',
        'Up to 3 Staff Members',
        'Unlimited Bookings',
        'Basic AI Receptionist (100 chats/mo)',
        'Standard Email Notifications',
      ],
      popular: false,
    },
    {
      name: 'Growth',
      price: '₹6,999',
      period: 'per month',
      desc: 'Designed for expanding studios, multi-doctor clinics, and coaching institutes.',
      features: [
        'Up to 3 Locations',
        'Up to 15 Team Members',
        'Custom SMS & WhatsApp Reminders',
        'Smart AI Receptionist (Unlimited)',
        'Advanced Analytics & Staff Commissions',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '₹14,999',
      period: 'per month',
      desc: 'Built for multi-center hospital networks, salon chains, and property brokerages.',
      features: [
        'Unlimited Physical Locations',
        'Unlimited Staff & Multi-role Access',
        'Dedicated Custom AI Assistant Training',
        'Centralized Multi-branch Billing',
        'Priority Phone Support & 99.9% SLA',
      ],
      popular: false,
    },
  ];

  const chartData = [
    { tier: 'Starter', revenue: 75000, accounts: 30 },
    { tier: 'Growth', revenue: 112000, accounts: 16 },
    { tier: 'Enterprise', revenue: 61000, accounts: 4 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">Subscription Overview</h1>
          <p className="text-xs text-brand-muted mt-1">
            Track platform recurring revenue, commercial tiers, and subscriber renewal cycles.
          </p>
        </div>
        <Badge variant="teal" size="md">Demo Billing Engine</Badge>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Recurring Revenue"
          value="₹2,48,000"
          subtitle="Annualized ARR: ₹29.7 Lakhs"
          trend="+18%"
          trendLabel="vs last quarter"
          icon={CreditCard}
        />
        <StatCard
          title="Active Subscriptions"
          value="216"
          subtitle="92% active paid retention"
          trend="+12%"
          trendLabel="net expansion"
          icon={CheckCircle2}
        />
        <StatCard
          title="Trial Workspaces"
          value="32"
          subtitle="Avg conversion: 68%"
          icon={Clock}
          badgeText="14-Day Free"
        />
        <StatCard
          title="Past-Due Accounts"
          value="4"
          subtitle="Automated grace dunning active"
          icon={AlertCircle}
        />
      </div>

      {/* Plan Comparison Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Default Subscription Tiers</h3>
            <p className="text-xs text-brand-muted">Pricing plans offered to onboarded businesses across all industries</p>
          </div>
          <span className="text-xs text-brand-muted font-medium">Billed in Indian Rupees (₹)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planTiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${
                tier.popular
                  ? 'bg-white border-brand-teal shadow-card ring-1 ring-brand-teal'
                  : 'bg-white border-brand-border shadow-subtle'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-6">
                  <Badge variant="teal" size="sm">Most Popular</Badge>
                </div>
              )}

              <div>
                <div className="text-base font-bold text-brand-navy">{tier.name}</div>
                <p className="text-xs text-brand-muted mt-1 min-h-[32px]">{tier.desc}</p>

                <div className="my-5">
                  <span className="text-3xl font-extrabold text-brand-navy">{tier.price}</span>
                  <span className="text-xs text-brand-muted ml-1.5">/{tier.period}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-brand-border text-xs">
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-brand-text">
                      <Check className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border">
                <Button
                  variant={tier.popular ? 'primary' : 'secondary'}
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setSelectedPlanDetails(tier)}
                >
                  Configure Tier Limits
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Subscriptions Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Subscriber Accounts</h3>
            <p className="text-xs text-brand-muted">Active commercial billing records</p>
          </div>
          <Badge variant="teal" size="sm">{subscriptions.length} Subscriptions Listed</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border text-brand-muted uppercase font-bold text-[10px]">
                <th className="py-2.5 px-3">Organization</th>
                <th className="py-2.5 px-3">Owner Contact</th>
                <th className="py-2.5 px-3">Plan Tier</th>
                <th className="py-2.5 px-3">Billing Cycle</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Renewal Date</th>
                <th className="py-2.5 px-3 text-right">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-brand-navy">{sub.businessName}</td>
                  <td className="py-3 px-3 text-brand-muted">{sub.ownerName}</td>
                  <td className="py-3 px-3">
                    <Badge variant={sub.plan === 'Enterprise' ? 'navy' : 'teal'} size="sm">
                      {sub.plan}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-brand-muted">{sub.billingCycle}</td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={
                        sub.status === 'Active'
                          ? 'success'
                          : sub.status === 'Trial'
                          ? 'warning'
                          : 'error'
                      }
                      size="sm"
                    >
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-brand-muted">{sub.renewalDate}</td>
                  <td className="py-3 px-3 text-right font-bold text-brand-navy">
                    ₹{sub.price.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Details Modal */}
      {selectedPlanDetails && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPlanDetails(null)}
          title={`${selectedPlanDetails.name} Tier Configuration`}
          subtitle="Configure default limits and entitlement flags"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-brand-ice rounded-xl border border-teal-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-brand-navy">{selectedPlanDetails.name} Pricing</div>
                <div className="text-[11px] text-brand-muted">{selectedPlanDetails.desc}</div>
              </div>
              <div className="text-base font-extrabold text-brand-teal">
                {selectedPlanDetails.price}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                Included Features
              </label>
              <div className="space-y-1.5 p-3 rounded-xl border border-brand-border bg-slate-50">
                {selectedPlanDetails.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-brand-border">
              <Button variant="secondary" size="sm" onClick={() => setSelectedPlanDetails(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  addToast(`Plan limits for ${selectedPlanDetails.name} updated successfully`);
                  setSelectedPlanDetails(null);
                }}
              >
                Save Tier Limits
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
