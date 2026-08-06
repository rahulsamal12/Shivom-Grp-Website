
interface Props {
  title: string;
  breadcrumb?: string;
  bgImage?: string;
  subtitle?: string;
}

export function PageBanner({ title, breadcrumb, subtitle, bgImage = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop' }: Props) {
  return (
    <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-brand-navy overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent opacity-80" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
        )}
        {breadcrumb && (
          <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-orange-light">
            <span className="text-gray-300">Home</span>
            <span className="text-gray-400">/</span>
            <span>{breadcrumb}</span>
          </div>
        )}
      </div>
    </div>
  );
}

