/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Placeholder domains for development (update with actual CDN)
    domains: ['placeholder.wespa.hr', 'images.wespa.hr'],
    // Use unoptimized for wireframes with placeholder images
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Enable experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'react-hook-form'],
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Redirect legacy URLs if needed
  async redirects() {
    return [
      // Example: redirect old blog URL structure
      // {
      //   source: '/blog/:slug',
      //   destination: '/ideas/:slug',
      //   permanent: true,
      // },
    ]
  },
}

module.exports = nextConfig
