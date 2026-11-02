'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { clientsService } from '@/services/clients.service';
import { SectionHeading } from '../ui/SectionHeading';
import { IClient } from '@/types';
import Image from 'next/image';

export function ClientsSection() {
  const [clients, setClients] = useState<IClient[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Marquee interaction ref states
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<number>(0);
  const animIdRef = useRef<number | null>(null);
  
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const halfWidthRef = useRef<number>(0);

  useEffect(() => {
    async function loadClients() {
      try {
        const fetched = await clientsService.getClients();
        setClients(fetched);
      } catch (error) {
        console.error('[ClientsSection] Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    }
    loadClients();
  }, []);

  // Calculate track half width for seamless infinite loop wrapping
  const updateHalfWidth = useCallback(() => {
    if (trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, []);

  // Main 60fps animation tick loop
  useEffect(() => {
    if (!clients || clients.length === 0) return;

    updateHalfWidth();
    window.addEventListener('resize', updateHalfWidth);

    // Speed increased by 50% (~60px/sec at 60fps, 1.7px per frame)
    const speed = 1.7; 
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 16.67, 2);
      lastTime = currentTime;

      if (!isInteractingRef.current && halfWidthRef.current > 0) {
        offsetRef.current -= speed * delta;

        // Infinite wrap-around seamlessly
        if (Math.abs(offsetRef.current) >= halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        } else if (offsetRef.current > 0) {
          offsetRef.current -= halfWidthRef.current;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
      animIdRef.current = requestAnimationFrame(animate);
    };

    animIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', updateHalfWidth);
    };
  }, [clients, updateHalfWidth]);

  // Schedule smooth auto-resume after exactly 1 second (1000ms)
  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1000);
  }, []);

  // Mouse & Touch Drag Handlers
  const lastXRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    isInteractingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    dragDistanceRef.current = 0;
    
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(deltaX);

    offsetRef.current += deltaX;

    // Wrap around while dragging
    if (halfWidthRef.current > 0) {
      if (Math.abs(offsetRef.current) >= halfWidthRef.current) {
        offsetRef.current += halfWidthRef.current;
      } else if (offsetRef.current > 0) {
        offsetRef.current -= halfWidthRef.current;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    scheduleResume();
  };

  const handleCardClick = (e: React.MouseEvent, url?: string) => {
    // If the user actually dragged (> 5px), prevent default link navigation
    if (dragDistanceRef.current > 5) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // If url is missing, prevent navigation
    if (!url) {
      e.preventDefault();
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-white border-t border-gray-100 animate-pulse">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Trusted By Leaders" subtitle="Our Clients" />
          <div className="flex justify-center gap-6 mt-16 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="h-28 w-44 sm:w-52 shrink-0 rounded-2xl bg-gray-100" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!clients || clients.length === 0) return null;

  const marqueeClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 mb-14">
        <SectionHeading title="Trusted By Leaders" subtitle="Our Clients" />
      </div>

      {/* Marquee Container with subtle gradient edge fades */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div 
          ref={containerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-x"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => {
            isInteractingRef.current = true;
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
          }}
          onMouseLeave={() => {
            if (!isDraggingRef.current) scheduleResume();
          }}
        >
          <div 
            ref={trackRef}
            className="flex gap-4 sm:gap-6 shrink-0 w-max"
            style={{ willChange: 'transform' }}
          >
            {marqueeClients.map((client: IClient, idx: number) => {
              const clientUrl = client.websiteUrl || client.website;

              const CardInner = (
                <div className="w-36 sm:w-48 lg:w-56 h-24 sm:h-28 shrink-0 rounded-2xl bg-white border border-gray-150/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-center p-3 sm:p-4 group hover:-translate-y-2 hover:shadow-[0_14px_32px_rgba(243,115,33,0.18)] hover:border-brand-orange/50 transition-all duration-300 relative overflow-hidden cursor-pointer">
                  {client.logo ? (
                    <div className="relative w-[82%] h-[60px] sm:h-[68px] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        loading="lazy"
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain object-center transition-all duration-300"
                        sizes="(max-width: 640px) 140px, 220px"
                      />
                    </div>
                  ) : (
                    <span className="font-bold text-brand-navy group-hover:text-brand-orange text-sm sm:text-base text-center transition-colors px-2">
                      {client.name}
                    </span>
                  )}
                </div>
              );

              return (
                <React.Fragment key={`${client._id}-${idx}`}>
                  {clientUrl ? (
                    <a
                      href={clientUrl.startsWith('http') ? clientUrl : `https://${clientUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block shrink-0 focus:outline-none"
                      title={`Visit ${client.name} website`}
                      onClick={(e) => handleCardClick(e, clientUrl)}
                    >
                      {CardInner}
                    </a>
                  ) : (
                    CardInner
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
