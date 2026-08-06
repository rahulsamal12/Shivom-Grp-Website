'use client';

import { cn } from '@/lib/utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

export function Card({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        'rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children as React.ReactNode}
    </motion.div>
  );
}
