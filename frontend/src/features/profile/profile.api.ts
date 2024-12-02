import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@lib/react-query';
import { apiClient } from '@lib/api-client';
import { API_ENDPOINTS } from '@lib/api-endpoints';
import { IUserProfile, IUpdateUserProfile } from './profile.types';

const fetchUserProfile = async (): Promise<IUserProfile> =>
  await apiClient.get(API_ENDPOINTS.PROFILE);

const updateUserProfile = async (data: IUpdateUserProfile) => {
  const response = await apiClient.put(API_ENDPOINTS.PROFILE, data);
  return response.data;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
