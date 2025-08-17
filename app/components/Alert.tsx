import MuiAlert, { AlertColor } from '@mui/material/Alert';
import React from 'react';

const Alert = ({ message, severity = 'warning' }: { message: string; severity?: AlertColor }) => (
  <MuiAlert severity={severity} sx={{ mb: 2 }}>
    {message}
  </MuiAlert>
);

export default Alert;
