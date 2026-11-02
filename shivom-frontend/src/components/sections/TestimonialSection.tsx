'use client';

import React, { useState, useEffect } from 'react';
import { testimonialsService } from '@/services/testimonials.service';
import { TestimonialSectionClient } from './TestimonialSectionClient';
import { ITestimonial } from '@/types';

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<ITestimonial[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const fetched = await testimonialsService.getTestimonials();
        setTestimonials(fetched);
      } catch (error) {
        console.error('[TestimonialSection] Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-brand-navy relative overflow-hidden animate-pulse">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="h-6 w-32 bg-white/20 rounded mx-auto mb-4" />
          <div className="h-8 w-64 bg-white/20 rounded mx-auto mb-6" />
          <div className="h-32 max-w-lg bg-white/10 rounded mx-auto" />
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=50&w=800')] opacity-5 bg-cover bg-center"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by the State</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>

        <TestimonialSectionClient testimonials={testimonials} />
      </div>
    </section>
  );
}
