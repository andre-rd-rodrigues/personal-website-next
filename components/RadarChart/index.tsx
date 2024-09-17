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
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 10,
      ticks: {
        backdropColor: 'transparent',
      },
      pointLabels: {
        color: 'white',
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
      },
    },
  },
};

const RadarChart = ({ data }: { data: ChartData<'radar'> }) => {
  return (
    <div style={{ height: '700px' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
