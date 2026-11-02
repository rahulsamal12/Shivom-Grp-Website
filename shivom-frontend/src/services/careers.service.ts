import { apiClient } from '../lib/api/axios';
import { transformCareer } from '../lib/transformers';
import { ICareer, ListResponse, SingleResponse, ICareerApplicationPayload } from '@/types';

type ApiSuccessResponse = {
  success?: boolean;
};

export const careersService = {
  getCareers: async (websiteKey: string = 'group'): Promise<ICareer[]> => {
    try {
      const response = await apiClient.get<ListResponse<ICareer>>(`/api/public/${websiteKey}/careers`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(item => transformCareer({ ...item, division: websiteKey as 'group' | 'enterprise' | 'solar' | 'concrete' }));
      }
    } catch (error) {
      console.error(`[careersService] Error getting careers for ${websiteKey}:`, error);
    }
    return [];
  },

  getCareerBySlug: async (slug: string, websiteKey: string = 'group'): Promise<ICareer | null> => {
    try {
      const response = await apiClient.get<SingleResponse<ICareer>>(`/api/public/${websiteKey}/careers/${slug}`, { cache: 'no-store' });
      if (response.data?.data) {
        return transformCareer({ ...response.data.data, division: websiteKey as 'group' | 'enterprise' | 'solar' | 'concrete' });
      }
      return null;
    } catch (error) {
      console.error(`[careersService] Error getting career by slug ${slug}:`, error);
      return null;
    }
  },

  applyForCareer: async (slug: string, payload: ICareerApplicationPayload, websiteKey: string = 'group'): Promise<boolean> => {
    const response = await apiClient.post<ApiSuccessResponse>(`/api/public/${websiteKey}/careers/${slug}/apply`, payload);
    return response.data?.success || false;
  }
};
