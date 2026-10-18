import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'max-w-md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-brand-navy/30 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen ${width} bg-white shadow-2xl border-l border-brand-border flex flex-col transform transition-transform animate-in slide-in-from-right duration-200`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border bg-slate-50/50">
            <div>
              <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
              {subtitle && <p className="text-xs text-brand-muted mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
