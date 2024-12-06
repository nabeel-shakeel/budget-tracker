import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import { queryClient } from '@lib/react-query';
import { apiClient } from '@lib/api-client';
import { API_ENDPOINTS } from '@lib/api-endpoints';
import { PAGE_LIMIT } from '@utils/constants';
import {
  IFetchExpensesResponse,
  IExpenseFilters,
  IExpense,
  IExpenseUpdate,
  IExpenseTrend,
} from './expenses.types';

const addExpense = async (data: IExpense) => {
  const response = await apiClient.post(API_ENDPOINTS.EXPENSES, data);
  return response;
};

const updateExpense = async (data: IExpenseUpdate) => {
  const response = await apiClient.put(API_ENDPOINTS.EXPENSES, data);
  return response;
};

const deleteExpense = async (id: string) => {
  const response = await apiClient.delete(
    API_ENDPOINTS.EXPENSE_BY_ID.replace('{id}', id)
  );
  return response;
};

const fetchExpensesTrend = async (range: string): Promise<IExpenseTrend> => {
  let url: string = API_ENDPOINTS.EXPENSES_TREND;
  let queryString = '';
  if (range) {
    queryString = `?range=${range}`;
  }

  if (queryString) {
    url = `${url}${queryString}`;
  }

  return await apiClient.get(url);
};

const fetchExpenses = async (
  filters: IExpenseFilters
): Promise<IFetchExpensesResponse> => {
  const { page, date, sort, keyword } = filters;
  const queryParams: Record<string, string> = {
    page: page.toString(),
    limit: PAGE_LIMIT,
  };

  if (date) {
    queryParams.date = date;
  }
  if (sort) {
    queryParams.sort = sort;
  }
  if (keyword) {
    queryParams.keyword = keyword;
  }

  const queryString = new URLSearchParams(queryParams).toString();

  return await apiClient.get(
    `${API_ENDPOINTS.EXPENSES}${queryString ? `?${queryString}` : ''}`
  );
};

export const useAddExpense = () => {
  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
};

export const useUpdateExpense = () => {
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
};

export const useDeleteExpense = () => {
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
};

export const useFetchExpensesTrend = (range: string) =>
  useQuery({
    queryKey: ['expenses-trend', range],
    queryFn: () => fetchExpensesTrend(range),
    placeholderData: keepPreviousData,
  });

export const useFetchExpenses = (filters: IExpenseFilters) =>
  useQuery({
    queryKey: ['expenses', filters],
    queryFn: () => fetchExpenses(filters),
    placeholderData: keepPreviousData,
  });
