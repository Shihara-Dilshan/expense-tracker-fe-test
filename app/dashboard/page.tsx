'use client';
import React, { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import ExpenseStats from '../components/ExpenseStats';
import ExpensePieChart from '../components/ExpensePieChart';
import { api } from '../services/http-service/http';

export default function DashboardPage() {
  const [maxLimit, setMaxLimit] = useState(10000);
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
        Object.entries(res.data.data.breakdown || {}).map(([label, value]) => ({ label, value }))
      );
    });
    // Optionally fetch maxLimit from settings API if available
  }, []);

  const percent = (totalThisMonth / maxLimit) * 100;

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
