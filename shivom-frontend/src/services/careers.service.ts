import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformCareer } from '../lib/transformers';
import { ICareer, ListResponse, SingleResponse, ICareerApplicationPayload } from '@/types';

type ApiSuccessResponse = {
  success?: boolean;
};

export const careersService = {
  getCareers: cache(async (websiteKey: string = 'group'): Promise<ICareer[]> => {
    const response = await apiClient.get<ListResponse<ICareer>>(`/api/public/${websiteKey}/careers`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(item => transformCareer({ ...item, division: websiteKey as 'group' | 'enterprise' | 'solar' | 'concrete' }));
    }
    return [];
  }),

  getCareerBySlug: cache(async (slug: string, websiteKey: string = 'group'): Promise<ICareer | null> => {
    try {
      const response = await apiClient.get<SingleResponse<ICareer>>(`/api/public/${websiteKey}/careers/${slug}`);
      if (response.data?.data) {
        return transformCareer({ ...response.data.data, division: websiteKey as 'group' | 'enterprise' | 'solar' | 'concrete' });
      }
      return null;
    } catch {
      return null;
    }
  }),

  applyForCareer: async (slug: string, payload: ICareerApplicationPayload, websiteKey: string = 'group'): Promise<boolean> => {
    const response = await apiClient.post<ApiSuccessResponse>(`/api/public/${websiteKey}/careers/${slug}/apply`, payload);
    return response.data?.success || false;
  }
};
