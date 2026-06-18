/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // For development - remove in production
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },
  // Enable static exports if needed
  // output: 'export',
  
  // Optimize for production
  swcMinify: true,
  
  // Configure webpack for assets
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;

// Made with Bob
