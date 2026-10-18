import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  trendLabel = 'vs last month',
  icon: Icon,
  badgeText,
}) => {
  const isPositive = trend && trend.startsWith('+');

  return (
    <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle hover:shadow-card transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
            {title}
          </span>
          <div className="mt-2 text-2xl font-bold text-brand-navy tracking-tight">
            {value}
          </div>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-brand-ice text-brand-teal border border-teal-100">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        {trend ? (
          <div className="flex items-center gap-1">
            <span
              className={`flex items-center font-semibold ${
                isPositive ? 'text-brand-success' : 'text-brand-error'
              }`}
            >
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {trend}
            </span>
            <span className="text-brand-muted">{trendLabel}</span>
          </div>
        ) : (
          <span className="text-brand-muted">{subtitle}</span>
        )}

        {badgeText && (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
