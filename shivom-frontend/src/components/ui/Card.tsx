import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-[5px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
