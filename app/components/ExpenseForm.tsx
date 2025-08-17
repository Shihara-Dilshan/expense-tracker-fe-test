import React, { useState, useCallback } from 'react';
import { ExpenseInput } from '../../types';
import { TextField, Button, MenuItem, Box, Alert } from '@mui/material';

const initialState: ExpenseInput = {
  description: '',
  date: '',
  type: '',
  amount: 0,
};

interface ExpenseFormProps {
  readonly onAdd: (exp: ExpenseInput) => void;
  readonly loading?: boolean;
}

const ExpenseForm: React.FC<ExpenseFormProps> = React.memo(({ onAdd, loading }) => {
  const [form, setForm] = useState<ExpenseInput>(initialState);
  const [errors, setErrors] = useState<{ [K in keyof ExpenseInput]?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (f: ExpenseInput) => {
    const errs: { [K in keyof ExpenseInput]?: string } = {};
    if (!f.description.trim()) errs.description = 'Description is required.';
    if (!f.date) errs.date = 'Date is required.';
    if (!f.type) errs.type = 'Type is required.';
    if (!f.amount || f.amount <= 0) errs.amount = 'Amount must be greater than 0.';
    return errs;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'amount' ? Number(value) : value }));
    setErrors(errs => ({ ...errs, [name]: undefined }));
  }, []);

  const handleSelectChange = useCallback((e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
    const { name, value } = e.target;
    if (!name) return;
    setForm(f => ({ ...f, [name]: value as string }));
    setErrors(errs => ({ ...errs, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      onAdd(form);
      setForm(initialState);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setSubmitError('Failed to add expense. Please try again.');
    }
  }, [form, onAdd]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ boxShadow: 1, borderRadius: 2, p: 2, mt: 2, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'background.paper' }}>
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.description}
        helperText={errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
      />
      <TextField
        name="date"
        label="Date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.date}
        helperText={errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
      />
      <TextField
        name="type"
        label="Type"
        select
        value={form.type}
        onChange={handleSelectChange}
        required
        fullWidth
        SelectProps={{ native: false }}
        error={!!errors.type}
        helperText={errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
      >
        <MenuItem value="">Select Type</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Travel">Travel</MenuItem>
        <MenuItem value="Groceries">Groceries</MenuItem>
        <MenuItem value="Bills">Bills</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      <TextField
        name="amount"
        label="Amount (LKR)"
        type="number"
        value={form.amount || ''}
        onChange={handleChange}
        required
        fullWidth
        inputProps={{ min: 1 }}
        error={!!errors.amount}
        helperText={errors.amount && <span style={{ color: 'red' }}>{errors.amount}</span>}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'flex-end', minWidth: 120 }} disabled={loading}>
        {loading ? 'Adding...' : 'Add Expense'}
      </Button>
    </Box>
  );
});

ExpenseForm.displayName = 'ExpenseForm';
export default ExpenseForm;
