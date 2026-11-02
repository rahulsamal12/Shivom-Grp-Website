'use client';

import React, { useState, useEffect } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { eventsService } from '@/services/events.service';
import Image from 'next/image';
import { IEvent } from '@/types';

type Props = {
  slug: string;
};

export function EventDetailClient({ slug }: Props) {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await eventsService.getEventBySlug(slug);
        setEvent(data);
      } catch (error) {
        console.error('[EventDetailClient] Error loading event:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [slug]);

  useEffect(() => {
    if (event) {
      document.title = `${event.title} | Shivom Group`;
    }
  }, [event]);

  if (loading) {
    return (
      <>
        <PageBanner title="Loading..." breadcrumb="Events / Loading..." />
        <div className="container mx-auto px-4 py-24 max-w-4xl animate-pulse">
          <div className="bg-gray-150 p-8 rounded-xl h-24 mb-12" />
          <div className="h-96 bg-gray-200 rounded-xl mb-12 animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <PageBanner title="Event Not Found" breadcrumb="Events / Not Found" />
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Event Not Found</h2>
          <p className="text-gray-500">The event you are looking for might have been removed or is temporarily unavailable.</p>
        </div>
      </>
    );
  }

  const displayDate = event.createdAt 
    ? new Date(event.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <>
      <PageBanner 
        title={event.title} 
        breadcrumb={`Events / ${event.title}`} 
        bgImage={event.image || undefined} 
      />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">{event.title}</h2>
            {displayDate && (
              <div className="text-gray-500">
                Published: {displayDate}
              </div>
            )}
          </div>
          <div className="bg-brand-orange text-white px-6 py-3 rounded-lg font-bold shrink-0">
            {event.status || 'Active'}
          </div>
        </div>
        
        {event.image && (
          <div className="relative h-96 rounded-xl mb-12 overflow-hidden shadow-lg bg-gray-100">
            <Image 
              src={event.image} 
              alt={event.title} 
              fill 
              loading="lazy"
              sizes="(max-width: 992px) 100vw, 850px"
              className="object-cover" 
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none text-gray-600 text-justify-content">
          <p>{event.description || 'Detailed event information is not available at the moment.'}</p>
        </div>
      </div>
    </>
  );
}
