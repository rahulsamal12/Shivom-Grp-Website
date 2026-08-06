import { useQuery } from '@tanstack/react-query';
import { projectsService } from '../services/projects.service';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getProjects,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: projectsService.getFeaturedProjects,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: ['projects', slug],
    queryFn: () => projectsService.getProjectBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
