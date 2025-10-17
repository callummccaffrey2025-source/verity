/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // We’ll run lint in CI later; skip during build to avoid CLI option mismatch
    ignoreDuringBuilds: true,
  },
  // If you use a basePath, set it here. Otherwise leave blank.
  // basePath: "",
};
export default nextConfig;
