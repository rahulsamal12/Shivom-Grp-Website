import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformEvent } from '../lib/transformers';
import { IEvent, ListResponse, SingleResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const eventsService = {
  getEvents: cache(async (): Promise<IEvent[]> => {
    const response = await apiClient.get<ListResponse<IEvent>>(`/api/public/${WEBSITE_KEY}/events`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformEvent);
    }
    return [];
  }),

  getEventBySlug: cache(async (slug: string): Promise<IEvent | null> => {
    try {
      const response = await apiClient.get<SingleResponse<IEvent>>(`/api/public/${WEBSITE_KEY}/events/${slug}`);
      if (response.data?.data) {
        return transformEvent(response.data.data);
      }
      return null;
    } catch {
      return null;
    }
  })
};
