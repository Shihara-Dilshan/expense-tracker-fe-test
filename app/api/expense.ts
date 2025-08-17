import { Expense, ExpenseInput } from '../../types';
import { api } from '../services/http-service/http';
import { API } from './constants';

export interface PaginatedExpenseResults {
  results: Expense[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export const getExpenses = async (params?: { page?: number; limit?: number; description?: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams: Record<string, any> = { ...params };
  if (queryParams.description) {
    queryParams.search = queryParams.description;
    delete queryParams.description;
  }
  const response = await api.get<{ data: PaginatedExpenseResults }>(API.EXPENSE.BASE, { params: queryParams });
  return response.data.data;
};

export const addExpense = async (payload: ExpenseInput): Promise<Expense> => {
  const response = await api.post<{ data: Expense }, ExpenseInput>(API.EXPENSE.BASE, payload);
  return response.data.data;
};

export const deleteExpense = async (id: string | number): Promise<{ deleted: boolean }> => {
  const response = await api.delete<{ deleted: boolean }>(API.EXPENSE.BY_ID(id));
  return response.data;
};

export const getMonthlyStats = async (month: number, year: number) => {
  const response = await api.get<{ data: { total: number; breakdown: Record<string, number> } }>(
    `${API.EXPENSE.MONTHLY_STATS}?month=${month}&year=${year}`,
  );
  return response.data.data;
};

export const getUserBudget = async (): Promise<{ monthlyBudget: number }> => {
  const response = await api.get<{
    _id: string;
    userId: string;
    monthlyBudget: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>(API.USER_BUDGET.BASE);

  if (typeof response.data.monthlyBudget === 'number') {
    return { monthlyBudget: response.data.monthlyBudget };
  }

  return { monthlyBudget: 0 };
};

export const setUserBudget = async (monthlyBudget: number): Promise<{ monthlyBudget: number }> => {
  const response = await api.put<{ data: { monthlyBudget: number } }>(API.USER_BUDGET.BASE, { monthlyBudget });
  return response.data.data;
};
