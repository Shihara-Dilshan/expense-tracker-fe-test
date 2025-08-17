import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
  <TableContainer component={Paper} sx={{ mb: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton width={120} />
              </TableCell>
              <TableCell>
                <Skeleton width={80} />
              </TableCell>
              <TableCell>
                <Skeleton width={80} />
              </TableCell>
              <TableCell>
                <Skeleton width={60} />
              </TableCell>
              <TableCell>
                <Skeleton width={60} />
              </TableCell>
            </TableRow>
          ))
          : expenses.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell>{exp.description}</TableCell>
              <TableCell>{exp.date}</TableCell>
              <TableCell>{exp.type}</TableCell>
              <TableCell>
                {exp.amount.toLocaleString()} <span style={{ color: '#6b7280' }}>LKR</span>
              </TableCell>
              <TableCell>
                {onEdit && (
                  <Button color="primary" size="small" onClick={() => onEdit(exp)}>
                      Edit
                  </Button>
                )}
                {onDelete && (
                  <Button color="error" size="small" onClick={() => onDelete(exp._id)}>
                      Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
));

ExpenseList.displayName = 'ExpenseList';
export default ExpenseList;
