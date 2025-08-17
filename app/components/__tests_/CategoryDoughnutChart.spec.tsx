import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoryDoughnutChart, { CategoryDoughnutChartData } from './../CategoryDoughnutChart';
import '@testing-library/jest-dom';
import { Doughnut } from 'react-chartjs-2';

// Mock Doughnut since chart.js doesn't render in test env
jest.mock('react-chartjs-2', () => ({
  Doughnut: jest.fn(() => <div data-testid="doughnut-chart" />),
}));

describe('CategoryDoughnutChart', () => {
  const sampleData: CategoryDoughnutChartData[] = [
    { label: 'Food', value: 30 },
    { label: 'Transport', value: 20, color: 'red' },
    { label: 'Entertainment', value: 50 },
  ];

  test('renders without crashing', () => {
    render(<CategoryDoughnutChart data={sampleData} />);
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
  });

  test('passes correct data to Doughnut chart', () => {
    render(<CategoryDoughnutChart data={sampleData} />);
    // Doughnut is mocked, so we can check props passed
    const doughnutProps = (Doughnut as jest.Mock).mock.calls[0][0];
    expect(doughnutProps.data.labels).toEqual(['Food', 'Transport', 'Entertainment']);
    expect(doughnutProps.data.datasets[0].data).toEqual([30, 20, 50]);
    expect(doughnutProps.data.datasets[0].backgroundColor).toEqual([
      'rgba(37, 99, 235, 0.8)', // default color
      'red',                     // custom color
      'rgba(251, 191, 36, 0.8)', // default color
    ]);
  });

  test('renders Typography with correct text', () => {
    render(<CategoryDoughnutChart data={sampleData} />);
    const typography = screen.getByText('Category Breakdown');
    expect(typography).toBeInTheDocument();
    expect(typography.tagName).toBe('SPAN'); // MUI Typography renders as <span> by default for caption
  });
});
