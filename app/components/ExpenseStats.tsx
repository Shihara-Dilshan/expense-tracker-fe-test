import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

interface ExpenseStatsProps {
  readonly total: number;
  readonly max: number;
}

const ExpenseStats: React.FC<ExpenseStatsProps> = React.memo(({ total, max }) => {
  const percent = (total / max) * 100;
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, minWidth: 220 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Total This Month
      </Typography>
      <Typography variant="h6" color="primary" gutterBottom>
        {total.toLocaleString()} LKR
      </Typography>
      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
        Monthly Limit
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {max.toLocaleString()} LKR
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percent > 100 ? 100 : percent}
        sx={{ height: 8, borderRadius: 4, my: 1 }}
        color={percent >= 90 ? 'error' : 'primary'}
      />
      <Typography variant="caption" color="text.secondary" align="right" display="block">
        {percent.toFixed(1)}% used
      </Typography>
    </Paper>
  );
});

ExpenseStats.displayName = 'ExpenseStats';
export default ExpenseStats;
