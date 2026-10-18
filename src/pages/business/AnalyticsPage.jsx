import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Bot,
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
  BUSINESS_MONTHLY_PERFORMANCE, 
  BUSINESS_WEEKLY_BOOKINGS, 
  BUSINESS_CHANNEL_METRICS 
} from '../../data/mockAnalytics';

export const AnalyticsPage = () => {
  const { industryConfig } = useAuth();
  const terms = industryConfig.terms;
  const [timeRange, setTimeRange] = useState('Last 5 Months');

  const completionData = [
    { name: 'Completed', value: 92, fill: '#0D9488' },
    { name: 'Rescheduled', value: 5, fill: '#3B82F6' },
    { name: 'Cancelled / No-show', value: 3, fill: '#EF4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              Operational Analytics
            </h1>
            <Badge variant="teal" size="sm">{industryConfig.name}</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Performance metrics, {terms.bookings.toLowerCase()} conversion telemetry, and revenue trends in ₹.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-white text-xs font-semibold text-brand-navy shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-brand-muted" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="This Month">Current Cycle</option>
              <option value="Last 3 Months">Last Quarter</option>
              <option value="Last 5 Months">Last 5 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Gross Generated Value"
          value="₹6,42,000"
          subtitle="October 2026 Run-rate"
          trend="+18%"
          trendLabel="vs last month"
          icon={TrendingUp}
        />
        <StatCard
          title={`Total ${terms.bookings}`}
          value="530"
          subtitle="92% fulfilled successfully"
          trend="+14%"
          trendLabel="volume growth"
          icon={BarChart3}
        />
        <StatCard
          title={`New ${terms.customers}`}
          value="210"
          subtitle="82% repeat retention"
          trend="+22%"
          trendLabel="acquisition"
          icon={Users}
        />
        <StatCard
          title="Fulfillment Rate"
          value="94.6%"
          subtitle="Only 2.4% no-show rate"
          icon={CheckCircle2}
          badgeText="Optimal"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Trajectory Bar/Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-brand-navy">Revenue Generation (INR ₹)</h3>
              <p className="text-xs text-brand-muted">Total value delivered across all physical clinics/locations</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
              <span className="text-xs font-semibold text-brand-navy">Monthly Revenue</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={BUSINESS_MONTHLY_PERFORMANCE}>
                <defs>
                  <linearGradient id="bizRevGrad" x1="0" y1="0" x2="0" y2="1">
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
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <Tooltip
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Gross Revenue']}
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
                  fill="url(#bizRevGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fulfillment Donut */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-brand-navy">{terms.booking} Outcomes</h3>
            <p className="text-xs text-brand-muted">Completion versus cancellations</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val}%`, name]}
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
            {completionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-brand-text font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-brand-navy">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
          <div>
            <h3 className="text-base font-bold text-brand-navy">Acquisition & Scheduling Channels</h3>
            <p className="text-xs text-brand-muted">Source breakdown of incoming {terms.bookings.toLowerCase()}</p>
          </div>
          <Badge variant="teal" size="sm">Multi-Channel Attribution</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUSINESS_CHANNEL_METRICS.map((ch) => (
            <div key={ch.source} className="p-4 rounded-xl bg-slate-50 border border-brand-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy">{ch.source}</span>
                <span className="text-[10px] font-semibold text-brand-teal bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                  {ch.conversion} conv
                </span>
              </div>
              <div className="text-2xl font-extrabold text-brand-navy">{ch.count}</div>
              <p className="text-[11px] text-brand-muted">Verified {terms.bookings.toLowerCase()} scheduled</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
