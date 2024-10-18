'use client';

import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Hotjar from '@hotjar/browser';

const Analytics = () => {
  useEffect(() => {
    // If env is production, initialize Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    }
    if (process.env.NEXT_PUBLIC_HOTJAR_ID) {
      Hotjar.init(Number(process.env.NEXT_PUBLIC_HOTJAR_ID), 6);
    }
  }, []);

  return null;
};

export default Analytics;
