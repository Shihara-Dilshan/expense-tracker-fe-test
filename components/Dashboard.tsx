'use client';

import React from 'react';

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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {percent >= 90 && <Alert message={`Warning: You have used ${percent.toFixed(0)}% of your monthly limit!`} />}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        <DetailedRadialChart value={percent} max={maxLimit} total={totalThisMonth} />
        <ExpenseStats total={totalThisMonth} max={maxLimit} />
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        <CategoryDoughnutChart
          data={[
            { label: 'Foods', value: 10 },
            { label: 'Groceries', value: 20 },
            { label: 'Transport', value: 15 },
            { label: 'Bills', value: 25 },
            { label: 'Other', value: 30 },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
