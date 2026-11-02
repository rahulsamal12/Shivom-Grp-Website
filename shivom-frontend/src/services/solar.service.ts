import { apiClient } from '../lib/api/axios';
import { transformSolarProduct, transformSolarPromotion } from '../lib/transformers';
import { ISolarProduct, ISolarPromotion, ListResponse } from '@/types';

export const solarService = {
  getProducts: async (): Promise<ISolarProduct[]> => {
    const response = await apiClient.get<ListResponse<ISolarProduct>>(`/api/public/solar/products`, { cache: 'no-store' });
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformSolarProduct);
    }
    return [];
  },
  
  getPromotions: async (): Promise<ISolarPromotion[]> => {
    const response = await apiClient.get<ListResponse<ISolarPromotion>>(`/api/public/solar/promotions/active`, { cache: 'no-store' });
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformSolarPromotion);
    }
    return [];
  }
};
