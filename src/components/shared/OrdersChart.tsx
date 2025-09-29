import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  orders: {
    id: number;
    name: string;
    totalUSD: number;
  }[];
}

export const OrdersChart: React.FC<Props> = ({ orders }) => {
  const data: ChartData<'bar', number[], string> = {
    labels: orders.map((order) => order.name),
    datasets: [
      {
        label: 'Сумма прихода (USD)',
        data: orders.map((order) => order.totalUSD),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Сумма приходов по заказам',
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};


