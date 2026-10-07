/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/budget-left',
  assetPrefix: '/budget-left/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
