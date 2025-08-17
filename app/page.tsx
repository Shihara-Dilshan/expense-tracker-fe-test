// Move the dashboard page content here directly
'use client';
import React from 'react';
import Alert from './components/Alert';
import ExpenseStats from './components/ExpenseStats';
import ExpensePieChart from './components/ExpensePieChart';
import { useMonthlyStats, useUserBudget } from './api/hooks';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
  const now = new Date();
  const { data: statsData, isLoading: isStatsLoading, isError: isStatsError } = useMonthlyStats(now.getMonth() + 1, now.getFullYear());
  const { data: budgetData, isLoading: isBudgetLoading, isError: isBudgetError } = useUserBudget();

  const maxLimit = budgetData?.monthlyBudget;
  const totalThisMonth = statsData?.total || 0;
  const pieData = statsData
    ? Object.entries(statsData.breakdown || {}).map(([label, value]) => ({ label, value }))
    : [];
  const percent = maxLimit ? (totalThisMonth / maxLimit) * 100 : 0;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {maxLimit && percent >= 90 && !isStatsLoading && !isBudgetLoading && (
        <Alert message={`Warning: You have used ${percent.toFixed(0)}% of your monthly limit!`} />
      )}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        {isStatsLoading || isBudgetLoading ? (
          <Skeleton height={140} width={240} style={{ borderRadius: 8 }} />
        ) : (
          <ExpenseStats total={totalThisMonth} max={maxLimit || 0} />
        )}
      </div>
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
        {isStatsLoading ? (
          <Skeleton height={320} width={320} style={{ borderRadius: 16 }} />
        ) : (
          <ExpensePieChart data={pieData} />
        )}
      </div>
      {isStatsError && <Alert message="Failed to load monthly stats. Please try again later." severity="error" />}
      {isBudgetError && <Alert message="Failed to load budget." severity="error" />}
    </div>
  );
}
