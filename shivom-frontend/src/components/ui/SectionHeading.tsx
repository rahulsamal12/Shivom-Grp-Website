import { cn } from '@/lib/utils/cn';

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
        <span
          className={cn('inline-block mb-3 font-semibold uppercase tracking-wider text-sm', light ? 'text-brand-orange-light' : 'text-brand-orange')}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn('text-3xl md:text-4xl lg:text-5xl font-bold', light ? 'text-white' : 'text-brand-navy')}
      >
        {title}
      </h2>
    </div>
  );
}
