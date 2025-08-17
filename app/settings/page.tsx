'use client';

import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { useUserBudget, useSetUserBudget } from '../api/hooks';
import Alert from '../components/Alert';

export default function SettingsPage() {
  const { data, isLoading, isError } = useUserBudget();
  const [max, setMax] = React.useState<string>('');
  const [errors, setErrors] = React.useState<string | null>(null);
  const setBudgetMutation = useSetUserBudget();

  useEffect(() => {
    if (data?.monthlyBudget !== undefined) {
      setMax(data.monthlyBudget.toString());
    }
  }, [data]);

  const validate = (value: string) => {
    if (!value.trim()) return 'Monthly limit is required.';
    if (/^-/.test(value)) return 'Monthly limit cannot be negative.';
    const num = Number(value);
    if (isNaN(num) || num <= 0) return 'Monthly limit must be a positive number.';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate(max);
    setErrors(error);
    if (error) return;
    const parsed = Number(max);
    setBudgetMutation.mutate(parsed);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Settings
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box component="form" className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            label="Max Monthly Expense (LKR)"
            type="number"
            value={max}
            onChange={(e) => {
              setMax(e.target.value.replace(/^0+(?=\d)/, ''));
              setErrors(null);
            }}
            fullWidth
            inputProps={{ min: 0 }}
            sx={{ mb: 2 }}
            disabled={isLoading || setBudgetMutation.isPending}
            placeholder={isLoading ? 'Loading...' : ''}
            error={!!errors}
            helperText={errors && <span style={{ color: 'red' }}>{errors}</span>}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={setBudgetMutation.isPending || isLoading || max === ''}
            startIcon={setBudgetMutation.isPending ? <CircularProgress size={18} /> : null}
          >
            {setBudgetMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
          {setBudgetMutation.isSuccess && <Alert message="Budget updated successfully!" severity="success" />}
          {isError && <Alert message="Failed to load budget." severity="error" />}
          {setBudgetMutation.isError && <Alert message="Failed to save budget." severity="error" />}
        </Box>
      </Paper>
    </Box>
  );
}
