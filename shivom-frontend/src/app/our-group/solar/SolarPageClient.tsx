'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, CheckCircle, ShieldCheck, Zap, FileText, Settings, ArrowRight, Tag, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ISolarProduct, ISolarPromotion } from '@/types';

// Types for components
interface SolarPageClientProps {
  products: ISolarProduct[];
  promotions: ISolarPromotion[];
  heroSlider: React.ReactNode;
}

export function SolarPageClient({ products, promotions, heroSlider }: SolarPageClientProps) {
  // Animation presets for scroll reveal
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const containerStagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemFade: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const kitFeatures = [
    'Solar Panels',
    'Solar Inverters',
    'Solar Batteries',
    'AC/DC Distribution Boxes',
    'Earthing Systems',
    'Solar Cables & Accessories',
    'Installation & Commissioning',
    'AMC & Maintenance Support'
  ];

  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SLIDER */}
      {heroSlider}
      
      {/* 2. ABOUT/OVERVIEW SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content Column */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="lg:w-1/2"
            >
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
                Renewable Energy Infrastructure
              </span>
              <h2 className="text-4xl font-bold text-brand-navy leading-tight mb-6">
                Leading-Edge Solar EPC & Deployment Solutions
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Shivom Solar Solutions is our dedicated green-energy division, delivering end-to-end solar EPC services for commercial solar projects, public institutions, and utility-scale installations. We accelerate solar deployment to support Odisha&apos;s renewable power targets.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From high-capacity rooftop solar arrays to vast ground-mounted renewable infrastructure, we provide government solar execution with precision engineering, premium component procurement, and seamless grid integration.
              </p>
              
              {/* Counters / Stats */}
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-1"
                  >
                    50+ MW
                  </motion.div>
                  <div className="text-sm text-gray-500 font-medium">Solar Infrastructure Executed</div>
                </div>
                <div>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-1"
                  >
                    250+
                  </motion.div>
                  <div className="text-sm text-gray-500 font-medium">Commercial & Rooftop Projects</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Image Column */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideRight}
              className="lg:w-1/2 relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop" 
                alt="Solar deployment and renewable installations" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply transition-opacity group-hover:opacity-10" />
              
              {/* Overlay Glass Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0 animate-pulse">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">Government Solar Execution</h4>
                    <p className="text-sm text-gray-600">Empaneled agency with deep expertise in executing state renewable programs.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. ⭐ NEW: COMPLETE SOLAR KIT SOLUTIONS SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-brand-orange/[0.02] to-brand-blue/[0.02] border-y border-gray-200/50 relative overflow-hidden">
        {/* Animated Glow Accents */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '12s' }} />

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Column: Premium Image Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideLeft}
              className="lg:w-1/2 relative w-full flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[520px] aspect-square rounded-[24px] overflow-hidden shadow-2xl bg-white border border-gray-100 group">
                {/* Floating Animation Image Container */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/complete-solar-kit.jpg"
                    alt="Complete Turnkey Solar Solutions Kit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Floating Trust Glassmorphism Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute top-6 left-6 bg-white/70 backdrop-blur-md border border-white/40 shadow-xl px-5 py-3 rounded-2xl flex items-center gap-2.5 z-20"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-orange animate-ping absolute top-3 left-3 shrink-0" />
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-orange relative shrink-0" />
                  <span className="text-xs font-extrabold text-brand-navy tracking-wide uppercase">
                    100% Turnkey Solar Solutions
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Premium Copy & Feature Grid */}
            <div className="lg:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block">
                  COMPLETE SOLAR SOLUTIONS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight mb-6 tracking-tight">
                  Complete Solar Power Systems Under One Roof
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                  Shivom Solar Solutions delivers complete turnkey solar power systems for residential, commercial, industrial, and institutional applications. From solar panels and inverters to batteries, protection systems, earthing, cabling, installation, and maintenance, we provide everything required for a reliable and efficient solar energy solution.
                </p>
              </motion.div>

              {/* Staggered Checklist Grid */}
              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerStagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
              >
                {kitFeatures.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    variants={itemFade}
                    className="flex items-center gap-3 text-brand-navy font-semibold text-sm bg-white border border-gray-150/60 p-4 rounded-xl shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link prefetch={false} href="/contact/">
                  <Button 
                    size="lg" 
                    className="hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-brand-orange/20"
                  >
                    Get Solar Consultation <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE SCHEMES / PROMOTIONS (ENHANCED SURYA GHAR YOJANA SECTION) */}
      {promotions.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-brand-navy text-white">
          {/* Background Layers */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Layer 1 & 2: Animated gradient & Solar energy glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[120px] mix-blend-screen"
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.3, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-[#FFB703]/20 rounded-full blur-[100px] mix-blend-screen"
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.1, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-brand-blue/30 rounded-full blur-[130px] mix-blend-screen"
            />

            {/* Layer 3: Floating blurred circles */}
            <div className="absolute inset-0 hidden md:block">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`circle-${i}`}
                  animate={{ y: [0, -40, 0], x: [0, 30, 0], opacity: [0.05, 0.15, 0.05] }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute rounded-full border border-white/5 bg-white/5 backdrop-blur-3xl"
                  style={{
                    width: 100 + i * 50,
                    height: 100 + i * 50,
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`
                  }}
                />
              ))}
            </div>

            {/* Layer 4: Very subtle particle movement */}
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.03] bg-repeat" />
            <div className="absolute inset-0 overflow-hidden opacity-30">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ y: `${(i * 17) % 100}%`, x: `${(i * 23) % 100}%` }}
                  animate={{ y: [null, `${(i * 17 + 20) % 100}%`] }}
                  transition={{ duration: 15 + (i % 5), repeat: Infinity, ease: "linear" }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white blur-[1px]"
                />
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 relative">
              {/* Floating subsidy badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 shadow-xl"
              >
                <Sun className="w-5 h-5 text-[#FFB703] animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">Government Subsidy Available</span>
              </motion.div>

              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[#FFB703] font-semibold tracking-wider uppercase text-sm mb-4 block"
              >
                Active Schemes & Offers
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
              >
                Government Subsidies & Benefits
              </motion.h2>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {promotions.map((promo) => (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  key={promo._id} 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row gap-6 hover:bg-white/10 hover:border-brand-orange/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-orange/20 to-transparent rounded-bl-full flex items-start justify-end p-5 z-0">
                    <Tag className="w-6 h-6 text-brand-orange/80 group-hover:text-brand-orange transition-colors" />
                  </div>
                  
                  {promo.image && (
                    <div className="relative w-full md:w-44 h-44 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-inner z-10">
                      <Image 
                        src={promo.image} 
                        alt={promo.title} 
                        fill 
                        sizes="176px"
                        loading="lazy" 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-col justify-between flex-grow z-10">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 pr-8 group-hover:text-[#FFB703] transition-colors">
                        {promo.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                        {promo.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      {promo.validUntil && (
                        <div className="text-xs text-brand-orange/80 font-semibold mb-4 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                           Valid Until: {new Date(promo.validUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      )}
                      
                      {promo.ctaLink && (
                        <a 
                          href={promo.ctaLink} 
                          className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white px-6 py-3 rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(243,115,33,0.3)] hover:shadow-[0_0_25px_rgba(243,115,33,0.6)] hover:-translate-y-1 transition-all duration-300"
                        >
                          {promo.ctaText || 'Learn More'} <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. EXISTING DYNAMIC PRODUCTS SECTION (UI ONLY UPGRADED) */}
      {products.length > 0 && (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block animate-bounce" style={{ animationDuration: '3s' }}>
                Product Catalog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
                Premium Solar Modules & Equipment
              </h2>
              <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mt-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  key={product._id} 
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
                >
                  {product.featuredImage && (
                    <div className="relative h-60 w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                      <Image 
                        src={product.featuredImage} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy" 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute top-4 left-4 bg-brand-navy/90 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        {product.category}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {product.shortDescription}
                    </p>
                    
                    {product.specifications && product.specifications.length > 0 && (
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 mb-6 mt-auto">
                        <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">Specifications</h4>
                        <div className="space-y-1.5">
                          {product.specifications.map((spec, i) => (
                            <div key={i} className="flex justify-between text-xs border-b border-gray-100 pb-1.5 last:border-0 last:pb-0">
                              <span className="text-gray-400 font-semibold">{spec.label}</span>
                              <span className="text-brand-navy font-bold">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <ul className="space-y-1.5">
                          {product.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. PROJECTS & EXPERTISE */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
              Solar EPC & Renewable Infrastructure
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Delivering high-yielding, robust, and cost-effective solar energy systems tailored to industrial and public utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Rooftop Solar</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized rooftop solar installations for commercial buildings, manufacturing units, and government institutions with complete net-metering integration.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Settings className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Solar EPC</h3>
              <p className="text-gray-600 leading-relaxed">
                Full lifecycle engineering, procurement, and construction services ensuring maximum energy yield, high durability, and low lifecycle maintenance.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Government Solar Execution</h3>
              <p className="text-gray-600 leading-relaxed">
                Successful implementation of solar pumps, street lighting schemes, and grid-connected systems for municipalities and local administrative bodies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SHIVOM SOLAR */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-luminosity" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Scalable Renewable Infrastructure</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              Our solar solutions are built to withstand challenging environments and deliver predictable outputs. By utilizing industry-leading Tier 1 solar modules and smart inverters, we maximize investment returns.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Tier-1 Components</h4>
                  <p className="text-sm text-gray-400">Strictly sourcing high-efficiency modules and certified mounting structures.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Grid Connectivity</h4>
                  <p className="text-sm text-gray-400">Seamless coordination for net-metering approvals and discom coordination.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Long-term Performance</h4>
                  <p className="text-sm text-gray-400">Comprehensive maintenance and automated performance monitoring systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TALK TO SOLAR EXPERT (CTA WITH HOVER PULSE EFFECTS) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-150 text-brand-navy rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden group">
            {/* Background motion gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,115,33,0.08),transparent)] transition-opacity duration-500 group-hover:opacity-70" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <span className="text-brand-orange font-bold uppercase tracking-wider text-xs mb-3 block">
                  Talk to Our Solar Team
                </span>
                <h3 className="text-3xl font-bold mb-1 text-brand-navy">Mr. Debendra Kumar Mishra</h3>
                <p className="text-gray-600 text-base font-semibold mb-6">Manager (Solar)</p>
                <p className="text-gray-500 text-sm max-w-xl">
                  Contact our solar manager directly to discuss EPC contracts, grid integrations, or corporate solar tenders.
                </p>
              </div>
              
              <div className="shrink-0 w-full md:w-auto">
                <a 
                  href="tel:+918895197406" 
                  className="flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-orange text-white transition-all duration-300 px-8 py-4 rounded-xl font-bold text-base cursor-pointer shadow-md hover:scale-105 active:scale-95 group-hover:shadow-lg text-center"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>Mr. Debendra Kumar Mishra +91 8895197406</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
