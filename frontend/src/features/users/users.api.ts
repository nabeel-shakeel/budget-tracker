import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import { queryClient } from '@lib/react-query';
import { apiClient } from '@lib/api-client';
import { API_ENDPOINTS } from '@lib/api-endpoints';
import { PAGE_LIMIT } from '@utils/constants';
import { IFetchUsersResponse, IUserFilters, IUpdateUser } from './users.types';

const updateUser = async (data: IUpdateUser & { id: string }) => {
  const { id, ...payload } = data;
  const response = await apiClient.put(
    API_ENDPOINTS.ADMIN_USER_BY_ID.replace('{id}', id),
    payload
  );
  return response;
};

const deleteUser = async (id: string) => {
  const response = await apiClient.delete(
    API_ENDPOINTS.ADMIN_USER_BY_ID.replace('{id}', id)
  );
  return response;
};

const fetchUsers = async (
  filters: IUserFilters
): Promise<IFetchUsersResponse> => {
  const { page, name } = filters;
  const queryParams: Record<string, string> = {
    page: page.toString(),
    limit: PAGE_LIMIT,
  };

  if (name) {
    queryParams.name = name;
  }

  const queryString = new URLSearchParams(queryParams).toString();

  return await apiClient.get(
    `${API_ENDPOINTS.ADMIN_USER}${queryString ? `?${queryString}` : ''}`
  );
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};

export const useFetchUsers = (filters: IUserFilters) =>
  useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  });
