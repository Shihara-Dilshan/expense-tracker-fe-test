'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

export default function SettingsPage() {
  const [max, setMax] = useState(10000);
  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Settings
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box component="form" className="space-y-4">
          <TextField
            label="Max Monthly Expense (LKR)"
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 0 }}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
