import path from 'node:path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Hard alias so "@/..." always resolves to ./src
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src');
    return config;
  },
};
export default nextConfig;
