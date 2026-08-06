export const revalidate = 300;

import { DivisionHeroSlider } from '@/components/sections/DivisionHeroSlider';
import Image from 'next/image';
import { Zap, ShieldCheck, Cpu, CheckCircle, HardHat, Landmark, Network, Phone } from 'lucide-react';

export default async function EnterprisePage() {
  const fallbackSlides = [
    {
      _id: 'enterprise-fallback-1',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop',
      title: 'Shivom Enterprise',
      subtitle: 'Engineering, Procurement, and Construction (EPC) electrification grids across Odisha.',
      buttonText: 'Request Consultation',
      buttonLink: '/contact'
    }
  ];

  return (
    <>
      <DivisionHeroSlider websiteKey="enterprise" fallbackSlides={fallbackSlides} />
      
      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
                Utility & Power Infrastructure
              </span>
              <h2 className="text-4xl font-bold text-brand-navy leading-tight mb-6">
                Pioneering Large-Scale EPC & Electrification Execution
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Shivom Enterprise is the premier EPC (Engineering, Procurement, and Construction) arm of the Shivom Group. We specialize in high-impact electrification schemes, utility infrastructure deployment, and transmission & distribution line networks across Odisha.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                With deep field execution capability and rigorous adherence to engineering excellence, we partner with state governments, central utilities, and private energy corporations to build the backbone of tomorrow&apos;s electrical grid.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                  <div className="text-3xl font-bold text-brand-blue mb-1">1,500+ km</div>
                  <div className="text-sm text-gray-500 font-medium">Transmission Lines Commissioned</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-blue mb-1">80+</div>
                  <div className="text-sm text-gray-500 font-medium">Substations Successfully Completed</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop" 
                alt="Transmission and distribution tower execution" 
                fill
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/30 mix-blend-multiply" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-gray-100 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">Field Execution Capability</h4>
                    <p className="text-sm text-gray-600">Equipped with heavy machinery and specialized crew for complex terrains.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
              Industrial Utility Infrastructure Solutions
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              We offer comprehensive turnkey services, from survey and planning to engineering design, supply, testing, and commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Transmission & Distribution</h3>
              <p className="text-gray-600 leading-relaxed">
                Design and execution of EHV transmission lines, LT/HT distribution lines, and installation of pole-mounted and heavy ground-mounted transformers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Electrification Schemes</h3>
              <p className="text-gray-600 leading-relaxed">
                Turnkey implementation of government rural and urban electrification programs, including household connections and grid-connectivity expansions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Government Utility Projects</h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted vendor for public utility companies (discoms), undertaking system hardening, feeder separation, and smart metering deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Field Execution & Safety */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-luminosity" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Unmatched Field Execution Capability</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              Our capability spans deep geographical networks across Odisha. With skilled engineering personnel, robust supply chains, and specialized vehicles, we deliver high-tension utilities on schedule and with absolute compliance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Safety First</h4>
                  <p className="text-sm text-gray-400">Strict zero-incident work policy and regular field safety audits.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">State-of-the-Art Gear</h4>
                  <p className="text-sm text-gray-400">Advanced monitoring tools and testing machinery for line execution.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Grid Compliance</h4>
                  <p className="text-sm text-gray-400">Full conformance to grid standards and statutory safety regulations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to Our Project Team */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-150 text-brand-navy rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,115,33,0.08),transparent)]" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <span className="text-brand-orange font-bold uppercase tracking-wider text-xs mb-3 block">
                  Talk to Our Project Team
                </span>
                <h3 className="text-3xl font-bold mb-1 text-brand-navy">Mr. Manoranjan Bal</h3>
                <p className="text-gray-600 text-base font-semibold mb-6">Project Manager</p>
                <p className="text-gray-500 text-sm max-w-xl">
                  Contact our project manager directly to discuss electrification schemes, substations, or distribution line EPC contracts.
                </p>
              </div>
              
              <div className="shrink-0 w-full md:w-auto">
                <a 
                  href="tel:+917504929429" 
                  className="flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-orange text-white transition-colors px-8 py-4 rounded-xl font-bold text-base cursor-pointer shadow-md"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Project Manager</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
