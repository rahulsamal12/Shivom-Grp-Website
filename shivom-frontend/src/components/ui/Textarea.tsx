import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            'flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <span role="alert" className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
