import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */

// Initialize the Bundle Analyzer plugin
const withBundleAnalyzerPlugin = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Initialize the Next Intl plugin
const withNextIntl = createNextIntlPlugin();

// Your existing Next.js configuration
const nextConfig = {
  reactStrictMode: false,
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
export default withNextIntl(withBundleAnalyzerPlugin(nextConfig));
