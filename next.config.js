/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [],
  output: 'standalone',
  // Tell Next.js to use your custom folder instead of /public
  distDir: 'rem-webapp'
};
module.exports = nextConfig;
