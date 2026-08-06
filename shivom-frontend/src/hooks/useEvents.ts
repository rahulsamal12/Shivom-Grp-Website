import { useQuery } from '@tanstack/react-query';
import { eventsService } from '../services/events.service';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventsService.getEvents,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useEvent = (slug: string) => {
  return useQuery({
    queryKey: ['events', slug],
    queryFn: () => eventsService.getEventBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
