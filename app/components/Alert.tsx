import React from 'react';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

const Alert = ({ message, severity = 'warning' }: { message: string; severity?: AlertColor }) => (
  <MuiAlert severity={severity} sx={{ mb: 2 }}>
    {message}
  </MuiAlert>
);

export default Alert;
