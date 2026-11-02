export const revalidate = 300;

import { HeroSlider } from '@/components/sections/HeroSlider';
import { AboutSection } from '@/components/sections/AboutSection';
import dynamic from 'next/dynamic';

const GroupCompanies = dynamic(() => import('@/components/sections/GroupCompanies').then(mod => mod.GroupCompanies), { ssr: true });
const StatsSection = dynamic(() => import('@/components/sections/StatsSection').then(mod => mod.StatsSection), { ssr: true });
const ProjectShowcase = dynamic(() => import('@/components/sections/ProjectShowcase').then(mod => mod.ProjectShowcase), { ssr: true });
const AwardsSection = dynamic(() => import('@/components/sections/AwardsSection').then(mod => mod.AwardsSection), { ssr: true });
const BlogSection = dynamic(() => import('@/components/sections/BlogSection').then(mod => mod.BlogSection), { ssr: true });
const TestimonialSection = dynamic(() => import('@/components/sections/TestimonialSection').then(mod => mod.TestimonialSection), { ssr: true });
const ClientsSection = dynamic(() => import('@/components/sections/ClientsSection').then(mod => mod.ClientsSection), { ssr: true });
const ContactSection = dynamic(() => import('@/components/sections/ContactSection').then(mod => mod.ContactSection), { ssr: true });

export default function Home() {
  return (
    <>
      {/* Hero renders server-side — no loading flash */}
      <HeroSlider />
      <AboutSection />
      <GroupCompanies />
      <StatsSection />
      <ProjectShowcase />
      <AwardsSection />
      <BlogSection />
      <TestimonialSection />
      <ClientsSection />
      <ContactSection />
    </>
  );
}
