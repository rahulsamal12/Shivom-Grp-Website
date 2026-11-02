import { apiClient } from '../lib/api/axios';
import { transformSlider } from '../lib/transformers';
import { ISlider, ListResponse } from '@/types';

export const slidersService = {
  getSliders: async (websiteKey: string = 'group'): Promise<ISlider[]> => {
    const response = await apiClient.get<ListResponse<ISlider>>(
      `/api/public/${websiteKey}/sliders`,
      { cache: 'no-store' }
    );
    const rawData = response.data?.data;
    if (Array.isArray(rawData)) {
      const transformed = rawData.map(transformSlider);

      const filtered = transformed.filter(
        slider => slider.status?.toLowerCase() === 'active' && slider.isActive !== false
      );

      return filtered;
    }
    return [];
  }
};
