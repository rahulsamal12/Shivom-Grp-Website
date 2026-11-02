import { apiClient } from '../lib/api/axios';
import { transformProject } from '../lib/transformers';
import { IProject, ListResponse, SingleResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const projectsService = {
  getProjects: async (): Promise<IProject[]> => {
    try {
      const response = await apiClient.get<ListResponse<IProject>>(`/api/public/${WEBSITE_KEY}/projects`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformProject);
      }
    } catch (error) {
      console.error('[projectsService] Error getting projects:', error);
    }
    return [];
  },
  
  getFeaturedProjects: async (): Promise<IProject[]> => {
    try {
      const response = await apiClient.get<ListResponse<IProject>>(`/api/public/${WEBSITE_KEY}/projects/featured`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformProject);
      }
    } catch (error) {
      console.error('[projectsService] Error getting featured projects:', error);
    }
    return [];
  },

  getProjectBySlug: async (slug: string): Promise<IProject | null> => {
    try {
      const response = await apiClient.get<SingleResponse<IProject>>(`/api/public/${WEBSITE_KEY}/projects/${slug}`, { cache: 'no-store' });
      if (response.data?.data) {
        return transformProject(response.data.data);
      }
      return null;
    } catch (error) {
      console.error(`[projectsService] Error getting project by slug ${slug}:`, error);
      return null; 
    }
  }
};
