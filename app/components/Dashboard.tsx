'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import DetailedRadialChart from './DetailedRadialChart';
import Alert from './Alert';
import ExpenseStats from './ExpenseStats';
import CategoryDoughnutChart from './CategoryDoughnutChart';

const Dashboard = () => {
  // Dummy values for now
  const maxLimit = 10000;
  const totalThisMonth = 9200;
  const percent = (totalThisMonth / maxLimit) * 100;
  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Dashboard
      </Typography>
      {percent >= 90 && <Alert message={`Warning: You have used ${percent.toFixed(0)}% of your monthly limit!`} />}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center', mb: 3 }}>
        <DetailedRadialChart value={percent} max={maxLimit} total={totalThisMonth} />
        <ExpenseStats total={totalThisMonth} max={maxLimit} />
      </Box>
      <Paper sx={{ p: 2, my: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Expense Breakdown
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
          <CategoryDoughnutChart
            data={[
              { label: 'Foods', value: 10 },
              { label: 'Groceries', value: 20 },
              { label: 'Transport', value: 15 },
              { label: 'Bills', value: 25 },
              { label: 'Other', value: 30 },
            ]}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
