import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformSlider } from '../lib/transformers';
import { ISlider, ListResponse } from '@/types';

export const slidersService = {
  getSliders: cache(async (websiteKey: string = 'group'): Promise<ISlider[]> => {
    const response = await apiClient.get<ListResponse<ISlider>>(`/api/public/${websiteKey}/sliders`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformSlider);
    }
    return [];
  })
};
