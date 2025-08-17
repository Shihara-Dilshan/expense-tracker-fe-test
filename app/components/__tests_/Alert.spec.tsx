import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './../Alert';
import '@testing-library/jest-dom';

describe('Alert component', () => {
  test('renders with custom severity', () => {
    render(<Alert message="Error message" severity="error" />);
    const alert = screen.getByText('Error message');
    expect(alert).toBeInTheDocument();
    expect(alert.closest('div')).toHaveClass('MuiAlert-message css-zioonp-MuiAlert-message');
  });

  test('renders the message correctly', () => {
    render(<Alert message="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('forwards ref correctly', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert message="Ref test" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Ref test');
  });

  test('passes additional props to MuiAlert', () => {
    render(<Alert message="Props test" data-testid="custom-alert" />);
    const alert = screen.getByTestId('custom-alert');
    expect(alert).toBeInTheDocument();
  });
});
