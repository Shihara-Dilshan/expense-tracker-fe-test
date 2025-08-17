'use client';

import { Box, Pagination, Paper, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ExpenseInput } from '../../types';
import { useAddExpense, useDeleteExpense, useExpenses } from '../api/hooks';
import Alert from '../components/Alert';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import FilterBar from '../components/FilterBar';

const ExpensesPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useExpenses({ page, limit, description: filter });
  const expenses = data?.results || [];
  const totalPages = data?.totalPages || 1;

  const addExpenseMutation = useAddExpense();
  const deleteExpenseMutation = useDeleteExpense();

  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const [snackbarKey, setSnackbarKey] = useState(0);

  const handleDelete = async (id: number | string) => {
    try {
      await deleteExpenseMutation.mutateAsync(id);
      setAlert({ open: true, message: 'Expense deleted successfully!', severity: 'success' });
      setSnackbarKey((prev) => prev + 1);
    } catch {
      setAlert({ open: true, message: 'Failed to delete expense.', severity: 'error' });
      setSnackbarKey((prev) => prev + 1);
    }
  };

  const handleAdd = async (exp: ExpenseInput) => {
    try {
      await addExpenseMutation.mutateAsync(exp);
      setAlert({ open: true, message: 'Expense added successfully!', severity: 'success' });
      setSnackbarKey((prev) => prev + 1);
    } catch {
      setAlert({ open: true, message: 'Failed to add expense.', severity: 'error' });
      setSnackbarKey((prev) => prev + 1);
    }
  };

  const handleCloseAlert = () => setAlert((a) => ({ ...a, open: false }));

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Expenses
      </Typography>
      <FilterBar filter={filter} setFilter={setFilter} />
      <Paper sx={{ p: 2, mb: 3 }}>
        <ExpenseList expenses={expenses} onDelete={handleDelete} loading={isLoading} />
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            disabled={isLoading}
          />
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <ExpenseForm onAdd={handleAdd} loading={addExpenseMutation.isPending} />
      </Paper>
      <Snackbar
        key={snackbarKey}
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert message={alert.message} severity={alert.severity} />
      </Snackbar>
    </Box>
  );
};

export default ExpensesPage;
