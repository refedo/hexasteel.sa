/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hexasteel.sa',
      },
      {
        protocol: 'https',
        hostname: 'www.hexasteel.sa',
      },
    ],
    unoptimized: false,
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
