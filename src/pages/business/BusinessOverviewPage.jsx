import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  CalendarDays, 
  Users, 
  UserCheck, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Bot, 
  MapPin, 
  Briefcase,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { BUSINESS_WEEKLY_BOOKINGS } from '../../data/mockAnalytics';

export const BusinessOverviewPage = () => {
  const { user, industry, industryConfig } = useAuth();
  const { bookings, customers, services, team, aiConfigs } = useData();
  const navigate = useNavigate();

  const terms = industryConfig.terms;
  const currentAiConfig = aiConfigs[industry] || aiConfigs.healthcare;

  // Filter items for current industry
  const currentBookings = bookings.filter((b) => b.industry === industry || industry === 'general');
  const currentCustomers = customers.filter((c) => c.industry === industry || industry === 'general');
  const currentTeam = team.filter((t) => t.industry === industry || industry === 'general');

  // Compute metrics
  const todayBookingsCount = currentBookings.filter((b) => b.date === '2026-10-19').length || 4;
  const activeCustomersCount = currentCustomers.length || 12;
  const teamCount = currentTeam.length || 4;

  const firstName = user?.name ? user.name.split(' ')[0] : 'Owner';

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              Good morning, {firstName}
            </h1>
            <Badge variant="teal" size="sm">Live Workspace</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Here's what's happening with your {industryConfig.name.toLowerCase()} operations today.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/app/customers')}
            icon={Users}
          >
            Add {terms.customer}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/app/services')}
            icon={Briefcase}
          >
            Add {terms.service}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/bookings')}
            icon={Plus}
          >
            New {terms.booking}
          </Button>
        </div>
      </div>

      {/* Business Identity Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-teal flex items-center justify-center font-extrabold text-lg shrink-0">
            {user?.businessName ? user.businessName.charAt(0) : 'B'}
          </div>
          <div>
            <div className="text-base font-bold text-brand-navy flex items-center gap-2">
              {user?.businessName || industryConfig.sampleBusinessName}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted mt-1">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-brand-teal" />
                {industryConfig.name}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-teal" />
                {user?.locationsCount || 2} Physical Locations
              </span>
              <span>•</span>
              <span className="text-brand-navy font-semibold">Growth Tier (Active)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <Button
            variant="mint"
            size="sm"
            onClick={() => navigate('/app/settings')}
            className="text-xs"
          >
            Workspace Settings
          </Button>
        </div>
      </div>

      {/* 4 Industry-Adaptive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={`Today's ${terms.bookings}`}
          value={todayBookingsCount}
          subtitle="4 confirmed, 1 pending"
          trend="+22%"
          trendLabel="vs yesterday"
          icon={CalendarDays}
        />
        <StatCard
          title={`Active ${terms.customers}`}
          value={activeCustomersCount * 35}
          subtitle={`${activeCustomersCount} registered directory`}
          trend="+8%"
          trendLabel="new this month"
          icon={Users}
        />
        <StatCard
          title={terms.staffPlural}
          value={`${teamCount} Active`}
          subtitle="All rostered on duty"
          icon={UserCheck}
          badgeText="100% Coverage"
        />
        <StatCard
          title="Monthly Performance"
          value="₹4,28,000"
          subtitle="Gross business value generated"
          trend="+18%"
          trendLabel="vs target"
          icon={TrendingUp}
        />
      </div>

      {/* Main Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-brand-navy">Weekly {terms.bookings} Volume</h3>
              <p className="text-xs text-brand-muted">Number of scheduled and completed slots across 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-brand-navy">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
                {terms.bookings}
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={BUSINESS_WEEKLY_BOOKINGS}>
                <defs>
                  <linearGradient id="bizWeeklyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(val) => [`${val} ${terms.bookings}`, 'Volume']}
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
                  dataKey="bookings"
                  stroke="#0D9488"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#bizWeeklyGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Receptionist Summary Box */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-brand-mint text-brand-teal">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-navy">{currentAiConfig.name}</h4>
                  <span className="text-[10px] text-brand-teal font-semibold">Autonomous Concierge</span>
                </div>
              </div>
              <Badge variant="teal" size="sm">Active</Badge>
            </div>

            <div className="space-y-3 py-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-muted">Today's Inquiries</span>
                <div className="text-base font-extrabold text-brand-navy">24 Conversations</div>
                <p className="text-[11px] text-brand-muted">Automated responses for consultation fees and operating hours.</p>
              </div>

              <div className="p-3 bg-teal-50/50 rounded-xl space-y-1 border border-teal-100">
                <span className="text-[10px] uppercase font-bold text-brand-teal">Drafted {terms.bookings}</span>
                <div className="text-base font-extrabold text-brand-navy">3 Slots Queued</div>
                <p className="text-[11px] text-brand-muted">Waiting for one-click receptionist confirmation.</p>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs"
            onClick={() => navigate('/app/ai-receptionist')}
            icon={Sparkles}
          >
            Open AI Receptionist Simulator
          </Button>
        </div>
      </div>

      {/* Recent Bookings & Staff Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
            <div>
              <h3 className="text-base font-bold text-brand-navy">Today's {terms.bookings} Schedule</h3>
              <p className="text-xs text-brand-muted">Live appointments roster for current business day</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/bookings')}
              className="text-xs text-brand-teal font-semibold"
            >
              View Full Schedule →
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border text-brand-muted uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-3">{terms.customer}</th>
                  <th className="py-2.5 px-3">{terms.service}</th>
                  <th className="py-2.5 px-3">{terms.staff}</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {currentBookings.slice(0, 5).map((bk) => (
                  <tr key={bk.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-brand-navy">{bk.customerName}</div>
                      <div className="text-[10px] text-brand-muted">{bk.customerPhone}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-brand-navy">{bk.serviceName}</td>
                    <td className="py-3 px-3 text-brand-muted">{bk.staffName}</td>
                    <td className="py-3 px-3 font-semibold text-brand-navy">{bk.time}</td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          bk.status === 'Confirmed'
                            ? 'success'
                            : bk.status === 'Scheduled'
                            ? 'teal'
                            : bk.status === 'Completed'
                            ? 'navy'
                            : 'error'
                        }
                        size="sm"
                      >
                        {bk.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-brand-navy">
                      ₹{bk.price.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Roster Snapshot */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
            <h3 className="text-base font-bold text-brand-navy">{terms.staffPlural} On Duty</h3>
            <span className="text-[11px] text-brand-teal font-semibold">{currentTeam.length} Active</span>
          </div>

          <div className="space-y-3">
            {currentTeam.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="p-3 rounded-xl border border-brand-border/80 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg ${member.avatarColor || 'bg-brand-teal'} text-white font-bold flex items-center justify-center text-xs`}>
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">{member.name}</div>
                    <div className="text-[11px] text-brand-muted">{member.role}</div>
                  </div>
                </div>
                <Badge variant={member.status === 'Active' ? 'success' : 'outline'} size="sm">
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs"
              onClick={() => navigate('/app/team')}
            >
              Manage {terms.staffPlural} →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
