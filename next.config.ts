import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize images for Vercel deployment
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-*',
      'framer-motion',
      'recharts',
      'react-hook-form',
      'zustand'
    ],
  },
  // Compression for better performance
  compress: true,
  // Environment variables that should be available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Redirects for common routes
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/admin',
        permanent: true,
      },
    ];
  },
  // Rewrites for API routes if needed
  async rewrites() {
    return [
      {
        source: '/api/socketio',
        destination: '/api/socketio',
      },
    ];
  },
  // Webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'react/jsx-runtime.js',
        'react': 'react',
      });
    }

    // Handle Socket.IO for server-side
    if (isServer) {
      config.externals.push({
        'socket.io': 'socket.io',
      });
    }

    return config;
  },
};

export default nextConfig;
