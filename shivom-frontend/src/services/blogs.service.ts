import { apiClient } from '../lib/api/axios';
import { transformBlog } from '../lib/transformers';
import { IBlog, ListResponse, SingleResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const blogsService = {
  getBlogs: async (): Promise<IBlog[]> => {
    try {
      const response = await apiClient.get<ListResponse<IBlog>>(`/api/public/${WEBSITE_KEY}/blogs`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformBlog);
      }
    } catch (error) {
      console.error('[blogsService] Error getting blogs:', error);
    }
    return [];
  },
  
  getFeaturedBlogs: async (): Promise<IBlog[]> => {
    try {
      const response = await apiClient.get<ListResponse<IBlog>>(`/api/public/${WEBSITE_KEY}/blogs/featured`, { cache: 'no-store' });
      if (Array.isArray(response.data?.data)) {
        return response.data.data.map(transformBlog);
      }
    } catch (error) {
      console.error('[blogsService] Error getting featured blogs:', error);
    }
    return [];
  },

  getBlogBySlug: async (slug: string): Promise<IBlog | null> => {
    try {
      const response = await apiClient.get<SingleResponse<IBlog>>(`/api/public/${WEBSITE_KEY}/blogs/${slug}`, { cache: 'no-store' });
      if (response.data?.data) {
        return transformBlog(response.data.data);
      }
      return null;
    } catch (error) {
      console.error(`[blogsService] Error getting blog by slug ${slug}:`, error);
      return null;
    }
  }
};
