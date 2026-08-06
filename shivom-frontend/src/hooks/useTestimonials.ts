import { useQuery } from '@tanstack/react-query';
import { testimonialsService } from '../services/testimonials.service';

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialsService.getTestimonials,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
