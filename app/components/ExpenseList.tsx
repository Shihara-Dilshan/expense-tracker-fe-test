import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';

import { Expense } from '../../types';

interface ExpenseListProps {
  readonly expenses: Expense[];
  readonly onDelete?: (id: number) => Promise<void> | void;
  readonly onEdit?: (expense: Expense) => void;
  readonly loading?: boolean;
}

const ExpenseList: React.FC<ExpenseListProps> = React.memo(({ expenses, onDelete, onEdit, loading }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (onDelete && selectedId !== null) {
      setDeleting(true);
      await onDelete(selectedId);
      setDeleting(false);
    }
    setConfirmOpen(false);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setSelectedId(null);
  };

  return (
    <>
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
                      <Button color="error" size="small" onClick={() => handleDeleteClick(exp._id)}>
                          Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={confirmOpen} onClose={deleting ? undefined : handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this expense?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={deleting}>No</Button>
          <Button onClick={handleConfirmDelete} color="error" disabled={deleting} startIcon={deleting ? <CircularProgress size={18} /> : null}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

ExpenseList.displayName = 'ExpenseList';
export default ExpenseList;
