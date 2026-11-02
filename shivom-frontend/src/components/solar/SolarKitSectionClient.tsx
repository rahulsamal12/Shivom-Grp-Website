'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Dynamic import of the gallery lightbox modal
const SolarGalleryModal = dynamic(
  () => import('./SolarGalleryModal').then(mod => mod.SolarGalleryModal),
  { ssr: false }
);

export function SolarKitSectionClient() {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{ title: string; image: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGalleryImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const kitFeatures = [
    { title: 'Solar Panels',                  image: '/solar-products/solar-panels.webp' },
    { title: 'Solar Inverters',               image: '/solar-products/solar-inverter.webp' },
    { title: 'Solar Batteries',               image: '/solar-products/solar-battery.webp' },
    { title: 'AC/DC Distribution Boxes',      image: '/solar-products/acdb-dcdb.webp' },
    { title: 'Earthing Systems',              image: '/solar-products/solar-earthing.webp' },
    { title: 'Solar Cables & Accessories',    image: '/solar-products/solar-cable.webp' },
    { title: 'Installation & Commissioning',  image: '/solar-products/installation-commissioning.webp' },
    { title: 'Solar Structure',               image: '/solar-products/solar-structure.webp' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Premium Image Card (No framer motion / floating effects) */}
          <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[520px] aspect-square rounded-[24px] overflow-hidden shadow-2xl bg-white border border-gray-100 group">
              <div className="w-full h-full relative">
                <Image 
                  src="/complete-solar-kit.webp"
                  alt="Complete Turnkey Solar Solutions Kit"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Trust Badge with CSS pulsing indicator instead of framer motion */}
              <div className="absolute top-6 left-6 bg-white/70 backdrop-blur-md border border-white/40 shadow-xl px-5 py-3 rounded-2xl flex items-center gap-2.5 z-20">
                <div className="w-3.5 h-3.5 rounded-full bg-brand-orange animate-ping absolute top-3 left-3 shrink-0" />
                <div className="w-3.5 h-3.5 rounded-full bg-brand-orange relative shrink-0" />
                <span className="text-xs font-extrabold text-brand-navy tracking-wide uppercase">
                  100% Turnkey Solar Solutions
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Feature Grid */}
          <div className="lg:w-1/2">
            <div>
              <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block">
                COMPLETE SOLAR SOLUTIONS
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight mb-6 tracking-tight">
                Complete Solar Power Systems Under One Roof
              </h2>
              <p className="text-gray-600 text-lg mb-8 font-light leading-relaxed">
                Shivom Solar Solutions delivers complete turnkey solar power systems for residential, commercial, industrial, and institutional applications. From solar panels and inverters to batteries, protection systems, earthing, cabling, installation, and maintenance, we provide everything required for a reliable and efficient solar energy solution.
              </p>
            </div>

            {/* Feature Checklist Grid (No stagger animations, uses direct interactive transitions) */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {kitFeatures.map((feature, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setSelectedGalleryImage(feature)}
                    className="w-full text-left flex items-center gap-3 text-brand-navy font-semibold text-sm bg-white border border-gray-150/60 p-4 rounded-xl shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 group"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-orange shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-brand-orange transition-colors">{feature.title}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <Link prefetch={false} href="/contact/">
                <Button 
                  size="lg" 
                  className="hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-brand-orange/20"
                >
                  Get Solar Consultation <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Gallery Lightbox Modal */}
      {selectedGalleryImage && (
        <SolarGalleryModal
          isOpen={!!selectedGalleryImage}
          image={selectedGalleryImage.image}
          title={selectedGalleryImage.title}
          onClose={() => setSelectedGalleryImage(null)}
        />
      )}
    </section>
  );
}
