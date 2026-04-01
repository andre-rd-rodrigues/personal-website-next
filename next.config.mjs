import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */

// Initialize the Bundle Analyzer plugin
const withBundleAnalyzerPlugin = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Initialize the Next Intl plugin (no path = default i18n/request.ts; explicit path can fail with Turbopack)
const withNextIntl = createNextIntlPlugin();

// Your existing Next.js configuration
const nextConfig = {
  reactStrictMode: false,
  // Next.js 16: allow build with webpack config present (e.g. next-intl, PDF loader)
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

// Compose the plugins
const config = withNextIntl(withBundleAnalyzerPlugin(nextConfig));

export default config;
