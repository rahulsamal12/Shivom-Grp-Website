import { apiClient } from '../lib/api/axios';
const WEBSITE_KEY = 'group';

type HomeDataResponse = {
  data?: {
    about?: {
      title?: string;
      description?: string;
      image?: string;
      buttonText?: string;
    };
  };
};

export const homeService = {
  getHomeData: async (): Promise<HomeDataResponse> => {
    try {
      const response = await apiClient.get<HomeDataResponse>(`/api/public/${WEBSITE_KEY}/home`, { cache: 'no-store' });
      return response.data;
    } catch (error) {
      console.error('[homeService] Error getting home data:', error);
      return {};
    }
  }
};
