'use client';

import React, { useState, useEffect } from 'react';
import { awardsService } from '@/services/awards.service';
import { AwardsSectionClient } from './AwardsSectionClient';
import { IAward } from '@/types';

export function AwardsSection() {
  const [awards, setAwards] = useState<IAward[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAwards() {
      try {
        const data = await awardsService.getAwards();
        setAwards(data);
      } catch (error) {
        console.error('[AwardsSection] Error fetching awards:', error);
      } finally {
        setLoading(false);
      }
    }
    loadAwards();
  }, []);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
            Our Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            Awards &amp; Certifications
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-gray-50 border border-gray-100 rounded-xl p-6 h-64 animate-pulse flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <AwardsSectionClient awards={awards || []} />
        )}
      </div>
    </section>
  );
}
