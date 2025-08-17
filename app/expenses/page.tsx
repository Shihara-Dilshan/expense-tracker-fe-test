'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Expense, ExpenseInput } from '../../types';
import FilterBar from '../../components/FilterBar';
import ExpenseList from '../../components/ExpenseList';
import ExpenseForm from '../../components/ExpenseForm';

const initialExpenses: readonly Expense[] = [
  { id: 1, description: 'Groceries', date: '2025-08-10', type: 'Food', amount: 2500 },
  { id: 2, description: 'Bus Ticket', date: '2025-08-12', type: 'Travel', amount: 200 },
];

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<readonly Expense[]>(initialExpenses);
  const [filter, setFilter] = useState('');

  const filtered = useMemo(
    () => expenses.filter((e) => e.description.toLowerCase().includes(filter.toLowerCase())),
    [expenses, filter]
  );

  const handleDelete = useCallback(
    (id: number) => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    },
    []
  );

  const handleAdd = useCallback(
    (exp: ExpenseInput) => {
      setExpenses((prev) => [...prev, { ...exp, id: Date.now() }]);
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
