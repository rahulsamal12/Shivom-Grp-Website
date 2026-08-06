'use client';

import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, align = 'center', light = false }: Props) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', align === 'right' && 'text-right', className)}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn('inline-block mb-3 font-semibold uppercase tracking-wider text-sm', light ? 'text-brand-orange-light' : 'text-brand-orange')}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn('text-3xl md:text-4xl lg:text-5xl font-bold', light ? 'text-white' : 'text-brand-navy')}
      >
        {title}
      </motion.h2>
    </div>
  );
}
