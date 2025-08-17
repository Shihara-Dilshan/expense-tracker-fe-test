import React from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = ({ message }: { message: string }) => (
  <MuiAlert severity="warning" sx={{ mb: 2 }}>
    {message}
  </MuiAlert>
);

export default Alert;
