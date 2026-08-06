import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformTestimonial } from '../lib/transformers';
import { ITestimonial, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const testimonialsService = {
  getTestimonials: cache(async (): Promise<ITestimonial[]> => {
    const response = await apiClient.get<ListResponse<ITestimonial>>(`/api/public/${WEBSITE_KEY}/testimonials`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformTestimonial);
    }
    return [];
  })
};
