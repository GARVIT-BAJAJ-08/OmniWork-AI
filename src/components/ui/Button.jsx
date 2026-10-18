import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-teal text-white hover:bg-brand-teal/90 active:bg-teal-800 shadow-sm focus:ring-brand-tealLight',
    secondary: 'bg-white text-brand-navy border border-brand-border hover:bg-slate-50 active:bg-slate-100 shadow-subtle focus:ring-brand-border',
    dark: 'bg-brand-navy text-white hover:bg-brand-navy/90 active:bg-slate-900 shadow-sm focus:ring-slate-400',
    ghost: 'text-brand-muted hover:text-brand-navy hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-300',
    danger: 'bg-brand-error text-white hover:bg-red-700 active:bg-red-800 shadow-sm focus:ring-red-300',
    mint: 'bg-brand-mint text-brand-teal hover:bg-emerald-100 active:bg-emerald-200 focus:ring-brand-teal',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
};
