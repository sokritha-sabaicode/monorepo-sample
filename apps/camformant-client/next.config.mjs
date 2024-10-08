/** @type {import('next').NextConfig} */

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';

const nextConfig = {
  ...(isMobile ? { output: 'export' } : {}),
  compiler: {
    // Remove console logs only in production
    removeConsole: process.env.NODE_ENV === "production"
  },
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
        hostname: 'postimg.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
