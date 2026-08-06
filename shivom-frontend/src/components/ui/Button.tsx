'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    const variants = {
      primary: 'bg-brand-orange text-white hover:bg-brand-orange-light',
      secondary: 'bg-brand-blue text-white hover:bg-brand-blue-light',
      outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
      ghost: 'hover:bg-gray-100 text-brand-navy',
    };
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <span className="mr-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : null}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
