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
        className="pb-16"
      >
        {testimonials.map((item: ITestimonial) => (
          <SwiperSlide key={item._id}>
            <div className="text-center px-4 md:px-12">
              <Quote className="w-16 h-16 text-brand-orange/20 mx-auto mb-8" />
              <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed mb-10 italic">
                &quot;{item.content}&quot;
              </p>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                <p className="text-brand-orange font-medium">
                  {item.designation}
                  {item.company ? ` - ${item.company}` : ''}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
