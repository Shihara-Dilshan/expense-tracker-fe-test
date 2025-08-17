'use client';

import React, { useState, useMemo } from 'react';
import { ExpenseInput } from '../../types';
import { useAddExpense, useDeleteExpense, useExpenses } from '../api/hooks';
import FilterBar from '../components/FilterBar';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import Alert from '../components/Alert';

import { Box, Typography, Paper, Snackbar } from '@mui/material';

const ExpensesPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const { data: expenses = [], isLoading } = useExpenses();
  const addExpenseMutation = useAddExpense();
  const deleteExpenseMutation = useDeleteExpense();
  const [alert, setAlert] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [snackbarKey, setSnackbarKey] = useState(0);

  const filtered = useMemo(
    () => expenses.filter((e) => e.description.toLowerCase().includes(filter.toLowerCase())),
    [expenses, filter]
  );

  const handleDelete = async (id: number | string) => {
    try {
      await deleteExpenseMutation.mutateAsync(id);
      setAlert({ open: true, message: 'Expense deleted successfully!', severity: 'success' });
      setSnackbarKey(prev => prev + 1);
    } catch {
      setAlert({ open: true, message: 'Failed to delete expense.', severity: 'error' });
      setSnackbarKey(prev => prev + 1);
    }
  };

  const handleAdd = async (exp: ExpenseInput) => {
    try {
      await addExpenseMutation.mutateAsync(exp);
      setAlert({ open: true, message: 'Expense added successfully!', severity: 'success' });
      setSnackbarKey(prev => prev + 1);
    } catch {
      setAlert({ open: true, message: 'Failed to add expense.', severity: 'error' });
      setSnackbarKey(prev => prev + 1);
    }
  };

  const handleCloseAlert = () => setAlert(a => ({ ...a, open: false }));

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
      <Snackbar
        key={snackbarKey}
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert message={alert.message} severity={alert.severity} />
      </Snackbar>
    </Box>
  );
};

export default ExpensesPage;
