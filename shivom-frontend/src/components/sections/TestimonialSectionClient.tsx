'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { ITestimonial } from '@/types';

interface Props {
  testimonials: ITestimonial[];
}

export function TestimonialSectionClient({ testimonials }: Props) {
  if (testimonials.length === 0) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="max-w-4xl mx-auto"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white/50',
          bulletActiveClass: 'swiper-pagination-bullet-active bg-brand-orange',
        }}
        className="pb-16 min-h-[300px]"
      >
        {testimonials.map((item: ITestimonial) => (
          <SwiperSlide key={item._id}>
            <div className="text-center px-4 md:px-8 group transition-all duration-300 flex flex-col items-center">
              {item.image ? (
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-white/95 border border-white/20 p-3 shadow-md flex items-center justify-center group-hover:scale-105 group-hover:border-brand-orange/50 transition-all duration-300">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain object-center" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-brand-orange flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300">
                  <Quote className="w-8 h-8 text-brand-orange transition-transform duration-300 group-hover:rotate-6" />
                </div>
              )}
              
              <div className="max-w-[70%] mx-auto mb-8">
                <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed italic">
                  &quot;{item.content}&quot;
                </p>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-extrabold text-white mb-1.5 tracking-tight">
                  {item.name}
                </h4>
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base">
                  {item.designation && (
                    <span className="text-gray-300 font-medium">{item.designation}</span>
                  )}
                  {item.company && (
                    <span className="text-brand-orange-light font-extrabold tracking-wide">
                      {item.designation ? '— ' : ''}{item.company}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
