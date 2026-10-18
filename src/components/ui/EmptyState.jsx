import React from 'react';
import { Button } from './Button';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no items matching your current filters or search query.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl border border-dashed border-brand-border">
      <div className="p-3 bg-brand-ice text-brand-teal rounded-2xl mb-3 border border-teal-100">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-brand-navy">{title}</h4>
      <p className="text-xs text-brand-muted max-w-sm mt-1 mb-5">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
