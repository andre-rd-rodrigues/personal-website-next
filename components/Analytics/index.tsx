import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const Analytics = () => {
  return (
    <>
      <GoogleAnalytics gaId="G-K901N5P0GC" />
      <GoogleTagManager gtmId="GTM-NNKZ3RV3" />
    </>
  );
};

export default Analytics;
