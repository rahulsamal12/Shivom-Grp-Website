import { cache } from 'react';
import { apiClient } from '../lib/api/axios';
import { transformBlog } from '../lib/transformers';
import { IBlog, ListResponse, SingleResponse } from '@/types';

const WEBSITE_KEY = 'group';

export const blogsService = {
  getBlogs: cache(async (): Promise<IBlog[]> => {
    const response = await apiClient.get<ListResponse<IBlog>>(`/api/public/${WEBSITE_KEY}/blogs`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformBlog);
    }
    return [];
  }),
  
  getFeaturedBlogs: cache(async (): Promise<IBlog[]> => {
    const response = await apiClient.get<ListResponse<IBlog>>(`/api/public/${WEBSITE_KEY}/blogs/featured`);
    if (Array.isArray(response.data?.data)) {
      return response.data.data.map(transformBlog);
    }
    return [];
  }),

  getBlogBySlug: cache(async (slug: string): Promise<IBlog | null> => {
    try {
      const response = await apiClient.get<SingleResponse<IBlog>>(`/api/public/${WEBSITE_KEY}/blogs/${slug}`);
      if (response.data?.data) {
        return transformBlog(response.data.data);
      }
      return null;
    } catch {
      return null;
    }
  })
};
