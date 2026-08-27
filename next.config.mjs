/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export with relative asset paths, so the same build works on
  // GitHub Pages (served from a sub-path) or any plain static server.
  output: 'export',
  assetPrefix: './',
  images: { unoptimized: true },
};
export default nextConfig;
