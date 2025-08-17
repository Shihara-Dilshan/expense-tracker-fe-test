import React, { useState, useCallback } from 'react';
import { ExpenseInput } from '../../types';

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'amount' ? Number(value) : value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.date || !form.type || !form.amount) return;
    onAdd(form);
    setForm(initialState);
  }, [form, onAdd]);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mt-4 flex flex-col gap-3 text-gray-800">
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border rounded px-2 py-1"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border rounded px-2 py-1"
        required
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border rounded px-2 py-1"
        required
      >
        <option value="">Select Type</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Groceries">Groceries</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
      <input
        name="amount"
        type="number"
        value={form.amount || ''}
        onChange={handleChange}
        placeholder="Amount (LKR)"
        className="border rounded px-2 py-1"
        min={1}
        required
      />
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 self-end hover:bg-blue-700">
        Add Expense
      </button>
    </form>
  );
});

ExpenseForm.displayName = 'ExpenseForm';
export default ExpenseForm;
