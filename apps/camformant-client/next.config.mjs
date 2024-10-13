/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  compiler: {
    // Remove console logs only in production
    removeConsole: process.env.NODE_ENV === "production"
  },
  swcMinify: true, // Enable SWC minification for improved performance
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'optimise2.assets-servd.host',
        port: '',
        pathname: '/dig-upsiide/production/images/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/474x/36/9f/61/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/736x/63/**',
      },
      {
        protocol: 'https',
        hostname: 'camformant-jobs.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'microservice-sample-resource.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
};

export default withPWA({
  dest: "public",         // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
  register: true,         // register the PWA service worker
  skipWaiting: true,      // skip waiting for service worker activation
  swSrc: "service-worker.js"
})(nextConfig);
