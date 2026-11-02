'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingHomeButton() {
  const pathname = usePathname();

  // Don't show on the homepage
  if (pathname === '/') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Link href="/" prefetch={false} className="group flex items-center gap-3">
          {/* Glassmorphism Button */}
          <div className="w-14 h-14 rounded-full bg-brand-navy/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center text-white group-hover:bg-brand-orange group-hover:scale-110 group-hover:shadow-brand-orange/30 transition-all duration-300">
            <Home className="w-6 h-6" />
          </div>
          
          {/* Hover Tooltip / Brand Label */}
          <div className="absolute left-16 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            <span className="text-sm font-bold text-brand-navy">Back to Home</span>
            <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45 -translate-y-1/2" />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
