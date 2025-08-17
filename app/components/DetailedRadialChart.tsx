import React from 'react';

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
    <div className="flex flex-col items-center justify-center text-gray-800" style={{ width: 140, height: 140 }}>
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
      <div className="text-xs text-gray-700 mt-1 text-center">
        <div>Total: {total.toLocaleString()} LKR</div>
        <div>Limit: {max.toLocaleString()} LKR</div>
      </div>
    </div>
  );
});

DetailedRadialChart.displayName = 'DetailedRadialChart';
export default DetailedRadialChart;
