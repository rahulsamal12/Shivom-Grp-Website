import { useQuery } from '@tanstack/react-query';
import { homeService } from '../services/home.service';

export const useHome = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: homeService.getHomeData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
