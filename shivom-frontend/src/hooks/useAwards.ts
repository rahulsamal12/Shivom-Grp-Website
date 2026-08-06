import { useQuery } from '@tanstack/react-query';
import { awardsService } from '../services/awards.service';

export const useAwards = () => {
  return useQuery({
    queryKey: ['awards'],
    queryFn: awardsService.getAwards,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });
};


export const useCertifications = () => {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: awardsService.getCertifications,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};
