'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Expense, ExpenseInput } from '../../types';
import FilterBar from '../../components/FilterBar';
import ExpenseList from '../../components/ExpenseList';
import ExpenseForm from '../../components/ExpenseForm';
import { api } from '../../services/http';

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<readonly Expense[]>([]);
  const [filter, setFilter] = useState('');

  // Fetch expenses from API
  useEffect(() => {
    api.get<{ data: Expense[] }>('/expense')
      .then(res => setExpenses(res.data.data))
      .catch(() => setExpenses([]));
  }, []);

  const filtered = useMemo(
    () => expenses.filter((e) => e.description.toLowerCase().includes(filter.toLowerCase())),
    [expenses, filter]
  );

  const handleDelete = useCallback(
    async (id: number | string) => {
      try {
        await api.delete(`/expense/${id}`);
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      } catch {}
    },
    []
  );

  const handleAdd = useCallback(
    async (exp: ExpenseInput) => {
      try {
        const res = await api.post<{ data: Expense }>('/expense', exp);
        setExpenses((prev) => [...prev, res.data.data]);
      } catch {}
    },
    []
  );

  return (
    <div className="p-4 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Expenses</h1>
      <FilterBar filter={filter} setFilter={setFilter} />
      <ExpenseList expenses={filtered} onDelete={handleDelete} />
      <ExpenseForm onAdd={handleAdd} />
    </div>
  );
};

export default ExpensesPage;
