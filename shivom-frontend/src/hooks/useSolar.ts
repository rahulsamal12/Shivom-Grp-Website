import { useQuery } from '@tanstack/react-query';
import { solarService } from '../services/solar.service';

export const useSolarProducts = () => {
  return useQuery({
    queryKey: ['solarProducts'],
    queryFn: solarService.getProducts,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};

export const useSolarPromotions = () => {
  return useQuery({
    queryKey: ['solarPromotions'],
    queryFn: solarService.getPromotions,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};
