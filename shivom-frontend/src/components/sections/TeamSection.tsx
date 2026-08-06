import { teamService } from '@/services/team.service';
import { TeamSectionClient } from './TeamSectionClient';
import { ITeam } from '@/types';

export async function TeamSection() {
  let team: ITeam[] = [];

  try {
    team = await teamService.getTeam();
  } catch {
    // Return empty on API failure
  }

  return (
    <section id="leadership-team" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* SEO Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            Leadership &amp; Management Team
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Meet the professionals driving Shivom Group&apos;s growth across infrastructure, energy,
            and manufacturing.
          </p>
        </div>

        <TeamSectionClient team={team} />
      </div>
    </section>
  );
}
