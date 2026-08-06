import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformProject } from '../lib/transformers';
import { IProject, ListResponse, SingleResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const projectsService = {
  getProjects: cache(async (): Promise<IProject[]> => {
    const response = await apiClient.get<ListResponse<IProject>>(`/api/public/${WEBSITE_KEY}/projects`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformProject);
    }
    return [];
  }),
  
  getFeaturedProjects: cache(async (): Promise<IProject[]> => {
    const response = await apiClient.get<ListResponse<IProject>>(`/api/public/${WEBSITE_KEY}/projects/featured`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformProject);
    }
    return [];
  }),

  getProjectBySlug: cache(async (slug: string): Promise<IProject | null> => {
    try {
      const response = await apiClient.get<SingleResponse<IProject>>(`/api/public/${WEBSITE_KEY}/projects/${slug}`);
      if (response.data?.data) {
        return transformProject(response.data.data);
      }
      return null;
    } catch {
      return null; // Return null on 404 for graceful fallback
    }
  })
};
