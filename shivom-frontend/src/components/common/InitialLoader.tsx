'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function InitialLoader() {
  const [show, setShow] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    const isShown = sessionStorage.getItem('shivom_preloader_shown');
    if (!isShown) {
      // Avoid calling setState synchronously inside useEffect
      const mountTimer = setTimeout(() => {
        setShow(true);
      }, 0);

      // Trigger fade out at 1.5 seconds (exit animation duration is 0.4 seconds)
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 1500);

      // Remove preloader completely from DOM and set session flag
      const removeTimer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('shivom_preloader_shown', 'true');
      }, 1900); // 1.5s + 0.4s fade-out = 1.9 seconds total duration

      return () => {
        clearTimeout(mountTimer);
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-400 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Mobile responsive Logo sizing */}
        <div className="relative w-[140px] h-[50px] sm:w-[180px] sm:h-[64px] md:w-[220px] md:h-[78px] animate-logo-scale">
          <Image
            src="/logo.webp"
            alt="Shivom Group Logo"
            fill
            className="object-contain"
            priority
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>

        {/* Thin Brand Orange Loading Progress Line */}
        <div className="w-[140px] sm:w-[180px] md:w-[220px] h-[3px] bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#F97316] animate-progress-load rounded-full" />
        </div>
      </div>
    </div>
  );
}
