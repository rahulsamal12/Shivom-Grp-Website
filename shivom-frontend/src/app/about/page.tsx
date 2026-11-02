import { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
// TeamSection import preserved for future use — component files remain intact
// import { TeamSection } from '@/components/sections/TeamSection';
import { AboutClient } from '@/components/sections/AboutClient';
import { homeService } from '@/services/home.service';

export const metadata: Metadata = {
  title: 'About Shivom Group | Engineering & Infrastructure Powerhouse in Odisha',
  description: 'Learn about Shivom Group, a premier multi-disciplinary conglomerate in Odisha specializing in power transmission networks, solar EPC installations, PSC pole manufacturing, and civil engineering works.',
  keywords: 'Shivom Group, About Us, Odisha Infrastructure, Power Electrification, Solar EPC Odisha, PSC Pole Manufacturing, Mr. Ambika Prasad Samal',
};

export default async function AboutPage() {
  let aboutData = undefined;

  try {
    const homeData = await homeService.getHomeData();
    aboutData = homeData?.data?.about;
  } catch (error) {
    console.error('Failed to fetch home/about details from CMS API:', error);
  }

  return (
    <main className="min-h-screen">
      <h1 className="sr-only">About Shivom Group - Company History, Leadership, and Infrastructure Services</h1>
      <PageBanner title="About Shivom Group" breadcrumb="About" />
      <AboutClient aboutData={aboutData} />
      {/* TeamSection hidden — re-enable by uncommenting the import above and adding <TeamSection /> here */}
    </main>
  );
}
