'use client';

import React, { useState, useEffect } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { awardsService } from '@/services/awards.service';
import Image from 'next/image';
import { AwardIcon, FileCheck } from 'lucide-react';
import { IAward } from '@/types';

export default function AwardsPage() {
  const [items, setItems] = useState<IAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    async function loadAwards() {
      try {
        const allItems = await awardsService.getAwards();
        setItems(allItems);
      } catch (error) {
        console.error('[AwardsPage] Error loading dynamic recognitions:', error);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    }
    loadAwards();
  }, []);

  const awards = items.filter((item: IAward) => item.type === 'award');
  const certifications = items.filter((item: IAward) => item.type === 'certification');

  const renderCard = (item: IAward) => (
    <div 
      key={item._id} 
      className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
          {item.type === 'award' ? (
            <AwardIcon className="w-6 h-6" />
          ) : (
            <FileCheck className="w-6 h-6" />
          )}
        </div>
        <div>
          <span className="text-3xl font-black text-gray-200 group-hover:text-brand-orange/20 transition-colors block leading-none mb-1">
            {item.year || '2024'}
          </span>
          <span className="text-xs text-brand-orange font-bold uppercase tracking-widest block">
            {item.issuedBy || 'Appreciation'}
          </span>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-brand-navy mb-3 leading-snug group-hover:text-brand-orange transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
        {item.description}
      </p>

      {item.image && (
        <div className="relative h-48 w-full rounded-xl overflow-hidden mt-auto bg-gray-50 border border-gray-100 shadow-sm">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover" 
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      <PageBanner 
        title="Awards & Certifications" 
        breadcrumb="Awards" 
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000" 
      />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Recognitions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Our Accomplishments & Standards
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed">
              Shivom Group is committed to the highest execution and quality benchmarks, recognized by state bodies and forums.
            </p>
          </div>

          <div className="space-y-20">
            {loading ? (
              // Pulsing skeletons during load state
              <div>
                <h3 className="text-3xl font-bold text-brand-navy mb-10 flex items-center gap-4 animate-pulse">
                  <span className="bg-gray-200 h-8 w-64 rounded" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="bg-white border border-gray-100 rounded-2xl p-8 h-80 animate-pulse flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-250" />
                          <div className="h-6 w-24 bg-gray-250 rounded" />
                        </div>
                        <div className="h-8 w-2/3 bg-gray-250 rounded" />
                        <div className="h-4 w-full bg-gray-250 rounded" />
                      </div>
                      <div className="h-20 w-full bg-gray-250 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : apiError ? (
              // Empty skeleton/dim container when API is unavailable
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-35">
                {[1, 2, 3].map(n => (
                  <div key={n} className="bg-white border border-gray-150 rounded-2xl p-8 h-80 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100" />
                        <div className="h-6 w-24 bg-gray-100 rounded" />
                      </div>
                      <div className="h-8 w-2/3 bg-gray-100 rounded" />
                      <div className="h-4 w-full bg-gray-100 rounded" />
                    </div>
                    <div className="h-20 w-full bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {awards.length > 0 && (
                  <div>
                    <h3 className="text-3xl font-bold text-brand-navy mb-10 flex items-center gap-4">
                      <span>Accreditation & Awards</span>
                      <span className="w-20 h-0.5 bg-brand-orange rounded-full" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {awards.map(renderCard)}
                    </div>
                  </div>
                )}

                {certifications.length > 0 && (
                  <div>
                    <h3 className="text-3xl font-bold text-brand-navy mb-10 flex items-center gap-4">
                      <span>Compliance & Certifications</span>
                      <span className="w-20 h-0.5 bg-gray-300 rounded-full" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {certifications.map(renderCard)}
                    </div>
                  </div>
                )}
                
                {awards.length === 0 && certifications.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-lg font-medium">No recognitions found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
