'use client';

import React, { useState, useMemo } from 'react';
import { ExpenseInput } from '../../types';
import { useAddExpense, useDeleteExpense, useExpenses } from '../api/hooks';
import FilterBar from '../components/FilterBar';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

import { Box, Typography, Paper } from '@mui/material';

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
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Expenses
      </Typography>
      <FilterBar filter={filter} setFilter={setFilter} />
      <Paper sx={{ p: 2, mb: 3 }}>
        <ExpenseList expenses={filtered} onDelete={handleDelete} loading={isLoading} />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <ExpenseForm onAdd={handleAdd} loading={addExpenseMutation.isPending} />
      </Paper>
    </Box>
  );
};

export default ExpensesPage;
