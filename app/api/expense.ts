import { Expense, ExpenseInput } from '../../types';
import { api } from '../services/http-service/http';
import { API } from './constants';

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await api.get<{ data: Expense[] }>(API.EXPENSE.BASE);
  return response.data.data;
};

export const addExpense = async (payload: ExpenseInput): Promise<Expense> => {
  const response = await api.post<{ data: Expense }, ExpenseInput>(API.EXPENSE.BASE, payload);
  return response.data.data;
};

export const deleteExpense = async (id: string | number): Promise<void> => {
  await api.delete(API.EXPENSE.BY_ID(id));
};

export const getMonthlyStats = async (month: number, year: number) => {
  const response = await api.get<{ data: { total: number; breakdown: Record<string, number> } }>(
    `${API.EXPENSE.MONTHLY_STATS}?month=${month}&year=${year}`
  );
  return response.data.data;
};
