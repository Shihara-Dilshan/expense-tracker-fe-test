import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Expense } from '../../types';

interface ExpenseListProps {
  readonly expenses: Expense[];
  readonly onDelete?: (id: number) => void;
  readonly onEdit?: (expense: Expense) => void;
  readonly loading?: boolean;
}

const ExpenseList: React.FC<ExpenseListProps> = React.memo(({ expenses, onDelete, onEdit, loading }) => (
  <div className="bg-white shadow rounded p-4 mb-4 overflow-x-auto text-gray-800">
    {loading ? (
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
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td><Skeleton width={120} /></td>
              <td><Skeleton width={80} /></td>
              <td><Skeleton width={80} /></td>
              <td><Skeleton width={60} /></td>
              <td><Skeleton width={60} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
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
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.description}</td>
              <td>{exp.date}</td>
              <td>{exp.type}</td>
              <td>
                {exp.amount.toLocaleString()} <span className="text-gray-700">LKR</span>
              </td>
              <td className="flex gap-2">
                {onEdit && (
                  <button className="text-blue-600 hover:underline" onClick={() => onEdit(exp)}>
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button className="text-red-600 hover:underline" onClick={() => onDelete(exp._id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
));

ExpenseList.displayName = 'ExpenseList';
export default ExpenseList;
