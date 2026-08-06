import { slidersService } from '@/services/sliders.service';
import { HeroSliderClient } from './HeroSliderClient';
import { ISlider } from '@/types';

const FALLBACK_SLIDES: ISlider[] = [
  {
    _id: 'fallback-1',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
    title: "Building Tomorrow's Infrastructure",
    subtitle: 'Government-grade utility and civil engineering projects across Odisha',
    order: 1,
  } as ISlider,
];

export async function HeroSlider() {
  let slides: ISlider[] = [];

  try {
    slides = await slidersService.getSliders('group');
  } catch {
    // Fall back to static slides on API failure
  }

  const displaySlides = slides.length > 0 ? slides : FALLBACK_SLIDES;

  return <HeroSliderClient slides={displaySlides} />;
}
