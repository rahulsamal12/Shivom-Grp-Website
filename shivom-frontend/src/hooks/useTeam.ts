import { useQuery } from '@tanstack/react-query';
import { teamService } from '../services/team.service';

export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: teamService.getTeam,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
