/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Support for subpath deployment (e.g., yourdomain.com/portal)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  images: {
    domains: [],
  },
  // Output configuration for static export if needed
  output: 'standalone',
};

module.exports = nextConfig;

