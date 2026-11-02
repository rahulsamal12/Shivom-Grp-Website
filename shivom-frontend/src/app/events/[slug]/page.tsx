import { EventDetailClient } from '@/components/sections/EventDetailClient';
import { eventsService } from '@/services/events.service';

export async function generateStaticParams() {
  try {
    const events = await eventsService.getEvents();
    if (!events || events.length === 0) {
      return [{ slug: 'default' }];
    }
    return events.map((event) => ({
      slug: event.slug,
    }));
  } catch {
    return [{ slug: 'default' }];
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <EventDetailClient slug={resolvedParams.slug} />;
}
