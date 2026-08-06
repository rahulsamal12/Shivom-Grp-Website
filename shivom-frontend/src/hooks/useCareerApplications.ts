import { useMutation } from '@tanstack/react-query';
import { careerApplicationsService } from '../services/careerApplications.service';

export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: (formData: FormData) => careerApplicationsService.submitApplication(formData),
  });
};
