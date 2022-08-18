import React from 'react';
import theme from '../../../common/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  spanGaps: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: false,
        font: {
          size: 15,
          family: 'Noto Sans KR',
          weight: 400,
        },
      },
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    tooltip: {
      backgroundColor: theme.colors.gray2,
      padding: 10,
      usePointStyle: true,
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        align: 'end',
        font: {
          size: 12,
          family: 'Noto Sans KR',
          weight: 700,
        },
        text: '단위: 원 / kg',
      },
    }
  }
};

export default function Chart({priceData, product}) {

  const xLable = priceData.map((data) => data.day);
  const prices = priceData.map((data) => parseInt(data.price.replace(/,/g, "")));

  const data = {
    labels: xLable,
    datasets: [
      {
        animations: {
          y: {
            duration: 1500,
            delay: 100
          }
        },
        type: 'line',
        label: product,
        borderColor: theme.colors.green3,
        backgroundColor: theme.colors.green3,
        borderWidth: 3,
        data: prices,
        pointRadius: 5,
        pointHoverRadius: 10,
        tension: 0.2,
      },
    ],
  };

  return <Line style={{width: '100%', height: '100%'}} options={options} data={data} />;
}
