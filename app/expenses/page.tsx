'use client';

import React, { useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import { ExpenseInput } from '../../types';
import { useAddExpense, useDeleteExpense, useExpenses } from '../api/hooks';

const ExpensesPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const { data: expenses = [], isLoading } = useExpenses();
  const addExpenseMutation = useAddExpense();
  const deleteExpenseMutation = useDeleteExpense();

  const filtered = useMemo(
    () => expenses.filter((e) => e.description.toLowerCase().includes(filter.toLowerCase())),
    [expenses, filter]
  );

  const handleDelete = async (id: number | string) => {
    await deleteExpenseMutation.mutateAsync(id);
  };

  const handleAdd = async (exp: ExpenseInput) => {
    await addExpenseMutation.mutateAsync(exp);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Expenses</h1>
      <FilterBar filter={filter} setFilter={setFilter} />
      <ExpenseList expenses={filtered} onDelete={handleDelete} loading={isLoading}/>
      <ExpenseForm onAdd={handleAdd} />
    </div>
  );
};

export default ExpensesPage;
