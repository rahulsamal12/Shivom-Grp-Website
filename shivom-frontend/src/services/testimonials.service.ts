import { apiClient } from '../lib/api/axios';
import { transformTestimonial } from '../lib/transformers';
import { ITestimonial, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const testimonialsService = {
  getTestimonials: async (): Promise<ITestimonial[]> => {
    try {
      const response = await apiClient.get<ListResponse<ITestimonial>>(`/api/public/${WEBSITE_KEY}/testimonials`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformTestimonial);
      }
    } catch (error) {
      console.error('[testimonialsService] Error getting testimonials:', error);
    }
    return [];
  }
};
