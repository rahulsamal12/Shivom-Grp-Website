import { apiClient } from '../lib/api/axios';
import { transformClient } from '../lib/transformers';
import { IClient, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const clientsService = {
  getClients: async (): Promise<IClient[]> => {
    try {
      const response = await apiClient.get<ListResponse<IClient>>(`/api/public/${WEBSITE_KEY}/clients`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformClient);
      }
    } catch (error) {
      console.error('[clientsService] Error getting clients:', error);
    }
    return [];
  }
};
