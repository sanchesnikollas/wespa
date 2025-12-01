/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Output standalone for faster builds and smaller deployments
  output: 'standalone',

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Use unoptimized since we're serving static images from public folder
    // This ensures images work reliably on all hosting platforms (Railway, Vercel, etc.)
    unoptimized: true,
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
