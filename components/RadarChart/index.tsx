// components/RadarChart.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';

// Dynamically import the Radar component from react-chartjs-2
const Radar = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Radar),
  {
    ssr: false,
  },
);

// Options for the Radar chart
const options: ChartOptions<'radar'> = {
  scales: {
    r: {
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1,
        circular: true,
      },
      angleLines: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1,
        borderDash: [5, 5],
      },
      suggestedMin: 0,
      suggestedMax: 10,
      ticks: {
        backdropColor: 'transparent',
      },
      pointLabels: {
        color: 'white',
        font: {
          size: 13,
        },
      },
    },
  },

  elements: {
    line: {
      borderWidth: 1,
    },
  },
  plugins: {
    legend: {
      labels: {
        color: 'white',
        font: {
          size: 17,
        },
      },
    },
  },
};

const RadarChart = ({ data }: { data: ChartData<'radar'> }) => {
  return (
    <div className="mb-5 w-full">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
