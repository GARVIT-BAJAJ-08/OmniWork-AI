import React from 'react';

export const Tabs = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-brand-border w-fit ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 select-none ${
              isActive
                ? 'bg-white text-brand-navy shadow-sm'
                : 'text-brand-muted hover:text-brand-navy hover:bg-white/60'
            }`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-brand-mint text-brand-teal' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
