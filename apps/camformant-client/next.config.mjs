/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'camfor.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cam-formant.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
