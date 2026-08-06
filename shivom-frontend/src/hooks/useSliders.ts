import { useQuery } from '@tanstack/react-query';
import { slidersService } from '../services/sliders.service';

export const useSliders = (websiteKey: string = 'group') => {
  return useQuery({
    queryKey: ['sliders', websiteKey],
    queryFn: () => slidersService.getSliders(websiteKey),
    staleTime: 1000 * 60 * 60, // 1 hour (rarely changes)
    retry: 2,
  });
};
