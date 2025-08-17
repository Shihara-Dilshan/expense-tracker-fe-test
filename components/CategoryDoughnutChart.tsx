import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CategoryDoughnutChartData {
  readonly label: string;
  readonly value: number;
  readonly color?: string;
}

interface CategoryDoughnutChartProps {
  readonly data: CategoryDoughnutChartData[];
}

const defaultColors = [
  'rgba(37, 99, 235, 0.8)',
  'rgba(16, 185, 129, 0.8)',
  'rgba(251, 191, 36, 0.8)',
  'rgba(239, 68, 68, 0.8)',
  'rgba(139, 92, 246, 0.8)',
  'rgba(59, 130, 246, 0.8)',
  'rgba(75, 85, 99, 0.8)',
];

const CategoryDoughnutChart: React.FC<CategoryDoughnutChartProps> = React.memo(({ data }) => {
  const chartData = React.useMemo(() => ({
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map((d, i) => d.color || defaultColors[i % defaultColors.length]),
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  }), [data]);

  const options = React.useMemo(() => ({
    plugins: {
      legend: { display: true, position: 'right' as const },
      tooltip: { enabled: true },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  }), []);

  return (
    <div className="relative flex flex-col items-center justify-center text-gray-800" style={{ width: 220, height: 220 }}>
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs text-gray-700">Category Breakdown</span>
      </div>
    </div>
  );
});

CategoryDoughnutChart.displayName = 'CategoryDoughnutChart';
export default CategoryDoughnutChart;
