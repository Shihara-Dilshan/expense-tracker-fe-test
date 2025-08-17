import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, addExpense, deleteExpense } from './expense';

export const useExpenses = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      const res = await deleteExpense(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};
