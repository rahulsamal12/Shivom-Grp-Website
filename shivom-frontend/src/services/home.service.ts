import { cache } from 'react';
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
  getHomeData: cache(async (): Promise<HomeDataResponse> => {
    // According to Postman, Home might just be a Page layout or custom home response
    // For now, mapping GET /api/public/group/home
    const response = await apiClient.get<HomeDataResponse>(`/api/public/${WEBSITE_KEY}/home`);
    // Example payload could contain sections, sliders, projects. 
    // This is dependent on exact CMS payload, applying basic transforms
    return response.data;
  })
};
