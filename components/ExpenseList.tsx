import React from 'react';
import { Expense } from '../types';

interface ExpenseListProps {
  readonly expenses: Expense[];
  readonly onDelete?: (id: number) => void;
  readonly onEdit?: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = React.memo(({ expenses, onDelete, onEdit }) => (
  <div className="bg-white shadow rounded p-4 mb-4 overflow-x-auto text-gray-800">
    <table className="w-full text-left">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(exp => (
          <tr key={exp.id}>
            <td>{exp.description}</td>
            <td>{exp.date}</td>
            <td>{exp.type}</td>
            <td>{exp.amount.toLocaleString()} <span className="text-gray-700">LKR</span></td>
            <td className="flex gap-2">
              {onEdit && <button className="text-blue-600 hover:underline" onClick={() => onEdit(exp)}>Edit</button>}
              {onDelete && <button className="text-red-600 hover:underline" onClick={() => onDelete(exp.id)}>Delete</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

ExpenseList.displayName = 'ExpenseList';
export default ExpenseList;
