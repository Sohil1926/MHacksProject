import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BudgetChart() {
  const data = {
    labels: ['Allocated', 'Spent'],
    datasets: [
      {
        label: 'Activities',
        data: [20, 15], // Replace with your data
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'WORK/FUN',
        data: [10, 5], // Replace with your data
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Transport Option',
        data: [7, 1], // Replace with your data
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
