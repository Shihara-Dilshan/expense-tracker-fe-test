import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, addExpense, deleteExpense, getUserBudget, setUserBudget } from './expense';
import { Expense } from '../../types'; 

export const useExpenses = (params?: { page?: number; limit?: number; description?: string }) => {
  return useQuery({
    queryKey: ['expenses', params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey as [string, typeof params];
      return getExpenses(queryParams);
    },
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

export const useMonthlyStats = (month: number, year: number) => {
  return useQuery({
    queryKey: ['monthlyStats', month, year],
    queryFn: async () => {
      const paginated = await getExpenses();
      const allExpenses = paginated.results;
      // Filter for the given month/year
      const filtered: Expense[] = allExpenses.filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
      });
      // Calculate total
      const total = filtered.reduce((sum: number, e: Expense) => sum + Number(e.amount), 0);
      // Build breakdown by type/category
      const breakdown: Record<string, number> = {};
      filtered.forEach((e: Expense) => {
        breakdown[e.type] = (breakdown[e.type] || 0) + Number(e.amount);
      });
      return { total, expenses: filtered, breakdown };
    },
  });
};

export const useUserBudget = () => {
  return useQuery({
    queryKey: ['userBudget'],
    queryFn: getUserBudget,
  });
};

export const useSetUserBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setUserBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userBudget'] });
    },
  });
};

export const useMonthlyBreakdown = (month: number, year: number) => {
  return useQuery({
    queryKey: ['monthlyBreakdown', month, year],
    queryFn: async () => {
      const res = await fetch(`/api/stats/monthly-breakdown?month=${month}&year=${year}`);
      if (!res.ok) throw new Error('Failed to fetch monthly breakdown');
      return res.json();
    },
  });
};