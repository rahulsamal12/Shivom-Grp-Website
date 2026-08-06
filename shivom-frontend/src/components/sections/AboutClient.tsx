'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Lightbulb, Factory, HardHat, Target, Eye, ArrowRight, Award, Phone } from 'lucide-react';
import { resolveImageUrl } from '@/lib/transformers';

interface AboutClientProps {
  aboutData?: {
    title?: string;
    description?: string;
    image?: string;
    buttonText?: string;
  };
}

const timelineEvents = [
  {
    year: '2007',
    title: 'Company Foundation',
    desc: 'Established with a focus on regional electrification and power distribution.',
  },
  {
    year: '2018',
    title: 'Manufacturing Expansion',
    desc: 'Commissioned state-of-the-art PSC pole manufacturing facility in Odisha.',
  },
  {
    year: '2021',
    title: 'Renewable Energy / Solar Division',
    desc: 'Launched comprehensive Solar EPC division for utility and rooftop programs.',
  },
  {
    year: '2025',
    title: 'Integrated Infrastructure Leadership',
    desc: 'Positioned as an end-to-end multi-disciplinary corporate group.',
  },
];

const prideStats = [
  {
    value: '20+',
    label: 'Years Experience',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
  },
  {
    value: '500+',
    label: 'Workforce',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
  },
  {
    value: '80+',
    label: 'Substations',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800',
  },
  {
    value: '1500+',
    label: 'KM Transmission Lines',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800',
  },
];

const whyChooseUs = [
  {
    icon: <HardHat className="w-8 h-8 text-brand-orange" />,
    title: 'EPC Excellence',
    desc: 'Comprehensive engineering, procurement, and construction delivery of power grids and distribution substations.',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-brand-orange" />,
    title: 'Renewable Energy',
    desc: 'Leading solar developers offering reliable utility, commercial, and residential solar plant installations.',
  },
  {
    icon: <Factory className="w-8 h-8 text-brand-orange" />,
    title: 'Manufacturing Capability',
    desc: 'In-house production with a high-capacity unit manufacturing over 500+ PSC poles daily.',
  },
  {
    icon: <Shield className="w-8 h-8 text-brand-orange" />,
    title: 'Government Infrastructure Execution',
    desc: 'Proven track record as a trusted government contractor executing mission-critical electrification programs.',
  },
];

const mdMessage =
  'At Shivom Group, our journey is defined by a commitment to quality and engineering precision. Over the last two decades, we have evolved from a local contractor into a premier infrastructure development powerhouse in Odisha. By expanding our civil EPC capabilities, establishing advanced PSC pole manufacturing units, and embracing clean solar energy, we continue to deliver robust utility solutions that power economic growth and elevate communities. We build infrastructure that stands the test of time, powering progress for generations to come.';

export function AboutClient({ aboutData }: AboutClientProps) {
  const cmsTitle = aboutData?.title || 'Pioneering Utility & Infrastructure Engineering.';
  const cmsDescription = aboutData?.description || 'Shivom Group is one of Odisha\'s leading conglomerates, specializing in power transmission networks, civil works, solar installation, and materials manufacturing. Over the years, we have built a solid foundation of engineering trust, supplying state-of-the-art utility solutions that support industrial growth.';
  
  const mainImage = resolveImageUrl(
    aboutData?.image,
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000'
  );

  return (
    <>
      {/* 1. ABOUT SHIVOM GROUP OVERVIEW */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-brand-orange rounded-full" />
                <span className="text-brand-orange font-bold tracking-widest uppercase text-xs">
                  Company Overview
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-black text-brand-navy leading-tight tracking-tight animate-fade-in"
              >
                {cmsTitle}
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {cmsDescription}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  By integrating specialized project management teams, robust manufacturing workflows,
                  and cutting-edge EPC technology, we guarantee the successful deployment of
                  large-scale infrastructure solutions that power millions of homes.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-5 relative h-[400px] w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={mainImage}
                alt="Infrastructure Tower"
                fill
                loading="lazy"
                className="object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              className="bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-sm space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To be the most trusted name in multi-disciplinary infrastructure development,
                recognized for pioneering sustainable grid solutions, clean renewable energy
                products, and high-performance concrete manufacturing.
              </p>
            </motion.div>

            <motion.div
              className="bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-sm space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To build resilient electrification networks, deliver efficient solar EPC execution,
                and supply top-grade PSC poles with zero compromises on quality, safety, or timeline
                adherence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FROM THE MANAGING DIRECTOR'S DESK */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: MD Photo */}
            <motion.div
              className="lg:col-span-5 relative flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-orange/10 rounded-full blur-md" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-blue/5 rounded-3xl" />

              <div className="relative w-full max-w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/md-photo.jpg"
                  alt="Mr. Ambika Prasad Samal"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent opacity-60 mix-blend-multiply" />
              </div>
            </motion.div>

            {/* Right Column: MD Message Details */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-brand-orange rounded-full" />
                  <span className="text-brand-orange font-bold tracking-widest uppercase text-xs">
                    FROM THE MANAGING DIRECTOR&apos;S DESK
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight tracking-tight mt-2">
                  Leadership Message
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed italic">
                &ldquo;{mdMessage}&rdquo;
              </motion.p>

              <motion.div variants={fadeUp} className="border-t border-gray-100 pt-6 mt-4 space-y-4">
                <div className="relative w-[200px] h-20">
                  <Image
                    src="/signature.png"
                    alt="Signature of Mr. Ambika Prasad Samal, Managing Director"
                    fill
                    loading="lazy"
                    className="object-contain object-left"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xl font-bold text-brand-navy">Mr. Ambika Prasad Samal</h3>
                  <p className="text-brand-orange font-semibold text-sm">Managing Director</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY TIMELINE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Timeline Milestones
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Our Journey</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="relative border-l-2 border-brand-blue/20 max-w-4xl mx-auto pl-8 md:pl-12 space-y-12 py-4">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-brand-orange flex items-center justify-center transition-all duration-300 group-hover:bg-brand-orange group-hover:scale-110 shadow-sm" />

                <div className="inline-block bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-bold mb-3 shadow-md group-hover:bg-brand-orange transition-colors">
                  {event.year}
                </div>

                <div className="bg-gray-50 border border-gray-100/50 p-6 md:p-8 rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-white group-hover:border-gray-100">
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed md:text-lg">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR PRIDE */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Stats &amp; Achievements
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Our Pride</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {prideStats.map((stat, i) => (
              <motion.div
                key={i}
                className="relative h-80 rounded-2xl overflow-hidden shadow-lg group border border-gray-100 flex flex-col justify-end p-6 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Image
                  src={stat.image}
                  alt={stat.label}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/40 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-90" />

                <div className="relative z-10 space-y-2">
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-brand-orange-light font-bold uppercase tracking-wider text-xs md:text-sm">
                    {stat.label}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE SHIVOM */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Core Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Why Choose Shivom
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 border border-gray-100 p-8 rounded-2xl flex gap-6 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:bg-brand-orange-light group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AWARDS & CERTIFICATIONS CTA BANNER */}
      <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/35 mb-2">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Committed to the Highest Standards of Safety &amp; Quality
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive certifications, industry recognitions, and major awards from government authorities and international standards boards.
            </p>
            <div className="pt-2">
              <Link prefetch={false} href="/awards-certifications/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange-light transition-all shadow-lg hover:shadow-brand-orange/20 cursor-pointer">
                View Awards &amp; Certifications <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT CTA BANNER */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-16 shadow-xl max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/5 rounded-tr-full" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">
                  Partner with Us
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight tracking-tight">
                  Have an Upcoming Infrastructure Project?
                </h2>
                <p className="text-gray-600 text-lg">
                  Let’s execute it with engineering precision, reliability, and guaranteed quality. Contact our team to request a quote or discuss partnerships.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end gap-4">
                <Link prefetch={false} href="/contact/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-navy text-white font-bold rounded-lg hover:bg-brand-navy-light transition-all shadow-md cursor-pointer">
                  <Phone className="w-5 h-5" /> Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
