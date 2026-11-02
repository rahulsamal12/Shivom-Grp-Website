import React from 'react';

const stats = [
  { value: "500+", label: "Projects Executed" },
  { value: "2000+", label: "Skilled Workforce" },
  { value: "30+", label: "Districts Covered" },
  { value: "200+", label: "PSC Poles / Day" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590483832120-1ee067710323?q=50&w=800')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-brand-orange-light font-medium uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
