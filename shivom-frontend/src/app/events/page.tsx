'use client';

import React, { useState, useEffect } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { eventsService } from '@/services/events.service';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { IEvent } from '@/types';

export default function EventsPage() {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await eventsService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error('[EventsPage] Error loading events:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <>
      <PageBanner 
        title="News & Events" 
        breadcrumb="Events" 
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000" 
      />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Our Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Latest Corporate News & Events
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-6" />
            <p className="text-gray-600 text-lg text-justify-content">
              Stay up to date with the latest projects, community outreach, and technical advancements from the Shivom Group.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map(n => (
                <div key={n} className="bg-gray-200 rounded-2xl h-[450px] border border-gray-150" />
              ))}
            </div>
          ) : !events || events.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-lg font-medium">No events currently scheduled.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: IEvent) => {
                const displayDate = event.createdAt 
                  ? new Date(event.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : null;

                return (
                  <div 
                    key={event._id} 
                    className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-gray-150">
                      <Image 
                        src={event.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'} 
                        alt={event.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      {displayDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-3">
                          <Calendar className="w-4 h-4 text-brand-orange" />
                          <span>{displayDate}</span>
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-brand-navy mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                        <Link prefetch={false} href={`/events/${event.slug}`}>{event.title}</Link>
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                        {event.excerpt || event.shortDescription}
                      </p>

                      <div className="border-t border-gray-100 pt-6 mt-auto">
                        <Link 
                          prefetch={false}
                          href={`/events/${event.slug}`} 
                          className="inline-flex items-center gap-2 text-brand-navy group-hover:text-brand-orange font-bold uppercase tracking-wider text-sm transition-colors"
                        >
                          Event Details <ArrowRight className="w-4 h-4 text-brand-orange" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
