import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformTeam } from '../lib/transformers';
import { ITeam, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const teamService = {
  getTeam: cache(async (): Promise<ITeam[]> => {
    const response = await apiClient.get<ListResponse<ITeam>>(`/api/public/${WEBSITE_KEY}/team`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformTeam);
    }
    return [];
  })
};
