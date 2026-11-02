'use client';

import React, { useState, useEffect } from 'react';
import { slidersService } from '@/services/sliders.service';
import { DivisionHeroSliderClient } from './DivisionHeroSliderClient';
import { ISlider } from '@/types';

interface Props {
  websiteKey: 'enterprise' | 'solar' | 'concrete';
}

export function DivisionHeroSlider({ websiteKey }: Props) {
  const [slides, setSlides] = useState<ISlider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadSliders() {
      try {
        const fetched = await slidersService.getSliders(websiteKey);
        setSlides(fetched);
      } catch (err) {
        console.error(`[DivisionHeroSlider - ${websiteKey}] Error fetching sliders:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadSliders();
  }, [websiteKey]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="relative h-[80svh] min-h-[500px] w-full bg-brand-navy flex items-center justify-center animate-pulse">
        <div className="space-y-4 text-center">
          <div className="h-8 w-64 bg-white/20 rounded mx-auto" />
          <div className="h-4 w-96 bg-white/10 rounded mx-auto" />
        </div>
      </div>
    );
  }

  // API failed or returned no active slides — show empty state, never hardcoded content
  if (error || slides.length === 0) {
    return (
      <div className="relative h-[80svh] min-h-[500px] w-full bg-brand-navy flex items-center justify-center">
        <div className="space-y-3 text-center opacity-30">
          <div className="h-8 w-64 bg-white/20 rounded mx-auto" />
          <div className="h-4 w-96 bg-white/10 rounded mx-auto" />
        </div>
      </div>
    );
  }

  return <DivisionHeroSliderClient slides={slides} />;
}
