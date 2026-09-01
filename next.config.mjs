import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */

// Initialize the Bundle Analyzer plugin
const withBundleAnalyzerPlugin = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Initialize the Next Intl plugin (no path = default i18n/request.ts; explicit path can fail with Turbopack)
const withNextIntl = createNextIntlPlugin();

const retiredBlogRedirects = [
  {
    source: 'how-not-having-a-website-is-costing-you-money',
    destination: 'slow-website-costing-you-money',
  },
  {
    source:
      'start-your-journey-to-becoming-a-web-developer-free-online-resources-to-learn-from',
    destination: null,
  },
  {
    source: 'mistakes-that-keep-junior-developers-from-landing-their-first-job',
    destination: null,
  },
  {
    source: 'ai-customer-service-what-to-automate',
    destination: 'how-to-add-ai-chatbot-to-your-website',
  },
  {
    source: 'ai-tool-stack-small-businesses-actually-use',
    destination: 'how-to-add-ai-chatbot-to-your-website',
  },
  {
    source: 'how-to-start-online-store-with-no-technical-experience',
    destination: 'will-online-store-make-money-honest-first-seller-guide',
  },
  {
    source: 'five-myths-about-online-stores-that-stop-you-selling',
    destination: 'will-online-store-make-money-honest-first-seller-guide',
  },
];

// Your existing Next.js configuration
const nextConfig = {
  reactStrictMode: false,
  // Next.js 16: allow build with webpack config present (e.g. next-intl, PDF loader)
  turbopack: {},
  redirects: async () =>
    retiredBlogRedirects.map(({ source, destination }) => ({
      source: `/:locale(en|pt)/blog/${source}`,
      destination: destination
        ? `/:locale/blog/${destination}`
        : '/:locale/blog',
      permanent: true,
    })),
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
