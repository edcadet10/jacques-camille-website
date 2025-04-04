/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    // Resolve path aliases more explicitly
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@public': path.resolve(__dirname, 'public'),
      '@utils': path.resolve(__dirname, 'utils'),
    };
    return config;
  },
  // Ensure admin route is properly handled
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
      {
        source: '/admin/config.yml',
        destination: '/admin/config.yml',
      },
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
    ];
  },
}

module.exports = nextConfig