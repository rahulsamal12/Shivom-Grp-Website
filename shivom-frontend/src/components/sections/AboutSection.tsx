'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, slideInRight } from '@/lib/animations';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { useHome } from '@/hooks/useHome';
import { resolveImageUrl } from '@/lib/transformers';
import Link from 'next/link';

export function AboutSection() {
  const { data } = useHome();
  const aboutData = data?.data?.about;

  const title = aboutData?.title || 'Engineering the Future of Infrastructure & Energy.';
  const description = aboutData?.description || 'As a premier Odisha-based conglomerate, Shivom Group executes large-scale government and utility projects across power distribution, renewable energy, and civil infrastructure.';
  
  // Resolve main image dynamically with dynamic CMS value and whitelisted fallback
  const mainImage = resolveImageUrl(
    aboutData?.image, 
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000'
  );
  
  // High-value division image overrides for Solar & Concrete
  const solarImage = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600';
  const concreteImage = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600';

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Structured Brand Copy (7 Columns) */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Subtitle Tag with Indicator */}
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-brand-orange rounded-full" />
              <span className="text-brand-orange font-bold tracking-widest uppercase text-xs">
                About Shivom Group
              </span>
            </motion.div>

            {/* Dynamic Headline */}
            <motion.h2 
              variants={fadeUp} 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy leading-tight tracking-tight"
            >
              {title}
            </motion.h2>

            {/* Description Block */}
            <div className="space-y-4">
              <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed">
                {description}
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed">
                We leverage our extensive manufacturing strength—including 500+ PSC poles daily capacity—and highly skilled workforce to deliver sustainable solutions that power Odisha&apos;s growth.
              </motion.p>
            </div>

            {/* Structured Mini-Metrics Grid */}
            <motion.div 
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-gray-100"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-brand-orange mb-1">
                  20+ Years
                </span>
                <span className="text-sm font-bold text-brand-navy uppercase tracking-wider">
                  Of Engineering Excellence
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-brand-blue mb-1">
                  500+ Poles
                </span>
                <span className="text-sm font-bold text-brand-navy uppercase tracking-wider">
                  Daily PSC Pole Production
                </span>
              </div>
            </motion.div>
            
            {/* Dual Button CTA */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link prefetch={false} href="/about">
                <Button size="lg" variant="primary">
                  {aboutData?.buttonText || 'Discover Our History'}
                </Button>
              </Link>
              <Link prefetch={false} href="/projects">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Explore Our Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Layered 3-Image Collage (5 Columns) */}
          <motion.div 
            className="lg:col-span-5 relative h-[550px] w-full"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Main Primary Image: Power Infrastructure / EPC (80% W, 70% H) */}
            <div className="absolute top-0 right-0 w-[82%] h-[72%] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image src={mainImage} 
                alt="Transmission and distribution tower execution" 
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 80vw, 450px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply" />
            </div>
            
            {/* Secondary Overlapping Image: Solar Array (50% W, 42% H, bottom-left) */}
            <div className="absolute bottom-6 left-0 w-[52%] h-[44%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image loading="lazy" src={solarImage} 
                alt="Solar plant installation" 
                fill
                sizes="(max-width: 1024px) 50vw, 280px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Tertiary Overlapping Image: Concrete / PSC (45% W, 38% H, bottom-right) */}
            <div className="absolute bottom-0 right-4 w-[48%] h-[40%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image loading="lazy" src={concreteImage} 
                alt="Concrete Pole manufacturing unit" 
                fill
                sizes="(max-width: 1024px) 45vw, 240px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
