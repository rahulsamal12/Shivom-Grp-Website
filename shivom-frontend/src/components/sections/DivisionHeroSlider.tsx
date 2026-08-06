import { slidersService } from '@/services/sliders.service';
import { DivisionHeroSliderClient } from './DivisionHeroSliderClient';
import { ISlider } from '@/types';

interface Props {
  websiteKey: 'enterprise' | 'solar' | 'concrete';
  fallbackSlides: Array<{
    _id: string;
    image: string;
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonLink?: string;
  }>;
}

export async function DivisionHeroSlider({ websiteKey, fallbackSlides }: Props) {
  let slides: ISlider[] = [];

  try {
    slides = await slidersService.getSliders(websiteKey);
  } catch {
    // Fall back to static slides on API failure
  }

  // Use API slides if available, otherwise use fallback
  const displaySlides: ISlider[] =
    slides.length > 0
      ? slides
      : fallbackSlides.map(
          (s) =>
            ({
              _id: s._id,
              image: s.image,
              title: s.title,
              subtitle: s.subtitle,
              buttonText: s.buttonText || 'Request Consultation',
              buttonLink: s.buttonLink || '/contact',
              order: 0,
            }) as ISlider
        );

  return <DivisionHeroSliderClient slides={displaySlides} />;
}
