'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import DetailedRadialChart from './DetailedRadialChart';
import Alert from './Alert';
import ExpenseStats from './ExpenseStats';
import CategoryDoughnutChart from './CategoryDoughnutChart';
import { useMonthlyStats, useUserBudget } from '../api/hooks';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const now = new Date();
  const { data: statsData, isLoading: isStatsLoading, isError: isStatsError } = useMonthlyStats(now.getMonth() + 1, now.getFullYear());
  const { data: budgetData, isLoading: isBudgetLoading, isError: isBudgetError } = useUserBudget();

  const maxLimit = budgetData?.monthlyBudget;
  const totalThisMonth = statsData?.total || 0;
  const percent = maxLimit ? (totalThisMonth / maxLimit) * 100 : 0;
  const pieData = statsData
    ? Object.entries(statsData.breakdown || {}).map(([label, value]) => ({ label, value: Number(value) }))
    : [];

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Dashboard
      </Typography>
      {maxLimit && percent >= 90 && !isStatsLoading && !isBudgetLoading && (
        <Alert message={`Warning: You have used ${percent.toFixed(0)}% of your monthly limit!`} />
      )}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center', mb: 3 }}>
        {isStatsLoading || isBudgetLoading ? (
          <Skeleton height={140} width={240} style={{ borderRadius: 8 }} />
        ) : (
          <>
            <DetailedRadialChart value={percent} max={maxLimit || 0} total={totalThisMonth} />
            <ExpenseStats total={totalThisMonth} max={maxLimit || 0} />
          </>
        )}
      </Box>
      <Paper sx={{ p: 2, my: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Expense Breakdown
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
          {isStatsLoading ? (
            <Skeleton height={320} width={320} style={{ borderRadius: 16 }} />
          ) : (
            <CategoryDoughnutChart data={pieData} />
          )}
        </Box>
      </Paper>
      {isStatsError && <Alert message="Failed to load monthly stats. Please try again later." severity="error" />}
      {isBudgetError && <Alert message="Failed to load budget." severity="error" />}
    </Box>
  );
};

export default Dashboard;
