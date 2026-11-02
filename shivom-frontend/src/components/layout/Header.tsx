import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { 
  HeaderContainer, 
  ActiveLink, 
  HeaderDropdown, 
  MobileMenuClient 
} from './HeaderComponents';

export function Header() {
  const groupLinks = [
    { label: 'Shivom Enterprise', href: '/our-group/enterprise' },
    { label: 'Shivom Solar Solutions', href: '/our-group/solar' },
    { label: 'Shivom Concrete Products', href: '/our-group/concrete' },
  ];

  const aboutLinks = [
    { label: 'Awards & Certifications', href: '/awards-certifications' },
  ];

  return (
    <HeaderContainer>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.webp" 
            alt="Shivom Group Logo" 
            width={120} 
            height={110} 
            className="w-auto h-14 md:h-16 lg:h-20 object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home */}
          <ActiveLink 
            href="/" 
            className="text-sm font-semibold transition-colors hover:text-brand-orange text-white/90"
            scrolledClassName="text-brand-navy"
            activeClassName="text-brand-orange"
          >
            Home
          </ActiveLink>

          {/* About Us */}
          <ActiveLink 
            href="/about" 
            className="text-sm font-semibold transition-colors hover:text-brand-orange text-white/90"
            scrolledClassName="text-brand-navy"
            activeClassName="text-brand-orange"
          >
            About Us
          </ActiveLink>

          {/* Our Group (Dropdown) */}
          <HeaderDropdown 
            label="Our Group"
            activePaths={['/our-group/']}
          >
            {groupLinks.map((link) => (
              <ActiveLink 
                key={link.href} 
                href={link.href} 
                className="px-4 py-2 text-sm transition-colors hover:bg-gray-50 text-brand-navy hover:text-brand-orange"
                activeClassName="text-brand-orange font-bold"
              >
                {link.label}
              </ActiveLink>
            ))}
          </HeaderDropdown>

          {/* Projects */}
          <ActiveLink 
            href="/projects" 
            className="text-sm font-semibold transition-colors hover:text-brand-orange text-white/90"
            scrolledClassName="text-brand-navy"
            activeClassName="text-brand-orange"
          >
            Projects
          </ActiveLink>

          {/* Awards & Certifications */}
          <ActiveLink 
            href="/awards-certifications" 
            className="text-sm font-semibold transition-colors hover:text-brand-orange text-white/90"
            scrolledClassName="text-brand-navy"
            activeClassName="text-brand-orange"
          >
            Awards & Certifications
          </ActiveLink>

          {/* Careers */}
          <ActiveLink 
            href="/careers" 
            className="text-sm font-semibold transition-colors hover:text-brand-orange text-white/90"
            scrolledClassName="text-brand-navy"
            activeClassName="text-brand-orange"
          >
            Careers
          </ActiveLink>

          {/* Contact Us */}
          <ActiveLink 
            href="/contact" 
            className="text-sm font-semibold transition-colors hover:text-brand-orange text-white/90"
            scrolledClassName="text-brand-navy"
            activeClassName="text-brand-orange"
          >
            Contact Us
          </ActiveLink>
        </nav>

        {/* Call to Action Quote Button */}
        <div className="hidden lg:block">
          <Link href="/contact">
            <Button variant="primary">Get a Quote</Button>
          </Link>
        </div>

        {/* Mobile Menu (Client Component trigger & layout) */}
        <MobileMenuClient 
          groupLinks={groupLinks}
          aboutLinks={aboutLinks}
        />
      </div>
    </HeaderContainer>
  );
}
