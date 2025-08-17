import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Paper from '@mui/material/Paper';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensePieChartProps {
  data: { label: string; value: number; color?: string }[];
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

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d, i) => d.color || defaultColors[i % defaultColors.length]),
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: true, position: 'right' as const },
      tooltip: { enabled: true },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  } as const;

  return (
    <Paper elevation={2} sx={{ width: 320, height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', p: 2 }}>
      <Doughnut data={chartData} options={options} />
    </Paper>
  );
};

export default ExpensePieChart;
