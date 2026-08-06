import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
