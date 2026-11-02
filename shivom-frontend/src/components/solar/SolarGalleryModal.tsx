'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SolarGalleryModalProps {
  isOpen: boolean;
  image: string;
  title: string;
  onClose: () => void;
}

export function SolarGalleryModal({ isOpen, image, title, onClose }: SolarGalleryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/90 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-brand-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative w-full bg-white" style={{ minHeight: '320px', maxHeight: '520px', height: '60vh' }}>
              <Image
                src={image}
                alt={title}
                fill
                loading="lazy"
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </div>
            
            <div className="p-6 md:p-8 bg-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-brand-navy mb-2">{title}</h3>
                <p className="text-gray-600">Premium quality components for maximum efficiency and durability.</p>
              </div>
              <Button onClick={onClose} variant="outline" className="hidden sm:flex">
                Close Gallery
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
