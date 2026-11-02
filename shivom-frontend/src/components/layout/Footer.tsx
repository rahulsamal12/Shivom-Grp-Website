'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Company Info */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-brand-orange/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image 
                  src="/logo-footer.webp" 
                  alt="Shivom Group Footer Logo" 
                  width={360} 
                  height={72} 
                  className="w-auto h-20 md:h-24 object-contain relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm text-justify-content mb-6">
              A premier infrastructure, power distribution, solar energy, and manufacturing enterprise committed to sustainable development and government-grade utility projects.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] hover:-translate-y-1">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877f2] hover:border-[#1877f2] transition-all duration-300 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] hover:-translate-y-1">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#e4405f] hover:border-[#e4405f] transition-all duration-300 hover:shadow-[0_0_15px_rgba(228,64,95,0.5)] hover:-translate-y-1">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:-translate-y-1">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Awards & Certifications', href: '/awards-certifications' },
                { label: 'Projects', href: '/projects' },
                { label: 'Events', href: '/events' },
                { label: 'Blogs', href: '/blogs' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact Us', href: '/contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className={`transition-all duration-300 text-sm flex items-center gap-2 ${isActive(link.href) ? 'text-brand-orange font-medium translate-x-1' : 'text-gray-400 hover:text-white hover:translate-x-1'}`}>
                    {isActive(link.href) && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Group */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-white/10 pb-2 inline-block">Our Group</h4>
            <ul className="space-y-3 mb-8">
              {[
                { label: 'Shivom Enterprise', href: '/our-group/enterprise' },
                { label: 'Shivom Solar Solutions', href: '/our-group/solar' },
                { label: 'Shivom Concrete Products', href: '/our-group/concrete' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className={`transition-all duration-300 text-sm flex items-center gap-2 ${isActive(link.href) ? 'text-brand-orange font-medium translate-x-1' : 'text-gray-400 hover:text-white hover:translate-x-1'}`}>
                    {isActive(link.href) && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Solar Solutions Branding Badge */}
            <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-lg p-3 inline-flex items-start gap-3 shadow-[0_0_15px_rgba(249,115,22,0.05)] transition-all hover:bg-brand-orange/20 cursor-default">
              <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <span className="text-white text-xs font-bold block mb-0.5 tracking-wide">MNRE Aligned</span>
                <span className="text-brand-orange text-xs block font-medium">Solar EPC Solutions</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-2 md:mt-0">
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact Info</h4>
            <div className="space-y-6">
              {/* Office Address */}
              <div className="flex gap-4 text-sm text-gray-400 group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1.5">
                  <span className="font-bold text-white tracking-wider text-xs">SHIVOM GROUP</span>
                  <span className="leading-relaxed">
                    Plot No. 41, Sect. A, Zone B<br />
                    Near KTM Showroom, Mancheswar<br />
                    Bhubaneswar – 751010<br />
                    Odisha, India
                  </span>
                </div>
              </div>
              


              {/* Emails */}
              <div className="flex gap-4 text-sm text-gray-400 group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col justify-center">
                  <a href="mailto:info@shivomgroup.in" className="text-white font-medium hover:text-brand-orange transition-colors block">info@shivomgroup.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left flex flex-col gap-1.5">
            <span>© {new Date().getFullYear()} Shivom Group. All Rights Reserved.</span>
            <span className="text-xs opacity-70">
              Designed & Developed by{' '}
              <a
                href="https://visital.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Visital Technologies website"
                className="hover:text-brand-orange transition-colors duration-300"
              >
                Visital Technologies
              </a>.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap.xml" className="text-sm text-gray-400 hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
