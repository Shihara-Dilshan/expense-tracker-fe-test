import React, { useState, useCallback } from 'react';
import { ExpenseInput } from '../../types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

const initialState: ExpenseInput = {
  description: '',
  date: '',
  type: '',
  amount: 0,
};

interface ExpenseFormProps {
  readonly onAdd: (exp: ExpenseInput) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = React.memo(({ onAdd }) => {
  const [form, setForm] = useState<ExpenseInput>(initialState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'amount' ? Number(value) : value }));
  }, []);

  const handleSelectChange = useCallback((e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
    const { name, value } = e.target;
    if (!name) return;
    setForm(f => ({ ...f, [name]: value as string }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.date || !form.type || !form.amount) return;
    onAdd(form);
    setForm(initialState);
  }, [form, onAdd]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ boxShadow: 1, borderRadius: 2, p: 2, mt: 2, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'background.paper' }}>
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
        required
        fullWidth
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
      />
      <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'flex-end', minWidth: 120 }}>
        Add Expense
      </Button>
    </Box>
  );
});

ExpenseForm.displayName = 'ExpenseForm';
export default ExpenseForm;
