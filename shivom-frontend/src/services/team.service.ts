import { apiClient } from '../lib/api/axios';
import { transformTeam } from '../lib/transformers';
import { ITeam, ListResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const teamService = {
  getTeam: async (): Promise<ITeam[]> => {
    try {
      const response = await apiClient.get<ListResponse<ITeam>>(`/api/public/${WEBSITE_KEY}/team`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformTeam);
      }
    } catch (error) {
      console.error('[teamService] Error getting team:', error);
    }
    return [];
  }
};
