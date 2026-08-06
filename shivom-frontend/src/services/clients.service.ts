import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformClient } from '../lib/transformers';
import { IClient, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const clientsService = {
  getClients: cache(async (): Promise<IClient[]> => {
    const response = await apiClient.get<ListResponse<IClient>>(`/api/public/${WEBSITE_KEY}/clients`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformClient);
    }
    return [];
  })
};
