/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
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
