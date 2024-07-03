"use client";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const Analytics = () => {
  useEffect(() => {
    // If env is production, initialize Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    }
  }, []);

  return null;
};

export default Analytics;
