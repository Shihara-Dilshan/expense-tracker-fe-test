'use client';
import React, { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import ExpenseStats from '../components/ExpenseStats';
import ExpensePieChart from '../components/ExpensePieChart';
import { api } from '../services/http-service/http';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function DashboardPage() {
  const [maxLimit, ] = useState(10000);
  const [totalThisMonth, setTotalThisMonth] = useState(0);
  const [pieData, setPieData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    // Fetch monthly stats
    const now = new Date();
    api.get<{ data: { total: number; breakdown: Record<string, number> } }>(
      `/expense/stats/monthly?month=${now.getMonth() + 1}&year=${now.getFullYear()}`
    ).then(res => {
      setTotalThisMonth(res.data.data.total || 0);
      setPieData(
        Object.entries(res.data.data.breakdown || {}).map(([label, value]) => ({ label, value: Number(value) }))
      );
    });
    // Optionally fetch maxLimit from settings API if available
  }, []);

  const percent = (totalThisMonth / maxLimit) * 100;

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Dashboard
      </Typography>
      {percent >= 90 && <Alert message={`Warning: You have used ${percent.toFixed(0)}% of your monthly limit!`} />}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center', mb: 3 }}>
        <ExpenseStats total={totalThisMonth} max={maxLimit} />
      </Box>
      <Paper sx={{ p: 2, my: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Expense Breakdown
        </Typography>
        <ExpensePieChart data={pieData} />
      </Paper>
    </Box>
  );
}
