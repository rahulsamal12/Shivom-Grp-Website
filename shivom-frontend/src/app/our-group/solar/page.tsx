import { DivisionHeroSlider } from '@/components/sections/DivisionHeroSlider';
import { solarService } from '@/services/solar.service';
import { SolarPageClient } from './SolarPageClient';

export const revalidate = 300;

export default async function SolarPage() {
  const products = await solarService.getProducts();
  const promotions = await solarService.getPromotions();

  const fallbackSlides = [
    {
      _id: 'solar-fallback-1',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2000&auto=format&fit=crop',
      title: 'Shivom Solar Solutions',
      subtitle: 'Providing state-of-the-art grid scale renewable energy systems and products.',
      buttonText: 'Request Consultation',
      buttonLink: '/contact'
    }
  ];

  const heroSlider = (
    <DivisionHeroSlider websiteKey="solar" fallbackSlides={fallbackSlides} />
  );

  return (
    <SolarPageClient 
      products={products} 
      promotions={promotions} 
      heroSlider={heroSlider} 
    />
  );
}
