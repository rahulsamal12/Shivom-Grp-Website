'use client';

import React, { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquareMore } from 'lucide-react';

export const FloatingContactButton = memo(function FloatingContactButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
    >
      <Link
        prefetch={false}
        href="/contact"
        aria-label="Contact Us"
        title="Contact Us"
        className="pointer-events-auto flex items-center justify-start bg-brand-orange text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95 h-14 w-14 md:h-[60px] md:w-[60px] md:hover:w-[170px] group overflow-hidden select-none"
      >
        <motion.div
          className="flex items-center w-full h-full relative"
          animate={{
            scale: [1, 1.06, 1, 1.06, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 8,
            ease: 'easeInOut',
          }}
        >
          {/* Icon Wrapper: centered inside the standard circle button bounds */}
          <div className="absolute left-0 top-0 w-14 h-14 md:w-[60px] md:h-[60px] flex items-center justify-center shrink-0">
            <MessageSquareMore className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>

          {/* Text Label: visible on desktop hover, sliding/fading in as button expands */}
          <span className="ml-14 md:ml-[60px] pr-5 font-semibold text-white text-base tracking-wide opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:inline-block">
            Contact Us
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
});
