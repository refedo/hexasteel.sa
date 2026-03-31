/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://hexasteel.sa',
  },
  images: {
    domains: ['images.unsplash.com', 'placehold.co', 'hexasteel.sa', 'www.hexasteel.sa'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hexasteel.sa',
      },
      {
        protocol: 'https',
        hostname: 'www.hexasteel.sa',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // Disable image optimization for uploaded files to avoid 404 errors
    unoptimized: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    projectRoot: __dirname,
  }
}

module.exports = nextConfig
