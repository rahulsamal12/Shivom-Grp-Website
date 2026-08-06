import { useQuery, useMutation } from '@tanstack/react-query';
import { careersService } from '../services/careers.service';
import { ICareerApplicationPayload } from '@/types';

export const useCareers = () => {
  return useQuery({
    queryKey: ['careers'],
    queryFn: async () => {
      const [
        groupJobs,
        enterpriseJobs,
        solarJobs,
        concreteJobs
      ] = await Promise.all([
        careersService.getCareers("group"),
        careersService.getCareers("enterprise"),
        careersService.getCareers("solar"),
        careersService.getCareers("concrete")
      ]);

      const allJobs = [
        ...groupJobs,
        ...enterpriseJobs,
        ...solarJobs,
        ...concreteJobs
      ];

      allJobs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });

      return allJobs;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useCareer = (slug: string, division: string = 'group') => {
  return useQuery({
    queryKey: ['careers', slug, division],
    queryFn: () => careersService.getCareerBySlug(slug, division),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useApplyCareer = () => {
  return useMutation({
    mutationFn: ({ slug, payload, division }: { slug: string, payload: ICareerApplicationPayload, division: string }) => 
      careersService.applyForCareer(slug, payload, division),
  });
};
