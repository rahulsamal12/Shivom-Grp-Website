'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sun, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Settings, 
  ArrowRight, 
  Phone, 
  Mail,
  Building2 
} from 'lucide-react';

import { DivisionHeroSlider } from '@/components/sections/DivisionHeroSlider';
import { solarService } from '@/services/solar.service';
import { Button } from '@/components/ui/Button';
import { Counter } from '@/components/ui/Counter';
import { SolarKitSectionClient } from '@/components/solar/SolarKitSectionClient';

export default function SolarPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    async function loadSolarContent() {
      try {
        const [fetchedProducts, fetchedPromotions] = await Promise.all([
          solarService.getProducts(),
          solarService.getPromotions()
        ]);
        setProducts(fetchedProducts);
        setPromotions(fetchedPromotions);
      } catch (error) {
        console.error('[SolarPage] Error loading dynamic content:', error);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    }
    loadSolarContent();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SLIDER */}
      <DivisionHeroSlider websiteKey="solar" />
      
      {/* 2. ABOUT/OVERVIEW SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:w-1/2">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
                Renewable Energy Infrastructure
              </span>
              <h2 className="text-4xl font-bold text-brand-navy leading-tight mb-6">
                Leading-Edge Solar EPC & Deployment Solutions
              </h2>
              <p className="text-gray-600 text-lg text-justify-content mb-6">
                Shivom Solar Solutions is our dedicated green-energy division, delivering end-to-end solar EPC services for commercial solar projects, public institutions, and utility-scale installations. We accelerate solar deployment to support Odisha&apos;s renewable power targets.
              </p>
              <p className="text-gray-600 text-lg text-justify-content mb-8">
                From high-capacity rooftop solar arrays to vast ground-mounted renewable infrastructure, we provide government solar execution with precision engineering, premium component procurement, and seamless grid integration.
              </p>
              
              {/* Counters / Stats */}
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-1">
                    50+ MW
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Solar Infrastructure Executed</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-1">
                    250+
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Commercial & Rooftop Projects</div>
                </div>
              </div>
            </div>
            
            {/* Right Image Column */}
            <div className="lg:w-1/2 relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl group">
              <Image 
                src="/solar-infrastructure.webp" 
                alt="Utility scale solar plant and renewable infrastructure execution" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply transition-opacity group-hover:opacity-10" />
              
              {/* Overlay Glass Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 border border-brand-orange/20">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="text-xs font-bold text-brand-navy tracking-wide">MNRE Aligned Solutions</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-inner">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-brand-navy text-lg">Government Solar Execution</h4>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Certified Tier-1 EPC contractor executing utility-scale infrastructure and state renewable programs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPLETE SOLAR KIT SOLUTIONS SECTION */}
      <SolarKitSectionClient />

      {/* 4. ACTIVE SCHEMES / PROMOTIONS (ENHANCED SURYA GHAR YOJANA SECTION) */}
      <section className="py-24 relative overflow-hidden bg-brand-navy text-white border-y border-brand-orange/20">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[120px] mix-blend-screen opacity-40" />
          <div className="absolute bottom-[-20%] right-[20%] w-[70%] h-[70%] bg-brand-blue/20 rounded-full blur-[130px] mix-blend-screen opacity-30" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            {/* PRIMARY HERO TITLE — PM Surya Ghar Yojana */}
            <div className="mb-5">
              <a
                href="https://consumer.pmsuryaghar.gov.in/consumer/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight group-hover:text-[#FFB703] transition-colors duration-300 cursor-pointer">
                  PM Surya Ghar Yojana
                </h2>
                <div className="mt-3 h-1.5 w-2/3 mx-auto rounded-full bg-gradient-to-r from-brand-orange to-[#FFB703] group-hover:w-full transition-all duration-500" />
              </a>
            </div>

            {/* Supporting headline */}
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-snug tracking-tight mb-2">
              Power Your Home With
            </p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#FFB703] leading-tight tracking-tight mb-8">
              Free Solar Energy
            </p>

            {/* Government Trust Ribbon */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-6 py-4 px-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-5xl mx-auto shadow-xl">
              <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold">
                <ShieldCheck className="w-5 h-5 text-[#FFB703]" />
                <span>Government Supported Rooftop Solar Program</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
              <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold">
                <CheckCircle className="w-5 h-5 text-brand-orange" />
                <span>Subsidy Assistance Available</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
              <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold">
                <FileText className="w-5 h-5 text-[#FFB703]" />
                <span>End-to-End Documentation Support</span>
              </div>
            </div>

            {/* 4-Step Journey Timeline */}
            <div className="w-full max-w-5xl mx-auto mt-12 mb-8 px-4">
              <div className="relative">
                <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-white/10 -translate-y-1/2 hidden md:block z-0" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                  {[
                    { step: 1, title: 'Site Survey', desc: 'Expert physical & shadow audit' },
                    { step: 2, title: 'Subsidy Documentation Support', desc: 'Hassle-free paperwork' },
                    { step: 3, title: 'Solar Installation', desc: 'Tier-1 solar module setup' },
                    { step: 4, title: 'Subsidy Assistance', desc: 'DISCOM & subsidy release' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group">
                      <div className="w-10 h-10 rounded-full bg-brand-navy border-2 border-white/20 flex items-center justify-center text-sm font-bold text-white group-hover:border-[#FFB703] group-hover:bg-[#FFB703] group-hover:text-brand-navy transition-all duration-300 shadow-xl mb-3 relative z-10">
                        {item.step}
                      </div>
                      <h4 className="font-bold text-white text-sm md:text-base mb-1 group-hover:text-[#FFB703] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 max-w-[150px]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-stretch max-w-7xl mx-auto relative z-20">
            {/* Left Column: Solar Homes */}
            <div className="w-full lg:w-1/2 relative flex">
              <div className="relative h-[400px] lg:h-auto min-h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group flex-grow">
                <Image 
                  src="/pm-surya-ghar-residential.webp" 
                  alt="Indian family smiling in front of a modern home with residential rooftop solar panels" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: PM Surya Ghar Visual + Subsidy Benefits */}
            <div className="w-full lg:w-1/2 relative flex flex-col gap-8 justify-between">
              <div className="absolute inset-0 -z-10 opacity-30 mix-blend-screen pointer-events-none rounded-2xl overflow-hidden">
                <Image 
                  src="/solar-energy-bg.webp" 
                  alt="Renewable Energy Theme" 
                  fill 
                  loading="lazy"
                  className="object-cover blur-sm"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/10 to-transparent" />
              </div>

              {/* Subsidy Highlight Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-[#FFB703]/40 rounded-2xl p-5 text-center shadow-lg hover:bg-white/15 transition-all flex flex-col justify-center">
                  <div className="text-2xl font-extrabold text-[#FFB703] mb-1">₹1,38,000*</div>
                  <div className="text-xs text-gray-200 uppercase tracking-wider font-semibold">Up to Max Subsidy</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-brand-orange/40 rounded-2xl p-5 text-center shadow-lg hover:bg-white/15 transition-all flex flex-col justify-center">
                  <div className="text-xl font-extrabold text-brand-orange mb-1">Govt Supported</div>
                  <div className="text-xs text-gray-200 uppercase tracking-wider font-semibold">Scheme</div>
                </div>
                <div className="bg-[#FFB703]/10 backdrop-blur-md border border-[#FFB703]/40 rounded-2xl p-5 text-center shadow-lg hover:bg-[#FFB703]/20 transition-all flex flex-col justify-center">
                  <div className="text-xl font-extrabold text-[#FFB703] mb-1">End-to-End</div>
                  <div className="text-xs text-gray-200 uppercase tracking-wider font-semibold">Docs Assistance</div>
                </div>
              </div>
              
              <div className="mt-4 text-[11px] text-gray-400 italic bg-brand-navy/30 inline-block px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
                *Subsidy amount is subject to applicable Central and State Government policies and system capacity.
              </div>

              {/* Animated Credibility Counters (Uses lightweight Counter Component) */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#FFB703] mb-1">
                      <Counter value={500} suffix="+" />
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-wider">Homes Consulted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-brand-orange mb-1">
                      <Counter value={100} suffix="%" />
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-wider">Docs Support</div>
                  </div>
                  <div className="text-center flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#FFB703]/20 flex items-center justify-center mb-1">
                      <ShieldCheck className="w-4 h-4 text-[#FFB703]" />
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-wider leading-tight">Dedicated Solar<br/>Assistance Team</div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-navy/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FFB703]" />
                  Active Subsidy Programs
                </h3>
                
                <div className="flex flex-col gap-4">
                  {loading ? (
                    [1, 2].map(n => (
                      <div key={n} className="bg-white/5 border border-white/10 rounded-xl p-4 h-20 animate-pulse" />
                    ))
                  ) : apiError ? (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-20 opacity-30" />
                  ) : promotions.length > 0 ? (
                    promotions.map((promo) => (
                      <div 
                        key={promo._id} 
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/10 hover:border-[#FFB703]/30 transition-all duration-300 group"
                      >
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#FFB703] transition-colors flex items-center gap-2">
                            {promo.title}
                          </h4>
                          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                            {promo.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : null}
                </div>
              </div>

              {/* Stronger CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link prefetch={false} href="/contact" className="w-full sm:flex-1">
                  <Button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-6 text-sm rounded-xl shadow-lg shadow-brand-orange/20 transition-all duration-300">
                    Get Free Solar Consultation
                  </Button>
                </Link>
                <Link prefetch={false} href="/contact" className="w-full sm:flex-1">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/15 font-bold py-6 text-sm rounded-xl transition-all duration-300">
                    Apply for Subsidy Assistance
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC PRODUCTS & EXPERTISE SECTION */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block">
              Our Expertise & Products
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy tracking-tight">
              Solar EPC & Renewable Infrastructure
            </h2>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
              Delivering high-yielding, robust, and cost-effective solar energy systems tailored to industrial, commercial, and public utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1, 2, 3, 4].map((n) => (
                <div 
                  key={n} 
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm h-80 animate-pulse flex flex-col overflow-hidden"
                >
                  <div className="h-56 w-full bg-gray-200" />
                  <div className="p-6 flex-grow space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))
            ) : apiError || products.length === 0 ? (
              null
            ) : (
              products.map((product) => {
                const nameLower = (product.name || '').toLowerCase();
                let Icon = Sun;
                if (nameLower.includes('ground')) Icon = Zap;
                else if (nameLower.includes('industrial') || nameLower.includes('captive')) Icon = FileText;
                else if (nameLower.includes('epc') || nameLower.includes('turnkey')) Icon = Settings;

                return (
                  <div 
                    key={product._id} 
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col"
                  >
                    <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                      {product.featuredImage && (
                        <Image 
                          src={product.featuredImage} 
                          alt={product.name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 25vw" 
                          loading="lazy" 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-wide">{product.name}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <p className="text-gray-600 leading-relaxed text-sm font-medium">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SHIVOM SOLAR */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=50&w=800')] opacity-[0.05] bg-cover bg-center mix-blend-luminosity" />
        
        {/* Static styled blur background circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none opacity-40" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block">
              Why Choose Shivom Solar
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              Scalable Renewable Infrastructure
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
              Our solar solutions are built to withstand challenging environments and deliver predictable outputs. By utilizing industry-leading Tier 1 solar modules and smart inverters, we maximize investment returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:bg-white/10 hover:border-brand-orange/30 hover:-translate-y-2 transition-all duration-500 group shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-[#FFB703] flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-[#FFB703] transition-colors">Tier-1 Components</h4>
              <p className="text-gray-300 text-justify-content font-light">
                Strictly sourcing high-efficiency modules and certified mounting structures from globally recognized manufacturers.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:bg-white/10 hover:border-brand-blue/50 hover:-translate-y-2 transition-all duration-500 group shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-400 flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-blue-400 transition-colors">Grid Connectivity</h4>
              <p className="text-gray-300 text-justify-content font-light">
                Seamless coordination for net-metering approvals, regulatory compliance, and local DISCOM coordination.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:bg-white/10 hover:border-emerald-400/50 hover:-translate-y-2 transition-all duration-500 group shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-emerald-400 transition-colors">Long-term Performance</h4>
              <p className="text-gray-300 text-justify-content font-light">
                Comprehensive Operation & Maintenance (O&M) and automated performance monitoring systems for maximum uptime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TALK TO SOLAR EXPERT (CTA WITH HOVER PULSE EFFECTS) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-150 text-brand-navy rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden group">
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
                  href="mailto:info@shivomgroup.in" 
                  className="flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-orange text-white transition-all duration-300 px-8 py-4 rounded-xl font-bold text-base cursor-pointer shadow-md hover:scale-105 active:scale-95 group-hover:shadow-lg text-center"
                >
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>Email Solar Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
