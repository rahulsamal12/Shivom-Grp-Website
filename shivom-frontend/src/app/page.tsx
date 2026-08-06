export const revalidate = 300;

import { HeroSlider } from '@/components/sections/HeroSlider';
import { AboutSection } from '@/components/sections/AboutSection';
import { GroupCompanies } from '@/components/sections/GroupCompanies';
import { StatsSection } from '@/components/sections/StatsSection';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { ContactSection } from '@/components/sections/ContactSection';

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
