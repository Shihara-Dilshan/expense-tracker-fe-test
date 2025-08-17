'use client';
import React from 'react';
import Alert from '../../components/Alert';
import ExpenseStats from '../../components/ExpenseStats';
import ExpensePieChart from '../../components/ExpensePieChart';

export default function DashboardPage() {
  const maxLimit = 10000;
  const totalThisMonth = 9200;
  const percent = (totalThisMonth / maxLimit) * 100;
  const pieData = [
    { label: 'Food', value: 10 },
    { label: 'Travel', value: 20 },
    { label: 'Groceries', value: 30 },
    { label: 'Bills', value: 15 },
    { label: 'Other', value: 25 },
  ];
  return (
    <>
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {percent >= 90 && <Alert message={`Warning: You have used ${percent.toFixed(0)}% of your monthly limit!`} />}
        <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
          <ExpenseStats total={totalThisMonth} max={maxLimit} />
        </div>
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <ExpensePieChart data={pieData} />
        </div>
      </div>
    </>
  );
}
