import { useMutation } from '@tanstack/react-query';
import { contactService } from '../services/contact.service';
import { IContactPayload } from '@/types';

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (payload: IContactPayload) => contactService.submitContact(payload),
  });
};
