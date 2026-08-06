import { awardsService } from '@/services/awards.service';
import { AwardsSectionClient } from './AwardsSectionClient';
import { IAward } from '@/types';

export async function AwardsSection() {
  let awards: IAward[] = [];

  try {
    awards = await awardsService.getAwards();
  } catch {
    // Return empty on API failure — client shows empty state
  }

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
            Our Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            Awards &amp; Certifications
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>

        <AwardsSectionClient awards={awards} />
      </div>
    </section>
  );
}
