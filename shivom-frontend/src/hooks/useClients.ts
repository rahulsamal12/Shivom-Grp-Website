import { useQuery } from '@tanstack/react-query';
import { clientsService } from '../services/clients.service';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: clientsService.getClients,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
