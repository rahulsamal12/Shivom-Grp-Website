'use client';

import { ArrowRight, Zap, Sun, Factory } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

const divisions = [
  {
    id: 'enterprise',
    name: 'Shivom Enterprise',
    ctaText: 'Explore Enterprise',
    icon: Zap,
    desc: 'EPC, Power distribution, and government utility infrastructure projects.',
    href: '/our-group/enterprise',
    color: 'bg-brand-blue/10 text-brand-blue',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600',
    overlayText: 'Utility EPC Solutions'
  },
  {
    id: 'solar',
    name: 'Shivom Solar Solutions',
    ctaText: 'Explore Solar',
    icon: Sun,
    desc: 'Rooftop and commercial solar EPC, renewable energy solutions.',
    href: '/our-group/solar',
    color: 'bg-brand-orange/10 text-brand-orange',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600',
    overlayText: 'Grid-Scale Solar'
  },
  {
    id: 'concrete',
    name: 'Shivom Concrete Products',
    ctaText: 'Explore Concrete',
    icon: Factory,
    desc: 'Manufacturing excellence with 500+ PSC poles/day production capacity.',
    href: '/our-group/concrete',
    color: 'bg-gray-100 text-brand-navy',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600',
    overlayText: '500+ PSC Poles / Day'
  }
];

export function GroupCompanies() {
  return (
    <section id="our-group-section" className="py-24 bg-background relative overflow-hidden">
      {/* Optional Premium Effect: Subtle floating background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none select-none text-brand-navy">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M50,10 L30,90 M50,10 L70,90 M30,90 L70,90 M40,50 L60,50 M35,70 L65,70 M45,30 L55,30 M10,90 L90,90" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading title="Our Group" subtitle="The Shivom Group" />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {divisions.map((div) => (
            <motion.div 
              key={div.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6 }
                }
              }}
            >
              <Link prefetch={false} href={div.href} className="block group h-full">
                <div className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 h-full flex flex-col border border-gray-100">
                  {/* Top Image Section */}
                  <div className="relative h-56 overflow-hidden w-full">
                    <Image 
                      loading="lazy"
                      src={div.image}
                      alt={div.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {div.overlayText && (
                      <span className="absolute bottom-4 left-6 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider bg-brand-orange px-3 py-1 rounded shadow-md z-10 select-none">
                        {div.overlayText}
                      </span>
                    )}
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 ${div.color}`}>
                      <div.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-orange transition-colors">
                      {div.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed text-sm md:text-base">
                      {div.desc}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors mt-auto">
                      <span>{div.ctaText}</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
