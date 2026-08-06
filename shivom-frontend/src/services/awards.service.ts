import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformAward } from '../lib/transformers';
import { IAward, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const awardsService = {
  getAwards: cache(async (): Promise<IAward[]> => {
    const response = await apiClient.get<ListResponse<IAward>>(`/api/public/${WEBSITE_KEY}/awards-certifications`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformAward);
    }
    return [];
  }),
  getCertifications: cache(async (): Promise<IAward[]> => {
    const response = await apiClient.get<ListResponse<IAward>>(`/api/public/${WEBSITE_KEY}/awards-certifications`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformAward);
    }
    return [];
  })
};
