export const revalidate = 300;

import { DivisionHeroSlider } from '@/components/sections/DivisionHeroSlider';
import Image from 'next/image';
import { Factory, ShieldCheck, Award, Settings, Layers, Phone } from 'lucide-react';

export default async function ConcretePage() {
  const fallbackSlides = [
    {
      _id: 'concrete-fallback-1',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop',
      title: 'Shivom Concrete Products',
      subtitle: 'Manufacturing high-strength pre-stressed cement concrete (PSC) poles and structures.',
      buttonText: 'Request Consultation',
      buttonLink: '/contact'
    }
  ];

  return (
    <>
      <DivisionHeroSlider websiteKey="concrete" fallbackSlides={fallbackSlides} />
      
      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
                Manufacturing Excellence
              </span>
              <h2 className="text-4xl font-bold text-brand-navy leading-tight mb-6">
                Utility-Grade Infrastructure Products & PSC Pole Manufacturing
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Shivom Concrete Products stands at the forefront of industrial manufacturing in Odisha. We are a premier manufacturer of prestressed concrete poles (PSC poles), utilizing advanced casting technology and a highly controlled curing process to deliver robust, weather-resistant, and high-tensile strength solutions for large-scale utility and power distribution networks.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Through strict quality control, manufacturing excellence, and high-capacity production lines, we ensure all products comply with the highest utility-grade infrastructure standards set by state discoms and corporate energy developers.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                  <div className="text-3xl font-bold text-brand-blue mb-1">500+</div>
                  <div className="text-sm text-gray-500 font-medium">Daily Production Capacity</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-blue mb-1">100%</div>
                  <div className="text-sm text-gray-500 font-medium">Utility-Grade Certified</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                alt="PSC pole manufacturing casting bed yard" 
                fill
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/30 mix-blend-multiply" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-gray-150 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">High-Capacity Casting Beds</h4>
                    <p className="text-sm text-gray-600">Equipped with specialized tensioning jacks and industrial steam systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Product Range
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
              Prestressed Concrete Poles & Structures
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Our products are engineered to support major transmission and distribution networks under all weather conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">8 Meter PSC Pole</h3>
              <p className="text-gray-600 leading-relaxed">
                Standard prestressed concrete poles optimized for low-tension (LT) rural electrification networks, service lines, and domestic distribution layouts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">9 Meter PSC Pole</h3>
              <p className="text-gray-600 leading-relaxed">
                High-capacity prestressed concrete poles designed for 11kV and 33kV high-tension (HT) power lines, providing exceptional wind-load resistance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Customized PSC Pole</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored precast concrete poles and modular infrastructure supports manufactured to client specifications for heavy industrial utility zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Yard Capabilities */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-luminosity" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">State-of-the-Art Production Facility</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              Our concrete manufacturing yard features specialized casting beds, high-tensile wire tensioners, and a dedicated curing process that guarantees maximum structural load capacity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Curing Process</h4>
                  <p className="text-sm text-gray-400">Controlled water-sprinkling and steam curing ensuring concrete grade compliance.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Casting Beds</h4>
                  <p className="text-sm text-gray-400">Multiple casting beds operating in parallel to support 500+ poles/day capacity.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">ISO Certified Quality</h4>
                  <p className="text-sm text-gray-400">Rigorous batch-testing of cement, aggregate, and high-tensile steel strands.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to Our Manufacturing Team */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-150 text-brand-navy rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,115,33,0.08),transparent)]" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <span className="text-brand-orange font-bold uppercase tracking-wider text-xs mb-3 block">
                  Talk to Our Manufacturing Team
                </span>
                <h3 className="text-3xl font-bold mb-1 text-brand-navy">Mr. Sunil Kumar Nayak</h3>
                <p className="text-gray-600 text-base font-semibold mb-6">Manager</p>
                <p className="text-gray-500 text-sm max-w-xl">
                  Contact our manufacturing manager directly to discuss PSC pole supplies, utility specifications, or high-volume orders.
                </p>
              </div>
              
              <div className="shrink-0 w-full md:w-auto">
                <a 
                  href="tel:+916204929709" 
                  className="flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-orange text-white transition-colors px-8 py-4 rounded-xl font-bold text-base cursor-pointer shadow-md text-center"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>Mr. Sunil Kumar Nayak +91 6204929709</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
