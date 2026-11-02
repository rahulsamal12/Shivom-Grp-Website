import { apiClient } from '../lib/api/axios';
import { transformEvent } from '../lib/transformers';
import { IEvent, ListResponse, SingleResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const eventsService = {
  getEvents: async (): Promise<IEvent[]> => {
    try {
      const response = await apiClient.get<ListResponse<IEvent>>(`/api/public/${WEBSITE_KEY}/events`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformEvent);
      }
    } catch (error) {
      console.error('[eventsService] Error getting events:', error);
    }
    return [];
  },

  getEventBySlug: async (slug: string): Promise<IEvent | null> => {
    try {
      const response = await apiClient.get<SingleResponse<IEvent>>(`/api/public/${WEBSITE_KEY}/events/${slug}`, { cache: 'no-store' });
      if (response.data?.data) {
        return transformEvent(response.data.data);
      }
      return null;
    } catch (error) {
      console.error(`[eventsService] Error getting event by slug ${slug}:`, error);
      return null;
    }
  }
};
