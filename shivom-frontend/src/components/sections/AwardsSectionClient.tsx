'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { IAward } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface Props {
  awards: IAward[];
}

export function AwardsSectionClient({ awards }: Props) {
  const featuredAwards = awards.slice(0, 4);

  if (awards.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 font-medium">No awards or certifications available.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {featuredAwards.map((award: IAward) => (
          <motion.div
            key={award._id}
            variants={fadeUp}
            className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 group flex flex-col justify-between h-full"
          >
            <div>
              <div className="text-4xl font-bold text-gray-200 group-hover:text-brand-orange/20 transition-colors mb-4">
                {award.year || '2024'}
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2 leading-snug">{award.title}</h3>
              <div className="text-xs font-semibold text-brand-orange mb-3 tracking-wider uppercase">
                {award.issuedBy || 'Appreciation'}
              </div>
              {award.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{award.description}</p>
              )}
            </div>
            {award.image && (
              <div className="relative h-40 w-full rounded-lg overflow-hidden mt-4 bg-white border border-gray-100 shadow-sm">
                <Image
                  loading="lazy"
                  src={award.image}
                  alt={award.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link prefetch={false} href="/awards-certifications">
            <Button
              variant="secondary"
              className="flex items-center gap-2 hover:bg-brand-orange hover:text-white hover:border-transparent transition-all"
            >
              <span>View All Awards &amp; Certifications</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
