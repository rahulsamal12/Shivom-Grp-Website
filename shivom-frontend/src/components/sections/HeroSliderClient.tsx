'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ISlider } from '@/types';

interface Props {
  slides: ISlider[];
}

export function HeroSliderClient({ slides }: Props) {
  const scrollToGroupSection = () => {
    document.getElementById('our-group-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="relative h-[100svh] w-full bg-brand-navy">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-full w-full"
      >
        {slides.map((slide: ISlider, index: number) => {
          const buttonText =
            slide.buttonText === 'Our Divisions'
              ? 'Our Group'
              : slide.buttonText || 'Our Group';
          return (
            <SwiperSlide key={slide._id || index}>
              {({ isActive }) => (
                <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                      className={`object-cover transition-transform duration-[10000ms] ${isActive ? 'scale-110' : 'scale-100'}`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent" />

                  <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Button
                            size="lg"
                            variant="primary"
                            onClick={() => (window.location.href = '/projects')}
                          >
                            Explore Projects
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-brand-navy"
                            onClick={scrollToGroupSection}
                          >
                            {buttonText}
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
