import { PageBanner } from '@/components/layout/PageBanner';
import { eventsService } from '@/services/events.service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const events = await eventsService.getEvents();
    if (events && events.length > 0) {
      return events.map((event) => ({
        slug: event.slug,
      }));
    }
  } catch {
    // Fallback for static build step when API server is offline
  }
  return [{ slug: 'latest' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await eventsService.getEventBySlug(resolvedParams.slug);
  
  if (!event) return { title: 'Event Not Found | Shivom Group' };
  
  return {
    title: `${event.title} | Shivom Group`,
    description: event.description || `Join us for ${event.title}`,
    openGraph: {
      images: event.image ? [event.image] : [],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const event = await eventsService.getEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }
  
  const displayDate = event.createdAt 
    ? new Date(event.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <>
      <PageBanner 
        title={event.title} 
        breadcrumb={`Events / ${event.title}`} 
        bgImage={event.image || undefined} 
      />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">{event.title}</h2>
            {displayDate && (
              <div className="text-gray-500">
                Published: {displayDate}
              </div>
            )}
          </div>
          <div className="bg-brand-orange text-white px-6 py-3 rounded-lg font-bold shrink-0">
            {event.status || 'Active'}
          </div>
        </div>
        
        {event.image && (
          <div className="relative h-96 rounded-xl mb-12 overflow-hidden shadow-lg bg-gray-100">
            <Image 
              src={event.image} 
              alt={event.title} 
              fill 
              loading="lazy"
              sizes="(max-width: 992px) 100vw, 850px"
              className="object-cover" 
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>{event.description || 'Detailed event information is not available at the moment.'}</p>
        </div>
      </div>
    </>
  );
}
