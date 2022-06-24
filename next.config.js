/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '',
    domains: ["lh3.googleusercontent.com", "localhost"],
    // formats: ['image/avif', 'image/webp'],
  },
  // swcMinify: true,
}

module.exports = nextConfig;
