import React from 'react';

interface ExpenseStatsProps {
  readonly total: number;
  readonly max: number;
}

const ExpenseStats: React.FC<ExpenseStatsProps> = React.memo(({ total, max }) => {
  const percent = (total / max) * 100;
  return (
    <div className="bg-white shadow rounded p-4 mb-4 text-gray-800">
      <div className="flex justify-between mb-2">
        <span>Total This Month</span>
        <span className="font-bold">{total.toLocaleString()} LKR</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Monthly Limit</span>
        <span className="font-bold">{max.toLocaleString()} LKR</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${percent > 100 ? 100 : percent}%` }} />
      </div>
      <div className="text-right text-xs mt-1 text-gray-700">{percent.toFixed(1)}% used</div>
    </div>
  );
});

ExpenseStats.displayName = 'ExpenseStats';
export default ExpenseStats;
