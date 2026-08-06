import { apiClient } from '../lib/api/axios';

type ApiSuccessResponse = {
  success?: boolean;
};

export const careerApplicationsService = {
  submitApplication: async (formData: FormData): Promise<boolean> => {
    const division = (formData.get('division') as string) || 'group';
    const slug = (formData.get('slug') as string) || 'general';
    const response = await apiClient.post<ApiSuccessResponse>(
      `/api/public/${division}/careers/${slug}/apply`,
      formData
    );
    return response.data?.success || false;
  },
};
