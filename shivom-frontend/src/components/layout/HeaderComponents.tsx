'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '../ui/Button';

// 1. Container that tracks scroll to apply style classes
export function HeaderContainer({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 w-full z-40 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    )}>
      {children}
    </header>
  );
}

// Helper hook for scroll state in subcomponents
export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return isScrolled;
}

// 2. Active Link checking component
export function ActiveLink({ 
  href, 
  className, 
  activeClassName, 
  scrolledClassName,
  children,
  onClick
}: { 
  href: string; 
  className: string; 
  activeClassName: string; 
  scrolledClassName?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isScrolled = useHeaderScroll();
  
  const isActive = pathname === href || pathname === `${href}/` || (href !== '/' && pathname.startsWith(href));

  return (
    <Link 
      href={href} 
      className={cn(
        className,
        isScrolled ? scrolledClassName : '',
        isActive && activeClassName
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

// 3. Desktop Dropdown Menu component with hover delay and bridge
export function HeaderDropdown({ 
  label, 
  href,
  activePaths,
  children 
}: { 
  label: string; 
  href?: string; 
  activePaths?: string[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const isScrolled = useHeaderScroll();
  const pathname = usePathname();

  const active = activePaths?.some(path => {
    return pathname === path || pathname === `${path}/` || (path !== '/' && pathname.startsWith(path));
  });

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setOpen(false);
    }, 400);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <Link 
          href={href}
          className={cn(
            'flex items-center gap-1 text-sm font-semibold transition-colors hover:text-brand-orange cursor-pointer',
            isScrolled ? 'text-brand-navy' : 'text-white/90',
            active && 'text-brand-orange'
          )}
        >
          {label} <ChevronDown className="w-4 h-4" />
        </Link>
      ) : (
        <button 
          className={cn(
            'flex items-center gap-1 text-sm font-semibold transition-colors hover:text-brand-orange cursor-pointer focus:outline-none',
            isScrolled ? 'text-brand-navy' : 'text-white/90',
            active && 'text-brand-orange'
          )}
        >
          {label} <ChevronDown className="w-4 h-4" />
        </button>
      )}
      
      {/* Dropdown panel with pt-2 (invisible hover bridge) instead of mt-2 margin */}
      <div className={cn(
        "absolute top-full left-0 w-56 pt-2 z-50 transition-all duration-200 transform origin-top-left",
        open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      )}>
        <div className="bg-white rounded-md shadow-xl py-2 flex flex-col border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

// 4. Isolated Mobile Menu Client component
export function MobileMenuClient({
  groupLinks,
  aboutLinks
}: {
  groupLinks: { label: string; href: string }[];
  aboutLinks: { label: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const isScrolled = useHeaderScroll();
  const pathname = usePathname();

  const aboutActive = pathname === '/about' || pathname === '/about/' || pathname === '/awards-certifications' || pathname === '/awards-certifications/';
  const groupActive = pathname.startsWith('/our-group/') || pathname === '/our-group' || pathname === '/our-group/';

  // Close menus on path changes
  useEffect(() => {
    setIsOpen(false);
    setGroupOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className={cn("lg:hidden p-2 cursor-pointer focus:outline-none z-50 relative", isScrolled ? "text-brand-navy" : "text-white")} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Panel */}
      <div className={cn(
        "fixed inset-x-0 top-[76px] bg-white shadow-xl border-t border-gray-100 transition-all duration-300 lg:hidden overflow-hidden origin-top",
        isOpen ? "max-h-[85vh] opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
      )}>
        <div className="px-6 pt-4 pb-8 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          {/* Home */}
          <Link 
            href="/" 
            className={cn("font-semibold text-lg hover:text-brand-orange", (pathname === '/' || pathname === '') ? 'text-brand-orange' : 'text-brand-navy')}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          {/* About Us */}
          <Link 
            href="/about" 
            className={cn("font-semibold text-lg hover:text-brand-orange", aboutActive ? 'text-brand-orange' : 'text-brand-navy')}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>

          {/* Our Group */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setGroupOpen(!groupOpen)}
              className={cn(
                "flex items-center justify-between w-full font-semibold text-lg text-left focus:outline-none",
                groupActive ? 'text-brand-orange' : 'text-brand-navy'
              )}
            >
              <span>Our Group</span>
              <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", groupOpen && "rotate-180")} />
            </button>
            
            <div className={cn(
              "pl-4 flex flex-col gap-2 overflow-hidden border-l-2 border-gray-100 transition-all duration-300 origin-top",
              groupOpen ? "max-h-40 opacity-100 py-1" : "max-h-0 opacity-0 pointer-events-none"
            )}>
              {groupLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={cn("py-1 font-medium hover:text-brand-orange", (pathname === link.href || pathname === `${link.href}/`) ? 'text-brand-orange' : 'text-brand-navy/85')}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Projects */}
          <Link 
            href="/projects" 
            className={cn("font-semibold text-lg hover:text-brand-orange", (pathname === '/projects' || pathname.startsWith('/projects/')) ? 'text-brand-orange' : 'text-brand-navy')}
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>

          {/* Awards & Certifications */}
          <Link 
            href="/awards-certifications" 
            className={cn("font-semibold text-lg hover:text-brand-orange", (pathname === '/awards-certifications' || pathname.startsWith('/awards-certifications/')) ? 'text-brand-orange' : 'text-brand-navy')}
            onClick={() => setIsOpen(false)}
          >
            Awards & Certifications
          </Link>

          {/* Careers */}
          <Link 
            href="/careers" 
            className={cn("font-semibold text-lg hover:text-brand-orange", (pathname === '/careers' || pathname === '/careers/') ? 'text-brand-orange' : 'text-brand-navy')}
            onClick={() => setIsOpen(false)}
          >
            Careers
          </Link>

          {/* Contact Us */}
          <Link 
            href="/contact" 
            className={cn("font-semibold text-lg hover:text-brand-orange", (pathname === '/contact' || pathname === '/contact/') ? 'text-brand-orange' : 'text-brand-navy')}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
