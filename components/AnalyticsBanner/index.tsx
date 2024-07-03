"use client";
import { useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { Icon } from "@iconify/react/dist/iconify.js";

const AnalyticsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies.analyticsAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setCookie(null, "analyticsAccepted", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed z-10 bottom-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg text-white max-w-md">
      <div className="flex gap-2 items-center">
        <Icon icon="fluent:cookies-16-regular" />
        <h2 className="font-bold text-lg">Cookies</h2>
      </div>
      <p className="text-sm mt-2">
        This website uses Google Analytics to understand human interaction.
        Therefore, by continuing to use this website, you consent to the use of
        cookies to track and analyze your usage.
      </p>
      <div className="text-end">
        <button
          className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          onClick={handleClose}
        >
          I agree
        </button>
      </div>
    </div>
  );
};

export default AnalyticsBanner;
