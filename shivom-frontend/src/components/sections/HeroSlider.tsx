'use client';

import React, { useState, useEffect } from 'react';
import { slidersService } from '@/services/sliders.service';
import { HeroSliderClient } from './HeroSliderClient';
import { ISlider } from '@/types';

export function HeroSlider() {
  const [slides, setSlides] = useState<ISlider[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSliders() {
      try {
        const fetched = await slidersService.getSliders('group');
        setSlides(fetched);
      } catch (error) {
        console.error('[HeroSlider] Error fetching sliders:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSliders();
  }, []);

  if (loading) {
    return (
      <div className="relative h-[100svh] w-full bg-brand-navy flex items-center justify-center animate-pulse">
        <div className="space-y-4 text-center">
          <div className="h-8 w-64 bg-white/20 rounded mx-auto" />
          <div className="h-4 w-96 bg-white/10 rounded mx-auto" />
        </div>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return null;
  }

  return <HeroSliderClient slides={slides} />;
}
