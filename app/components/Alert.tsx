import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, { message: string; severity?: AlertColor } & AlertProps>(
  ({ message, severity = 'warning', ...props }, ref) => (
    <MuiAlert ref={ref} severity={severity} sx={{ mb: 2 }} {...props}>
      {message}
    </MuiAlert>
  )
);

Alert.displayName = 'Alert';
export default Alert;
