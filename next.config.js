/** @type {import('next').NextConfig} */
const path = require('path');

// Define security headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' https://identity.netlify.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' https://fonts.googleapis.com; img-src 'self' data: https://i.ytimg.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.googleapis.com https://identity.netlify.com https://api.netlify.com; frame-src 'self'; object-src 'none'; base-uri 'self';"
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  }
];

// Special headers for admin routes
const adminHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://identity.netlify.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://i.ytimg.com blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.googleapis.com https://identity.netlify.com https://api.netlify.com; frame-src 'self' https://identity.netlify.com; object-src 'none';"
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];

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
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/admin/:path*',
        headers: adminHeaders,
      }
    ];
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