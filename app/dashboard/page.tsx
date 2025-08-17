'use client';

import React from 'react';
import { useMonthlyStats } from '../api/hooks';
import Alert from '../components/Alert';
import ExpenseStats from '../components/ExpenseStats';
import ExpensePieChart from '../components/ExpensePieChart';

import { Box, Typography, Paper } from '@mui/material';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function DashboardPage() {
  const maxLimit = 10000;
  const now = new Date();
  const { data, isLoading, isError } = useMonthlyStats(now.getMonth() + 1, now.getFullYear());

  const totalThisMonth = data?.total || 0;
  const pieData = data
    ? Object.entries(data.breakdown || {}).map(([label, value]) => ({ label, value: Number(value) }))
    : [];
  const percent = (totalThisMonth / maxLimit) * 100;

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Dashboard
      </Typography>
      {percent >= 90 && !isLoading && (
        <Alert message={`Warning: You have used ${percent.toFixed(0)}% of your monthly limit!`} />
      )}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center', mb: 3 }}>
        {isLoading ? (
          <Skeleton height={140} width={240} style={{ borderRadius: 8 }} />
        ) : (
          <ExpenseStats total={totalThisMonth} max={maxLimit} />
        )}
      </Box>
      <Paper sx={{ p: 2, my: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Expense Breakdown
        </Typography>
        {isLoading ? (
          <Skeleton height={320} width={320} style={{ borderRadius: 16 }} />
        ) : (
          <ExpensePieChart data={pieData} />
        )}
      </Paper>
      {isError && <Alert message="Failed to load monthly stats. Please try again later." severity="error" />}
    </Box>
  );
}
