import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface DetailedRadialChartProps {
  readonly value: number;
  readonly max: number;
  readonly total: number;
}

const RADIUS = 50;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DetailedRadialChart: React.FC<DetailedRadialChartProps> = React.memo(({ value, max, total }) => {
  const percent = React.useMemo(() => Math.min(Math.max(value, 0), 100), [value]);
  const offset = React.useMemo(() => CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE, [percent]);

  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 140, height: 170, p: 1, bgcolor: 'background.paper' }}>
      <svg width={120} height={120}>
        <circle cx={60} cy={60} r={RADIUS} stroke="#e5e7eb" strokeWidth={STROKE} fill="none" />
        <circle
          cx={60}
          cy={60}
          r={RADIUS}
          stroke="#2563eb"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="1.5em" fill="#2563eb">
          {percent.toFixed(0)}%
        </text>
      </svg>
      <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 1 }}>
        <div>Total: {total.toLocaleString()} LKR</div>
        <div>Limit: {max.toLocaleString()} LKR</div>
      </Typography>
    </Paper>
  );
});

DetailedRadialChart.displayName = 'DetailedRadialChart';
export default DetailedRadialChart;
