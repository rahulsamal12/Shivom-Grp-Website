import { useQuery } from '@tanstack/react-query';
import { blogsService } from '../services/blogs.service';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogsService.getBlogs,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useFeaturedBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'featured'],
    queryFn: blogsService.getFeaturedBlogs,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ['blogs', slug],
    queryFn: () => blogsService.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
