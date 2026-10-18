import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  PLATFORM_REVENUE_CHART, 
  SUBSCRIPTION_PLAN_DISTRIBUTION, 
  INDUSTRY_BREAKDOWN 
} from '../../data/mockAnalytics';

export const PlatformOverviewPage = () => {
  const { businesses } = useData();
  const [dateRange, setDateRange] = useState('Last 6 Months');

  const totalRevenue = '₹2,48,000';
  const totalBusinessesCount = 248;
  const activeBusinessesCount = 216;
  const totalWorkspacesCount = 312;

  const COLORS = ['#0D9488', '#14B8A6', '#10243A', '#3B82F6', '#64748B'];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">Platform Overview</h1>
            <Badge variant="teal" size="sm">Operator Suite</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Monitor your multi-tenant SaaS growth, business activity, and subscription telemetry.
          </p>
        </div>

        {/* Date Filter & Demo Disclaimer */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-white text-xs font-semibold text-brand-navy shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-brand-muted" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="This Month">This Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Year to Date">Year to Date (2026)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Businesses"
          value={totalBusinessesCount}
          subtitle="Registered commercial accounts"
          trend="+14%"
          trendLabel="vs last month"
          icon={Building2}
        />
        <StatCard
          title="Active Businesses"
          value={activeBusinessesCount}
          subtitle="87% active engagement"
          trend="+9%"
          trendLabel="vs last month"
          icon={CheckCircle2}
        />
        <StatCard
          title="Total Workspaces"
          value={totalWorkspacesCount}
          subtitle="Across all physical branches"
          trend="+18%"
          trendLabel="multi-branch growth"
          icon={Users}
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value={totalRevenue}
          subtitle="Platform subscription ARR: ₹29.7L"
          trend="+22%"
          trendLabel="vs last month"
          icon={CreditCard}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Growth Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-brand-navy">Platform Revenue Growth (INR)</h3>
              <p className="text-xs text-brand-muted">Monthly recurring revenue trends over the past 6 billing cycles</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
              <span className="text-xs font-semibold text-brand-navy">Monthly Revenue</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PLATFORM_REVENUE_CHART}>
                <defs>
                  <linearGradient id="platRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Platform MRR']}
                  contentStyle={{
                    background: '#10243A',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0D9488"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#platRevenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription Plan Distribution Donut */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Plan Breakdown</h3>
            <p className="text-xs text-brand-muted">Distribution of active platform tiers</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SUBSCRIPTION_PLAN_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {SUBSCRIPTION_PLAN_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name, props) => [`${val} Workspaces (${props.payload.value}%)`, name]}
                  contentStyle={{
                    background: '#10243A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-brand-border text-xs">
            {SUBSCRIPTION_PLAN_DISTRIBUTION.map((tier) => (
              <div key={tier.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.fill }} />
                  <span className="text-brand-text font-medium">{tier.name}</span>
                </div>
                <span className="font-bold text-brand-navy">{tier.count} accounts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Business Registrations & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Registrations Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
            <div>
              <h3 className="text-base font-bold text-brand-navy">Recent Business Registrations</h3>
              <p className="text-xs text-brand-muted">Latest multi-industry organizations onboarded</p>
            </div>
            <Badge variant="teal" size="sm">{businesses.length} Total Registered</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border text-brand-muted uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-3">Business Name</th>
                  <th className="py-2.5 px-3">Industry</th>
                  <th className="py-2.5 px-3">Owner</th>
                  <th className="py-2.5 px-3">Plan</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {businesses.slice(0, 5).map((biz) => (
                  <tr key={biz.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-brand-navy">{biz.name}</td>
                    <td className="py-3 px-3 capitalize">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {biz.industry.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-brand-muted">{biz.ownerName}</td>
                    <td className="py-3 px-3">
                      <Badge variant={biz.plan === 'Enterprise' ? 'navy' : 'teal'} size="sm">
                        {biz.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          biz.status === 'Active'
                            ? 'success'
                            : biz.status === 'Trial'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                      >
                        {biz.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-brand-navy">
                      ₹{biz.monthlyRevenue.toLocaleString('en-IN')}/mo
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Platform Activity List */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
            <h3 className="text-base font-bold text-brand-navy">Platform Audit Log</h3>
            <span className="text-[11px] text-brand-muted">Simulated Feed</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-50 text-brand-teal shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">AI Receptionist Enabled</p>
                <p className="text-[11px] text-brand-muted">Luxe Aura Hair Studio activated autonomous concierge</p>
                <span className="text-[10px] text-slate-400">14 minutes ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Multi-Location Branch Added</p>
                <p className="text-[11px] text-brand-muted">Apex Health opened 3rd clinic in Indiranagar</p>
                <span className="text-[10px] text-slate-400">1 hour ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Subscription Upgraded</p>
                <p className="text-[11px] text-brand-muted">Zenith Academy moved to Enterprise (₹14,999/mo)</p>
                <span className="text-[10px] text-slate-400">3 hours ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Trial Account Started</p>
                <p className="text-[11px] text-brand-muted">Vanguard Corporate enrolled in 14-day trial</p>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
